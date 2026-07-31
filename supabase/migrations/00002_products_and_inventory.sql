-- 00002_products_and_inventory.sql
-- Simple product structure for now (no variants), with a `unit` field so a
-- future variant migration (e.g. product_variants table) is non-breaking.

create table products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete restrict,
  name text not null,
  description text,
  unit text not null default 'قطعة', -- e.g. كيلو / علبة / كيس، ready for future variants
  price numeric(10, 2) not null check (price >= 0),
  compare_at_price numeric(10, 2) check (compare_at_price is null or compare_at_price >= price),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index idx_products_category_id on products(category_id);

-- Separate table (not an array column) to support ordering + a primary image.
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  storage_path text not null, -- Supabase Storage object path
  sort_order int not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_product_images_product_id on product_images(product_id);

-- Per-branch stock, since inventory must be tracked per branch.
create table inventory (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  branch_id uuid not null references branches(id) on delete cascade,
  quantity int not null default 0 check (quantity >= 0),
  updated_at timestamptz not null default now(),
  unique (product_id, branch_id)
);

create index idx_inventory_branch_id on inventory(branch_id);
