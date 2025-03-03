import os
import sys
from pathlib import Path

# Add the parent directory to the Python path
sys.path.append(str(Path(__file__).parent.parent.parent))

from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.models import SubscriptionPlan
from app.db.session import SessionLocal


SUBSCRIPTION_PLANS = [
    {
        "name": "Pro",
        "description": "Professional plan with all features",
        "price": 7900,  # $79.00
        "interval": "month",
        "is_active": True,
    },
    {
        "name": "Starter Plan",
        "description": "Basic plan with essential features",
        "price": 2900,  # $29.00
        "interval": "month",
        "is_active": True,
    },
]


def init_subscription_plans(db: Session) -> None:
    """Initialize subscription plans in the database."""
    for plan_data in SUBSCRIPTION_PLANS:
        # Check if plan already exists
        existing_plan = (
            db.query(SubscriptionPlan)
            .filter(SubscriptionPlan.name == plan_data["name"])
            .first()
        )

        if existing_plan:
            print(f"Plan '{plan_data['name']}' already exists.")
            continue

        # Create new plan
        plan = SubscriptionPlan(**plan_data)
        db.add(plan)
        print(f"Created plan: {plan_data['name']}")

    db.commit()
    print("\nAll plans initialized successfully!")


def main() -> None:
    """Main function to run the script."""
    db = SessionLocal()
    try:
        init_subscription_plans(db)
    except Exception as e:
        print(f"Error initializing plans: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
