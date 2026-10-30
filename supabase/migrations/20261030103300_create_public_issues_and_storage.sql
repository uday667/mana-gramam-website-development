/*
# Create public_issues table and visit-photos storage bucket

## Purpose
The Mana Gramam portal stores village visit photos and announcements. The admin
dashboard uploads photos to Supabase Storage and inserts a record describing them.
The public website reads these records and renders the photos.

This migration creates the missing database table, storage bucket, and access policies
that were never provisioned. Without them every admin insert silently fails and the
public portal falls back to hardcoded static images.

## 1. New Tables

### public_issues
- id (uuid, primary key) — unique row id
- category (text, not null) — 'visit_photos' for photos, 'announcement' for text posts
- village (text, not null) — village name (Telugu)
- description (text, not null) — Telugu title + body / details
- image_paths (text[]) — list of storage paths in the visit-photos bucket (e.g. ["1234-photo.jpg"]). New dedicated column so photos are never dependent on parsing Markdown.
- contact_name (text) — who published it
- created_at (timestamptz, default now()) — publication date

### village_schedule
- id (uuid, primary key)
- village (text, not null)
- title (text)
- scheduled_date (date)
- scheduled_time (text)
- location (text)
- purpose (text)
- created_at (timestamptz, default now())

## 2. Security (RLS)

This is a single-tenant public-information app with NO sign-in screen. The frontend
runs entirely with the anon key, so policies MUST allow `anon` AND `authenticated` to
read published rows, and to insert new rows (the admin publishes without logging in).
`USING (true)` is correct here because the data is intentionally public/shared.

- public_issues: anon+authenticated can SELECT/INSERT/UPDATE/DELETE.
- village_schedule: anon+authenticated can SELECT/INSERT/UPDATE/DELETE.

## 3. Storage bucket

- visit-photos: PUBLIC bucket so images render via plain getPublicUrl (no signed URLs,
  no expiry). Public read + anon write for uploads.

## 4. Important notes
1. The bucket is public so image URLs never expire — no signed-URL dependency.
2. image_paths is a dedicated text[] column; the public portal reads it directly instead
   of parsing image URLs out of Markdown description text.
3. Existing description parsing is preserved as a fallback for any older rows.
*/

CREATE TABLE IF NOT EXISTS public_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  village text NOT NULL,
  description text NOT NULL,
  image_paths text[] DEFAULT '{}',
  contact_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public_issues ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public_issues TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_public_issues" ON public_issues;
CREATE POLICY "anon_select_public_issues" ON public_issues FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_public_issues" ON public_issues;
CREATE POLICY "anon_insert_public_issues" ON public_issues FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_public_issues" ON public_issues;
CREATE POLICY "anon_update_public_issues" ON public_issues FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_public_issues" ON public_issues;
CREATE POLICY "anon_delete_public_issues" ON public_issues FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS village_schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  village text NOT NULL,
  title text,
  scheduled_date date,
  scheduled_time text,
  location text,
  purpose text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE village_schedule ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON village_schedule TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_village_schedule" ON village_schedule;
CREATE POLICY "anon_select_village_schedule" ON village_schedule FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_village_schedule" ON village_schedule;
CREATE POLICY "anon_insert_village_schedule" ON village_schedule FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_village_schedule" ON village_schedule;
CREATE POLICY "anon_update_village_schedule" ON village_schedule FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_village_schedule" ON village_schedule;
CREATE POLICY "anon_delete_village_schedule" ON village_schedule FOR DELETE
  TO anon, authenticated USING (true);

INSERT INTO storage.buckets (id, name, public)
SELECT 'visit-photos', 'visit-photos', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'visit-photos');

DROP POLICY IF EXISTS "anon_select_visit_photos" ON storage.objects;
CREATE POLICY "anon_select_visit_photos" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'visit-photos');

DROP POLICY IF EXISTS "anon_insert_visit_photos" ON storage.objects;
CREATE POLICY "anon_insert_visit_photos" ON storage.objects FOR INSERT
  TO anon, authenticated WITH CHECK (bucket_id = 'visit-photos');

DROP POLICY IF EXISTS "anon_update_visit_photos" ON storage.objects;
CREATE POLICY "anon_update_visit_photos" ON storage.objects FOR UPDATE
  TO anon, authenticated USING (bucket_id = 'visit-photos') WITH CHECK (bucket_id = 'visit-photos');

DROP POLICY IF EXISTS "anon_delete_visit_photos" ON storage.objects;
CREATE POLICY "anon_delete_visit_photos" ON storage.objects FOR DELETE
  TO anon, authenticated USING (bucket_id = 'visit-photos');
