import { useEffect, useRef, useState } from 'react'
import photoCardThumb from '../assets/photography/IMG_2503.jpeg'

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

          <Reveal>
            <h1 className="hs-headline">Hi, I'm<br />Gurjot.</h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="hs-sub">
              <span className="muted">UX Designer-II at <strong>ShareChat.</strong> <strong>4+ years</strong> designing systems that <strong>activate users, retain creators, and move revenue metrics.</strong> Background in architecture, obsessed with how structure shapes behaviour.</span>
              <br /><br />
              <span className="muted">Fuelled by <strong>football, long drives, and nature.</strong> I believe <strong>the best design ideas come when you're not at a desk.</strong></span>
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="hs-scroll-indicator">
              <div className="hs-scroll-line" />
              <span className="hs-scroll-label">Scroll</span>
            </div>
          </Reveal>

        </div>

        {/* RIGHT: image — outer div floats, inner img zooms on hover */}
        <div className="hs-right">
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

      {/* Strip is a direct child of .hs — outside any constrained container */}
      <div className="hs-scroll-strip">
        <Ticker />
      </div>

    </section>
  )
}

/* ─── Case-study row ─────────────────────────────────── */
function CaseStudyRow({ side, image, alt, eyebrow, title, body, cta, onClick }) {
  return (
    <Reveal className="cs-row">
      <div className={`cs-row-grid ${side === 'right' ? 'cs-row-reverse' : ''}`}>
        <div className="cs-row-image" onClick={onClick}>
          <img src={image} alt={alt} />
          <div className="cs-row-image-overlay" />
        </div>
        <div className="cs-row-text">
          {eyebrow && <div className="cs-row-eyebrow">{eyebrow}</div>}
          <h3 className="cs-row-title">{title}</h3>
          <p className="cs-row-body">{body}</p>
          <button className="cs-row-cta" onClick={onClick}>{cta}</button>
        </div>
      </div>
    </Reveal>
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
    quote: "Gurjot turns ambiguous policy and engineering constraints into flows that feel inevitable. The KYC redesign moved every metric we cared about.",
    name: 'Product Lead', role: 'ShareChat · Monetisation', initial: 'P', color: '#E0E7FF',
  },
  {
    quote: "One of the few designers who treats growth surfaces with the same craft as core product. The starter-challenge framework is still the model we benchmark against.",
    name: 'Growth PM', role: 'ShareChat · FriendZone', initial: 'G', color: '#DCFCE7',
  },
  {
    quote: "Sharp instincts, fast iteration, low ego. The Cineflow sprint was 48 hours but felt like a complete product story by the time he was done.",
    name: 'Engineering Lead', role: 'Cineflow', initial: 'E', color: '#FEF3C7',
  },
  {
    quote: "Brings architectural rigour to interface design. Spends time on the structural decisions most designers skip — and the result is flows that hold up under load.",
    name: 'Design Director', role: 'ShareChat', initial: 'D', color: '#FCE7F3',
  },
  {
    quote: "A rare combination of systems thinking and craft. The way he scaled the FriendZone growth loop into Vibely with almost no rework is the textbook case for modular design.",
    name: 'Senior PM', role: 'ShareChat · Vibely', initial: 'S', color: '#E0F2FE',
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
                <h4>Photography</h4>
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
            <h2 className="section-h2">Case Studies</h2>
            <p className="section-sub">Three projects that shaped how I think about design.</p>
          </Reveal>
        </div>
        <div className="container case-studies-container">
          <a href="https://www.figma.com/proto/8axG8i1fABBuCeFsUY2eh2/Case-Studies?page-id=13%3A27480&node-id=392-24762&viewport=4270%2C-2635%2C0.38&t=qPOdin1e9WOOMAGx-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=392%3A24762" target="_blank" rel="noopener noreferrer" className="cs-row-link">
            <CaseStudyRow side="right" image="/kyc.png" alt="KYC wallet earnings screen"
              eyebrow="01 — ShareChat · Vibely" title="KYC, Wallet & Cash-out System Redesign"
              body="A guided redesign of the verification and withdrawal flow for creators on ShareChat. Reduced drop-offs and lifted KYC completion by 18–25% by breaking complex regulatory steps into clear, trust-driven moments."
              cta="View case study" onClick={() => {}} />
          </a>
          <a href="https://www.figma.com/proto/8axG8i1fABBuCeFsUY2eh2/Case-Studies?page-id=182%3A76113&node-id=1166-143377&viewport=395%2C823%2C0.03&t=crlJh790HneX3WER-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=1166%3A143377" target="_blank" rel="noopener noreferrer" className="cs-row-link">
            <CaseStudyRow side="left" image="/cineflow.png" alt="Cineflow characters screen"
              eyebrow="02 — Cineflow · 48hr Sprint" title="First-time UX for AI Episode Creation"
              body="A 48-hour sprint to collapse a fragmented six-tool workflow into one guided experience. Defined a consistent generative pattern — dual options + persistent chat — that scales from idea to exported episode."
              cta="View case study" onClick={() => {}} />
          </a>
          <a href="https://www.figma.com/proto/8axG8i1fABBuCeFsUY2eh2/Case-Studies?page-id=13%3A27480&node-id=362-12307&viewport=4270%2C-2635%2C0.38&t=qPOdin1e9WOOMAGx-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=362%3A12307" target="_blank" rel="noopener noreferrer" className="cs-row-link">
            <CaseStudyRow side="right" image="/referral.png" alt="Starter Challenge screens"
              eyebrow="03 — ShareChat · Vibely" title="Referral & Starter Challenge Growth System"
              body="A two-part growth system that drove 82.6% first-call activation. Designed sender, receiver, and competition layers — then scaled the same framework from FriendZone into Vibely with minimal engineering lift."
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
              <a href="https://drive.google.com/file/d/15FHPBqEyNZWjjyRFjdwy4LfZlbFdV1SY/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Download Resume">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Resume</span>
              </a>
            </div>
            <div className="footer-bottom-v2">
              <span>© 2026 Gurjot Ahluwalia</span>
              <span>❤️</span>
              <span>Designed &amp; built with care</span>
            </div>
          </div>
        </Reveal>

      </footer>
    </div>
  )
}
