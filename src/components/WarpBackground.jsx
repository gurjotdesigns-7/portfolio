import { useMemo } from 'react'

/* ─── Warp Background ────────────────────────────────────
   A 3D perspective "tunnel" of four grid planes with light beams streaking up
   each side. Adapted from the shadcn/motion WarpBackground component to this
   project's plain-JSX + hand-written-CSS stack: the beams animate with a CSS
   @keyframe (no motion/react), and the accents are RED instead of random hues.
   All the heavy lifting (perspective, container-query units, plane rotations)
   lives in the .warp-* CSS. */

function Beam({ x, delay, duration, aspect }) {
  // RED, BLUE (from the winner badge) and the brand PURPLE — kept very light.
  const p = Math.random()
  const hue = p < 0.34
    ? Math.floor(Math.random() * 20) - 6   // red
    : p < 0.67
      ? 216 + Math.floor(Math.random() * 22) // blue
      : 248 + Math.floor(Math.random() * 12) // brand purple
  return (
    <div
      className="warp-beam"
      style={{
        '--x': x,
        '--aspect': aspect,
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--beam-color': `hsl(${hue} 85% 62%)`,
      }}
    />
  )
}

export default function WarpBackground({
  children,
  perspective = 100,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  className = '',
  gridColor = 'rgba(255,255,255,0.09)',
}) {
  const genBeams = () => {
    const beams = []
    const cellsPerSide = Math.floor(100 / beamSize)
    const step = cellsPerSide / beamsPerSide
    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step)
      const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin
      const aspect = Math.floor(Math.random() * 10) + 1
      beams.push({ x, delay, aspect })
    }
    return beams
  }
  const sides = [
    ['warp-side warp-top', useMemo(genBeams, [])],
    ['warp-side warp-bottom', useMemo(genBeams, [])],
    ['warp-side warp-left', useMemo(genBeams, [])],
    ['warp-side warp-right', useMemo(genBeams, [])],
  ]

  return (
    <div className={`warp-bg ${className}`}>
      <div
        className="warp-scene"
        aria-hidden="true"
        style={{
          '--perspective': `${perspective}px`,
          '--grid-color': gridColor,
          '--beam-size': `${beamSize}%`,
        }}
      >
        {sides.map(([cls, beams], si) => (
          <div key={si} className={cls}>
            {beams.map((b, i) => (
              <Beam
                key={i}
                x={`${b.x * beamSize}%`}
                aspect={b.aspect}
                delay={b.delay}
                duration={beamDuration}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="warp-content">{children}</div>
    </div>
  )
}
