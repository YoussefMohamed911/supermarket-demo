-- 00004_orders.sql

create sequence order_number_seq start 1000;

create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default ('QF-' || nextval('order_number_seq')),
  customer_id uuid not null references profiles(id) on delete restrict,
  branch_id uuid not null references branches(id) on delete restrict,
  status order_status not null default 'pending',
  payment_method payment_method not null,
  payment_status payment_status not null default 'pending',

  -- Address stored as a snapshot (not a FK) so historical orders stay
  -- accurate even if the customer later edits/deletes their saved address.
  delivery_address_line text not null,
  delivery_city text not null,
  delivery_notes text,

  coupon_id uuid references coupons(id) on delete set null,
  subtotal numeric(10, 2) not null check (subtotal >= 0),
  discount_amount numeric(10, 2) not null default 0 check (discount_amount >= 0),
  delivery_fee numeric(10, 2) not null default 0 check (delivery_fee >= 0),
  total numeric(10, 2) not null check (total >= 0),

  created_at timestamptz not null default now(),

  -- Financial integrity: total must reconcile with its components.
  constraint chk_order_total check (total = subtotal - discount_amount + delivery_fee)
);

create index idx_orders_customer_id on orders(customer_id);
create index idx_orders_branch_id on orders(branch_id);
create index idx_orders_status on orders(status);

alter table coupon_usages
  add constraint fk_coupon_usages_order foreign key (order_id) references orders(id) on delete set null;

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  product_name text not null, -- snapshot, same reasoning as the address
  unit_price numeric(10, 2) not null check (unit_price >= 0),
  quantity int not null check (quantity > 0),
  line_total numeric(10, 2) not null check (line_total >= 0)
);

create index idx_order_items_order_id on order_items(order_id);
