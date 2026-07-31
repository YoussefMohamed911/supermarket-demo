-- 00001_enums_and_core_tables.sql
-- ENUM types for all fixed-state fields, plus branches / categories / profiles.

create type order_status as enum (
  'pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'
);

create type payment_method as enum ('cod', 'card', 'wallet');

create type payment_status as enum ('pending', 'paid', 'failed', 'refunded');

create type discount_type as enum ('percentage', 'fixed_amount');

create table branches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Hierarchical categories: self-referencing parent_id for main/sub category.
create table categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references categories(id) on delete cascade,
  name text not null,
  slug text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index idx_categories_parent_id on categories(parent_id);

-- profiles extends auth.users (1:1), created via trigger on signup.
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);
