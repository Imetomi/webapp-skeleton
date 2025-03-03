from typing import Any, List
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
import stripe
import logging

from app.core.config import settings
from app.core.dependencies import get_current_active_superuser, get_current_user, get_db
from app.core.stripe import (
    cancel_subscription,
    create_subscription,
    get_customer_invoices,
    get_stripe_customer,
    handle_webhook_event,
    create_checkout_session,
)
from app.db.models.subscription import (
    Subscription,
    SubscriptionPlan,
    SubscriptionStatus,
)
from app.db.models.user import User
from app.schemas.subscription import (
    Subscription as SubscriptionSchema,
    SubscriptionPlan as SubscriptionPlanSchema,
    SubscriptionCreate,
    SubscriptionPlanCreate,
    SubscriptionRequest,
)

logger = logging.getLogger(__name__)


# New schema for checkout session response
class CheckoutSessionResponse(BaseModel):
    checkout_url: str


router = APIRouter()


@router.get("/plans", response_model=List[SubscriptionPlanSchema])
def get_subscription_plans(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve subscription plans.
    """
    plans = (
        db.query(SubscriptionPlan)
        .filter(SubscriptionPlan.is_active == True)
        .offset(skip)
        .limit(limit)
        .all()
    )
    return plans


@router.post("/plans", response_model=SubscriptionPlanSchema)
def create_subscription_plan(
    plan_in: SubscriptionPlanCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_superuser),
) -> Any:
    """
    Create new subscription plan. Only for superusers.
    """
    plan = SubscriptionPlan(
        name=plan_in.name,
        description=plan_in.description,
        price=plan_in.price,
        interval=plan_in.interval,
        stripe_price_id=plan_in.stripe_price_id,
        is_active=plan_in.is_active,
    )
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return plan


@router.get("/subscriptions", response_model=List[SubscriptionSchema])
def get_user_subscriptions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Retrieve current user's most relevant subscription (active or latest canceled).
    """
    # First try to find an active subscription
    active_subscription = (
        db.query(Subscription)
        .filter(
            Subscription.user_id == current_user.id,
            Subscription.status == SubscriptionStatus.ACTIVE,
        )
        .order_by(Subscription.created_at.desc())
        .first()
    )

    if active_subscription:
        return [active_subscription]

    # If no active subscription, get the most recent canceled one
    latest_canceled = (
        db.query(Subscription)
        .filter(
            Subscription.user_id == current_user.id,
            Subscription.status == SubscriptionStatus.CANCELED,
        )
        .order_by(Subscription.updated_at.desc())
        .first()
    )

    return [latest_canceled] if latest_canceled else []


@router.post("/subscribe", response_model=SubscriptionSchema)
def create_user_subscription(
    subscription_in: SubscriptionRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create a new subscription for the current user.
    """
    # Check if plan exists
    plan = (
        db.query(SubscriptionPlan)
        .filter(
            SubscriptionPlan.id == subscription_in.plan_id,
            SubscriptionPlan.is_active == True,
        )
        .first()
    )

    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription plan not found",
        )

    if not plan.stripe_price_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid subscription plan configuration",
        )

    # Check if user already has an active subscription for this plan
    existing_subscription = (
        db.query(Subscription)
        .filter(
            Subscription.user_id == current_user.id,
            Subscription.plan_id == plan.id,
            Subscription.status == SubscriptionStatus.ACTIVE,
        )
        .first()
    )

    if existing_subscription:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already has an active subscription for this plan",
        )

    # Create or get Stripe customer
    stripe_customer = get_stripe_customer(
        email=current_user.email,
        name=current_user.full_name,
    )

    # Create Stripe subscription
    stripe_sub = create_subscription(
        customer_id=stripe_customer.id,
        price_id=plan.stripe_price_id,
    )

    # Create subscription in database
    subscription = Subscription(
        user_id=current_user.id,
        plan_id=plan.id,
        status=SubscriptionStatus.ACTIVE,
        stripe_subscription_id=stripe_sub.id,
        current_period_start=datetime.fromtimestamp(stripe_sub.current_period_start),
        current_period_end=datetime.fromtimestamp(stripe_sub.current_period_end),
    )

    db.add(subscription)
    db.commit()
    db.refresh(subscription)
    return subscription


@router.post("/cancel", response_model=SubscriptionSchema)
def cancel_user_subscription(
    subscription_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Cancel a subscription.
    """
    subscription = (
        db.query(Subscription)
        .filter(
            Subscription.id == subscription_id,
            Subscription.user_id == current_user.id,
        )
        .first()
    )

    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription not found",
        )

    if subscription.status != SubscriptionStatus.ACTIVE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Subscription is not active",
        )

    # Cancel subscription in Stripe
    if subscription.stripe_subscription_id:
        cancel_subscription(subscription.stripe_subscription_id)

    # Update subscription status in database
    subscription.status = SubscriptionStatus.CANCELED
    subscription.cancel_at_period_end = True

    db.add(subscription)
    db.commit()
    db.refresh(subscription)
    return subscription


