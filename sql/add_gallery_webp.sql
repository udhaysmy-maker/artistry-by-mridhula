-- Run this in your Supabase SQL Editor
-- Adds WebP URL columns to gallery_items

ALTER TABLE gallery_items
  ADD COLUMN IF NOT EXISTS original_webp_url  TEXT,
  ADD COLUMN IF NOT EXISTS thumbnail_webp_url TEXT;

-- Existing rows keep NULL WebP URLs — the app falls back to JPEG for those.
