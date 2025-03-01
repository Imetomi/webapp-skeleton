from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.dependencies import get_current_active_superuser, get_current_user, get_db
from app.db.models.subscription import (
    Subscription,
    SubscriptionPlan,
    SubscriptionStatus,
)
from app.db.models.user import User
from app.schemas.subscription import (
    Subscription as SubscriptionSchema,
    SubscriptionPlan as SubscriptionPlanSchema,
    SubscriptionRequest,
)

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
    plan_in: SubscriptionPlanSchema,
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
    Retrieve current user's subscriptions.
    """
    subscriptions = (
        db.query(Subscription).filter(Subscription.user_id == current_user.id).all()
    )
    return subscriptions


@router.post("/subscribe", response_model=SubscriptionSchema)
def create_subscription(
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

    # TODO: Implement Stripe integration
    # This is a placeholder for Stripe integration
    # In a real implementation, you would create a subscription in Stripe
    # and store the Stripe subscription ID in your database

    # For now, create a subscription without Stripe
    subscription = Subscription(
        user_id=current_user.id,
        plan_id=plan.id,
        status=SubscriptionStatus.ACTIVE,
        stripe_subscription_id=None,  # Would be set in real implementation
    )

    db.add(subscription)
    db.commit()
    db.refresh(subscription)
    return subscription


@router.post("/cancel", response_model=SubscriptionSchema)
def cancel_subscription(
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

    # TODO: Implement Stripe integration for cancellation
    # This is a placeholder for Stripe integration
    # In a real implementation, you would cancel the subscription in Stripe

    # For now, just update the status
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
    # TODO: Implement Stripe integration for invoices
    # This is a placeholder for Stripe integration
    # In a real implementation, you would fetch invoices from Stripe

    # For now, return an empty list
    return []
