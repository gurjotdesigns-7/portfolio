import { useEffect, useMemo, useRef, useState } from 'react'
import photoCardThumb from '../assets/photography/IMG_2503.jpeg'

/* ─── Splash screen ──────────────────────────────────
   45 sticky notes fall once on first load per session.
   sessionStorage key 'splashShown' prevents replay.
────────────────────────────────────────────────────── */
const _SC = ['#FFF3B0', '#E8D5FF', '#FFD6D6']
const _SL = [
  'Retention','Onboarding','Revenue','Brainstorming',
  'Collaboration','Focus Mode','Activation','Growth',
  'Trust','Monetisation','Conversion','Iteration','Systems','Craft',
]
const _SD = [
  // image placeholder: box + X
  ['M8 14 L92 14 L92 86 L8 86 Z', 'M8 14 L92 86', 'M92 14 L8 86'],
  // three text placeholder lines
  ['M10 28 L88 32', 'M10 46 L90 44', 'M10 64 L74 67'],
  // rounded button + label inside
  ['M20 28 Q20 18 34 18 L66 18 Q80 18 80 28 L80 72 Q80 82 66 82 L34 82 Q20 82 20 72 Z', 'M36 50 L64 50'],
  // card with header bar + content lines
  ['M8 12 L92 12 L92 88 L8 88 Z', 'M8 32 L92 32', 'M14 48 L86 48', 'M14 64 L74 64'],
  // input field with cursor blink
  ['M8 36 L92 36 L92 64 L8 64 Z', 'M16 50 L42 50', 'M44 42 L44 58'],
  // nav bar + two content lines
  ['M8 14 L92 14 L92 36 L8 36 Z', 'M16 25 L28 25', 'M36 25 L52 25', 'M60 25 L72 25', 'M8 52 L92 52', 'M8 66 L68 66'],
  // avatar circle + name lines
  ['M14 38 A18 18 0 1 1 13.99 38', 'M52 22 L88 24', 'M52 36 L82 38', 'M10 62 L90 62', 'M10 76 L68 76'],
  // checkbox list
  ['M10 18 L28 18 L28 36 L10 36 Z', 'M10 48 L28 48 L28 66 L10 66 Z', 'M34 27 L78 27', 'M34 57 L72 57'],
]

function _rnd(a, b) { return a + Math.random() * (b - a) }
function _ri(a, b)  { return Math.floor(_rnd(a, b + 1)) }
function _pick(a)   { return a[_ri(0, a.length - 1)] }

function genSplashNotes() {
  // shuffle label indices so 14 random notes get labels
  const labelSlots = new Set()
  while (labelSlots.size < 14) labelSlots.add(_ri(0, 44))

  const labelList = [..._SL]
  let li = 0

  return Array.from({ length: 45 }, (_, i) => {
    const rotFrom = _rnd(-20, 20)
    const rotTo   = rotFrom + _rnd(8, 20) * (Math.random() > 0.5 ? 1 : -1)
    return {
      id:    i,
      w:     _ri(65, 100),
      h:     _ri(60, 90),
      color: _pick(_SC),
      left:  _rnd(0, 93),
      top:   -_ri(60, 250),
      rotFrom,
      rotTo,
      dur:   _rnd(1.4, 2.0).toFixed(2),
      delay: _rnd(0, 0.6).toFixed(2),
      label: labelSlots.has(i) ? labelList[li++] : null,
      lines: _pick(_SD),
    }
  })
}

