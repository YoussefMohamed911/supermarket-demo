-- 00003_coupons.sql

create table coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_type discount_type not null,
  discount_value numeric(10, 2) not null check (discount_value > 0),
  min_order_amount numeric(10, 2) not null default 0,
  max_uses int, -- null = unlimited
  starts_at timestamptz,
  expires_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Tracks redemptions so max_uses and per-customer limits can be enforced.
create table coupon_usages (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references coupons(id) on delete cascade,
  customer_id uuid not null references profiles(id) on delete cascade,
  order_id uuid, -- FK added in 00004 once orders exists
  used_at timestamptz not null default now()
);

create index idx_coupon_usages_coupon_id on coupon_usages(coupon_id);
create index idx_coupon_usages_customer_id on coupon_usages(customer_id);
