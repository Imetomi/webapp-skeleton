import os
import sys
from pathlib import Path

# Add the parent directory to the Python path
sys.path.append(str(Path(__file__).parent.parent.parent))

from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.models.subscription import SubscriptionPlan
from app.db.session import SessionLocal


def check_plans(db: Session) -> None:
    """Check existing subscription plans."""
    plans = db.query(SubscriptionPlan).all()
    if not plans:
        print("No subscription plans found in the database.")
    else:
        print("\nExisting subscription plans:")
        for plan in plans:
            print(f"\nPlan: {plan.name}")
            print(f"Price: ${plan.price/100:.2f}")
            print(f"Interval: {plan.interval}")
            print(f"Stripe Price ID: {plan.stripe_price_id}")
            print(f"Active: {plan.is_active}")


def main() -> None:
    """Main function to run the script."""
    db = SessionLocal()
    try:
        check_plans(db)
    except Exception as e:
        print(f"Error checking plans: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
