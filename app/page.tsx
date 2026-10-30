'use client'

import { useMemo, useState } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleCheck,
  Droplets,
  ExternalLink,
  FileText,
  HeartHandshake,
  Landmark,
  Lightbulb,
  MapPin,
  Menu,
  MessageCircle,
  Play,
  Road,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'

const images = {
  gathering: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-10-30%20at%2010.22.58%20AM-hh6cybeJo5z92mOvt9xbDOJdPHlxJ8.jpeg',
  handover: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-10-30%20at%2010.22.57%20AM%20%282%29-GSAUEaSlSXqiGGhdoObh2HbkrGDDCf.jpeg',
  interaction: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-10-30%20at%2010.22.57%20AM%20%281%29-Iu0xiOrwanaqSq0v0UwcUXh5ordne5.jpeg',
  poster: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-10-30%20at%2010.22.57%20AM-Zn32yL3KbQockpECpUhQEcUiWh2Ye8.jpeg',
}

const priorities = [
  { icon: Droplets, title: 'తాగునీరు', english: 'Drinking Water', text: 'ప్రతి గ్రామానికి స్వచ్ఛమైన తాగునీరు అందించడం', status: 'ప్రతిపాదితం' },
  { icon: Road, title: 'రోడ్లు & రవాణా', english: 'Roads & Transport', text: 'సురక్షితమైన రహదారులు, మెరుగైన అనుసంధానం', status: 'ప్రతిపాదితం' },
  { icon: HeartHandshake, title: 'విద్య & వైద్యం', english: 'Education & Healthcare', text: 'ప్రతి కుటుంబానికి నాణ్యమైన మౌలిక సేవలు', status: 'ప్రాధాన్యత' },
  { icon: Lightbulb, title: 'విద్యుత్ & లైట్లు', english: 'Electricity & Lighting', text: 'ప్రతి వీధికి వెలుగు, ప్రతి ఇంటికి భరోసా', status: 'ప్రతిపాదితం' },
]

