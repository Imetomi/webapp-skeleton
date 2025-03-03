export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  interval: string;
  stripe_price_id: string;
  is_active: boolean;
}

export interface SubscriptionStatus {
  id: number;
  user_id: number;
  plan_id: number;
  status: string;
  stripe_subscription_id: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
} 