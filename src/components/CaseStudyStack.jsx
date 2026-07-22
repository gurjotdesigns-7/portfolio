import { useEffect, useRef } from 'react'

/* ─── Sticky scroll-stack for case studies ───────────────────
   Adapted from the "Cards Almanac" reference template. Cards pin to
   the viewport via CSS position:sticky and pile on top of one
   another as you scroll; a rAF loop adds 3D depth (incoming cards
   incline and ease flat, buried cards recline/shrink/dim/tuck) and
   reveals each card's cover + copy once ~half of it is on screen.
   Same tunables as the reference (peekPx, gapVh, revealPx, tilts).
──────────────────────────────────────────────────────────────── */

const STACK = {
  baseVh:     5,     // floor: never pin a card higher than this
  peekPx:     44,    // how much of each earlier card peeks above the next
                     // (bumped so the stacked tops stay clearly visible as
                     //  the whole deck scrolls up past the viewport)
  revealPx:   480,   // distance over which an incoming card eases to "pinned"
  revealAt:   0.5,   // reveal a card once this fraction of it is on screen
  persp:      1500,  // 3D perspective (px) applied per card
  arriveTilt: 15,    // deg an incoming card is inclined as it rises (entrance only)
  // Buried cards stay FLAT and full-size so the fully-stacked pile reads as a
  // clean, equidistant deck (each card's top edge peeks by peekPx, evenly) —
  // no receding tilt, shrink, or upward tuck. The stack simply scrolls away
  // naturally as Playground rises in. A faint dim is the only depth cue.
  buriedTilt: 0,     // deg each buried card reclines back per card on top
  scaleStep:  0,     // how much each buried card shrinks per card on top
  dimStep:    0.015, // how much each buried card dims per card on top
  liftPx:     0,     // how much each buried card tucks up per card on top
}

