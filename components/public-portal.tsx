'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { ArrowRight, CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Clock3, FileText, ImagePlus, Languages, MapPin, Menu, MessageCircle, Moon, ShieldCheck, Sun, Users, X } from 'lucide-react'

const campaignBanner = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Airy%20Blue%20Fan%20Banner%20with%20Namaste%20Portraits-oDTKQlwKySm64uFWQxj9NUnTuZVkUe.png'
const campaignLogo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%283%29-SnlYTvEcjqSDMkslDA67c7VrUukXii.jpg'

const photos = [
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-10-30%20at%2010.22.58%20AM-hh6cybeJo5z92mOvt9xbDOJdPHlxJ8.jpeg', alt: 'గ్రామ ప్రజల సమావేశం', village: 'నార్పాల', date: '30 అక్టోబర్ 2026' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-10-30%20at%2010.22.57%20AM%20%282%29-GSAUEaSlSXqiGGhdoObh2HbkrGDDCf.jpeg', alt: 'సేవా కార్యక్రమం', village: 'నార్పాల', date: '26 అక్టోబర్ 2026' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-10-30%20at%2010.22.57%20AM%20%281%29-Iu0xiOrwanaqSq0v0UwcUXh5ordne5.jpeg', alt: 'ప్రజలతో ముఖాముఖి', village: 'నార్పాల', date: '28 అక్టోబర్ 2026' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-10-30%20at%2010.22.57%20AM-Zn32yL3KbQockpECpUhQEcUiWh2Ye8.jpeg', alt: 'ప్రజా సమాచారం పోస్టర్', village: 'నార్పాల', date: '30 అక్టోబర్ 2026' },
]

const visits = [
  { village: 'నార్పాల', date: '30 అక్టోబర్ 2026', title: 'ప్రజలతో ఆత్మీయ సమావేశం', purpose: 'గ్రామ సమస్యలు తెలుసుకోవడం', detail: 'నీరు, వీధి లైట్లు, రహదారి గురించి ప్రజలతో మాట్లాడి సూచనలు నమోదు చేశాం.', image: photos[0].src },
  { village: 'నార్పాల', date: '28 అక్టోబర్ 2026', title: 'కుటుంబాలతో ముఖాముఖి', purpose: 'ప్రతి ఇంటి మాట వినడం', detail: 'ప్రభుత్వ పథకాలు, పింఛన్లు, విద్యా సహాయం గురించి కుటుంబాలతో చర్చించాం.', image: photos[2].src },
  { village: 'నార్పాల', date: '26 అక్టోబర్ 2026', title: 'సేవా కార్యక్రమం', purpose: 'సమాచారం మరియు సహాయం', detail: 'ప్రజా సేవా కార్యక్రమంలో భాగంగా అవసరమైన కుటుంబాలకు మార్గదర్శకం ఇచ్చాం.', image: photos[1].src },
]

const priorities = [
  ['తాగునీరు', 'ప్రతి గ్రామానికి స్వచ్ఛమైన తాగునీరు'],
  ['రోడ్లు & రవాణా', 'సురక్షితమైన రహదారులు, మెరుగైన అనుసంధానం'],
  ['విద్య & వైద్యం', 'ప్రతి కుటుంబానికి మౌలిక సేవల సమాచారం'],
  ['విద్యుత్ & లైట్లు', 'ప్రతి వీధికి వెలుగు, ప్రతి ఇంటికి భరోసా'],
]

const monthDays = Array.from({ length: 30 }, (_, index) => index + 1)

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45 }}>{children}</motion.div>
}

