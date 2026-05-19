# SoftComp TypeScript Migration

This repo is a TypeScript rebuild of the public SoftComp WordPress site at https://eu-softcomp.net/. It is set up as a Next.js app with Supabase as the content store.

The frontend runs with fixture data first, then switches to Supabase automatically when `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are present.

## Stack

- Next.js App Router
- TypeScript
- Supabase Postgres for pages, posts, events, menus, media references and form submissions
- WordPress importer script for `wp_posts`, post meta and The Events Calendar event records

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Add the Supabase URL and anon key to `.env.local`.
4. For server-side form inserts and the importer, add `SUPABASE_SERVICE_ROLE_KEY`.

The app can keep WordPress upload URLs at first. For production, export `wp-content/uploads`, upload it to Supabase Storage, then set `NEXT_PUBLIC_MEDIA_BASE_URL` before running the importer so migrated HTML points at Supabase-hosted media.

## WordPress Import

Restore the WordPress SQL dump into a local MySQL database, then set:

```bash
WORDPRESS_DATABASE_URL=mysql://user:password@localhost:3306/wordpress
WORDPRESS_TABLE_PREFIX=wp_
WORDPRESS_PUBLIC_URL=https://eu-softcomp.net
```

Run:

```bash
npm run import:wordpress
```

The importer migrates published WordPress pages, posts and `tribe_events` records into Supabase. Navigation is stored separately in `navigation_items` so it can match the current nested menu exactly after the dump is available.

## Exactness Notes

The visible site uses the SoftComp child theme on top of BeTheme, plus plugins for events, user profiles, forms and newsletters. This repo recreates the site as a data-driven TypeScript app. Pixel-perfect final polish needs the database export, media archive and any private user-area/form requirements.

