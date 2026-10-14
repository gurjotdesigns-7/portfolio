import { useEffect, useRef, useState } from 'react'

const PORTRAITS = [
  { emoji: 'brainstorming', photo: 9, position: '50% 45%', zoom: 1.2 },
  { emoji: 'idea', photo: 2, position: '50% 60%', zoom: 1 },
  { emoji: 'laptop', photo: 3, position: '50% 72%', zoom: 1 },
  { emoji: 'wireframes', photo: 5, position: '50% 85%', zoom: 1 },
  { emoji: 'thinking', photo: 8, position: '50% 20%', zoom: 1.15 },
  { emoji: 'notes', photo: 7, position: '50% 5%', zoom: 1 },
  { emoji: 'football', photo: 4, position: '50% 22%', zoom: 1.65 },
  { emoji: 'speaking', photo: 6, position: '50% 75%', zoom: 1 },
  { emoji: 'celebrating', photo: 1, position: '50% 62%', zoom: 1 },
]

// Rotate the outer eight cards around the centre, then return to their slots.
const DESTINATIONS = [2, 5, 8, 1, 4, 7, 0, 3, 6]

export default function HeroPortraitGrid() {
  const grid = useRef(null)
  const resumeTimer = useRef(null)
  const [manual, setManual] = useState(null)
  const [cycle, setCycle] = useState(0)
  const [resumeAt, setResumeAt] = useState(0)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [showPhotos, setShowPhotos] = useState(false)

  useEffect(() => {
    let active = true
    const photos = [...grid.current.querySelectorAll('img')]
    Promise.all(photos.map(img => img.decode().catch(() => undefined))).then(() => { if (active) setReady(true) })
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReduced(media.matches)
    media.addEventListener('change', updateMotion)
    let inView = true
    const updateVisibility = () => setVisible(inView && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updateVisibility() }, { threshold: .15 })
    observer.observe(grid.current)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => { active = false; observer.disconnect(); media.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', updateVisibility) }
  }, [])

  useEffect(() => () => clearTimeout(resumeTimer.current), [])

  function flipCards() {
    clearTimeout(resumeTimer.current)
    if (reduced) { setShowPhotos(v => !v); return }
    const flipper = grid.current.querySelector('.hs-card-flipper')
    const showingPhotos = manual ? manual === 'photos' : new DOMMatrixReadOnly(getComputedStyle(flipper).transform).m11 < 0
    const next = showingPhotos ? 'emojis' : 'photos'
    setManual(next)
    setCycle(v => v + 1)
    resumeTimer.current = setTimeout(() => {
      setResumeAt(next === 'photos' ? -5 : 0)
      setManual(null)
      setCycle(v => v + 1)
    }, 3000)
  }

  return <div className="hs-portrait-gallery">
    <button type="button" onClick={flipCards} ref={grid} className={`hs-emoji-grid hs-flip-grid${ready ? ' is-ready' : ''}${reduced ? ' is-reduced' : ''}${showPhotos ? ' show-photos' : ''}${manual ? ` manual-${manual}` : ''}`} style={{ '--play-state': !manual && (!visible || reduced) ? 'paused' : 'running', '--resume-at': `${resumeAt}s` }} aria-label="Flip between emoji cards and real photos">
      {PORTRAITS.map((p, i) => {
        const col = i % 3, row = Math.floor(i / 3), dest = DESTINATIONS[i]
        return <div className={`hs-emoji-tile hs-emoji-${p.emoji}`} key={`${p.emoji}-${cycle}`} style={{ '--dx': dest % 3 - col, '--dy': Math.floor(dest / 3) - row, '--cx': 1 - col, '--cy': 1 - row, '--twist': `${(i - 4) * 7}deg`, '--photo-position': p.position, '--photo-zoom': p.zoom }}>
          <div className="hs-card-flipper"><div className="hs-card-front"><img src={`/hero-emojis/${p.emoji}.png`} alt="" width="1280" height="1280" draggable="false" /></div><div className="hs-card-back"><img src={`/hero-photos-v2/photo-${p.photo}.jpg`} alt="" draggable="false" /></div></div>
        </div>
      })}
    </button>
  </div>
}
