import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false, autoRefreshToken: false } })
  const { data, error } = await supabase.from('public_issues').select('id, category, village, description, created_at').in('category', ['visit_photos', 'announcement']).order('created_at', { ascending: false })
  const { data: schedules, error: scheduleError } = await supabase.from('village_schedule').select('id, village, scheduled_date, title, purpose').order('scheduled_date', { ascending: true })
  if (error || scheduleError) return NextResponse.json({ error: 'Unable to load public content' }, { status: 500 })

  const records = (data ?? []) as Array<{ id: string; category: string; village: string; description: string | null; created_at: string }>
  const recordsWithImages = await Promise.all(records.map(async (record) => {
    const paths = Array.from((record.description ?? '').matchAll(/storage:\/\/([^\s,]+)/g)).map(([, path]) => path)
    const signed = await Promise.all(paths.map(async (path) => (await supabase.storage.from('visit-photos').createSignedUrl(path, 3600)).data?.signedUrl))
    const lines = (record.description ?? '').split('\n').map((line) => line.trim()).filter(Boolean)
    return { id: record.id, category: record.category, village: record.village, description: record.description, created_at: record.created_at, title: lines[0] ?? 'ప్రజా ప్రకటన', imageUrl: signed.find(Boolean) ?? null }
  }))

  return NextResponse.json({ records: recordsWithImages, schedules })
}
