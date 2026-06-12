-- Run this in the Supabase SQL Editor before deploying the blog image system

-- 1. Add cover_thumbnail_url to blogs table
ALTER TABLE blogs
  ADD COLUMN IF NOT EXISTS cover_thumbnail_url TEXT;

-- 2. Create blog_images media library table
CREATE TABLE IF NOT EXISTS blog_images (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alt_text         TEXT,
  original_webp_url  TEXT NOT NULL,
  thumbnail_webp_url TEXT NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Enable RLS on blog_images (admin-only access via service role)
ALTER TABLE blog_images ENABLE ROW LEVEL SECURITY;
