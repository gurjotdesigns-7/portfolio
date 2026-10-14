import { useEffect, useRef, useState } from 'react'

export default function StampPress({ children }) {
  const root = useRef(null)
  const [pressed, setPressed] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPressed(true)
        observer.disconnect()
      }
    }, { threshold: .6 })
    observer.observe(root.current)
    return () => observer.disconnect()
  }, [])

  return <div ref={root} className={`award-stamp-cluster stamp-press${pressed ? ' is-pressed' : ''}`}>
    {children}
    <svg className="stamp-press-tool" viewBox="0 0 180 220" aria-hidden="true">
      <g stroke="#49352d" strokeWidth="2" strokeLinejoin="round">
        <path d="M68 112L73 73C51 63 49 29 68 17Q90 3 112 17C131 29 129 63 107 73L112 112Z" fill="#99613e" />
        <path d="M77 27Q61 42 77 59M82 78L79 104" fill="none" stroke="#d9ac7b" strokeWidth="5" strokeLinecap="round" />
        <path d="M69 110H111L128 138H52Z" fill="#b7794b" />
        <rect x="22" y="135" width="136" height="32" rx="8" fill="#754b37" />
        <path d="M29 143H150" stroke="#c2966d" strokeWidth="3" />
        <rect x="27" y="165" width="126" height="15" rx="3" fill="#32302d" />
        <path d="M30 179H150" stroke="#92382e" strokeWidth="4" />
      </g>
    </svg>
  </div>
}
