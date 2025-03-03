import stripe
from fastapi import HTTPException, status

from app.core.config import settings

# Initialize Stripe with the API key
stripe.api_key = settings.STRIPE_API_KEY


def get_stripe_customer(email: str, name: str = None) -> stripe.Customer:
    """
    Get or create a Stripe customer for the given email.
    """
    try:
        # Search for existing customer
        customers = stripe.Customer.list(email=email, limit=1)
        if customers.data:
            return customers.data[0]

        # Create new customer if none exists
        customer_data = {"email": email}
        if name:
            customer_data["name"] = name

        return stripe.Customer.create(**customer_data)
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating Stripe customer: {str(e)}",
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


def handle_webhook_event(payload: dict, sig_header: str) -> dict:
    """
    Handle Stripe webhook events.
    """
    try:
        event = stripe.Webhook.construct_event(
            payload,
            sig_header,
            settings.STRIPE_WEBHOOK_SECRET,
        )
        return event
    except stripe.error.SignatureVerificationError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid signature",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Webhook error: {str(e)}",
        )
