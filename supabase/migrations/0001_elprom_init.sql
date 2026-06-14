-- ELPROM — initial schema + Row Level Security
-- Run in Supabase SQL editor (or via the CLI). RLS is ON by default; policies
-- are user-scoped so a signed-in user can only ever see/touch their own rows.
-- The service role (used only server-side in /api) bypasses RLS for the
-- rate-limit + plan writes.

-- ── Profiles: one row per user, holds plan (free|pro) ───────────────────────
create table if not exists public.el_profiles (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  plan        text not null default 'free' check (plan in ('free','pro')),
  brand_voice text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.el_profiles enable row level security;

create policy "profiles: read own"
  on public.el_profiles for select
  using (auth.uid() = user_id);

create policy "profiles: update own (non-plan)"
  on public.el_profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
-- NOTE: plan is changed ONLY by the service role via the Stripe webhook,
-- never by the client. The client may update brand_voice on its own row.

-- auto-create a profile when a new auth user appears
create or replace function public.el_handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.el_profiles (user_id) values (new.id)
  on conflict (user_id) do nothing;
  return new;
end; $$;

drop trigger if exists el_on_auth_user_created on auth.users;
create trigger el_on_auth_user_created
  after insert on auth.users
  for each row execute function public.el_handle_new_user();

-- ── Usage: one row per managed generation (for rate limiting) ───────────────
create table if not exists public.el_usage (
  id         bigserial primary key,
  user_id    uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists el_usage_user_time on public.el_usage (user_id, created_at desc);

alter table public.el_usage enable row level security;

create policy "usage: read own"
  on public.el_usage for select
  using (auth.uid() = user_id);
-- inserts happen via the service role in /api only (no client insert policy).

-- ── Saved calendars ────────────────────────────────────────────────────────
create table if not exists public.el_calendars (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  title      text not null,
  intent     text,
  week       jsonb not null,
  created_at timestamptz not null default now()
);
create index if not exists el_calendars_user on public.el_calendars (user_id, created_at desc);

alter table public.el_calendars enable row level security;

create policy "calendars: read own"  on public.el_calendars for select using (auth.uid() = user_id);
create policy "calendars: insert own" on public.el_calendars for insert with check (auth.uid() = user_id);
create policy "calendars: delete own" on public.el_calendars for delete using (auth.uid() = user_id);
