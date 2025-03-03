import stripe
from fastapi import HTTPException, status
import logging

from app.core.config import settings

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Stripe with the API key
logger.info(f"Initializing Stripe with API key: {settings.STRIPE_API_KEY[:10]}...")
stripe.api_key = settings.STRIPE_API_KEY


def get_stripe_customer(email: str, name: str = None) -> stripe.Customer:
    """
    Get or create a Stripe customer for the given email.
    """
    try:
        logger.info(f"Attempting to get/create Stripe customer for email: {email}")
        logger.info(f"Using Stripe API key: {stripe.api_key[:10]}...")

        # Search for existing customer
        customers = stripe.Customer.list(email=email, limit=1)
        if customers.data:
            logger.info("Found existing customer")
            return customers.data[0]

        # Create new customer if none exists
        logger.info("Creating new customer")
        customer_data = {"email": email}
        if name:
            customer_data["name"] = name

        return stripe.Customer.create(**customer_data)
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {str(e)}")
        logger.error(f"Error type: {type(e).__name__}")
        logger.error(f"Error code: {getattr(e, 'code', 'unknown')}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating Stripe customer: {str(e)}",
        )


def create_checkout_session(
    customer_id: str,
    price_id: str,
    success_url: str,
    cancel_url: str,
) -> stripe.checkout.Session:
    """
    Create a Stripe Checkout session for subscription purchase.
    """
    try:
        session = stripe.checkout.Session.create(
            customer=customer_id,
            payment_method_types=["card"],
            line_items=[
                {
                    "price": price_id,
                    "quantity": 1,
                }
            ],
            mode="subscription",
            success_url=success_url,
            cancel_url=cancel_url,
            subscription_data={
                "trial_period_days": None,  # Set to a number if you want to offer a trial
            },
        )
        return session
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating checkout session: {str(e)}",
        )


def create_subscription(
    customer_id: str,
    price_id: str,
    trial_days: int = None,
) -> stripe.Subscription:
    """
    Create a new Stripe subscription for a customer.
    """
    try:
        subscription_data = {
            "customer": customer_id,
            "items": [{"price": price_id}],
            "expand": ["latest_invoice.payment_intent"],
        }

        if trial_days:
            subscription_data["trial_period_days"] = trial_days

        return stripe.Subscription.create(**subscription_data)
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating subscription: {str(e)}",
        )


def cancel_subscription(subscription_id: str) -> stripe.Subscription:
    """
    Cancel a Stripe subscription.
    """
    try:
        return stripe.Subscription.delete(subscription_id)
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error canceling subscription: {str(e)}",
        )


def get_subscription(subscription_id: str) -> stripe.Subscription:
    """
    Get a Stripe subscription by ID.
    """
    try:
        return stripe.Subscription.retrieve(subscription_id)
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error retrieving subscription: {str(e)}",
        )


def get_customer_invoices(customer_id: str, limit: int = 10) -> list:
    """
    Get a customer's invoices.
    """
    try:
        return stripe.Invoice.list(customer=customer_id, limit=limit)
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error retrieving invoices: {str(e)}",
        )


def handle_webhook_event(payload: bytes, sig_header: str) -> dict:
    """
    Handle Stripe webhook events.
    """
    try:
        logger.info("Attempting to construct webhook event")
        logger.info(f"Signature header length: {len(sig_header)}")
        logger.info(f"Payload length: {len(payload)}")

        event = stripe.Webhook.construct_event(
            payload,
            sig_header,
            settings.STRIPE_WEBHOOK_SECRET,
        )
        logger.info(f"Successfully constructed webhook event of type: {event.type}")
        return event
    except stripe.error.SignatureVerificationError as e:
        logger.error(f"Signature verification failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid signature",
        )
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Webhook error: {str(e)}",
        )
