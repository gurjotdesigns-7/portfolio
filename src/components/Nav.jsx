export default function Nav({ page, navigate }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleNav = (target) => {
    if (page !== 'home') {
      navigate('home')
      // wait for page change before scrolling
      setTimeout(() => scrollTo(target), 60)
    } else {
      if (target === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
      else scrollTo(target)
    }
  }

  return (
    <nav className="nav-pill-wrap">
      <div className="nav-pill">
        <button className="nav-pill-link" onClick={() => handleNav('top')}>Home</button>
        <button className="nav-pill-link" onClick={() => handleNav('work')}>Work</button>
        <button className="nav-pill-link" onClick={() => handleNav('playground')}>Playground</button>
        <button className="nav-pill-link" onClick={() => handleNav('contact')}>Contact</button>
      </div>
    </nav>
  )
}
