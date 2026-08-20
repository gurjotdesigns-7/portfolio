import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import photoCardThumb from '../assets/photography/IMG_2503.jpeg'
import CaseStudyStack from '../components/CaseStudyStack'

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

/* ─── Hero background grid (canvas) ──────────────────────
   Graph-paper grid drawn on a canvas so the vertical major lines can behave
   like guitar strings: as the cursor sweeps across one, that line gets a
   localized "pluck" that travels along it and decays — a subtle vibration.
   Minor lines + horizontal major lines just drift upward, as before. */
function HeroGridCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const MINOR = 18, MAJOR = 90
    const DRIFT = 15.25            // px/sec, upward (matches the old CSS drift)
    const SAMPLE = 12             // px between string sample points
    const BG = '#fdfdfb'
    const MINOR_C = 'rgba(28,28,36,0.04)'
    const MAJOR_C = '#e5e1fc'
    // string physics — tighter (higher tension) and rings ~25% longer than
    // before (DAMP 0.965 → 0.972) so the entry strum is more evident. Both
    // vertical AND horizontal major lines are strings.
    const K = 0.02, T = 0.42, DAMP = 0.972, RADIUS = 46, STR = 0.8, CAP = 5

    let W = 0, H = 0, dpr = 1, vN = 0, hN = 0, hSpan = 0
    let vStr = []   // vertical major lines:   { x, d[], v[] }  (displaced in x)
    let hStr = []   // horizontal major lines: { y, d[], v[] }  (displaced in y, drifting)

    function build() {
      const r = canvas.getBoundingClientRect()
      W = r.width; H = r.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      vN = Math.max(8, Math.floor(H / SAMPLE) + 2)
      hN = Math.max(8, Math.floor(W / SAMPLE) + 2)
      vStr = []
      for (let x = (W / 2) % MAJOR; x <= W; x += MAJOR) {
        vStr.push({ x, d: new Float32Array(vN), v: new Float32Array(vN) })
      }
      const numH = Math.ceil(H / MAJOR) + 2
      hSpan = numH * MAJOR
      const phase = (H / 2) % MAJOR
      hStr = []
      for (let k = 0; k < numH; k++) {
        hStr.push({ y: phase - MAJOR + k * MAJOR, d: new Float32Array(hN), v: new Float32Array(hN) })
      }
    }

    // Entry animation: pluck every string at once (fundamental mode, alternating
    // direction per line) so the whole grid twangs and settles on load/refresh.
    function strumAll() {
      const AMP = 20
      vStr.forEach((s, k) => {
        const sign = k % 2 ? 1 : -1
        for (let i = 1; i < vN - 1; i++) s.d[i] = sign * AMP * Math.sin(Math.PI * i / (vN - 1))
        s.v.fill(0)
      })
      hStr.forEach((s, k) => {
        const sign = k % 2 ? 1 : -1
        for (let j = 1; j < hN - 1; j++) s.d[j] = sign * AMP * Math.sin(Math.PI * j / (hN - 1))
        s.v.fill(0)
      })
    }

    let pmx = -1, pmy = -1
    function onMove(e) {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left, y = e.clientY - r.top
      if (x < 0 || x > W || y < 0 || y > H) { pmx = -1; pmy = -1; return }
      const vx = pmx === -1 ? 0 : x - pmx
      const vy = pmy === -1 ? 0 : y - pmy
      pmx = x; pmy = y
      // horizontal cursor motion plucks the vertical strings (displaced in x)
      for (const s of vStr) {
        const dx = Math.abs(x - s.x)
        if (dx < RADIUS) {
          const i = Math.max(1, Math.min(vN - 2, Math.round(y / SAMPLE)))
          const imp = Math.max(-CAP, Math.min(CAP, vx * STR)) * (1 - dx / RADIUS)
          s.v[i] += imp; s.v[i - 1] += imp * 0.5; s.v[i + 1] += imp * 0.5
        }
      }
      // vertical cursor motion plucks the horizontal strings (displaced in y)
      for (const s of hStr) {
        const dy = Math.abs(y - s.y)
        if (dy < RADIUS) {
          const j = Math.max(1, Math.min(hN - 2, Math.round(x / SAMPLE)))
          const imp = Math.max(-CAP, Math.min(CAP, vy * STR)) * (1 - dy / RADIUS)
          s.v[j] += imp; s.v[j - 1] += imp * 0.5; s.v[j + 1] += imp * 0.5
        }
      }
    }
    const onLeave = () => { pmx = -1; pmy = -1 }

    function integrate(list, n) {
      for (const s of list) {
        const d = s.d, v = s.v
        for (let i = 1; i < n - 1; i++) {
          v[i] = (v[i] + (-K * d[i] + T * (d[i - 1] + d[i + 1] - 2 * d[i]))) * DAMP
        }
        for (let i = 1; i < n - 1; i++) d[i] += v[i]
        d[0] = d[n - 1] = 0
      }
    }

    let driftY = 0, last = performance.now(), raf = 0
    function frame(now) {
      const dt = Math.min((now - last) / 1000, 0.05); last = now
      driftY = (driftY + DRIFT * dt) % MINOR
      // drift + recycle the horizontal strings
      for (const s of hStr) {
        s.y -= DRIFT * dt
        if (s.y < -1) { s.y += hSpan; s.d.fill(0); s.v.fill(0) }
      }
      if (!reduce) { integrate(vStr, vN); integrate(hStr, hN) }

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, W, H)

      // minor grid — vertical fixed, horizontal drifting
      ctx.strokeStyle = MINOR_C; ctx.lineWidth = 1; ctx.beginPath()
      for (let x = (W / 2) % MINOR; x <= W; x += MINOR) {
        const px = Math.round(x) + 0.5; ctx.moveTo(px, 0); ctx.lineTo(px, H)
      }
      const minorPhase = (((H / 2) % MINOR - driftY) % MINOR + MINOR) % MINOR
      for (let y = minorPhase; y <= H; y += MINOR) {
        const py = Math.round(y) + 0.5; ctx.moveTo(0, py); ctx.lineTo(W, py)
      }
      ctx.stroke()

      // major lines (purple) — both directions are strings, drawn displaced
      ctx.strokeStyle = MAJOR_C; ctx.lineWidth = 1
      for (const s of hStr) {
        ctx.beginPath()
        for (let j = 0; j < hN; j++) {
          const x = j * SAMPLE, y = s.y + s.d[j]
          if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      for (const s of vStr) {
        ctx.beginPath()
        for (let i = 0; i < vN; i++) {
          const x = s.x + s.d[i], y = i * SAMPLE
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      raf = requestAnimationFrame(frame)
    }

    build()
    if (!reduce) strumAll()   // entry twang on load/refresh
    raf = requestAnimationFrame(frame)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    let rt
    const onResize = () => { clearTimeout(rt); rt = setTimeout(build, 150) }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
      clearTimeout(rt)
    }
  }, [])

  return <canvas ref={ref} className="hs-bg-grid" aria-hidden="true" />
}

