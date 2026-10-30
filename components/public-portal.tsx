'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, FileText, ImagePlus, Languages, MapPin, Menu, MessageCircle, Moon, ShieldCheck, Sun, Users, X } from 'lucide-react'

const campaignBanner = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Airy%20Blue%20Fan%20Banner%20with%20Namaste%20Portraits-oDTKQlwKySm64uFWQxj9NUnTuZVkUe.png'
const campaignLogo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%283%29-SnlYTvEcjqSDMkslDA67c7VrUukXii.jpg'
const supportLink = 'https://zptc-yours-sivanandhareddy.github.io/'
const whatsappLink = 'https://chat.whatsapp.com/IqeoygzHvKaKFlJNN7BwVx'
const facebookLink = 'https://facebook.com/sivanandha'

type PortalPhoto = { src: string; alt: string; village: string; date: string; title?: string; detail?: string; purpose?: string; mediaType?: 'image' | 'video' }
type LiveSchedule = { id: string; village: string; scheduled_date: string; title: string; purpose: string }
type LiveContent = { photos: PortalPhoto[]; visits: PortalPhoto[]; posts: PortalPhoto[]; schedules: LiveSchedule[] }

async function fetchLiveContent(): Promise<LiveContent> {
  const response = await fetch('/api/public-content', { cache: 'no-store' })
  if (!response.ok) throw new Error('Unable to load public content')
  const payload = await response.json() as { records: Array<{ category: string; village: string; description: string; created_at: string; title: string; imageUrl: string | null; mediaType?: 'image' | 'video' }>; schedules: LiveSchedule[] }
  const records = payload.records
  const toPhoto = (record: (typeof records)[number]): PortalPhoto => ({ src: record.imageUrl ?? campaignBanner, alt: record.title, village: record.village || 'నార్పల', date: new Intl.DateTimeFormat('te-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(record.created_at)), title: record.title, mediaType: record.mediaType ?? 'image', purpose: record.category === 'visit_photos' ? 'ప్రజలతో ముఖాముఖి' : 'ప్రజా సమాచారం', detail: record.description.split('\n').slice(1).filter((line) => !line.startsWith('స్టోరేజ్:')).join(' ') || 'ప్రజల కోసం తాజా సమాచారం.' })
  const photoRecords = records.filter((record) => record.category === 'visit_photos').map(toPhoto)
  const announcementRecords = records.filter((record) => record.category === 'announcement').map(toPhoto)
  return { photos: photoRecords, visits: [...photoRecords, ...announcementRecords].slice(0, 6), posts: announcementRecords, schedules: payload.schedules ?? [] }
}

const photos = [
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-10-30%20at%2010.22.58%20AM-hh6cybeJo5z92mOvt9xbDOJdPHlxJ8.jpeg', alt: 'గ్రామ ప్రజల సమావేశం', village: 'నార్పల', date: '30 అక్టోబర్ 2026' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-10-30%20at%2010.22.57%20AM%20%282%29-GSAUEaSlSXqiGGhdoObh2HbkrGDDCf.jpeg', alt: 'సేవా కార్యక్రమం', village: 'నార్పల', date: '26 అక్టోబర్ 2026' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-10-30%20at%2010.22.57%20AM%20%281%29-Iu0xiOrwanaqSq0v0UwcUXh5ordne5.jpeg', alt: 'ప్రజలతో ముఖాముఖి', village: 'నార్పల', date: '28 అక్టోబర్ 2026' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-10-30%20at%2010.22.57%20AM-Zn32yL3KbQockpECpUhQEcUiWh2Ye8.jpeg', alt: 'ప్రజా సమాచారం పోస్టర్', village: 'నార్పల', date: '30 అక్టోబర్ 2026' },
]

const visits = [
  { village: 'నార్పల', date: '30 అక్టోబర్ 2026', title: 'ప్రజలతో ఆత్మీయ సమావేశం', purpose: 'గ్రామ సమస్యలు తెలుసుకోవడం', detail: 'నీరు, వీధి లైట్లు, రహదారి గురించి ప్రజలతో మాట్లాడి సూచనలు నమోదు చేశాం.', image: photos[0].src },
  { village: 'నార్పల', date: '28 అక్టోబర్ 2026', title: 'కుటుంబాలతో ముఖాముఖి', purpose: 'ప్రతి ఇంటి మాట వినడం', detail: 'ప్రభుత్వ పథకాలు, పింఛన్లు, విద్యా సహాయం గురించి కుటుంబాలతో చర్చించాం.', image: photos[2].src },
  { village: 'నార్పల', date: '26 అక్టోబర్ 2026', title: 'సేవా కార్యక్రమం', purpose: 'సమాచారం మరియు సహాయం', detail: 'ప్రజా సేవా కార్యక్రమంలో భాగంగా అవసరమైన కుటుంబాలకు మార్గదర్శకం ఇచ్చాం.', image: photos[1].src },
]

const priorities = [
  ['తాగునీరు', 'ప్రతి గ్రామానికి స్వచ్ఛమైన తాగునీరు'],
  ['రోడ్లు & రవాణా', 'సురక్షితమైన రహదారులు, మెరుగైన అనుసంధానం'],
  ['విద్య & వైద్యం', 'ప్రతి కుటుంబానికి మౌలిక సేవల సమాచారం'],
  ['విద్యుత్ & లైట్లు', 'ప్రతి వీధికి వెలుగు, ప్రతి ఇంటికి భరోసా'],
]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45 }}>{children}</motion.div>
}