const visits = [
  { date: '30 అక్టోబర్ 2026', village: 'కురగానిపల్లి', title: 'ప్రజలతో ఆత్మీయ సమావేశం', text: 'గ్రామ సమస్యలను నేరుగా తెలుసుకుని, పరిష్కారాలపై చర్చించిన రోజు.', image: images.gathering },
  { date: '28 అక్టోబర్ 2026', village: 'నర్పాల', title: 'కుటుంబాలతో ముఖాముఖి', text: 'ప్రతి ఇంటి గడపకు వెళ్లి ప్రజల అభిప్రాయాలు, ఆశయాలు తెలుసుకున్నాం.', image: images.interaction },
  { date: '26 అక్టోబర్ 2026', village: 'గుడివాడ గ్రామం', title: 'సేవా కార్యక్రమం', text: 'స్థానిక కుటుంబాలకు సమాచారం, సహాయం అందించిన కార్యక్రమం.', image: images.handover },
]

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="section-heading"><span>{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState<'te' | 'en'>('te')
  const [darkMode, setDarkMode] = useState(false)
  const [issueSent, setIssueSent] = useState(false)
  const [postSent, setPostSent] = useState(false)
  const [selectedVisit, setSelectedVisit] = useState<(typeof visits)[number] | null>(null)
  const [adminOpen, setAdminOpen] = useState(false)
  const [posterOpen, setPosterOpen] = useState(false)
  const [issueError, setIssueError] = useState('')

  const navItems = useMemo(() => language === 'te' ? ['ప్రస్థానం', 'మన గ్రామ పర్యటనలు', 'ప్రాధాన్యతలు', 'పథకాలు', 'రేపటి ప్రణాళిక', 'ప్రకటన పంపండి'] : ['Home', 'Village visits', 'Priorities', 'Schemes', 'Tomorrow', 'Post update'], [language])
  const navTargets = ['#top', '#visits', '#priorities', '#schemes', '#meetings', '#post']
  const copy = language === 'te' ? { announcement: 'అధికారిక ప్రజా సమాచారం', tagline: 'మీ గ్రామం — మీ మాట — మన బాధ్యత', issue: 'సమస్యను తెలియజేయండి', dark: 'డార్క్ మోడ్', light: 'లైట్ మోడ్' } : { announcement: 'Official public information', tagline: 'Your village — your voice — our responsibility', issue: 'Share an issue', dark: 'Dark mode', light: 'Light mode' }

  return <main className={darkMode ? 'dark-mode' : ''}><div className="fan-watermark" aria-hidden="true"><span>FAN</span><span>FAN</span><span>FAN</span><span>FAN</span><span>FAN</span></div>
    <div className="announcement"><span><Sparkles size={14} /> {copy.announcement}</span><span className="announcement-copy">{copy.tagline}</span><a href="#issues">{copy.issue} <ArrowUpRight size={14} /></a></div>
    <header className="site-header">
      <a href="#top" className="brand"><span className="brand-mark"><Landmark size={22} /></span><span><b>మన గ్రామం</b><small>MANA GRAMAM</small></span></a>
      <nav className={menuOpen ? 'nav open' : 'nav'}>{navItems.map((item, index) => <a href={navTargets[index]} key={item} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>
      <div className="header-actions"><button className="language" onClick={() => setLanguage(language === 'te' ? 'en' : 'te')}>{language === 'te' ? 'EN' : 'తెలుగు'}</button><button className="theme-toggle" aria-label={darkMode ? copy.light : copy.dark} onClick={() => setDarkMode(!darkMode)}>{darkMode ? 'Light' : 'Dark'}</button><a href="/admin" className="admin-link">Post / Schedule</a><a href="https://wa.me/919999999999" className="whatsapp-pill"><MessageCircle size={17} /> WhatsApp</a><button className="menu-button" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
    </header>

    <section className="hero" id="top">
      <div className="hero-content"><div className="eyebrow"><span className="eyebrow-line" /> మీ కోసం — మీతో కలిసి</div><h1>ప్రజల కోసం<br /><em>నిరంతరం</em> నడిచే<br />ప్రయాణం.</h1><p>మీ గ్రామం అభివృద్ధి, మీ కుటుంబ సంక్షేమం — ఇదే మా లక్ష్యం. మీ మాట వినడానికి, మీతో కలిసి పనిచేయడానికి మేము ఎల్లప్పుడూ సిద్ధం.</p><div className="hero-buttons"><a className="button primary" href="#about">మా గురించి <ArrowUpRight size={17} /></a><a className="button quiet" href="#visits"><Play size={15} fill="currentColor" /> మా పర్యటనలు చూడండి</a></div><div className="trust-row"><div><ShieldCheck size={18} /><span>ప్రజలతో<br /><b>నిజాయితీగా</b></span></div><div><Users size={18} /><span>గ్రామాల కోసం<br /><b>అంకితభావంతో</b></span></div></div></div>
      <div className="hero-visual"><div className="hero-image-wrap"><img src={images.poster} alt="ప్రజా సేవా ప్రచార పోస్టర్" /><div className="hero-stamp"><CircleCheck size={21} /><span>ప్రజా సేవలో<br /><b>నిరంతరం</b></span></div></div><div className="hero-location"><MapPin size={15} /><span>కురగానిపల్లి · అనంతపురం జిల్లా</span></div></div>
      <div className="hero-bottom"><span>మన గ్రామం · మన అభివృద్ధి · మన భవిష్యత్తు</span><span className="scroll">కిందికి స్క్రోల్ <ChevronRight size={15} /></span></div>
    </section>

    <section className="notice-bar"><div className="notice-icon"><FileText size={19} /></div><div><small>అధికారిక ప్రకటన · 30 అక్టోబర్ 2026</small><p>ప్రజల సమస్యల పరిష్కారానికి గ్రామాల వారీగా ముఖాముఖి సమావేశాలు ప్రారంభం</p></div><a href="#meetings">వివరాలు చూడండి <ArrowUpRight size={15} /></a></section>

    <section className="intro section" id="about"><div className="intro-quote">“</div><div className="intro-copy"><span className="label">మీ ప��రతినిధి</span><h2>ప్రతి గడపకు వెళ్లి,<br /><span>ప్రతి మాట వింటాం.</span></h2><p>కురగానిపల్లి జెడ్‌పిటిసి పరిధిలోని ప్రతి గ్రామంలో ప్రజలతో కలిసి పనిచేయడమే మా సంకల్పం. సమస్యలను తెలుసుకుని, పరిష్కార మార్గాలను చూపిస్తూ — పారదర్శకత, అందుబాటు, అభివృద్ధి అనే మూడు స్తంభాలపై మా ప్రజా సేవా ప్రయాణం సాగుతుంది.</p><a className="text-link" href="#profile">పూర్తి ప్రొఫైల్ చూడండి <ArrowUpRight size={15} /></a></div><div className="intro-stats"><div><b>12+</b><span>గ్రామాలు</span></div><div><b>1,240</b><span>కుటుంబాలతో సంభాషణ</span></div><div><b>100%</b><span>ప్రజలకు అందుబాటు</span></div></div></section>

    <section className="section priorities" id="priorities"><SectionHeading eyebrow="మా దృష్టి" title="ప్రజా అభివృద్ధి ప్రాధాన్యతలు" description="ప్రతి గ్రామం ముందుకు సాగేందుకు అవసరమైన పనులపై మా స్పష్టమైన దృష్టి." /><div className="priority-grid">{priorities.map(({ icon: Icon, title, english, text, status }) => <article className="priority-card" key={title}><div className="priority-icon"><Icon size={23} /></div><span className="status">{status}</span><h3>{title}</h3><small>{english}</small><p>{text}</p><a href="#issues">మీ అభిప్రాయం <ArrowUpRight size={14} /></a></article>)}</div></section>

    <section className="section visits" id="visits"><div className="section-row"><SectionHeading eyebrow="క్షేత్రంలో" title="మన గ్రామ పర్యటనలు" description="ప్రజలతో నేరుగా కలుసుకుంటూ, వారి ఆశయాలను తెలుసుకుంటూ." /><a className="outline-button" href="#gallery">అన్ని పర్యటనలు <ArrowUpRight size={15} /></a></div><div className="visit-grid">{visits.map((visit, index) => <article className={index === 0 ? 'visit-card featured' : 'visit-card'} key={visit.title} onClick={() => setSelectedVisit(visit)}><div className="visit-image"><img src={visit.image} alt={visit.title} /><span className="visit-number">0{index + 1}</span></div><div className="visit-body"><small>{visit.date} · {visit.village}</small><h3>{visit.title}</h3><p>{visit.text}</p><span className="read-more">వివరాలు <ArrowUpRight size={14} /></span></div></article>)}</div></section>

    <section className="gallery-section section" id="gallery"><div className="gallery-heading"><SectionHeading eyebrow="నిన్నటి జ్ఞాపకాలు" title="ప్రజలతో కలిసి — చిత్రాల్లో" /><a className="outline-button light" href="#gallery">గ్యాలరీ చూడండి <ArrowUpRight size={15} /></a></div><div className="gallery-grid"><img className="gallery-large" src={images.gathering} alt="గ్రామ ప్రజల సమావేశం" /><img src={images.interaction} alt="ప్రజలతో సంభాషణ" /><div className="gallery-stack"><img src={images.handover} alt="సమాజ సేవా కార్యక్రమం" /><div className="gallery-more"><img src={images.poster} alt="" /><span>+ 24<br /><small>మరిన్ని చిత్రాలు</small></span></div></div></div></section>

    <section className="section meetings" id="meetings"><SectionHeading eyebrow="మీ క్యాలెండర్‌లో" title="రాబోయే ప్రజా సమావేశాలు" description="మీ గ్రామంలో మిమ్మల్ని కలుసుకునేందుకు మా తదుపరి కార్యక్రమాలు." /><div className="meeting-list"><article className="meeting featured-meeting"><div className="date-box"><b>04</b><span>నవం<br />2026</span></div><div className="meeting-info"><span className="meeting-tag">తదుపరి సమావేశం</span><h3>కురగానిపల్లి గ్రామ సభ</h3><p><MapPin size={15} /> కమ్యూనిటీ హాల్, కురగానిపల్లి <span>·</span> <CalendarDays size={15} /> సాయంత్రం 4:00 గంటలకు</p></div><a href="#meetings" className="round-arrow" aria-label="సమావేశ వివరాలు"><ArrowUpRight /></a></article><article className="meeting"><div className="date-box muted"><b>08</b><span>నవం<br />2026</span></div><div className="meeting-info"><span className="meeting-tag">ప్రజా వినతుల దినం</span><h3>నర్పాల మండల కార్యాలయం</h3><p><MapPin size={15} /> మండల పరిషత్ కార్యాలయం <span>·</span> <CalendarDays size={15} /> ఉదయం 10:00 గంటలకు</p></div><a href="#meetings" className="round-arrow" aria-label="సమావేశ వివరాలు"><ArrowUpRight /></a></article></div></section>

    <section className="section citizen-hub" id="schemes"><SectionHeading eyebrow="మీ కోసం సులభమైన సమాచారం" title="ప్రభుత్వ పథకాలు — మీ హక్కులు" description="చదువు తక్కువగా ఉన్నా సులభంగా అర్థమయ్యేలా ప్రతి పథకాన్ని చిన్న మాటల్లో తెలుసుకోండి." /><div className="priority-grid"><article className="priority-card"><div className="priority-icon"><HeartHandshake size={23} /></div><span className="status">వృద్ధులు</span><h3>వృద్ధాప్య పింఛన్</h3><p>అర్హత ఉంటే ప్రతి నెల ఆర్థిక సహాయం. దరఖాస్తు ఎలా చేయాలో మా బృందం చెబుతుంది.</p><a href="#issues">సహాయం అడగండి <ArrowUpRight size={14} /></a></article><article className="priority-card"><div className="priority-icon"><FileText size={23} /></div><span className="status">విద్య���ర్థులు</span><h3>చదువు సహాయం</h3><p>స్కాలర్‌షిప్, పుస్తకాలు, ఫీజు సహాయం గురించి మీకు కావాల్సిన సమాచారం ఒకచోట.</p><a href="#issues">సమాచారం అడగండి <ArrowUpRight size={14} /></a></article><article className="priority-card"><div className="priority-icon"><Users size={23} /></div><span className="status">మహిళలు</span><h3>మహిళా బృందాలు</h3><p>స్వయం సహాయక బృందాల్లో చేరి పొదుపు, చిన్న వ్యాపారం మొదలుపెట్టే మార్గాలు.</p><a href="#issues">మాట్లాడండి <ArrowUpRight size={14} /></a></article><article className="priority-card"><div className="priority-icon"><Droplets size={23} /></div><span className="status">రైతులు</span><h3>రైతు భరోసా</h3><p>నీరు, విత్తనాలు, పంట సహాయం వంటి విషయాలపై గ్రామస్థాయిలో మార్గదర్శకం.</p><a href="#issues">సహాయం అడగండి <ArrowUpRight size={14} /></a></article></div></section>

    <section className="section post-section" id="post"><div className="post-card"><div><span className="label">ప్రజల భాగస్వామ్యం</span><h2>{language === 'te' ? 'మీ గ్రామ వార్తను పంచుకోండి.' : 'Share a village update.'}</h2><p>{language === 'te' ? 'సేవా కార్యక్రమం, సమస్య, సూచన లేదా మంచి వార్తను అందరికీ తెలియజేయండి.' : 'Share a service activity, issue, suggestion, or good news with everyone.'}</p></div>{postSent ? <div className="success-message compact"><CircleCheck size={32} /><h3>{language === 'te' ? 'ధన్యవాదాలు — మీ సమాచారం వచ్చింది.' : 'Thank you — your update was received.'}</h3><button className="button quiet" type="button" onClick={() => setPostSent(false)}>{language === 'te' ? 'మరొకటి పంపండి' : 'Post another'}</button></div> : <form className="post-form" onSubmit={async (event) => { event.preventDefault(); const form = event.currentTarget; const values = new FormData(form); const { error } = await (getSupabaseBrowserClient() as any).from('public_issues').insert({ village: 'నర్పాల', category: 'public_post', description: String(values.get('post_body')), contact_name: 'ప్రజా పోస్ట్' }); if (!error) { setPostSent(true); form.reset() } }}><textarea name="post_body" aria-label="మీ సమాచారం" placeholder={language === 'te' ? 'ఇక్కడ రాయండి...' : 'Write here...'} required /><button className="button primary" type="submit"><Send size={15} /> {language === 'te' ? 'పంపండి' : 'Post update'}</button></form>}</div></section>

    <section className="issue-section" id="issues"><div><span className="label">మీ మాట ముఖ్యం</span><h2>మీ గ్రామ సమస్యను<br /><em>మాకు తెలియజేయండి.</em></h2><p>మీ సమస్యను నేరుగా మా దృష్టికి తీసుకురండి. మీ వివరాలు గోప్యంగా ఉంచబడతాయి.</p><div className="issue-points"><span><CheckCircle2 size={16} /> సురక్షితమైన ఫారం</span><span><CheckCircle2 size={16} /> త్వరిత స్పందన</span></div></div><form onSubmit={async (event) => { event.preventDefault(); setIssueError(''); const form = event.currentTarget; const values = new FormData(form); const { error } = await (getSupabaseBrowserClient() as any).from('public_issues').insert({ village: String(values.get('village')), category: 'general', description: String(values.get('description')), contact_name: 'ప్రజా వినతి' }); if (error) { setIssueError('సమస్య పంపబడలేదు. దయచేసి మళ్లీ ప్రయత్నించండి.'); return } setIssueSent(true); form.reset() }} className="issue-form">{issueSent ? <div className="success-message"><CircleCheck size={42} /><h3>మీ సమస్య అందింది</h3><p>మా బృందం త్వరలో మిమ్మల్ని సంప్రదిస్తుంది. ధన్యవాదాలు.</p><button className="button primary" type="button" onClick={() => setIssueSent(false)}>మరొక సమస్య తెలియజేయండి</button></div> : <><label>గ్రామం <input name="village" required placeholder="మీ గ్రామం పేరు" /></label><label>మీ సమస్య <textarea name="description" required placeholder="మీ సమస్యను వివరంగా రాయండి..." /></label><div className="form-row"><label>మీ పేరు <input name="contact_name" placeholder="పేరు (ఐచ్ఛికం)" /></label><label>ఫోన్ నంబర్ <input name="contact_phone" inputMode="tel" placeholder="ఫోన్ (ఐచ్ఛికం)" /></label></div>{issueError && <p className="form-error" role="alert">{issueError}</p>}<label className="consent"><input type="checkbox" required /> మీ వివరాల��ు సంప్రదింపుల కోసం ఉపయోగించవచ్చని అంగీకరిస్తున్నాను.</label><button className="button primary" type="submit">సమస్యను పంపండి <Send size={16} /></button></>}</form></section>

    <footer className="footer"><div className="footer-main"><div className="brand footer-brand"><span className="brand-mark"><Landmark size={22} /></span><span><b>మన గ్రామం</b><small>MANA GRAMAM</small></span></div><p>ప్రజలతో కలిసి, ప్రజల కోసం.<br />మన గ్రామం — మన బాధ్యత.</p><a href="https://wa.me/919999999999" className="whatsapp-pill"><MessageCircle size={17} /> WhatsAppలో సంప్రదించండి</a></div><div className="footer-bottom"><span>© 2026 మన గ్రామం · అధికారిక ప్రజా సమాచారం</span><div><a href="#top">గోప్యతా విధానం</a><a href="#top">వెబ్‌సైట్ గురించి</a><span className="socials"><span aria-label="Facebook">f</span><span aria-label="Instagram">◎</span><span aria-label="YouTube">▶</span></span></div></div></footer>

    {selectedVisit && <div className="modal-backdrop" onClick={() => setSelectedVisit(null)}><div className="visit-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedVisit(null)}><X /></button><img src={selectedVisit.image} alt={selectedVisit.title} /><div><small>{selectedVisit.date} · {selectedVisit.village}</small><h2>{selectedVisit.title}</h2><p>{selectedVisit.text}</p><a className="text-link" href="#issues">ఈ గ్రామ సమస్యను తెలియజేయండి <ArrowUpRight size={15} /></a></div></div></div>}

  </main>
}
