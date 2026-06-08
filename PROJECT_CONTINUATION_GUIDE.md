# Artistry by Mridhula — Project Continuation Guide

This file is a practical reference for continuing development on this project later.

## 1. Project overview
This is a Next.js 16 + TypeScript website for "Artistry by Mridhula" with:
- a public-facing portfolio / services / gallery / blog / products site
- a simple admin dashboard for managing content
- Supabase-backed data storage and authentication

## 2. Main stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Supabase (client + server auth and storage)
- ESLint

## 3. Key commands
From the project root:

```bash
npm install
npm run dev
npm run build
npm run lint
```

Use `npm run dev` to start the local website.

## 4. Important project folders
- `app/` — route pages and API endpoints
  - `app/page.tsx` — homepage
  - `app/about/`, `app/gallery/`, `app/blog/`, `app/products/`, `app/contact/` — public pages
  - `app/admin/` — admin dashboard and management pages
  - `app/api/` — backend route handlers
- `components/` — reusable UI elements and forms
- `lib/` — Supabase clients, auth helpers, and data logic
- `sql/` — database schema and seed SQL
- `public/` — static assets

## 5. Database and Supabase notes
The project uses Supabase for:
- public content tables such as blogs, gallery items, products, bookings, contact_messages, settings
- admin authentication and session management
- image/file storage support

Important files:
- `.env.local` — local environment variables
- `sql/schema.sql` — full schema and RLS policies
- `lib/supabase/client.ts` — browser client
- `lib/supabase/server.ts` — server client
- `lib/supabase/ssr.ts` — SSR auth/session helpers

### Environment variables
Make sure these are present in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Do not commit real secret values to Git.

## 6. Current feature areas
The current codebase appears to support:
- blog management
- gallery management
- product management
- bookings
- contact form messages
- admin login and settings

The schema in `sql/schema.sql` shows the main tables and access rules for these features.

## 7. What to check first when continuing work
If you return to this project later, start with these:
1. Confirm `.env.local` is present and valid.
2. Run `npm install` if dependencies were not installed yet.
3. Check `npm run dev` for runtime issues.
4. Review `sql/schema.sql` before changing database behavior.
5. Inspect admin routes under `app/admin/` for content-management logic.

## 8. Suggested next improvements
Possible future improvements:
- improve admin UX and validation
- add richer blog/gallery image upload flows
- add payment or booking confirmation automation
- improve SEO metadata and performance
- add tests for key admin and API routes

## 9. Working notes
- This project appears to be in active development.
- The main app is route-based and uses server/client components in App Router.
- Supabase is central to content storage, so changes in schema or auth should be verified carefully.

## 10. Quick restart checklist
When starting fresh:
1. `npm install`
2. confirm `.env.local`
3. `npm run dev`
4. test the admin login + content pages
5. verify Supabase tables and storage buckets

This guide should help you resume work quickly without re-exploring the whole project from scratch.
