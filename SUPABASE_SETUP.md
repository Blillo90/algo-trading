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

## 3. Run SQL migrations

In the Supabase dashboard → **SQL Editor**, run the two migration files **in order**:

```
supabase/migrations/001_initial_schema.sql   ← tables, trigger, base RLS
supabase/migrations/002_admin_presence_time.sql  ← admin role, online tracking, time sessions
```

Copy each file's content and paste it into a new SQL Editor query, then run it.

## 4. Configure Auth redirect URLs

In Supabase dashboard → Authentication → URL Configuration:

- **Site URL**: `https://algo-trading-ruby.vercel.app`
- **Redirect URLs** (add both):
  - `https://algo-trading-ruby.vercel.app/**`
  - `http://localhost:3001/**`

## 5. Promote a user to admin

After the user has signed up (a row exists in `profiles`):

**Option A — SQL Editor:**
```sql
update public.profiles
set role = 'admin'
where id = '<user-uuid>';
```

**Option B — Table Editor:** open `profiles`, find the row, edit the `role` cell to `admin`.

Get the UUID from **Authentication → Users**.

## 6. Enroll a user in a course

```sql
insert into public.enrollments (user_id, course_id)
values ('<user-uuid>', 'course-1');
```

The `course_id` must match the `id` field in `src/data/courses.ts`.

## 7. Online presence

The frontend updates `profiles.last_seen_at` every ~60 seconds while the app is open.
A user is considered **online** if `last_seen_at > now() - interval '5 minutes'`.

```sql
-- Who is online right now?
select id, full_name, last_seen_at
from public.profiles
where last_seen_at > now() - interval '5 minutes';
```

## 8. Course time tracking

The frontend inserts a row in `course_time_sessions` when a lesson is opened and
updates `ended_at` + `duration_seconds` (capped at 1800 s) when the lesson is closed.

```sql
-- Total time per user per course
select
  p.full_name,
  ts.course_id,
  round(sum(ts.duration_seconds) / 60.0, 1) as total_minutes
from public.course_time_sessions ts
join public.profiles p on p.id = ts.user_id
where ts.ended_at is not null
group by p.full_name, ts.course_id
order by total_minutes desc;
```

## 9. Deploy

```bash
npm install
git add -A
git commit -m "feat: add supabase migrations for admin, presence and time tracking"
git push   # triggers Vercel redeploy
```
