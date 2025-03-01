from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from app.db.models.subscription import SubscriptionStatus


# Subscription Plan schemas
class SubscriptionPlanBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: int
    interval: str
    is_active: bool = True


class SubscriptionPlanCreate(SubscriptionPlanBase):
    stripe_price_id: Optional[str] = None


class SubscriptionPlanUpdate(SubscriptionPlanBase):
    name: Optional[str] = None
    price: Optional[int] = None
    interval: Optional[str] = None
    stripe_price_id: Optional[str] = None


class SubscriptionPlanInDBBase(SubscriptionPlanBase):
    id: int
    stripe_price_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class SubscriptionPlan(SubscriptionPlanInDBBase):
    pass


# Subscription schemas
class SubscriptionBase(BaseModel):
    plan_id: int
    status: SubscriptionStatus = SubscriptionStatus.ACTIVE
    cancel_at_period_end: bool = False


class SubscriptionCreate(SubscriptionBase):
    user_id: int
    stripe_subscription_id: Optional[str] = None
    current_period_start: Optional[datetime] = None
    current_period_end: Optional[datetime] = None


class SubscriptionUpdate(BaseModel):
    status: Optional[SubscriptionStatus] = None
    cancel_at_period_end: Optional[bool] = None
    current_period_start: Optional[datetime] = None
    current_period_end: Optional[datetime] = None


class SubscriptionInDBBase(SubscriptionBase):
    id: int
    user_id: int
    stripe_subscription_id: Optional[str] = None
    current_period_start: Optional[datetime] = None
    current_period_end: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class Subscription(SubscriptionInDBBase):
    pass


# Schema for creating a subscription via API
class SubscriptionRequest(BaseModel):
    plan_id: int
    payment_method_id: str
