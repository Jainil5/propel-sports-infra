-- Propel Sports Infra — analytics + leads schema
-- Run once in Supabase Dashboard → SQL Editor.

create extension if not exists "pgcrypto";

-- ---------- pageviews ----------
create table if not exists public.pageviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  path text not null,
  referrer text not null default '',
  session_id text not null,
  device text not null default 'desktop',
  country text,
  city text
);
create index if not exists pageviews_created_at_idx on public.pageviews (created_at desc);
create index if not exists pageviews_session_idx on public.pageviews (session_id);

-- ---------- leads ----------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null default '',
  interest text not null default '',
  message text not null default '',
  source text not null default 'contact-form',
  status text not null default 'new' check (status in ('new', 'contacted', 'closed'))
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- ---------- events (whatsapp clicks, etc.) ----------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null,
  path text not null default '',
  session_id text not null default ''
);
create index if not exists events_created_at_idx on public.events (created_at desc);

-- ---------- row level security ----------
alter table public.pageviews enable row level security;
alter table public.leads enable row level security;
alter table public.events enable row level security;

-- Anyone (anon) may record visits, leads and events — insert only, no reads.
drop policy if exists "anon insert pageviews" on public.pageviews;
create policy "anon insert pageviews" on public.pageviews
  for insert to anon, authenticated with check (true);

drop policy if exists "anon insert leads" on public.leads;
create policy "anon insert leads" on public.leads
  for insert to anon, authenticated with check (true);

drop policy if exists "anon insert events" on public.events;
create policy "anon insert events" on public.events
  for insert to anon, authenticated with check (true);

-- Only signed-in admins (Supabase Auth users) may read or manage data.
drop policy if exists "admin read pageviews" on public.pageviews;
create policy "admin read pageviews" on public.pageviews
  for select to authenticated using (true);

drop policy if exists "admin read leads" on public.leads;
create policy "admin read leads" on public.leads
  for select to authenticated using (true);

drop policy if exists "admin update leads" on public.leads;
create policy "admin update leads" on public.leads
  for update to authenticated using (true) with check (true);

drop policy if exists "admin read events" on public.events;
create policy "admin read events" on public.events
  for select to authenticated using (true);

-- ---------- setup steps ----------
-- 1. Run this file in the SQL Editor.
-- 2. Authentication → Users → Add user: create the admin email + password
--    (disable "Auto Confirm" off / confirm the user so sign-in works).
-- 3. Put VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env (see .env.example).
-- 4. Sign in at /admin with that email + password.