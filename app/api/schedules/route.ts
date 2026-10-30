import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  const body = await request.json() as { village?: string; date?: string }
  const village = body.village?.trim()
  const date = body.date?.trim()
  if (!village || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return NextResponse.json({ error: 'గ్రామం మరియు తేదీ అవసరం.' }, { status: 400 })

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false, autoRefreshToken: false } })
  const { error } = await supabase.from('village_schedule').insert({ village, title: 'రేపటి ప్రయాణం', scheduled_date: date, scheduled_time: '00:00', location: village, purpose: 'గ్రామ సమస్యలు, పథకాల సమాచారం మరియు ప్రజా ప్రకటనల కోసం సమావేశం.' })
  if (error) return NextResponse.json({ error: 'షెడ్యూల్ సేవ్ కాలేదు.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
