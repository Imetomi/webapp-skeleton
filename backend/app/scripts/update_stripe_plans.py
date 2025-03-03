import os
import sys
from pathlib import Path

# Add the parent directory to the Python path
sys.path.append(str(Path(__file__).parent.parent.parent))

from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.models.subscription import SubscriptionPlan
from app.db.session import SessionLocal

# Stripe price IDs for our plans
PLAN_PRICE_IDS = {
    "Pro": "price_1QyGutLDN0gbzylp173gAh9G",  # Replace with actual Stripe price ID
    "Starter Plan": "price_1QyGuMLDN0gbzylpUKJQZJYe",  # Replace with actual Stripe price ID
}


def update_stripe_plans(db: Session) -> None:
    """Update subscription plans with Stripe price IDs."""
    for plan_name, price_id in PLAN_PRICE_IDS.items():
        plan = (
            db.query(SubscriptionPlan)
            .filter(SubscriptionPlan.name == plan_name)
            .first()
        )

        if plan:
            plan.stripe_price_id = price_id
            db.add(plan)
            print(f"Updated {plan_name} with Stripe price ID: {price_id}")
        else:
            print(f"Plan not found: {plan_name}")

    db.commit()


def main() -> None:
    """Main function to run the script."""
    db = SessionLocal()
    try:
        update_stripe_plans(db)
        print("Successfully updated subscription plans with Stripe price IDs")
    except Exception as e:
        print(f"Error updating plans: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
