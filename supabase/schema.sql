create extension if not exists pgcrypto;

create table if not exists navigation_items (
  id text primary key,
  parent_id text references navigation_items(id) on delete cascade,
  label text not null,
  href text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists site_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  status text not null default 'draft',
  breadcrumbs jsonb not null default '[]'::jsonb,
  content_blocks jsonb not null default '[]'::jsonb,
  wp_id bigint unique,
  wp_modified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content_blocks jsonb not null default '[]'::jsonb,
  status text not null default 'draft',
  published_at timestamptz,
  category_label text,
  tags text[] not null default '{}',
  author_name text,
  image_url text,
  image_alt text,
  likes integer not null default 0,
  wp_id bigint unique,
  wp_modified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content_blocks jsonb not null default '[]'::jsonb,
  status text not null default 'draft',
  starts_at timestamptz not null,
  ends_at timestamptz,
  venue text,
  image_url text,
  image_alt text,
  wp_id bigint unique,
  wp_modified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  wp_id bigint unique,
  original_url text not null,
  storage_path text,
  public_url text not null,
  alt text,
  mime_type text,
  created_at timestamptz not null default now()
);

create table if not exists form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_type text not null,
  payload jsonb not null default '{}'::jsonb,
  source_path text,
  created_at timestamptz not null default now()
);

create index if not exists site_pages_status_slug_idx on site_pages(status, slug);
create index if not exists posts_status_published_idx on posts(status, published_at desc);
create index if not exists events_status_starts_idx on events(status, starts_at asc);
create index if not exists navigation_parent_position_idx on navigation_items(parent_id, position);

alter table navigation_items enable row level security;
alter table site_pages enable row level security;
alter table posts enable row level security;
alter table events enable row level security;
alter table media_assets enable row level security;
alter table form_submissions enable row level security;

drop policy if exists "Public navigation" on navigation_items;
create policy "Public navigation" on navigation_items for select using (true);

drop policy if exists "Public published pages" on site_pages;
create policy "Public published pages" on site_pages for select using (status = 'published');

drop policy if exists "Public published posts" on posts;
create policy "Public published posts" on posts for select using (status = 'published');

drop policy if exists "Public published events" on events;
create policy "Public published events" on events for select using (status = 'published');

drop policy if exists "Public media" on media_assets;
create policy "Public media" on media_assets for select using (true);

drop policy if exists "Public form inserts" on form_submissions;
create policy "Public form inserts" on form_submissions for insert with check (true);

