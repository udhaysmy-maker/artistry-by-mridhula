-- =============================================================
-- Artistry by Mridhula — Full Database Schema
-- Run in Supabase SQL Editor (project: your project)
-- Safe to re-run — all statements are idempotent.
-- =============================================================

-- ─── EXTENSION ────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ─── TABLES ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS blogs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  excerpt      TEXT,
  content      TEXT NOT NULL,
  cover_image  TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  image_url  TEXT NOT NULL,
  category   TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  description   TEXT,
  image_url     TEXT,
  affiliate_url TEXT,
  category      TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL,
  email      TEXT NOT NULL,
  event_date TEXT,
  service    TEXT,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL,
  event_date DATE,
  event_type TEXT,
  location   TEXT,
  notes      TEXT,
  status     TEXT NOT NULL DEFAULT 'pending'
               CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed default settings (idempotent — skips rows that already exist)
INSERT INTO settings (key, value) VALUES
  ('business_name', 'Artistry by Mridhula'),
  ('owner_name',    'Mridhula'),
  ('phone',         ''),
  ('whatsapp',      ''),
  ('email',         ''),
  ('address',       'Chennai, Tamil Nadu'),
  ('instagram_url', ''),
  ('facebook_url',  ''),
  ('youtube_url',   '')
ON CONFLICT (key) DO NOTHING;


-- ─── INDEXES ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS blogs_published_at_idx  ON blogs (published_at DESC);
CREATE INDEX IF NOT EXISTS blogs_slug_idx           ON blogs (slug);
CREATE INDEX IF NOT EXISTS gallery_items_cat_idx   ON gallery_items (category);
CREATE INDEX IF NOT EXISTS bookings_status_idx     ON bookings (status);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings (created_at DESC);


-- ─── ROW LEVEL SECURITY ───────────────────────────────────────
ALTER TABLE blogs            ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items    ENABLE ROW LEVEL SECURITY;
ALTER TABLE products         ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings         ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings         ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before re-creating (idempotent)
DROP POLICY IF EXISTS "Public read blogs"           ON blogs;
DROP POLICY IF EXISTS "Service role full blogs"     ON blogs;
DROP POLICY IF EXISTS "Public read gallery"         ON gallery_items;
DROP POLICY IF EXISTS "Service role full gallery"   ON gallery_items;
DROP POLICY IF EXISTS "Public read products"        ON products;
DROP POLICY IF EXISTS "Service role full products"  ON products;
DROP POLICY IF EXISTS "Service role full messages"  ON contact_messages;
DROP POLICY IF EXISTS "Public insert messages"      ON contact_messages;
DROP POLICY IF EXISTS "Service role full bookings"  ON bookings;
DROP POLICY IF EXISTS "Public insert bookings"      ON bookings;
DROP POLICY IF EXISTS "Public read settings"        ON settings;
DROP POLICY IF EXISTS "Service role full settings"  ON settings;

-- BLOGS: public read, service-role write
CREATE POLICY "Public read blogs"
  ON blogs FOR SELECT
  USING (true);

CREATE POLICY "Service role full blogs"
  ON blogs FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- GALLERY: public read, service-role write
CREATE POLICY "Public read gallery"
  ON gallery_items FOR SELECT
  USING (true);

CREATE POLICY "Service role full gallery"
  ON gallery_items FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- PRODUCTS: public read, service-role write
CREATE POLICY "Public read products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Service role full products"
  ON products FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- CONTACT MESSAGES: public insert only, service-role full access
CREATE POLICY "Public insert messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role full messages"
  ON contact_messages FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- BOOKINGS: public insert only, service-role full access
CREATE POLICY "Public insert bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role full bookings"
  ON bookings FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- SETTINGS: public read, service-role write
CREATE POLICY "Public read settings"
  ON settings FOR SELECT
  USING (true);

CREATE POLICY "Service role full settings"
  ON settings FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');


-- ─── STORAGE (manual steps) ───────────────────────────────────
-- Do these once in the Supabase Dashboard → Storage:
--   1. Create bucket named "gallery"    → set to Public
--   2. Create bucket named "blog-images" → set to Public
-- The service role key used by the server has full access by default.
-- No additional storage policies are needed.
