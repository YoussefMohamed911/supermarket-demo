-- 00005_rls_policies.sql
-- Deny-by-default: enable RLS everywhere, then grant only the narrow access
-- customers need for their own data. All admin-level writes go through the
-- service_role key (used only in trusted backend code), which bypasses RLS.

alter table branches enable row level security;
alter table categories enable row level security;
alter table profiles enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table inventory enable row level security;
alter table coupons enable row level security;
alter table coupon_usages enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Public catalog data: readable by anyone, writable only by service_role.
create policy "branches are publicly readable" on branches for select using (is_active);
create policy "categories are publicly readable" on categories for select using (true);
create policy "products are publicly readable" on products for select using (is_active);
create policy "product images are publicly readable" on product_images for select using (true);
create policy "active coupons are publicly readable" on coupons for select using (is_active);

-- Inventory: expose only enough to show stock status, not raw counts, if desired.
-- For MVP, allow read of quantity so the storefront can show "out of stock".
create policy "inventory is publicly readable" on inventory for select using (true);

-- profiles: a customer can read/update only their own row.
create policy "customers read own profile" on profiles for select using (auth.uid() = id);
create policy "customers update own profile" on profiles for update using (auth.uid() = id);

-- coupon_usages: a customer can see only their own redemptions.
create policy "customers read own coupon usages" on coupon_usages for select using (auth.uid() = customer_id);

-- orders: a customer can read and create only their own orders.
create policy "customers read own orders" on orders for select using (auth.uid() = customer_id);
create policy "customers create own orders" on orders for insert with check (auth.uid() = customer_id);

-- order_items: readable only via the parent order's ownership.
create policy "customers read own order items" on order_items for select using (
  exists (
    select 1 from orders
    where orders.id = order_items.order_id
    and orders.customer_id = auth.uid()
  )
);

-- No update/delete policies for customers on orders/order_items: once placed,
-- an order is only mutated by staff via service_role (e.g. status changes).