export default function PublicPortal() {
  const [dark, setDark] = useState(false)
  const [english, setEnglish] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: liveContent } = useSWR<LiveContent>('public-content', fetchLiveContent, { refreshInterval: 30000, revalidateOnFocus: true })
  const [selectedPhoto, setSelectedPhoto] = useState<PortalPhoto | null>(null)
  const [selectedVisit, setSelectedVisit] = useState<PortalPhoto | (typeof visits)[number] | null>(null)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const [monthOffset, setMonthOffset] = useState(0)
  const [selectedDate, setSelectedDate] = useState(tomorrow.toISOString().slice(0, 10))
  const [postSent, setPostSent] = useState(false)
  const [galleryFilter, setGalleryFilter] = useState('అన్ని గ్రామాలు')
  const calendarDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth() + monthOffset, 1)
  const month = new Intl.DateTimeFormat(english ? 'en-US' : 'te-IN', { month: 'long', year: 'numeric' }).format(calendarDate)
  const daysInMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate()
  const firstWeekday = calendarDate.getDay()
  const scheduleByDate = new Map((liveContent?.schedules ?? []).map((schedule) => [schedule.scheduled_date, schedule]))
  const selectedSchedule = scheduleByDate.get(selectedDate)
  const displayPhotos = liveContent?.photos.length ? liveContent.photos : photos
  const displayPosts = liveContent?.posts ?? []
  const filteredPhotos = useMemo(() => galleryFilter === 'అన్ని గ్రామాలు' ? displayPhotos : displayPhotos.filter((photo) => photo.village === galleryFilter), [displayPhotos, galleryFilter])
  const t = english ? { nav: ['Home', 'Candidate', 'Announcements', 'Information', 'Gallery', 'Meetings', 'Contact'], heroKicker: 'PUBLIC INFORMATION PORTAL', heroTitle: 'Your village. Your voice. Our responsibility.', heroBody: 'Simple, direct and verified information for every family in Narpala constituency.', visits: 'Village visits', gallery: 'Photo gallery', calendar: 'Tomorrow’s plan', issue: 'Share an issue', post: 'Post an update' } : { nav: ['హోమ్', 'అభ్యర్థి వివరాలు', 'ప్రజల కోసం చిన్న వార్తలు', 'ప్రజా సమాచారం', 'ఫోటో గ్యాలరీ', 'సమావేశాలు', 'సంప్రదించండి'], heroKicker: 'మన గ్రామం · ప్రజా సమాచారం', heroTitle: 'మీ గ్రామం. మీ మాట. మన బాధ్యత.', heroBody: 'నార్పల పరిధిలోని ప్రతి కుటుంబానికి సులభమైన భాషలో, నిజమైన ప్రజా సమాచారం.', visits: 'వెళ్లిన చోటు చిత్రాలు', gallery: 'ఫోటో గ్యాలరీ', calendar: 'రేపటి ప్రయాణం', issue: 'సమస్య చెప్ప���డి', post: 'ప్రకటన పంపండి' }

  return <main className={`portal ${dark ? 'portal-dark' : ''}`}>
    <div className="portal-ticker"><span><ShieldCheck size={14} /> {english ? 'Verified public information' : 'ధృవీకరించిన ప్రజా సమాచారం'}</span><span>{english ? 'Latest update: 30 October 2026' : 'చివరి నవీకరణ: 30 అక్టోబర్ 2026'}</span><a href="/post">{english ? 'Need help?' : 'సహాయం కావాలా?'} <ArrowRight size={14} /></a></div>
    <header className="portal-header"><a href="#home" className="portal-brand"><span className="fan-mark"><img src={campaignLogo} alt="ఫ్యాన్ ప్రచార లోగో" /></span><span><strong>మన గ్రామం</strong><small>MANA GRAMAM · NAARPALA</small></span></a><nav className={menuOpen ? 'portal-nav open' : 'portal-nav'}>{t.nav.map((label, index) => <a href={['#home', '#candidate', '#posts', '#information', '#gallery', '#meetings', '/post'][index]} key={label} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav><div className="portal-actions"><button onClick={() => setEnglish(!english)} aria-label="Change language"><Languages size={16} /> {english ? 'తెలుగు' : 'EN'}</button><button onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={16} /> : <Moon size={16} />}</button><a href={whatsappLink} target="_blank" rel="noreferrer" className="portal-whatsapp"><MessageCircle size={15} /> <span>WhatsApp</span></a><a href="/post" className="portal-admin-link">{english ? 'Publish' : 'ప్రకటన పంపండి'}</a><button className="portal-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X /> : <Menu />}</button></div></header>

    <section className="support-ribbon"><span className="support-message">నేను శివానంద రెడ్డికి మద్దతు ఇస్తున్నాను.</span><a className="support-prompt" href={supportLink} target="_blank" rel="noreferrer"><strong>మరి మీరు ఇస్తారా?</strong><ArrowRight size={17} /></a></section>

    <section className="portal-hero" id="home"><div className="hero-watermark"><img src={campaignLogo} alt="" /></div><div className="hero-copy"><span className="portal-kicker">{t.heroKicker}</span><h1>{t.heroTitle}</h1><p>{t.heroBody}</p><div className="hero-buttons"><a className="portal-button primary" href="#candidate">{english ? 'View candidate' : 'అభ్యర్థి వివరాలు'} <ArrowRight size={16} /></a><a className="portal-button text" href="/post">{t.post} <ArrowRight size={16} /></a></div><div className="hero-trust"><span><CheckCircle2 size={16} /> {english ? 'Open information' : 'అందరికీ అందుబాటు'}</span><span><Users size={16} /> {english ? 'Village-first' : 'గ్రామాల కోసం'}</span></div></div><div className="hero-portrait"><div className="portrait-frame banner-frame"><img src={campaignBanner} alt="మన గ్రామం ప్రచార బ్యానర్ — ఇద్దరు ప్రజా ప్రతినిధులు మరియు ఫ్యాన్ చిహ్నం" /></div><div className="portrait-caption"><MapPin size={15} /><span>నార్పల · అనంతపురం జిల్లా</span></div></div></section>

    <section className="portal-strip"><div><span className="strip-icon"><FileText size={18} /></span><div><small>{english ? 'PUBLIC NOTICE' : 'ప్రజా ప్రకటన'}</small><strong>{english ? 'Village-wise public meetings are now being published.' : 'గ్రామాల వారీగా ప్రజా సమావేశాల సమాచారం విడుదలైంది.'}</strong></div></div><a href="#meetings">{english ? 'See schedule' : 'షెడ్యూల్ చూడండి'} <ArrowRight size={15} /></a></section>

    <Reveal><section className="portal-section profile-section" id="candidate"><div className="section-intro"><span className="portal-kicker">{english ? 'CANDIDATE INFORMATION' : 'అభ్యర్థి సమాచారం'}</span><h2>{english ? 'A public profile, not a promise.' : 'ప్రజల కోసం స్పష్టమైన సమాచారం.'}</h2><p>{english ? 'Learn who is visiting your village, what was discussed and where to share your concern.' : 'ఎవరు వస్తున్నారు, ఏం మాట్లాడారు, మీ సమస్య ఎక్కడ చెప్పాలి — అన్నీ ఒకచోట తెలుసుకోండి.'}</p></div><div className="profile-card"><div className="profile-banner"><img src={campaignBanner} alt="మన గ్రామం నీలం మరియు తెలుపు ప్రచార బ్యానర్" /></div><div className="profile-avatar"><img src={campaignLogo} alt="ఫ్యాన్ ప్రచార లోగో" /></div><div><span className="verified"><CheckCircle2 size={15} /> {english ? 'Verified profile' : 'ధృవీకరించిన ప్రొఫైల్'}</span><h3>{english ? 'Mana Gramam public representative' : 'మన గ్రామం ప్రజా ప్రతినిధి'}</h3><p>{english ? 'Narpala ZPTC area · Public information and village visits' : 'నార్పల జెడ్‌పిటిసి పరిధి · ప్రజా సమాచారం మరియు గ్రామ ప్రకటనలు'}</p></div><a className="small-arrow" href="/post"><ArrowRight size={18} /></a></div></section></Reveal>

    <Reveal><section className="portal-section" id="information"><div className="section-heading-row"><div className="section-intro"><span className="portal-kicker">{english ? 'PUBLIC PRIORITIES' : 'ప్రజా సమాచారం'}</span><h2>{english ? 'What matters in every village.' : 'ప్రతి గ్రామానికి అవసరమైనవి.'}</h2></div><a className="view-all" href="/post">{english ? 'Publish an update' : 'ప్రకటన పంపండి'} <ArrowRight size={15} /></a></div><div className="info-grid">{priorities.map(([title, text], index) => <article className="info-card" key={title}><span className="info-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p><span className="status-pill">{index === 2 ? 'ప్రాధాన్యత' : 'ప్రతిపాదితం'}</span></article>)}</div></section></Reveal>

    <Reveal><section className="portal-section posts-section" id="posts"><div className="section-heading-row"><div className="section-intro"><span className="portal-kicker">తక్షణ ప్రచురణ</span><h2>ప్రజల కోసం చిన్న వార్తలు</h2><p>తాజా ప్రకటనలను పక్కకు స్వైప్ చేసి చూడండి.</p></div><a className="view-all" href="/post">ప్రకటన పంపండి <ArrowRight size={15} /></a></div><div className="post-card-slider">{displayPosts.map((post, index) => <button className="post-card" key={`${post.title}-${post.date}-${index}`} onClick={() => setSelectedVisit(post)}><div className="post-card-media"><span className={`media-type-badge ${post.mediaType === 'video' ? 'video-badge' : 'photo-badge'}`}>{post.mediaType === 'video' ? 'వీడియో' : 'ఫోటో'}</span>{post.mediaType === 'video' ? <video src={post.src} muted playsInline preload="metadata" /> : <img src={post.src} alt="" />}</div><div className="post-card-copy"><small>{post.date} · {post.village}</small><h3>{post.title}</h3><p>{post.detail}</p></div><ArrowRight size={18} /></button>)}</div>{displayPosts.length === 0 && <div className="empty-posts">ఇంకా తాజా వార్తలు లేవు. మొదటి ప్రకటనను మీరు పంపండి.</div>}</section></Reveal>


    <Reveal><section className="portal-section gallery-section-new" id="gallery"><div className="section-heading-row"><div className="section-intro"><span className="portal-kicker">{english ? 'FROM THE FIELD' : 'గ్రామాల నుంచి'}</span><h2>{t.gallery}</h2></div><div className="filter-pills">{['అన్ని గ్రామాలు', 'నార్పల'].map((filter) => <button className={galleryFilter === filter ? 'active' : ''} onClick={() => setGalleryFilter(filter)} key={filter}>{filter}</button>)}</div></div><div className="editorial-gallery">{filteredPhotos.map((photo, index) => <button key={`${photo.src}-${photo.village}-${photo.date}-${index}`} className={`gallery-photo photo-${index + 1}`} onClick={() => setSelectedPhoto(photo)}><span className="gallery-media-wrap">{'mediaType' in photo && photo.mediaType === 'video' && <span className="gallery-video-badge">వీడియో</span>}{'mediaType' in photo && photo.mediaType === 'video' ? <video src={photo.src} muted playsInline preload="metadata" aria-label={photo.alt} /> : <img src={photo.src} alt={photo.alt} />}</span><span>{photo.village} · {photo.date}</span></button>)}</div></section></Reveal>

    <Reveal><section className="portal-section calendar-section" id="meetings"><div className="section-intro"><span className="portal-kicker">{english ? 'SCHEDULE' : 'క్యాలెండర్'}</span><h2>{t.calendar}</h2><p>{english ? 'See where the team is going tomorrow and plan your visit.' : 'మనం రేపు ఎక్కడికి వెళ్తాం?'}</p></div><div className="calendar-layout"><div className="calendar-card"><div className="calendar-top"><button onClick={() => setMonthOffset(monthOffset - 1)} aria-label="మునుపటి నెల"><ChevronLeft /></button><strong>{month}</strong><button onClick={() => setMonthOffset(monthOffset + 1)} aria-label="తదుపరి నెల"><ChevronRight /></button></div><div className="weekday-row">{(english ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని']).map((day) => <span key={day}>{day}</span>)}</div><div className="day-grid">{Array.from({ length: firstWeekday }, (_, index) => <span className="calendar-empty" key={`empty-${index}`} />)}{Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => { const isoDate = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; const hasEvent = scheduleByDate.has(isoDate); return <button className={`${hasEvent ? 'has-event' : ''} ${selectedDate === isoDate ? 'selected' : ''}`} onClick={() => setSelectedDate(isoDate)} key={isoDate}>{day}{hasEvent && <i />}</button> })}</div></div><div className={`event-panel ${selectedSchedule ? 'has-schedule' : ''}`}><span className="event-badge">{selectedSchedule ? 'సమావేశం' : 'షెడ్యూల్ లేదు'}</span><h3>గ్రామం: {selectedSchedule?.village ?? '—'}</h3><p>తేదీ: {new Intl.DateTimeFormat('te-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${selectedDate}T12:00:00`))}</p>{selectedSchedule && <strong>{selectedSchedule.title}</strong>}</div></div></section></Reveal>

    

    <footer className="portal-footer"><div className="portal-brand"><span className="fan-mark"><img src={campaignLogo} alt="ఫ్యాన్ ప్రచార లోగో" /></span><span><strong>మన గ్రామం</strong><small>MANA GRAMAM · NAARPALA</small></span></div><p>ప్రజలతో కలిసి, ప్రజల కోసం.<br />మన గ్రామం — మన బాధ్యత.</p><div className="footer-social-links"><a href={facebookLink} target="_blank" rel="noreferrer"><span className="facebook-icon" aria-hidden="true">f</span> మరిన్ని అప్డేట్స్ కోసం Facebook చూడండి</a><a className="footer-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a></div></footer>
    {selectedPhoto && <div className="portal-modal" onClick={() => setSelectedPhoto(null)}><button onClick={() => setSelectedPhoto(null)} aria-label="Close"><X /></button>{selectedPhoto.mediaType === 'video' ? <video src={selectedPhoto.src} controls autoPlay playsInline aria-label={selectedPhoto.alt} /> : <img src={selectedPhoto.src} alt={selectedPhoto.alt} />}<p>{selectedPhoto.village} · {selectedPhoto.date}</p></div>}
    {selectedVisit && <div className="portal-modal visit-modal-new" onClick={() => setSelectedVisit(null)}><button onClick={() => setSelectedVisit(null)} aria-label="Close"><X /></button><div>{'mediaType' in selectedVisit && selectedVisit.mediaType === 'video' ? <video src={selectedVisit.src} controls autoPlay playsInline aria-label={selectedVisit.title ?? 'ప్రకటన వీడియో'} /> : <img src={'image' in selectedVisit ? selectedVisit.image : selectedVisit.src} alt={selectedVisit.title ?? 'ప్రజా ప్రకటన చిత్రం'} />}<span>{selectedVisit.date} · {selectedVisit.village}</span><h2>{selectedVisit.title}</h2><p>{selectedVisit.detail}</p></div></div>}
  </main>
}
