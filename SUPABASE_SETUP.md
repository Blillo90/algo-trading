# Supabase Setup

## 1. Create project

Go to [supabase.com](https://supabase.com) → New project. Copy the **Project URL** and **anon public key** from Project Settings → API.

## 2. Environment variables

Create `.env.local` at the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

For Vercel: add both variables in Project Settings → Environment Variables.

## 3. Run SQL schema

In the Supabase dashboard → SQL Editor, run the following:

```sql
-- ─────────────────────────────────────────────
-- Profiles (auto-created on user sign-up)
-- ─────────────────────────────────────────────
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

-- ─────────────────────────────────────────────
-- Enrollments
-- ─────────────────────────────────────────────
create table if not exists public.enrollments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  course_id   text not null,  -- matches id in src/data/courses.ts
  enrolled_at timestamptz not null default now(),
  unique(user_id, course_id)
);

-- ─────────────────────────────────────────────
-- Lesson progress
-- ─────────────────────────────────────────────
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

-- ─────────────────────────────────────────────
-- Course progress (last-accessed lesson)
-- ─────────────────────────────────────────────
create table if not exists public.course_progress (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null references auth.users on delete cascade,
  course_id               text not null,
  last_accessed_lesson_id text,
  last_accessed_at        timestamptz not null default now(),
  unique(user_id, course_id)
);
```

## 4. Row Level Security (RLS)

```sql
-- Enable RLS on all tables
alter table public.profiles       enable row level security;
alter table public.enrollments    enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.course_progress enable row level security;

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
```

## 5. Configure Auth redirect URLs

In Supabase dashboard → Authentication → URL Configuration:

- **Site URL**: `https://algo-trading-ruby.vercel.app`
- **Redirect URLs** (add both):
  - `https://algo-trading-ruby.vercel.app/**`
  - `http://localhost:3001/**`

## 6. Create first user

In Supabase → Authentication → Users → Invite user (or use the signup flow once you add a registration page). To enroll a user in a course, insert a row manually:

```sql
insert into public.enrollments (user_id, course_id)
values ('<user-uuid>', 'trading-algoritmico-python');
```

The `course_id` must match the `id` field in `src/data/courses.ts`.

## 7. Deploy

```bash
npm install          # installs @supabase/supabase-js
git add -A
git commit -m "feat: integrate Supabase auth and progress persistence"
git push             # triggers Vercel redeploy
```