export default function PublicPortal() {
  const [dark, setDark] = useState(false)
  const [english, setEnglish] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[number] | null>(null)
  const [selectedVisit, setSelectedVisit] = useState<(typeof visits)[number] | null>(null)
  const [monthOffset, setMonthOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState(4)
  const [postSent, setPostSent] = useState(false)
  const [galleryFilter, setGalleryFilter] = useState('అన్ని గ్రామాలు')
  const month = monthOffset === 0 ? 'నవంబర్ 2026' : monthOffset < 0 ? 'అక్టోబర్ 2026' : 'డిసెంబర్ 2026'
  const filteredPhotos = useMemo(() => galleryFilter === 'అన్ని గ్రామాలు' ? photos : photos.filter((photo) => photo.village === galleryFilter), [galleryFilter])
  const t = english ? { nav: ['Home', 'Candidate', 'Announcements', 'Information', 'Gallery', 'Meetings', 'Contact'], heroKicker: 'PUBLIC INFORMATION PORTAL', heroTitle: 'Your village. Your voice. Our responsibility.', heroBody: 'Simple, direct and verified information for every family in Narpala constituency.', visits: 'Village visits', gallery: 'Photo gallery', calendar: 'Tomorrow’s plan', issue: 'Share an issue', post: 'Post an update' } : { nav: ['హోమ్', 'అభ్యర్థి వివరాలు', 'ప్రకటనలు', 'ప్రజా సమాచారం', 'ఫోటో గ్యాలరీ', 'సమావేశాలు', 'సంప్రదించండి'], heroKicker: 'మన గ్రామం · ప్రజా సమాచారం', heroTitle: 'మీ గ్రామం. మీ మాట. మన బాధ్యత.', heroBody: 'నార్పాల పరిధిలోని ప్రతి కుటుంబానికి సులభమైన భాషలో, నిజమైన ప్రజా సమాచారం.', visits: 'ప్రకటనలు', gallery: 'ఫోటో గ్యాలరీ', calendar: 'రేపటి ప్రణాళిక', issue: 'సమస్య చెప్పండి', post: 'ప్రకటన పంపండి' }

  return <main className={`portal ${dark ? 'portal-dark' : ''}`}>
    <div className="portal-ticker"><span><ShieldCheck size={14} /> {english ? 'Verified public information' : 'ధృవీకరించిన ప్రజా సమాచారం'}</span><span>{english ? 'Latest update: 30 October 2026' : 'చివరి నవీకరణ: 30 అక్టోబర్ 2026'}</span><a href="/post">{english ? 'Need help?' : 'సహాయం కావాలా?'} <ArrowRight size={14} /></a></div>
    <header className="portal-header"><a href="#home" className="portal-brand"><span className="fan-mark"><img src={campaignLogo} alt="ఫ్యాన్ ప్రచార లోగో" /></span><span><strong>మన గ్రామం</strong><small>MANA GRAMAM · NAARPALA</small></span></a><nav className={menuOpen ? 'portal-nav open' : 'portal-nav'}>{t.nav.map((label, index) => <a href={['#home', '#candidate', '#visits', '#information', '#gallery', '#meetings', '/post'][index]} key={label} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav><div className="portal-actions"><button onClick={() => setEnglish(!english)} aria-label="Change language"><Languages size={16} /> {english ? 'తెలుగు' : 'EN'}</button><button onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={16} /> : <Moon size={16} />}</button><a href="/post" className="portal-admin-link">{english ? 'Publish' : 'ప్రకటన పంపండి'}</a><button className="portal-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X /> : <Menu />}</button></div></header>

    <section className="portal-hero" id="home"><div className="hero-watermark"><img src={campaignLogo} alt="" /></div><div className="hero-copy"><span className="portal-kicker">{t.heroKicker}</span><h1>{t.heroTitle}</h1><p>{t.heroBody}</p><div className="hero-buttons"><a className="portal-button primary" href="#candidate">{english ? 'View candidate' : 'అభ్యర్థి వివరాలు'} <ArrowRight size={16} /></a><a className="portal-button text" href="/post">{t.post} <ArrowRight size={16} /></a></div><div className="hero-trust"><span><CheckCircle2 size={16} /> {english ? 'Open information' : 'అందరికీ అందుబాటు'}</span><span><Users size={16} /> {english ? 'Village-first' : 'గ్రామాల కోసం'}</span></div></div><div className="hero-portrait"><div className="portrait-frame banner-frame"><img src={campaignBanner} alt="మన గ్రామం ప్రచార బ్యానర్ — ఇద్దరు ప్రజా ప్రతినిధులు మరియు ఫ్యాన్ చిహ్నం" /></div><div className="portrait-caption"><MapPin size={15} /><span>నార్పాల · అనంతపురం జిల్లా</span></div></div></section>

    <section className="portal-strip"><div><span className="strip-icon"><FileText size={18} /></span><div><small>{english ? 'PUBLIC NOTICE' : 'ప్రజా ప్రకటన'}</small><strong>{english ? 'Village-wise public meetings are now being published.' : 'గ్రామాల వారీగా ప్రజా సమావేశాల సమాచారం విడుదలైంది.'}</strong></div></div><a href="#meetings">{english ? 'See schedule' : 'షెడ్యూల్ చూడండి'} <ArrowRight size={15} /></a></section>

    <Reveal><section className="portal-section profile-section" id="candidate"><div className="section-intro"><span className="portal-kicker">{english ? 'CANDIDATE INFORMATION' : 'అభ్యర్థి సమాచారం'}</span><h2>{english ? 'A public profile, not a promise.' : 'ప్రజల కోసం స్పష్టమైన సమాచారం.'}</h2><p>{english ? 'Learn who is visiting your village, what was discussed and where to share your concern.' : 'ఎవరు వస్తున్నారు, ఏం మాట్లాడారు, మీ సమస్య ఎక్కడ చెప్పాలి — అన్నీ ఒకచోట తెలుసుకోండి.'}</p></div><div className="profile-card"><div className="profile-banner"><img src={campaignBanner} alt="మన గ్రామం నీలం మరియు తెలుపు ప్రచార బ్యానర్" /></div><div className="profile-avatar"><img src={campaignLogo} alt="ఫ్యాన్ ప్రచార లోగో" /></div><div><span className="verified"><CheckCircle2 size={15} /> {english ? 'Verified profile' : 'ధృవీకరించిన ప్రొఫైల్'}</span><h3>{english ? 'Mana Gramam public representative' : 'మన గ్రామం ప్రజా ప్రతినిధి'}</h3><p>{english ? 'Narpala ZPTC area · Public information and village visits' : 'నార్పాల జెడ్‌పిటిసి పరిధి · ప్రజా సమాచారం మరియు గ్రామ ప్రకటనలు'}</p></div><a className="small-arrow" href="/post"><ArrowRight size={18} /></a></div></section></Reveal>

    <Reveal><section className="portal-section" id="information"><div className="section-heading-row"><div className="section-intro"><span className="portal-kicker">{english ? 'PUBLIC PRIORITIES' : 'ప్రజా సమాచారం'}</span><h2>{english ? 'What matters in every village.' : 'ప్రతి గ్రామానికి అవసరమైనవి.'}</h2></div><a className="view-all" href="/post">{english ? 'Publish an update' : 'ప్రకటన పంపండి'} <ArrowRight size={15} /></a></div><div className="info-grid">{priorities.map(([title, text], index) => <article className="info-card" key={title}><span className="info-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p><span className="status-pill">{index === 2 ? 'ప్రాధాన్యత' : 'ప్రతిపాదితం'}</span></article>)}</div></section></Reveal>

    <Reveal><section className="portal-section visits-section" id="visits"><div className="section-heading-row"><div className="section-intro"><span className="portal-kicker">{english ? 'FIELD NOTES' : 'క్షేత్రంలో'}</span><h2>{t.visits}</h2><p>{english ? 'Every visit has a date, purpose and public note.' : 'ప్రతి ప్రకటనకు తేదీ, ఉద్దేశం, సమాచారం ఉంటుంది.'}</p></div><a className="view-all" href="#gallery">{t.gallery} <ArrowRight size={15} /></a></div><div className="timeline">{visits.map((visit, index) => <button className="timeline-item" key={`${visit.village}-${visit.date}`} onClick={() => setSelectedVisit(visit)}><span className="timeline-dot">0{index + 1}</span><div className="timeline-image"><img src={visit.image} alt={visit.title} /></div><div className="timeline-content"><span>{visit.date} · {visit.village}</span><h3>{visit.title}</h3><p>{visit.purpose}</p><small>{visit.detail}</small></div><ArrowRight className="timeline-arrow" size={20} /></button>)}</div></section></Reveal>

    <Reveal><section className="portal-section gallery-section-new" id="gallery"><div className="section-heading-row"><div className="section-intro"><span className="portal-kicker">{english ? 'FROM THE FIELD' : 'గ్రామాల నుంచి'}</span><h2>{t.gallery}</h2></div><div className="filter-pills">{['అన్ని గ్రామాలు', 'నార్పాల'].map((filter) => <button className={galleryFilter === filter ? 'active' : ''} onClick={() => setGalleryFilter(filter)} key={filter}>{filter}</button>)}</div></div><div className="editorial-gallery">{filteredPhotos.map((photo, index) => <button key={photo.src} className={`gallery-photo photo-${index + 1}`} onClick={() => setSelectedPhoto(photo)}><img src={photo.src} alt={photo.alt} /><span>{photo.village} · {photo.date}</span></button>)}</div></section></Reveal>

    <Reveal><section className="portal-section calendar-section" id="meetings"><div className="section-intro"><span className="portal-kicker">{english ? 'SCHEDULE' : 'క్యాలెండర్'}</span><h2>{t.calendar}</h2><p>{english ? 'See where the team is going tomorrow and plan your visit.' : 'రేపు ఎక్కడికి వెళ్తున్నాం తెలుసుకుని, మీరు కూడా రండి.'}</p></div><div className="calendar-layout"><div className="calendar-card"><div className="calendar-top"><button onClick={() => setMonthOffset(monthOffset - 1)} aria-label="Previous month"><ChevronLeft /></button><strong>{month}</strong><button onClick={() => setMonthOffset(monthOffset + 1)} aria-label="Next month"><ChevronRight /></button></div><div className="weekday-row">{['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'].map((day) => <span key={day}>{day}</span>)}</div><div className="day-grid">{monthDays.map((day) => <button className={`${[4, 8, 12, 18, 24].includes(day) ? 'has-event' : ''} ${selectedDay === day ? 'selected' : ''}`} onClick={() => setSelectedDay(day)} key={day}>{day}{[4, 8, 12, 18, 24].includes(day) && <i />}</button>)}</div></div><div className="event-panel"><span className="event-date"><CalendarDays size={16} /> ఎంచుకున్న తేదీ · {selectedDay} {month}</span><h3>నార్పాల గ్రామ సభ</h3><p>గ్రామ సమస్యలు, పథకాల సమాచారం మరియు ప్రజా ప్రకటనల కోసం సమావేశం.</p><div className="event-meta"><span><Clock3 size={15} /> సాయంత్రం 4:00</span><span><MapPin size={15} /> కమ్యూనిటీ హాల్</span></div><a className="portal-button primary" href="/post">{english ? 'Ask for directions' : 'దార�� వివ���ాలు అడగండి'} <ArrowRight size={15} /></a></div></div></section></Reveal>

    

    <footer className="portal-footer"><div className="portal-brand"><span className="fan-mark"><img src={campaignLogo} alt="ఫ్యాన్ ప్రచార లోగో" /></span><span><strong>మన గ్రామం</strong><small>MANA GRAMAM · NAARPALA</small></span></div><p>ప్రజలతో కలిసి, ప్రజల కోసం.<br />మన గ్రామం — మన బాధ్యత.</p><a href="https://wa.me/919999999999"><MessageCircle size={17} /> WhatsApp</a></footer>
    {selectedPhoto && <div className="portal-modal" onClick={() => setSelectedPhoto(null)}><button onClick={() => setSelectedPhoto(null)} aria-label="Close"><X /></button><img src={selectedPhoto.src} alt={selectedPhoto.alt} /><p>{selectedPhoto.village} · {selectedPhoto.date}</p></div>}
    {selectedVisit && <div className="portal-modal visit-modal-new" onClick={() => setSelectedVisit(null)}><button onClick={() => setSelectedVisit(null)} aria-label="Close"><X /></button><div><img src={selectedVisit.image} alt={selectedVisit.title} /><span>{selectedVisit.date} · {selectedVisit.village}</span><h2>{selectedVisit.title}</h2><p>{selectedVisit.detail}</p></div></div>}
  </main>
}
