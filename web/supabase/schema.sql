-- ─── RobotEdge Web — Supabase Schema ──────────────────────────────────────
-- Run this in your Supabase project's SQL editor.
-- This creates the posts table used by the blog + admin.

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title      TEXT        NOT NULL,
  slug       TEXT        NOT NULL UNIQUE,
  excerpt    TEXT,
  content    TEXT        NOT NULL DEFAULT '',
  published  BOOLEAN     NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ─── Row Level Security ────────────────────────────────────────────────────
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts (public blog)
CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT
  USING (published = true);

-- Authenticated users (admins via Supabase Auth) can do everything
CREATE POLICY "Authenticated users have full access"
  ON posts FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
