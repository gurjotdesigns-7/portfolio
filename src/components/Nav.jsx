import { useEffect, useState } from 'react'

export default function Nav({ page, navigate }) {
  const [active, setActive] = useState('top')

  useEffect(() => {
    if (page !== 'home') return

    // Ordered top → bottom so the last section that has entered the viewport wins
    const sections = [
      { id: 'work',         label: 'work' },
      { id: 'playground',   label: 'playground' },
      { id: 'testimonials', label: 'contact' },
      { id: 'contact',      label: 'contact' },
    ]

    const observers = []

    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActive('top')
        return
      }

      // Walk top→bottom; every section whose top edge has passed 45% down
      // the viewport overwrites current — so the deepest visible section wins
      let current = 'work'
      for (const { id, label } of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.45) {
          current = label
        }
      }
      setActive(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // run once on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observers.forEach(o => o.disconnect())
    }
  }, [page])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleNav = (target) => {
    if (page !== 'home') {
      navigate('home')
      setTimeout(() => scrollTo(target), 60)
    } else {
      if (target === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
      else scrollTo(target)
    }
  }

  return (
    <nav className="nav-pill-wrap">
      {page === 'mojspot' && (
        <button className="nav-back-btn" onClick={() => navigate('home')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11L5 7l4-4"/>
          </svg>
          Back to work
        </button>
      )}
      <div className="nav-pill">
        <button
          className={`nav-pill-link${active === 'top' ? ' nav-pill-active' : ''}`}
          onClick={() => handleNav('top')}
        >Home</button>
        <button
          className={`nav-pill-link${active === 'work' ? ' nav-pill-active' : ''}`}
          onClick={() => handleNav('work')}
        >Work</button>
        <button
          className={`nav-pill-link${active === 'playground' ? ' nav-pill-active' : ''}`}
          onClick={() => handleNav('playground')}
        >Playground</button>
        <button
          className={`nav-pill-link${active === 'contact' ? ' nav-pill-active' : ''}`}
          onClick={() => handleNav('contact')}
        >Contact</button>
      </div>
    </nav>
  )
}
