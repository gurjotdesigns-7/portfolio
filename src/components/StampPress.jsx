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
    <svg className="stamp-press-tool" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="stamp-wood" x2=".8" y2="1">
          <stop stopColor="#d7a575" /><stop offset=".5" stopColor="#a76c44" /><stop offset="1" stopColor="#63402e" />
        </linearGradient>
      </defs>
      <g stroke="#543b2c" strokeWidth="2" strokeLinejoin="round">
        {/* The broad elliptical top and offset handle show the circular tool from above. */}
        <ellipse cx="100" cy="115" rx="88" ry="75" fill="#332d29" />
        <path d="M14 113C20 158 63 187 107 184C148 182 181 156 186 119" fill="none" stroke="#92382e" strokeWidth="4" />
        <ellipse cx="100" cy="104" rx="88" ry="75" fill="url(#stamp-wood)" />
        <ellipse cx="100" cy="104" rx="78" ry="65" fill="none" stroke="#e4ba8b" strokeWidth="2" />
        <path d="M39 124Q94 162 159 121M37 138Q96 175 153 138" fill="none" stroke="#6b442e" opacity=".3" />
        <ellipse cx="107" cy="108" rx="37" ry="28" fill="#543b2c" opacity=".25" stroke="none" />
        <path d="M62 52L70 108C74 128 119 132 126 111L115 49Z" fill="url(#stamp-wood)" />
        <path d="M72 66L79 108" fill="none" stroke="#e1b280" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="87" cy="48" rx="39" ry="32" fill="#825336" />
        <ellipse cx="84" cy="41" rx="38" ry="30" fill="url(#stamp-wood)" />
        <ellipse cx="84" cy="41" rx="29" ry="22" fill="none" stroke="#e3b88a" strokeWidth="2" />
        <path d="M63 34Q79 21 98 32" fill="none" stroke="#efd0a5" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  </div>
}
