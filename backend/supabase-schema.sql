-- Supabase schema for the e-commerce backend

-- Enable uuid generation if needed
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

create table if not exists profiles (
  id uuid primary key,
  name text not null,
  role text not null default 'customer',
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  price numeric not null check (price >= 0),
  image text,
  category text not null,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists cart_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  selected_size text not null default 'M',
  quantity int not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (user_id, product_id, selected_size)
);

create table if not exists coupons (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  code text not null unique,
  discount_percentage int not null check (discount_percentage >= 0 and discount_percentage <= 100),
  expiration_date timestamptz not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  products jsonb not null,
  total_amount numeric not null check (total_amount >= 0),
  stripe_session_id text unique,
  created_at timestamptz not null default now()
);

-- Recommended indexes
create index if not exists idx_orders_user_id on orders(user_id);
create index if not exists idx_cart_items_user_product on cart_items(user_id, product_id);
create index if not exists idx_coupons_user_id on coupons(user_id);
create index if not exists idx_products_category on products(category);
create index if not exists idx_products_is_featured on products(is_featured);