/* ─── Hero Section ───────────────────────────────────── */
function HeroSection() {
  return (
    <section className="hs">
      {/* Hero background: canvas graph-paper grid whose vertical lines vibrate
          like guitar strings when the cursor sweeps across them. */}
      <HeroGridCanvas />
      {/* Figma-style ruler/scale bars on the left & right edges, ticks scroll
          in sync with the grid. */}
      <div className="hs-ruler hs-ruler-left" aria-hidden="true" />
      <div className="hs-ruler hs-ruler-right" aria-hidden="true" />
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

/* ─── Case studies data (fed into the sticky CaseStudyStack) ──
   Each card carries its own `bg` so the pastel fill is deliberate (not the
   generic nth-child rotation): Moj = yellow, Syfe = purple, etc. */
const CASE_STUDIES = [
  {
    eyebrow: '01 — ShareChat · Moj',
    title: 'Moj Spot - Creator Monetisation System',
    body: 'Tens of millions of creators, zero paid growth tools. Designed Moj Spot from scratch, a content-boosting system that opened a new revenue stream and scaled through targeting, multi-campaign support, and analytics.',
    hero: true,
    bg: '#FFF9EC',
    image: '/moj.png',
    href: 'https://www.figma.com/proto/8axG8i1fABBuCeFsUY2eh2/Case-Studies?page-id=&node-id=2017-20270&viewport=-2941%2C4169%2C0.38&t=kFWcTi6kwAi89RDq-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=542%3A3090',
  },
  {
    eyebrow: '02 — Syfe · Trading',
    title: 'Designing for High Stakes: Speedy transactions and AI-driven clarity',
    body: 'Two users with opposite needs. Researched both through interviews and one north-star flow chart, then built a 3-step trigger-order flow for speed and an AI assistant for clarity.',
    latest: true,
    bg: '#F1EFFD',
    image: '/SYFE.png',
    href: 'https://www.figma.com/proto/IU8jvDPqxYxvlF9vp3WCyp/Syfe?node-id=286-52951&viewport=106%2C-57%2C0.16&t=Wg8SfwLRzFfjHW9m-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=286%3A52951&page-id=286%3A52950',
  },
  {
    eyebrow: '03 — ShareChat · Vibely',
    title: 'Referral & Starter Challenge Growth System',
    body: 'A two-part growth system that drove 82.6% first-call activation. Designed sender, receiver, and competition layers — then scaled the same framework from FriendZone into Vibely with minimal engineering lift.',
    bg: '#FEEAEA',
    image: '/Referral new.png',
    href: 'https://www.figma.com/proto/8axG8i1fABBuCeFsUY2eh2/Case-Studies?page-id=13%3A27480&node-id=362-12307&viewport=4270%2C-2635%2C0.38&t=qPOdin1e9WOOMAGx-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=362%3A12307',
  },
  {
    eyebrow: '04 — ShareChat · Vibely',
    title: 'KYC, Wallet & Cash-out System Redesign',
    body: 'A guided redesign of the verification and withdrawal flow for creators on ShareChat. Reduced drop-offs and lifted KYC completion by 18–25% by breaking complex regulatory steps into clear, trust-driven moments.',
    bg: '#F1EFFD',
    image: '/kyc.png',
    href: 'https://www.figma.com/proto/8axG8i1fABBuCeFsUY2eh2/Case-Studies?page-id=13%3A27480&node-id=392-24762&viewport=4270%2C-2635%2C0.38&t=qPOdin1e9WOOMAGx-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=392%3A24762',
  },
]

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
function TestimonialCard({ quote, name, role, initial, color, image, cardBg }) {
  return (
    <article className="testimonial-card" style={cardBg ? { background: cardBg } : undefined}>
      <p className="testimonial-quote">{quote}</p>
      <div className="testimonial-meta">
        {image ? (
          <div className="testimonial-avatar testimonial-avatar--photo">
            <img src={image} alt={name} />
          </div>
        ) : (
          <div className="testimonial-avatar" style={{ background: color }}>{initial}</div>
        )}
        <div>
          <div className="testimonial-name">{name}</div>
          <div className="testimonial-role">{role}</div>
        </div>
      </div>
    </article>
  )
}

/* ─── Testimonials marquee (windowed conveyor) ───────────
   Earlier attempts (CSS keyframes, then a full-width rAF transform) both
   left a very wide row — 10 cards, ~8 screens — living inside overflow.
   iOS/iPadOS Safari tiles a layer that large and DISCARDS the tiles that
   sit far off-screen (especially after a few idle seconds), so the section
   blanks out after the 5th card and only repaints on interaction.

   The fix is to never have a large off-screen layer at all. We render only
   as many cards as fit the viewport + a small buffer, and slide a data
   "window" forward: each time a card fully scrolls off the left, we drop it,
   advance the window by one, and append a fresh card on the right. The whole
   rendered row is therefore always ~viewport-sized, so nothing is far enough
   off-screen to be culled. A requestAnimationFrame loop drives the sub-card
   offset; React only re-renders once per card (~every few seconds) when the
   window advances. Cards are keyed by their absolute position in the
   sequence so React reuses their DOM (no avatar reload) as they shift left.
──────────────────────────────────────────────────────── */
function TestimonialsMarquee() {
  const trackRef = useRef(null)
  const fracRef = useRef(0)
  const startRef = useRef(0)
  const pausedRef = useRef(false)
  const [count, setCount] = useState(6)
  const [start, setStart] = useState(0)

  // How many cards are needed to cover the viewport (+2 buffer).
  useEffect(() => {
    const recalc = () => {
      const vw = window.innerWidth
      const cardW = vw <= 640 ? vw * 0.82 + 12 : 340
      setCount(Math.max(4, Math.ceil(vw / cardW) + 2))
    }
    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const SPEED = 55 // px per second
    let raf = 0
    let last = performance.now()

    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05) // clamp after tab-switch
      last = now
      const first = track.children[0]
      if (!pausedRef.current && first) {
        const cs = getComputedStyle(first)
        const slotW = first.getBoundingClientRect().width + parseFloat(cs.marginRight || 0)
        if (slotW > 0) {
          fracRef.current += SPEED * dt
          if (fracRef.current >= slotW) {
            fracRef.current -= slotW
            startRef.current += 1 // monotonic — keeps keys sliding, no batch remount
            // flushSync forces the new window to commit to the DOM *now*, in the
            // same frame as the offset reset — otherwise React re-renders one
            // frame late and the old leftmost card flashes back into view for a
            // frame (the abrupt colour/content glitch). Runs only once per card
            // (~every few seconds), so the synchronous render is negligible.
            flushSync(() => setStart(startRef.current))
          }
          track.style.transform = `translate3d(${-fracRef.current}px, 0, 0)`
        }
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    // Pause on hover for mouse users only (touch must never pause it)
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const onEnter = () => { if (fine) pausedRef.current = true }
    const onLeave = () => { pausedRef.current = false }
    track.addEventListener('mouseenter', onEnter)
    track.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      track.removeEventListener('mouseenter', onEnter)
      track.removeEventListener('mouseleave', onLeave)
    }
  }, [count])

  // Render count+1 cards (extra one buffers the right edge so no gap shows).
  // The pastel fill is keyed to each card's ABSOLUTE position in the sequence
  // (start + i), not its DOM index — so the colour travels with the card as
  // the window slides and never re-assigns mid-scroll (the abrupt colour
  // flip that :nth-child produced once cards started recycling positions).
  const slots = Array.from({ length: count + 1 }, (_, i) => ({
    key: start + i,
    data: TESTI_DATA[(start + i) % TESTI_DATA.length],
    bg: TESTI_COLORS[(start + i) % TESTI_COLORS.length],
  }))

  return (
    <div className="testi-outer">
      <div className="testi-track testi-track--js" ref={trackRef}>
        {slots.map(({ key, data, bg }) => (
          <TestimonialCard key={key} {...data} cardBg={bg} />
        ))}
      </div>
    </div>
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
const TESTI_COLORS = ['#F1EFFD', '#FEEAEA', '#FFF9EC']

const TESTI_DATA = [
  {
    quote: "Gurjot is one of the rare designers who makes engineering execution genuinely easier. Handoffs were detailed, edge cases covered, interaction states documented before we started building. He understood engineering constraints without needing them explained twice.",
    name: 'Lavish Bansal', role: 'Senior Software Engineer · ShareChat', initial: 'L', color: '#DCFCE7', image: '/testimonials/Lavish.jpeg',
  },
  {
    quote: "I was consistently impressed by Gurjot's design skills and thoughtful approach to problem-solving. Strong eye for detail, user-centric thinking, and genuinely collaborative. I truly enjoyed working with him.",
    name: 'Nidhi Erandole', role: 'Product Design · PayU, Ex-ShareChat', initial: 'N', color: '#FCE7F3', image: '/testimonials/Nidhi.jpeg',
  },
  {
    quote: "Incredibly thoughtful and collaborative, with strong clarity in problem-solving. What stood out was his sense of ownership and ability to balance user needs with business goals. A great teammate I'd gladly work with again.",
    name: 'Shubhi Goyal', role: 'Founder · ByteLabs, Ex-ShareChat', initial: 'S', color: '#FEF3C7', image: '/testimonials/Shubhi.jpeg',
  },
  {
    quote: "Gurjot's design contributions created a new revenue stream for our organisation. Moj Spot hit ~₹180K daily revenue from 1000+ creators. His commitment and proactive approach were instrumental in that success.",
    name: 'Zeenal Patel', role: 'Design Leadership · ShareChat', initial: 'Z', color: '#E0E7FF', image: '/testimonials/Zeenal.jpeg',
  },
  {
    quote: "Gurjot is a dedicated and extremely talented designer. His expertise in Product Design is beyond par and his hardworking nature is a major plus. A talented, promising, and committed asset.",
    name: 'Simrat Kaur', role: 'Human Resources Executive', initial: 'S', color: '#E0F2FE', image: '/testimonials/Simrat.jpeg',
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

        <img src="/PaperBG-crop.png" alt="" className="pg-paper" />

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
  const [showStringsMsg, setShowStringsMsg] = useState(false)
  const stringsMsgShown = useRef(false)

  // The FIRST time the cursor enters the hero (plucks the strings), wait 1s,
  // then show a playful "Careful with the strings!" label for 4s before
  // reverting to normal — once only per page load.
  useEffect(() => {
    const hero = document.querySelector('.hs')
    if (!hero) return
    let showTimer, hideTimer
    const enter = () => {
      if (stringsMsgShown.current) return
      stringsMsgShown.current = true
      showTimer = setTimeout(() => {
        setShowStringsMsg(true)
        hideTimer = setTimeout(() => setShowStringsMsg(false), 4000)
      }, 1000)
    }
    hero.addEventListener('mouseenter', enter)
    return () => {
      hero.removeEventListener('mouseenter', enter)
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

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

  // Ease the cursor pill's width between labels: measure the target text width
  // with a hidden twin, then set the pill's width (CSS transitions it).
  const labelRef = useRef(null)
  const displayLabel = showStringsMsg ? 'Careful with the strings!' : cursorLabel
  useEffect(() => {
    const el = labelRef.current
    if (!el) return
    const twin = document.createElement('span')
    const cs = getComputedStyle(el)
    twin.textContent = displayLabel
    twin.style.cssText =
      `position:absolute;left:-9999px;top:-9999px;visibility:hidden;white-space:nowrap;` +
      `box-sizing:border-box;font:${cs.font};padding:${cs.padding};letter-spacing:${cs.letterSpacing};`
    document.body.appendChild(twin)
    const target = twin.offsetWidth
    document.body.removeChild(twin)
    el.style.width = target + 'px'
  }, [displayLabel])

  return (
    <div className="page home-page">
      <div className="custom-cursor" aria-hidden="true">
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L0 17.5L4.5 13.5L7.5 21L10.5 19.8L7.5 12.5H13L0 0Z" fill="black" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
        </svg>
        <span className="cursor-label" ref={labelRef}>{displayLabel}</span>
      </div>

      <HeroSection />

      <section id="work" className="case-studies-section">
        <div className="container container-narrow">
          <Reveal className="section-heading">
            <h2 className="section-h2">Curated Projects</h2>
            <p className="section-sub">Four projects that shaped how I think about design.</p>
          </Reveal>
        </div>
        <CaseStudyStack items={CASE_STUDIES} />
      </section>

      <PlaygroundSection navigate={navigate} />

      <section id="testimonials" className="testimonials-section">
        <div className="container container-narrow">
          <Reveal className="section-heading">
            <h2 className="section-h2">Testimonials</h2>
            <p className="section-sub">Words from the people I work with.</p>
          </Reveal>
        </div>
        <TestimonialsMarquee />
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
