-- Run this in your Supabase SQL Editor
-- Adds thumbnail_url column to gallery_items

ALTER TABLE gallery_items
  ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Existing rows keep NULL thumbnail_url — the app falls back to image_url for those.