function SplashScreen() {
  const [phase, setPhase] = useState('visible')
  const notes = useMemo(() => genSplashNotes(), [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fading'), 2500)
    const t2 = setTimeout(() => setPhase('gone'),   2900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'gone') return null

  return (
    <div className="splash-overlay" style={{ opacity: phase === 'fading' ? 0 : 1 }}>
      {notes.map(n => (
        <div
          key={n.id}
          className="splash-note"
          style={{
            width:          n.w,
            height:         n.h,
            background:     n.color,
            left:           `${n.left}%`,
            top:            n.top,
            '--rot-from':   `${n.rotFrom}deg`,
            '--rot-to':     `${n.rotTo}deg`,
            '--fall-dur':   `${n.dur}s`,
            '--fall-delay': `${n.delay}s`,
          }}
        >
          <svg
            width="100%" height="100%"
            viewBox="0 0 100 100"
            fill="none"
            style={{ position: 'absolute', inset: 0 }}
            aria-hidden="true"
          >
            {n.lines.map((d, j) => (
              <path key={j} d={d} stroke="#2a2a2a" strokeWidth="1.5" opacity="0.28" strokeLinecap="round" fill="none" />
            ))}
          </svg>
          {n.label && (
            <span className="splash-note-label">{n.label}</span>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Reveal on scroll ─────────────────────────────── */
function useReveal(delay = 0, threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(timerRef.current)
        if (entry.isIntersecting) {
          timerRef.current = setTimeout(() => setVisible(true), delay)
        } else {
          setVisible(false)
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(timerRef.current) }
  }, [delay, threshold])
  return { ref, visible }
}

function Reveal({ children, delay = 0, className = '' }) {
  const { ref, visible } = useReveal(delay)
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

/* ─── Hero Section ───────────────────────────────────── */
function HeroSection() {
  return (
    <section className="hs">
      <div className="hs-container">

        {/* LEFT: text */}
        <div className="hs-left">

          <div className="hs-enter-greeting">
            <h1 className="hs-headline">Hi, I'm<br />Gurjot.</h1>
          </div>

          <div className="hs-enter-bio">
            <p className="hs-sub">
              <span className="muted">UX Designer-II at <strong>ShareChat.</strong> <strong>4+ years</strong> designing systems that <strong>activate users, retain creators, and move revenue metrics.</strong> Background in architecture, obsessed with how structure shapes behaviour.</span>
              <br /><br />
              <span className="muted">Fuelled by <strong>football, long drives, and nature.</strong> I believe <strong>the best design ideas come when you're not at a desk.</strong></span>
            </p>
          </div>

          <div className="hs-enter-scroll">
            <div className="hs-scroll-indicator">
              <div className="hs-scroll-line" />
              <span className="hs-scroll-label">Scroll</span>
            </div>
          </div>

        </div>

        {/* RIGHT: image — outer div floats, inner img zooms on hover */}
        <div className="hs-right">
          <div className="hs-enter-photo">
            <div className="hs-img-float">
              <img
                className="hs-person-img"
                src="/hero.png"
                alt="Gurjot Ahluwalia"
                draggable="false"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Strip is a direct child of .hs — outside any constrained container */}
      <div className="hs-scroll-strip">
        <Ticker />
      </div>

    </section>
  )
}

/* ─── Case study scroll-in animation ─────────────────── */
function useCsReveal() {
  const imgRef = useRef(null)
  const txtRef = useRef(null)
  useEffect(() => {
    const els = [imgRef.current, txtRef.current].filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cs-row-visible')
          } else {
            entry.target.classList.remove('cs-row-visible')
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -100px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return { imgRef, txtRef }
}

/* ─── Case-study row ─────────────────────────────────── */
function CaseStudyRow({ side, image, alt, eyebrow, title, body, cta, onClick }) {
  const { imgRef, txtRef } = useCsReveal()
  const tiltRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = tiltRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5  // -0.5 to 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    const rotY =  x * 8   // max 4deg each side
    const rotX = -y * 8
    el.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out'
    el.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
    el.style.boxShadow = '0 24px 48px rgba(0,0,0,0.22)'
  }

  const handleMouseLeave = () => {
    const el = tiltRef.current
    if (!el) return
    el.style.transition = 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out'
    el.style.transform = ''
    el.style.boxShadow = ''
  }

  return (
    <div className="cs-row">
      <div className={`cs-row-grid ${side === 'right' ? 'cs-row-reverse' : ''}`}>
        <div
          className="cs-row-image cs-row-anim cs-row-tilt"
          ref={(el) => { imgRef.current = el; tiltRef.current = el }}
          onClick={onClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img src={image} alt={alt} className="cs-row-img-inner" />
          <div className="cs-row-image-overlay" />
        </div>
        <div className="cs-row-text cs-row-anim cs-row-anim-delay" ref={txtRef}>
          {eyebrow && <div className="cs-row-eyebrow">{eyebrow}</div>}
          <h3 className="cs-row-title">{title}</h3>
          <p className="cs-row-body">{body}</p>
          <button className="cs-row-cta" onClick={onClick}>{cta}</button>
        </div>
      </div>
    </div>
  )
}


/* ─── Playground card ────────────────────────────────── */
function PlaygroundCard({ image, title, desc, delay = 0 }) {
  return (
    <Reveal delay={delay} className="pg-card-wrap">
      <article className="pg-card">
        <div className="pg-card-image"><img src={image} alt={title} /></div>
        <div className="pg-card-body">
          <h4 className="pg-card-title">{title}</h4>
          {desc && <p className="pg-card-desc">{desc}</p>}
        </div>
      </article>
    </Reveal>
  )
}

/* ─── Testimonial card ───────────────────────────────── */
function TestimonialCard({ quote, name, role, initial, color }) {
  return (
    <article className="testimonial-card">
      <p className="testimonial-quote">{quote}</p>
      <div className="testimonial-meta">
        <div className="testimonial-avatar" style={{ background: color }}>{initial}</div>
        <div>
          <div className="testimonial-name">{name}</div>
          <div className="testimonial-role">{role}</div>
        </div>
      </div>
    </article>
  )
}

/* ─── Personality Ticker ─────────────────────────────────
   Infinite left-scroll strip — sits at the bottom of the
   hero section, visible in the first viewport.

   SEAMLESS LOOP:
   Items array is doubled in JSX → track is 2× one set wide.
   CSS animation moves -50% (= exactly one set width).
   When copy 1 exits left, copy 2 fills the gap invisibly.
────────────────────────────────────────────────────────── */
const TICKER_ITEMS = [
  'Senior UX Designer', 'Creative Thinker', 'Football Player',
  'Traveller', 'Problem Solver', 'Systems Thinker',
  'Architect at Heart', 'Curious Mind',
]

/* 4-point AI-style star separator */
function StarSep() {
  return (
    <svg
      className="ticker-star"
      width="10" height="10"
      viewBox="0 0 9 9"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.5 0 C4.5 2.5 2.5 4.5 0 4.5 C2.5 4.5 4.5 6.5 4.5 9 C4.5 6.5 6.5 4.5 9 4.5 C6.5 4.5 4.5 2.5 4.5 0Z" />
    </svg>
  )
}

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="ticker-outer" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((label, i) => (
          <span key={i} className="ticker-item">
            <StarSep />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Testimonials data ──────────────────────────────────
   Extracted to array so the section can duplicate cards
   for the seamless auto-scroll loop.
────────────────────────────────────────────────────────── */
const TESTI_DATA = [
  {
    quote: "Gurjot is one of the rare designers who makes engineering execution genuinely easier. Handoffs were detailed, edge cases covered, interaction states documented before we started building. He understood engineering constraints without needing them explained twice.",
    name: 'Lavish Bansal', role: 'Senior Software Engineer · ShareChat', initial: 'L', color: '#DCFCE7',
  },
  {
    quote: "I was consistently impressed by Gurjot's design skills and thoughtful approach to problem-solving. Strong eye for detail, user-centric thinking, and genuinely collaborative. I truly enjoyed working with him.",
    name: 'Nidhi Erandole', role: 'Product Design · PayU, Ex-ShareChat', initial: 'N', color: '#FCE7F3',
  },
  {
    quote: "Incredibly thoughtful and collaborative, with strong clarity in problem-solving. What stood out was his sense of ownership and ability to balance user needs with business goals. A great teammate I'd gladly work with again.",
    name: 'Shubhi Goyal', role: 'Founder · ByteLabs, Ex-ShareChat', initial: 'S', color: '#FEF3C7',
  },
  {
    quote: "Gurjot's design contributions created a new revenue stream for our organisation. Moj Spot hit ~₹180K daily revenue from 1000+ creators. His commitment and proactive approach were instrumental in that success.",
    name: 'Zeenal Patel', role: 'Design Leadership · ShareChat', initial: 'Z', color: '#E0E7FF',
  },
  {
    quote: "Gurjot is a dedicated and extremely talented designer. His expertise in Product Design is beyond par and his hardworking nature is a major plus. A talented, promising, and committed asset.",
    name: 'Simrat Kaur', role: 'Human Resources Executive', initial: 'S', color: '#E0F2FE',
  },
]

/* ─── Playground Section ─────────────────────────────────
   pg-paper <img> defines wrapper height (normal flow block).
   pg-content sits on top via absolute top:0 left:0 width:100%.
   Cards in flex row — no absolute positioning on cards.
────────────────────────────────────────────────────────── */
function PlaygroundSection({ navigate }) {
  return (
    <div id="playground" className="playground-section">
      <div className="pg-paper-wrapper">

        <img src="/PaperBG.png" alt="" className="pg-paper" />

        <div className="pg-content">
          <h2 className="pg-title">Playground</h2>
          <p className="pg-sub">Sketches, side projects, and craft explorations.</p>

          <div className="pg-cards">

            <a
              href="https://www.behance.net/gallery/147058973/Minerva-Training-Complex-Architectural-Design"
              target="_blank"
              rel="noopener noreferrer"
              className="playground-card card-minerva"
            >
              <span className="pg-tape"></span>
              <img src="/Minerva.png" alt="Minerva Training Complex" />
              <div className="pg-card-label">
                <h4>Minerva Training Complex</h4>
                <p>Architectural Design</p>
              </div>
            </a>

            <a
              href="https://www.behance.net/gallery/146945907/Bloom-Nursery-Responsive-Website-UXUI"
              target="_blank"
              rel="noopener noreferrer"
              className="playground-card card-bloom"
            >
              <span className="pg-tape"></span>
              <img src="/Bloom Nursery.png" alt="Bloom Nursery UX/UI" />
              <div className="pg-card-label">
                <h4>Bloom Nursery</h4>
                <p>Responsive Website UX/UI</p>
              </div>
            </a>

            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate('photography') }}
              className="playground-card card-photo"
            >
              <span className="pg-tape"></span>
              <img src={photoCardThumb} alt="Photography" />
              <div className="pg-card-label">
                <h4>Out in the Wild</h4>
                <p>Moments I didn't design, but framed.</p>
              </div>
            </a>

          </div>
        </div>

      </div>
    </div>
  )
}

/* ─── Cursor label per section ──────────────────────── */
// Ordered top → bottom so the deepest visible section wins
const SECTION_LABELS = [
  { id: 'work',         label: 'Explore'    },
  { id: 'playground',   label: 'Dive in'    },
  { id: 'testimonials', label: "Let's talk" },
  { id: 'contact',      label: "Let's talk" },
]

/* ─── Page ───────────────────────────────────────────── */
export default function Home({ navigate }) {
  const [cursorLabel, setCursorLabel] = useState('Hello')

  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor')
    if (!cursor) return
    const move = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 80) { setCursorLabel('Hello'); return }
      let label = 'Explore'
      for (const s of SECTION_LABELS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.6) {
          label = s.label
        }
      }
      setCursorLabel(label)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="page home-page">
      <SplashScreen />

      <div className="custom-cursor" aria-hidden="true">
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L0 17.5L4.5 13.5L7.5 21L10.5 19.8L7.5 12.5H13L0 0Z" fill="black" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
        </svg>
        <span className="cursor-label">{cursorLabel}</span>
      </div>

      <HeroSection />

      <section id="work" className="case-studies-section">
        <div className="container container-narrow">
          <Reveal className="section-heading">
            <h2 className="section-h2">Curated Projects</h2>
            <p className="section-sub">Four projects that shaped how I think about design.</p>
          </Reveal>
        </div>
        <div className="container case-studies-container">
          {/* 01 — Moj Spot (Figma prototype) */}
          <a href="https://www.figma.com/proto/8axG8i1fABBuCeFsUY2eh2/Case-Studies?page-id=&node-id=2017-20270&viewport=-2941%2C4169%2C0.38&t=kFWcTi6kwAi89RDq-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=542%3A3090" target="_blank" rel="noopener noreferrer" className="cs-row-link">
            <CaseStudyRow side="right" image="/moj.png" alt="Moj Spot creator monetisation"
              eyebrow="01 — ShareChat · Moj" title="Moj Spot — Creator Monetisation System"
              body="Tens of millions of creators, zero paid growth tools. Designed Moj Spot from scratch, a content-boosting system that opened a new revenue stream and scaled through targeting, multi-campaign support, and analytics."
              cta="View case study" onClick={() => {}} />
          </a>
          {/* 02 — Referral */}
          <a href="https://www.figma.com/proto/8axG8i1fABBuCeFsUY2eh2/Case-Studies?page-id=13%3A27480&node-id=362-12307&viewport=4270%2C-2635%2C0.38&t=qPOdin1e9WOOMAGx-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=362%3A12307" target="_blank" rel="noopener noreferrer" className="cs-row-link">
            <CaseStudyRow side="left" image="/Referral new.png" alt="Starter Challenge screens"
              eyebrow="02 — ShareChat · Vibely" title="Referral & Starter Challenge Growth System"
              body="A two-part growth system that drove 82.6% first-call activation. Designed sender, receiver, and competition layers — then scaled the same framework from FriendZone into Vibely with minimal engineering lift."
              cta="View case study" onClick={() => {}} />
          </a>
          {/* 03 — Cineflow */}
          <a href="https://www.figma.com/proto/8axG8i1fABBuCeFsUY2eh2/Case-Studies?page-id=182%3A76113&node-id=1166-143377&viewport=395%2C823%2C0.03&t=crlJh790HneX3WER-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=1166%3A143377" target="_blank" rel="noopener noreferrer" className="cs-row-link">
            <CaseStudyRow side="right" image="/cineflow.png" alt="Cineflow characters screen"
              eyebrow="03 — Cineflow · 48hr Sprint" title="First-time UX for AI Episode Creation"
              body="A 48-hour sprint to collapse a fragmented six-tool workflow into one guided experience. Defined a consistent generative pattern — dual options + persistent chat — that scales from idea to exported episode."
              cta="View case study" onClick={() => {}} />
          </a>
          {/* 04 — KYC */}
          <a href="https://www.figma.com/proto/8axG8i1fABBuCeFsUY2eh2/Case-Studies?page-id=13%3A27480&node-id=392-24762&viewport=4270%2C-2635%2C0.38&t=qPOdin1e9WOOMAGx-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=392%3A24762" target="_blank" rel="noopener noreferrer" className="cs-row-link">
            <CaseStudyRow side="left" image="/kyc.png" alt="KYC wallet earnings screen"
              eyebrow="04 — ShareChat · Vibely" title="KYC, Wallet & Cash-out System Redesign"
              body="A guided redesign of the verification and withdrawal flow for creators on ShareChat. Reduced drop-offs and lifted KYC completion by 18–25% by breaking complex regulatory steps into clear, trust-driven moments."
              cta="View case study" onClick={() => {}} />
          </a>
        </div>
      </section>

      <PlaygroundSection navigate={navigate} />

      <section id="testimonials" className="testimonials-section">
        <div className="container container-narrow">
          <Reveal className="section-heading">
            <h2 className="section-h2">Testimonials</h2>
            <p className="section-sub">Words from the people I work with.</p>
          </Reveal>
        </div>
        {/*
          Auto-scroll RIGHT: cards loop from right to left direction
          reversed → new cards appear from the left.
          SEAMLESS LOOP: TESTI_DATA is doubled. The track starts at
          translateX(-50%) showing copy 2, animates to 0% showing
          copy 1. At reset it jumps back to -50% — indistinguishable.
          Hover pauses the animation for reading comfort.
        */}
        <div className="testi-outer">
          <div className="testi-track">
            {[...TESTI_DATA, ...TESTI_DATA].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="home-footer-v2">

        {/* ── CTA row: text left, button right ── */}
        <div className="footer-cta-block">
          <Reveal>
            <div className="footer-cta-text">
              <p className="footer-cta-eyebrow">Let's work together</p>
              <h2 className="footer-cta-headline">Have something you're<br />trying to build?</h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <a href="mailto:gurjot.cca@gmail.com" className="footer-cta">
              Get in touch
              <span className="footer-cta-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </Reveal>
        </div>

        {/* ── Bottom bar: socials left, copyright right ── */}
        <Reveal delay={200}>
          <div className="footer-row">
            <div className="footer-socials">
              <a href="https://www.instagram.com/itsjot7?igsh=MWI1M2tpeGM0cGN3dQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <span>Instagram</span>
              </a>
              <a href="https://www.linkedin.com/in/gurjot-singh-ahluwalia/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              <a href="https://drive.google.com/file/d/1xBDQ9yICLssV5GeO0qguskU9HnJhOhaD/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Download Resume">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Resume</span>
              </a>
            </div>
            <div className="footer-bottom-v2">
              <span>© 2026 Gurjot Singh Ahluwalia</span>
              <span className="footer-heart">❤️</span>
              <span className="footer-tagline">Designed &amp; built with care</span>
            </div>
          </div>
        </Reveal>

      </footer>
    </div>
  )
}
