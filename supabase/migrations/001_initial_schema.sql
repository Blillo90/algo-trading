-- ─────────────────────────────────────────────
-- 001 · Initial schema
-- ─────────────────────────────────────────────

-- Profiles (auto-created on user sign-up)
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Trigger: create profile row when a user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Enrollments
create table if not exists public.enrollments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  course_id   text not null,  -- matches id in src/data/courses.ts
  enrolled_at timestamptz not null default now(),
  unique(user_id, course_id)
);

-- Lesson progress
create table if not exists public.lesson_progress (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users on delete cascade,
  course_id        text not null,
  lesson_id        text not null,
  completed        boolean not null default false,
  completed_at     timestamptz,
  last_accessed_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

-- Course progress (last-accessed lesson, for resume)
create table if not exists public.course_progress (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null references auth.users on delete cascade,
  course_id               text not null,
  last_accessed_lesson_id text,
  last_accessed_at        timestamptz not null default now(),
  unique(user_id, course_id)
);

-- ─────────────────────────────────────────────
-- RLS
-- ─────────────────────────────────────────────

alter table public.profiles        enable row level security;
alter table public.enrollments     enable row level security;
alter table public.lesson_progress  enable row level security;
alter table public.course_progress  enable row level security;

-- Profiles: users can read and update their own row
create policy "profiles: own row" on public.profiles
  for all using (auth.uid() = id);

-- Enrollments: users can read their own enrollments
create policy "enrollments: own rows" on public.enrollments
  for select using (auth.uid() = user_id);

-- Lesson progress: users manage their own rows
create policy "lesson_progress: own rows" on public.lesson_progress
  for all using (auth.uid() = user_id);

-- Course progress: users manage their own rows
create policy "course_progress: own rows" on public.course_progress
  for all using (auth.uid() = user_id);