const clampNum = (x, a, b) => Math.min(b, Math.max(a, x))

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function CaseStudyStack({ items }) {
  const cardRefs = useRef([])
  const liveRef = useRef(null)
  const progressRef = useRef(null)
  const dotRefs = useRef([])

  // Fade the side progress dots in only while at least one card is actually on
  // screen — watching the cards themselves (not a wrapping container that
  // includes the trailing tail spacer) so the indicator disappears the instant
  // the last card scrolls out, before Playground appears underneath it.
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    const nav = progressRef.current
    if (!cards.length || !nav) return
    const visible = new Set()
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = cards.indexOf(entry.target)
          if (entry.isIntersecting) visible.add(idx)
          else visible.delete(idx)
        })
        nav.classList.toggle('cs-progress--visible', visible.size > 0)
      },
      { threshold: 0 }
    )
    cards.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [items])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    const dots = dotRefs.current.filter(Boolean)
    const N = cards.length
    if (!N) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shown = new Array(N).fill(false)
    let restTops = []
    let cardH = 400
    let lastCur = -1
    let queued = false

    function layout() {
      const vh = window.innerHeight
      cardH = cards[0].offsetHeight
      // centre the pile: the middle card sits mid-viewport, the rest fan around it
      const centred = (vh - cardH) / 2 - ((N - 1) / 2) * STACK.peekPx
      const base = Math.max(centred, (STACK.baseVh / 100) * vh)
      restTops = cards.map((el, i) => {
        const t = Math.round(base + i * STACK.peekPx)
        el.style.setProperty('--top', t + 'px')
        return t
      })
    }

    function update() {
      queued = false
      const vh = window.innerHeight
      const revealLine = vh - STACK.revealAt * cardH
      const hideLine = vh - 0.04 * cardH
      const risen = []
      const tops = []

      cards.forEach((el, i) => {
        const top = el.getBoundingClientRect().top
        tops[i] = top
        risen[i] = clampNum((restTops[i] + STACK.revealPx - top) / STACK.revealPx, 0, 1)
      })

      let suffix = 0
      for (let i = N - 1; i >= 0; i--) {
        const b = suffix
        const el = cards[i]
        if (reduce) {
          el.style.transform = ''
          el.style.filter = ''
        } else {
          const rx = STACK.arriveTilt * (1 - risen[i]) - STACK.buriedTilt * b
          el.style.transform =
            `perspective(${STACK.persp}px) translateY(${(-b * STACK.liftPx).toFixed(2)}px) rotateX(${rx.toFixed(2)}deg) scale(${(1 - STACK.scaleStep * b).toFixed(4)})`
          el.style.filter = `brightness(${(1 - STACK.dimStep * b).toFixed(4)})`
        }
        el.style.zIndex = String(10 + i)

        if (!shown[i] && tops[i] <= revealLine) {
          el.classList.add('cs-stack-card--in')
          shown[i] = true
        } else if (shown[i] && tops[i] >= hideLine) {
          el.classList.remove('cs-stack-card--in')
          shown[i] = false
        }
        suffix += risen[i]
      }

      const cur = clampNum(Math.round(risen.reduce((a, r) => a + r, 0)), 1, N)
      if (cur !== lastCur) {
        lastCur = cur
        if (liveRef.current) liveRef.current.textContent = `Case study ${cur} of ${N}`
        dots.forEach((dot, i) => dot.classList.toggle('cs-progress-dot--active', i === cur - 1))
      }
    }

    function onScroll() {
      if (!queued) { queued = true; requestAnimationFrame(update) }
    }

    // iOS/iPadOS fires `resize` on rotation before window.innerHeight has
    // settled to its final post-rotation value (the toolbar is still
    // animating in/out), so layout() can bake in a stale viewport height and
    // never correct itself — the stack's sticky offsets end up sized for the
    // old orientation, which can push/cover whatever comes after it
    // (Testimonials). Re-running layout+update a beat after orientation
    // change catches the settled dimensions.
    let orientationTimer = null
    function onOrientationChange() {
      clearTimeout(orientationTimer)
      orientationTimer = setTimeout(() => { layout(); update() }, 300)
    }

    layout()
    update()
    window.addEventListener('resize', layout)
    window.addEventListener('resize', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('orientationchange', onOrientationChange)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onOrientationChange)
    }

    return () => {
      window.removeEventListener('resize', layout)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('orientationchange', onOrientationChange)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', onOrientationChange)
      }
      clearTimeout(orientationTimer)
    }
  }, [items])

  return (
    <>
      <nav className="cs-progress" ref={progressRef} aria-hidden="true">
        {items.map((_, i) => (
          <span
            key={i}
            className={`cs-progress-dot${i === 0 ? ' cs-progress-dot--active' : ''}`}
            ref={(el) => { dotRefs.current[i] = el }}
          />
        ))}
      </nav>
      <div className="cs-stack">
      {items.map((item, i) => (
        <article
          className="cs-stack-card"
          key={item.title}
          ref={(el) => { cardRefs.current[i] = el }}
        >
          <a
            className="cs-stack-card__link"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View case study: ${item.title}`}
          >
            <div className="cs-stack-card__media">
              <div className="cs-stack-card__cover" style={{ backgroundImage: `url("${item.image}")` }} />
              {item.hero && (
                <span className="cs-stack-card__hero-tag">
                  <span className="cs-stack-card__hero-star" aria-hidden="true">★</span>
                  <span className="cs-stack-card__hero-label">Hero Project</span>
                </span>
              )}
            </div>
            <div className="cs-stack-card__body">
              <p className="cs-stack-card__eyebrow">{item.eyebrow}</p>
              <h3 className="cs-stack-card__title">{item.title}</h3>
              <p className="cs-stack-card__text">{item.body}</p>
              <div className="cs-stack-card__foot">
                <span className="cs-stack-card__cta">
                  View case study
                  <ArrowIcon />
                </span>
              </div>
            </div>
          </a>
        </article>
      ))}
      <div className="cs-stack-tail" aria-hidden="true" />
      <p className="cs-stack-sr" ref={liveRef} aria-live="polite" />
      </div>
    </>
  )
}
