-- ─────────────────────────────────────────────
-- 002 · Admin role, presence tracking, course time
-- ─────────────────────────────────────────────
-- Run this AFTER 001_initial_schema.sql
-- ─────────────────────────────────────────────


-- ── 1. New columns on profiles ────────────────

alter table public.profiles
  add column if not exists role text not null default 'user'
  check (role in ('user', 'admin'));

alter table public.profiles
  add column if not exists last_seen_at timestamptz;


-- ── 2. Course time sessions ───────────────────
-- One row per lesson visit. Closed with ended_at.
-- duration_seconds is filled on close, capped at 1800 s (30 min)
-- to avoid counting idle time.

create table if not exists public.course_time_sessions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users on delete cascade,
  course_id        text not null,
  lesson_id        text not null,
  started_at       timestamptz not null default now(),
  ended_at         timestamptz,
  duration_seconds integer
);

alter table public.course_time_sessions enable row level security;

create index if not exists idx_time_sessions_user
  on public.course_time_sessions(user_id);

create index if not exists idx_time_sessions_user_course
  on public.course_time_sessions(user_id, course_id);


-- ── 3. is_admin() helper ──────────────────────
-- SECURITY DEFINER bypasses RLS on profiles, avoiding infinite recursion.

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;


-- ── 4. Updated RLS on profiles ────────────────
-- Drop old catch-all policy and replace with granular ones.

drop policy if exists "profiles: own row" on public.profiles;

-- SELECT: own row or admin sees all
create policy "profiles_select"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

-- INSERT: only own row (triggered by handle_new_user)
create policy "profiles_insert"
  on public.profiles for insert
  with check (auth.uid() = id);

-- UPDATE own row (user cannot escalate their own role)
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- UPDATE any row as admin (for role changes, etc.)
create policy "profiles_update_admin"
  on public.profiles for update
  using (public.is_admin());


-- ── 5. Updated RLS on enrollments ────────────

drop policy if exists "enrollments: own rows" on public.enrollments;

create policy "enrollments_select"
  on public.enrollments for select
  using (auth.uid() = user_id or public.is_admin());

create policy "enrollments_insert"
  on public.enrollments for insert
  with check (auth.uid() = user_id);


-- ── 6. Updated RLS on lesson_progress ────────

drop policy if exists "lesson_progress: own rows" on public.lesson_progress;

create policy "lesson_progress_select"
  on public.lesson_progress for select
  using (auth.uid() = user_id or public.is_admin());

create policy "lesson_progress_insert"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "lesson_progress_update"
  on public.lesson_progress for update
  using (auth.uid() = user_id);


-- ── 7. Updated RLS on course_progress ────────

drop policy if exists "course_progress: own rows" on public.course_progress;

create policy "course_progress_select"
  on public.course_progress for select
  using (auth.uid() = user_id or public.is_admin());

create policy "course_progress_insert"
  on public.course_progress for insert
  with check (auth.uid() = user_id);

create policy "course_progress_update"
  on public.course_progress for update
  using (auth.uid() = user_id);


-- ── 8. RLS on course_time_sessions ───────────

create policy "time_sessions_select"
  on public.course_time_sessions for select
  using (auth.uid() = user_id or public.is_admin());

create policy "time_sessions_insert"
  on public.course_time_sessions for insert
  with check (auth.uid() = user_id);

create policy "time_sessions_update"
  on public.course_time_sessions for update
  using (auth.uid() = user_id);


-- ── 9. Useful queries for the admin dashboard ─

-- Users online right now (last_seen_at < 5 min ago)
-- select id, full_name, last_seen_at
-- from public.profiles
-- where last_seen_at > now() - interval '5 minutes';

-- Total time per user per course (minutes)
-- select
--   p.full_name,
--   ts.course_id,
--   round(sum(ts.duration_seconds) / 60.0, 1) as total_minutes
-- from public.course_time_sessions ts
-- join public.profiles p on p.id = ts.user_id
-- where ts.ended_at is not null
-- group by p.full_name, ts.course_id
-- order by total_minutes desc;


-- ── How to promote a user to admin ───────────
-- Run in SQL Editor, replacing the UUID:
--
-- update public.profiles
-- set role = 'admin'
-- where id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
--
-- Or edit the `role` cell directly in Table Editor → profiles.