@router.get("/invoices", response_model=List[dict])
def get_user_invoices(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Retrieve current user's invoices.
    """
    # Get active subscription to get Stripe customer ID
    active_subscription = (
        db.query(Subscription)
        .filter(
            Subscription.user_id == current_user.id,
            Subscription.status == SubscriptionStatus.ACTIVE,
        )
        .first()
    )

    if not active_subscription or not active_subscription.stripe_subscription_id:
        return []

    # Get Stripe customer
    stripe_customer = get_stripe_customer(email=current_user.email)

    # Get invoices from Stripe
    invoices = get_customer_invoices(customer_id=stripe_customer.id)
    return invoices.data


@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)) -> dict:
    """
    Handle Stripe webhooks.
    """
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    logger.info(f"Received webhook with signature: {sig_header[:20]}...")
    logger.info(f"Using webhook secret: {settings.STRIPE_WEBHOOK_SECRET[:20]}...")

    if not sig_header:
        logger.error("No Stripe signature found in headers")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No Stripe signature found",
        )

    try:
        event = handle_webhook_event(payload, sig_header)
        logger.info(f"Successfully verified webhook: {event.type}")

        # Handle the event
        if event.type == "customer.subscription.updated":
            subscription_data = event.data.object
            logger.info(f"Processing subscription update: {subscription_data['id']}")
            db_subscription = (
                db.query(Subscription)
                .filter(Subscription.stripe_subscription_id == subscription_data["id"])
                .first()
            )

            if db_subscription:
                # Update subscription status
                if subscription_data["status"] == "active":
                    db_subscription.status = SubscriptionStatus.ACTIVE
                elif subscription_data["status"] == "past_due":
                    db_subscription.status = SubscriptionStatus.PAST_DUE
                elif subscription_data["status"] == "unpaid":
                    db_subscription.status = SubscriptionStatus.UNPAID
                elif subscription_data["status"] == "canceled":
                    db_subscription.status = SubscriptionStatus.CANCELED

                # Update period dates
                db_subscription.current_period_start = datetime.fromtimestamp(
                    subscription_data["current_period_start"]
                )
                db_subscription.current_period_end = datetime.fromtimestamp(
                    subscription_data["current_period_end"]
                )
                db_subscription.cancel_at_period_end = subscription_data[
                    "cancel_at_period_end"
                ]

                db.add(db_subscription)
                db.commit()
                logger.info(
                    f"Updated subscription {db_subscription.id} with status {db_subscription.status}"
                )

        elif event.type == "customer.subscription.created":
            try:
                subscription_data = event.data.object
                logger.info(f"Processing new subscription: {subscription_data.id}")
                logger.info(f"Raw subscription data: {subscription_data}")

                # Get the customer email from the subscription data
                customer = stripe.Customer.retrieve(subscription_data.customer)
                logger.info(f"Retrieved customer: {customer.email}")

                # Find the user by email
                user = db.query(User).filter(User.email == customer.email).first()
                if not user:
                    logger.error(f"User not found for email: {customer.email}")
                    return {"status": "error", "message": "User not found"}

                # Cancel any existing active subscriptions
                existing_active_subs = (
                    db.query(Subscription)
                    .filter(
                        Subscription.user_id == user.id,
                        Subscription.status == SubscriptionStatus.ACTIVE,
                    )
                    .all()
                )

                for existing_sub in existing_active_subs:
                    if existing_sub.stripe_subscription_id:
                        try:
                            # Cancel in Stripe
                            cancel_subscription(existing_sub.stripe_subscription_id)
                        except Exception as e:
                            logger.error(
                                f"Error canceling Stripe subscription: {str(e)}"
                            )

                    # Update in database
                    existing_sub.status = SubscriptionStatus.CANCELED
                    existing_sub.cancel_at_period_end = True
                    db.add(existing_sub)

                # Get the price ID from the subscription items
                subscription_items = subscription_data.get("items", {})
                if not subscription_items or not subscription_items.get("data"):
                    logger.error("No subscription items found")
                    return {"status": "error", "message": "No subscription items found"}

                price_id = subscription_items["data"][0]["price"]["id"]
                logger.info(f"Retrieved price ID from subscription: {price_id}")

                # Find the plan by Stripe Price ID
                plan = (
                    db.query(SubscriptionPlan)
                    .filter(SubscriptionPlan.stripe_price_id == price_id)
                    .first()
                )
                if not plan:
                    logger.error(f"Plan not found for price_id: {price_id}")
                    return {"status": "error", "message": "Plan not found"}

                # Create new subscription in database
                new_subscription = Subscription(
                    user_id=user.id,
                    plan_id=plan.id,
                    status=(
                        SubscriptionStatus.ACTIVE
                        if subscription_data.status == "active"
                        else SubscriptionStatus.UNPAID
                    ),
                    stripe_subscription_id=subscription_data.id,
                    current_period_start=datetime.fromtimestamp(
                        subscription_data.current_period_start
                    ),
                    current_period_end=datetime.fromtimestamp(
                        subscription_data.current_period_end
                    ),
                    cancel_at_period_end=subscription_data.cancel_at_period_end,
                )

                db.add(new_subscription)
                db.commit()
                logger.info(f"Created new subscription in database for user {user.id}")
                return {"status": "success"}

            except Exception as e:
                logger.error(f"Error in subscription.created webhook: {str(e)}")
                logger.exception("Full traceback:")
                db.rollback()
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Error processing subscription creation: {str(e)}",
                )

        elif event.type == "customer.subscription.deleted":
            subscription_data = event.data.object
            db_subscription = (
                db.query(Subscription)
                .filter(Subscription.stripe_subscription_id == subscription_data.id)
                .first()
            )

            if db_subscription:
                db_subscription.status = SubscriptionStatus.CANCELED
                db_subscription.cancel_at_period_end = True
                db.add(db_subscription)
                db.commit()

        elif event.type == "invoice.payment_succeeded":
            invoice_data = event.data.object
            if invoice_data.subscription:
                db_subscription = (
                    db.query(Subscription)
                    .filter(
                        Subscription.stripe_subscription_id == invoice_data.subscription
                    )
                    .first()
                )

                if db_subscription:
                    db_subscription.status = SubscriptionStatus.ACTIVE
                    db.add(db_subscription)
                    db.commit()

        elif event.type == "invoice.payment_failed":
            invoice_data = event.data.object
            if invoice_data.subscription:
                db_subscription = (
                    db.query(Subscription)
                    .filter(
                        Subscription.stripe_subscription_id == invoice_data.subscription
                    )
                    .first()
                )

                if db_subscription:
                    db_subscription.status = SubscriptionStatus.PAST_DUE
                    db.add(db_subscription)
                    db.commit()

        return {"status": "success"}

    except Exception as e:
        logger.error(f"Error processing webhook: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error processing webhook",
        )


@router.post(
    "/create-checkout-session/{plan_id}", response_model=CheckoutSessionResponse
)
async def create_subscription_checkout(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create a Stripe Checkout session for subscription purchase.
    """
    # Get the subscription plan
    plan = (
        db.query(SubscriptionPlan)
        .filter(
            SubscriptionPlan.id == plan_id,
            SubscriptionPlan.is_active == True,
        )
        .first()
    )

    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription plan not found",
        )

    if not plan.stripe_price_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid subscription plan configuration",
        )

    # Check if user already has an active subscription for this plan
    existing_subscription = (
        db.query(Subscription)
        .filter(
            Subscription.user_id == current_user.id,
            Subscription.plan_id == plan.id,
            Subscription.status == SubscriptionStatus.ACTIVE,
        )
        .first()
    )

    if existing_subscription:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already has an active subscription for this plan",
        )

    # Create or get Stripe customer
    stripe_customer = get_stripe_customer(
        email=current_user.email,
        name=current_user.full_name,
    )

    # Create Stripe Checkout session
    session = create_checkout_session(
        customer_id=stripe_customer.id,
        price_id=plan.stripe_price_id,
        success_url=f"{settings.FRONTEND_URL}/dashboard?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{settings.FRONTEND_URL}/dashboard",
    )

    return {"checkout_url": session.url}
