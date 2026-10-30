'use client'

import { useState } from 'react'
import { ArrowLeft, CalendarDays, CheckCircle2, ImagePlus, Megaphone, Upload } from 'lucide-react'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

const campaignLogo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%283%29-SnlYTvEcjqSDMkslDA67c7VrUukXii.jpg'

export default function AdminPage() {
  const [tab, setTab] = useState<'post' | 'schedule' | 'photos'>('post')
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<{ path: string; url: string }[]>([])
  const [postReady, setPostReady] = useState(false)

  async function publishPost(form: HTMLFormElement) {
    const data = new FormData(form)
    const { error } = await (getSupabaseBrowserClient() as any).from('public_issues').insert({ village: String(data.get('village')), category: 'announcement', description: `${String(data.get('headline'))}\n${String(data.get('body'))}`, contact_name: 'Portal team' })
    setMessage(error ? 'పోస్ట్ సేవ్ కాలేదు. మళ్లీ ప్రయత్నించండి.' : 'పోస్ట్ విజయవంతంగా సేవ్ అయింది.')
    if (!error) form.reset()
  }

  async function saveSchedule(form: HTMLFormElement) {
    const data = new FormData(form)
    const { error } = await (getSupabaseBrowserClient() as any).from('village_schedule').insert({ village: String(data.get('village')), title: String(data.get('title')), scheduled_date: String(data.get('date')), scheduled_time: String(data.get('time')), location: String(data.get('location')), purpose: String(data.get('purpose')) })
    setMessage(error ? 'షెడ్యూల్ సేవ్ కాలేదు. మళ్లీ ప్రయత్నించండి.' : 'రేపటి ప్రణాళిక సేవ్ అయింది.')
    if (!error) form.reset()
  }

  async function uploadPhotos(files: FileList | null) {
    if (!files?.length) return
    setUploading(true)
    setPostReady(false)
    const uploaded: { path: string; url: string }[] = []
    let failed = false
    const client = getSupabaseBrowserClient()
    for (const file of Array.from(files).slice(0, 8)) {
      if (!file.type.startsWith('image/') || file.size > 10 * 1024 * 1024) { failed = true; continue }
      const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`
      const { error } = await client.storage.from('visit-photos').upload(path, file, { upsert: false })
      if (error) failed = true
      else { const { data: signed } = await client.storage.from('visit-photos').createSignedUrl(path, 3600); const { data: publicData } = client.storage.from('visit-photos').getPublicUrl(path); uploaded.push({ path, url: signed?.signedUrl ?? publicData.publicUrl }) }
    }
    setUploadedPhotos(uploaded)
    setUploading(false)
    setMessage(failed ? 'కొన్ని చిత్రాలు అప్‌లోడ్ కాలేదు.' : 'చిత్రాలు అప్‌లోడ్ అయ్యాయి. ఇప్పుడు పోస్ట్ చేయవచ్చు.')
  }

  async function postUploadedPhotos(form: HTMLFormElement) {
    const data = new FormData(form)
    const { error } = await (getSupabaseBrowserClient() as any).from('public_issues').insert({ village: String(data.get('village')), category: 'visit_photos', description: `${String(data.get('title'))}\nచిత్రాలు: ${uploadedPhotos.map((photo) => photo.url).join(', ')}`, contact_name: 'Portal team' })
    setMessage(error ? 'చిత్రాల పోస్ట్ సేవ్ కాలేదు.' : 'ప్రకటన చిత్రాలు ప్రజలకు పోస్ట్ అయ్యాయి.')
    if (!error) { setPostReady(false); setUploadedPhotos([]); form.reset() }
  }

  const tabButton = (value: 'post' | 'schedule' | 'photos', icon: React.ReactNode, label: string) => <button className={tab === value ? 'active' : ''} onClick={() => setTab(value)}>{icon} {label}</button>

  return <main className="admin-shell"><aside className="admin-sidebar"><a href="/" className="admin-brand"><span className="brand-mark"><img src={campaignLogo} alt="ఫ్యాన్ ప్రచార లోగో" /></span><span><b>మన గ్రామం</b><small>NAARPALA PORTAL</small></span></a><div className="admin-label">ప్రజా ప్రచురణ కేంద్రం</div><nav>{tabButton('post', <Megaphone size={17} />, 'పోస్ట్ చేయండి')}{tabButton('schedule', <CalendarDays size={17} />, 'రేపటి ప్రణాళిక')}{tabButton('photos', <ImagePlus size={17} />, 'ప్రకటన చిత్రాలు')}</nav><a className="back-public" href="/"><ArrowLeft size={15} /> ప్రజా వెబ్‌సైట్</a></aside><section className="admin-content"><header className="admin-topbar"><div><span className="admin-kicker">నార్పల · సేవా బృందం</span><h1>{tab === 'post' ? 'ప్రజలకు సమాచారం పోస్ట్ చేయండి' : tab === 'schedule' ? 'రేపు ఎక్కడికి వెళ్తాం?' : 'మనం వెళ్లిన చోటు చిత్రాలు'}</h1></div><a href="/" className="outline-button">వెబ్‌సైట్ చూడండి</a></header>{message && <div className="admin-toast"><CheckCircle2 size={17} /> {message}</div>}<div className="admin-panels"><section className="admin-panel wide-panel">{tab === 'post' && <form onSubmit={e => { e.preventDefault(); void publishPost(e.currentTarget) }}><div className="panel-head"><div><span className="admin-kicker">తక్షణ ప్రచురణ</span><h2>గ్రామ వార్త / ప్రకటన</h2></div><Megaphone size={20} /></div><label>శీర్షిక<input name="headline" placeholder="ఉదా: రేపు గ్రామ సభ జరుగుతుంది" required /></label><label>వివరం<textarea name="body" placeholder="ప్రజలకు సులభమైన మాటల్లో వివరించండి..." required /></label><label>గ్రామం<input name="village" placeholder="నార్పల" required /></label><button className="button primary" type="submit"><Upload size={15} /> పోస్ట్ చేయండి</button></form>}{tab === 'schedule' && <form onSubmit={e => { e.preventDefault(); void saveSchedule(e.currentTarget) }}><div className="panel-head"><div><span className="admin-kicker">రేపటి ప్రయాణం</span><h2>మనం రేపు ఎక్కడికి వెళ్తాం?</h2></div><CalendarDays size={20} /></div><label>గ్రామం<input name="village" placeholder="గ్రామం పేరు" required /></label><label>ఏం చేస్తాం?<input name="title" placeholder="ఉదా: ఇంటింటి పింఛన్ సహాయం" required /></label><label>తేదీ<input name="date" type="date" required /></label><label>సమయం<input name="time" type="time" required /></label><label>స్థలం<input name="location" placeholder="స్థలం" required /></label><label>ఉద్దేశ్యం<textarea name="purpose" placeholder="ప్రజలకు ఉపయోగపడే విషయం" required /></label><button className="button primary" type="submit"><CalendarDays size={15} /> షెడ్యూల్ సేవ్ చేయండి</button></form>}{tab === 'photos' && <div><div className="panel-head"><div><span className="admin-kicker">నిజమైన పర్యటన రికార్డు</span><h2>వెళ్లిన చోటు చిత్రాలు</h2></div><ImagePlus size={20} /></div><p className="admin-help">చిత్రాలు ఎంచుకోండి. అప్‌లోడ్ అయిన తర్వాత అదే స్క్రీన్‌లో శీర్షిక, గ్రామం ఇచ్చి ప్రజలకు పోస్ట్ చేయవచ్చు.</p><label className="upload-drop"><ImagePlus size={26} /><span>{uploading ? 'అప్‌లోడ్ అవుతోంది...' : 'చిత్రాలు ఎంచుకోండి'}</span><small>JPG, PNG · ఒక్కో చిత్రం 10MB లోపు · గరిష్టం 8</small><input type="file" accept="image/*" multiple onChange={e => void uploadPhotos(e.target.files)} /></label>{uploadedPhotos.length > 0 && <form className="photo-post-form" onSubmit={e => { e.preventDefault(); void postUploadedPhotos(e.currentTarget) }}><div className="uploaded-count">{uploadedPhotos.length} చిత్రాలు సిద్ధంగా ఉన్నాయి</div><div className="uploaded-preview-grid">{uploadedPhotos.map((photo) => <img key={photo.path} src={photo.url} alt="అప్‌లోడ్ చేసిన ప్రకటన చిత్రం" />)}</div><label>పోస్ట్ శీర్షిక<input name="title" placeholder="ఉదా: నార్పల రైతులతో సమావేశం" required /></label><label>గ్రామం<input name="village" placeholder="గ్రామం పేరు" required /></label><button className="button primary" type="submit"><Megaphone size={15} /> ఈ చిత్రాలను పోస్ట్ చేయండి</button></form>}</div>}</section></div></section></main>
}
