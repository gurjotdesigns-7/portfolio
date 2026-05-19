import { useEffect } from 'react'

function useParallaxHeadings() {
  useEffect(() => {
    const update = () => {
      document.querySelectorAll('.cs-section-title').forEach(el => {
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2 - window.innerHeight / 2
        el.style.transform = `translateY(${center * 0.3}px)`
      })
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])
}

function BackArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ── Mobile screen mockups ── */

function FeedScreen() {
  return (
    <div className="mobile-frame">
      <div className="mf-notch" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 7, color: 'var(--text-muted)' }}>
        <span style={{ fontWeight: 700, color: 'var(--accent)' }}>Friend Zone</span>
        <span>Popular</span>
        <span style={{ marginLeft: 'auto' }}>Live</span>
      </div>
      <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
      <div style={{ fontSize: 7, color: 'var(--text-muted)' }}>You are offline</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 2 }}>
        <div style={{ background: 'var(--surface-3)', borderRadius: 6, padding: 6 }}>
          <div style={{ fontSize: 6.5, fontWeight: 700, color: 'var(--text)' }}>Audio Calls</div>
          <div style={{ fontSize: 6, color: 'var(--text-muted)' }}>Earn ₹250</div>
        </div>
        <div style={{ background: 'var(--surface-3)', borderRadius: 6, padding: 6 }}>
          <div style={{ fontSize: 6.5, fontWeight: 700, color: 'var(--text)' }}>Video Calls</div>
          <div style={{ fontSize: 6, color: 'var(--text-muted)' }}>Earn ₹500</div>
        </div>
      </div>
      <div style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: 6, padding: 6, marginTop: 4 }}>
        <div style={{ fontSize: 7, fontWeight: 700, color: 'var(--accent)' }}>Invite friends</div>
        <div style={{ fontSize: 6.5, color: 'var(--text-secondary)' }}>Win 500 gems</div>
      </div>
      <div style={{ fontSize: 6.5, fontWeight: 700, color: 'var(--text-secondary)', marginTop: 4 }}>Call History</div>
      <div className="mf-bar w100" />
      <div className="mf-bar w80" />
      <div className="mf-bar w65" />
    </div>
  )
}

function ReferralPageScreen() {
  return (
    <div className="mobile-frame">
      <div className="mf-notch" />
      <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
        Invite a friend<br/>& win 500 gems
      </div>
      <div style={{ fontSize: 6.5, color: 'var(--text-muted)', marginTop: 2 }}>Referral History</div>
      <div className="mf-divider" />
      <div style={{ fontSize: 6.5, fontWeight: 700, color: 'var(--text-secondary)' }}>How it works</div>
      <div style={{ fontSize: 6, color: 'var(--text-muted)', lineHeight: 1.5 }}>
        1. Share your code<br/>
        2. Friend signs up as host<br/>
        3. They take 3 calls<br/>
        4. You earn 500 gems
      </div>
      <div style={{ background: 'var(--surface-3)', border: '1px dashed var(--border-light)', borderRadius: 6, padding: 6, marginTop: 4 }}>
        <div style={{ fontSize: 6, color: 'var(--text-muted)' }}>Your Referral Code</div>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em' }}>ABC1234</div>
      </div>
      <div className="mf-btn" style={{ background: '#25D366' }}>Invite on WhatsApp</div>
    </div>
  )
}

function ClaimScreen() {
  return (
    <div className="mobile-frame" style={{ background: 'linear-gradient(180deg, var(--accent-dim) 0%, var(--surface-3) 100%)' }}>
      <div className="mf-notch" />
      <div style={{ fontSize: 8, color: 'var(--accent)', fontWeight: 700, textAlign: 'center', marginTop: 6 }}>Referral Magic!</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', textAlign: 'center', letterSpacing: '-0.03em', lineHeight: 1.1, marginTop: 4 }}>
        500 gems<br />won
      </div>
      <div style={{ fontSize: 6.5, color: 'var(--text-muted)', textAlign: 'center', marginTop: 4 }}>Congratulations</div>
      <div style={{ width: 50, height: 50, background: 'linear-gradient(135deg, var(--accent), var(--accent-light))', borderRadius: '50%', margin: '8px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
        💎
      </div>
      <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent)', textAlign: 'center', letterSpacing: '-0.04em' }}>500</div>
      <div className="mf-btn" style={{ marginTop: 'auto' }}>Claim</div>
    </div>
  )
}

function LeaderboardScreen() {
  return (
    <div className="mobile-frame">
      <div className="mf-notch" />
      <div style={{ fontSize: 8, fontWeight: 700, color: 'var(--text)' }}>Leaderboard</div>
      <div style={{ fontSize: 6, color: 'var(--text-muted)' }}>Top 3 win 1000 gems</div>
      <div className="mf-divider" />
      {[
        { rank: 1, name: 'Riya Sharma', count: 27, gems: 5000 },
        { rank: 2, name: 'Priya', count: 25, gems: 4500 },
        { rank: 3, name: 'Bhoomi P.', count: 22, gems: 4500 },
        { rank: 4, name: 'Neha M.', count: 20, gems: 3000 },
      ].map(r => (
        <div key={r.rank} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 5px', background: r.rank <= 3 ? 'var(--accent-dim)' : 'transparent', borderRadius: 4, border: r.rank <= 3 ? '1px solid var(--accent-border)' : 'none' }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: r.rank <= 3 ? 'var(--accent)' : 'var(--text-muted)', minWidth: 8 }}>{r.rank}</div>
          <div style={{ fontSize: 6.5, color: 'var(--text)', flex: 1 }}>{r.name}</div>
          <div style={{ fontSize: 6, color: 'var(--text-muted)' }}>{r.count}</div>
          <div style={{ fontSize: 6, color: 'var(--accent)', fontWeight: 700 }}>{r.gems}</div>
        </div>
      ))}
      <div style={{ fontSize: 5.5, color: 'var(--text-muted)', textAlign: 'center', marginTop: 'auto' }}>
        1 day left · Refreshes monthly
      </div>
    </div>
  )
}

function StarterChallengeIntro() {
  return (
    <div className="mobile-frame">
      <div className="mf-notch" />
      <div style={{ fontSize: 7, color: 'var(--text-muted)', fontWeight: 700 }}>Starter Challenge</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.1, marginTop: 4 }}>
        Take 50 Calls,<br/>Earn up to<br/>
        <span style={{ color: 'var(--accent)' }}>12,500 Gems</span>
      </div>
      <div style={{ fontSize: 6, color: 'var(--text-muted)', marginTop: 4 }}>Take 50 calls in 7 days · 3+ mins each</div>
      <div className="mf-divider" />
      <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
        {[
          { calls: 12, gems: 5000 },
          { calls: 25, gems: 7500 },
          { calls: 50, gems: 12500 },
        ].map(s => (
          <div key={s.calls} style={{ flex: 1, background: 'var(--surface-3)', borderRadius: 5, padding: 4, textAlign: 'center' }}>
            <div style={{ fontSize: 7, fontWeight: 700, color: 'var(--text)' }}>{s.calls}</div>
            <div style={{ fontSize: 5, color: 'var(--text-muted)' }}>calls</div>
            <div style={{ fontSize: 6, color: 'var(--accent)', fontWeight: 700, marginTop: 2 }}>{s.gems}</div>
          </div>
        ))}
      </div>
      <div className="mf-btn" style={{ marginTop: 'auto' }}>Go online to start</div>
    </div>
  )
}

function MilestoneScreen({ progress, label, gems }) {
  return (
    <div className="mobile-frame" style={{ background: 'linear-gradient(180deg, var(--accent-dim) 0%, var(--surface-3) 100%)' }}>
      <div className="mf-notch" />
      <div style={{ fontSize: 7, color: 'var(--accent)', fontWeight: 700, textAlign: 'center', marginTop: 4 }}>Starter Challenge</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', textAlign: 'center', letterSpacing: '-0.04em', lineHeight: 1, marginTop: 6 }}>
        {progress}
      </div>
      <div style={{ fontSize: 6.5, color: 'var(--text-muted)', textAlign: 'center' }}>Calls</div>
      <div style={{ height: 6, background: 'var(--surface-3)', borderRadius: 3, margin: '6px 4px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, width: progress.split('/')[0] === progress.split('/')[1] ? '100%' : '50%', background: 'linear-gradient(90deg, var(--accent), var(--accent-light))', borderRadius: 3 }} />
      </div>
      <div style={{ fontSize: 7, fontWeight: 700, color: 'var(--text)', textAlign: 'center', marginTop: 4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)', textAlign: 'center', letterSpacing: '-0.04em', marginTop: 'auto' }}>{gems}</div>
      <div style={{ fontSize: 5.5, color: 'var(--text-muted)', textAlign: 'center' }}>Bonus Gems Earned</div>
      <div className="mf-btn">Continue challenge</div>
    </div>
  )
}

function VibelyHomeScreen() {
  return (
    <div className="mobile-frame">
      <div className="mf-notch" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>Vibely</span>
        <span style={{ fontSize: 6, color: 'var(--text-muted)', marginLeft: 'auto' }}>Audio</span>
      </div>
      <div style={{ background: 'linear-gradient(135deg, var(--accent-dim), transparent)', border: '1px solid var(--accent-border)', borderRadius: 8, padding: 8 }}>
        <div style={{ fontSize: 7, fontWeight: 700, color: 'var(--accent)' }}>Starter Challenge</div>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--text)', lineHeight: 1.1, marginTop: 2 }}>
          Earn up to<br/>12,500 Bonus<br/>Gems in 7 days!
        </div>
        <div style={{ fontSize: 6, color: 'var(--text-muted)', marginTop: 4 }}>Go online to start</div>
      </div>
      <div style={{ fontSize: 6.5, fontWeight: 700, color: 'var(--text-secondary)' }}>Watch these to learn more</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
        {['How to go online', 'How to earn gems', 'How to withdraw'].map(t => (
          <div key={t} style={{ background: 'var(--surface-3)', borderRadius: 4, padding: 4, fontSize: 5, color: 'var(--text-muted)', textAlign: 'center' }}>{t}</div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', gap: 4, padding: '4px 6px', background: 'var(--surface-3)', borderRadius: 6, justifyContent: 'space-around' }}>
        <div style={{ fontSize: 6, color: 'var(--accent)', fontWeight: 700 }}>Home</div>
        <div style={{ fontSize: 6, color: 'var(--text-muted)' }}>Calls</div>
      </div>
    </div>
  )
}

export default function CaseStudyReferral({ navigate }) {
  useParallaxHeadings()
  return (
    <div className="cs-page">
      <div className="container">
        <button className="cs-back" onClick={() => navigate('home')}>
          <BackArrow /> Back to work
        </button>

        {/* Hero */}
        <section className="cs-hero">
          <div className="cs-eyebrow">
            <span className="eyebrow-tag">Case Study</span>
            <span className="eyebrow-divider" />
            <span className="eyebrow-meta">ShareChat · Vibely · 2024</span>
            <span className="eyebrow-divider" />
            <span className="eyebrow-meta">Product Design · Strategy · User Journey · Scalability</span>
          </div>
          <h1 className="cs-title">
            Referral & Starter Challenge<br />Growth System
          </h1>
          <p className="cs-subtitle">
            Led the design of a two-part growth system: a referral program that
            motivates existing hosts to invite friends, and a starter challenge that
            activates new hosts in their first 7 days. Originally for FriendZone — later
            scaled to Vibely.
          </p>

          {/* Metrics */}
          <div className="metrics-strip">
            <div className="metric-item">
              <div className="metric-value">82.6%</div>
              <div className="metric-label">Hosts took their first call</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">36.2%</div>
              <div className="metric-label">Completed 10 calls (3 min+) by D7</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">22.1%</div>
              <div className="metric-label">Completed 25 calls (3 min+) by D7</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">11%</div>
              <div className="metric-label">Completed 50 calls (3 min+) by D7</div>
            </div>
          </div>

          {/* Secondary metrics row */}
          <div className="metrics-strip" style={{ marginTop: 0, gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="metric-item">
              <div className="metric-value" style={{ fontSize: 22 }}>92.3%</div>
              <div className="metric-label">Valid onboarding details collected</div>
            </div>
            <div className="metric-item">
              <div className="metric-value" style={{ fontSize: 22 }}>83.3%</div>
              <div className="metric-label">Hosts became active after sign-up</div>
            </div>
            <div className="metric-item">
              <div className="metric-value" style={{ fontSize: 22 }}>203</div>
              <div className="metric-label">Users referred 1 host each</div>
            </div>
            <div className="metric-item">
              <div className="metric-value" style={{ fontSize: 22 }}>13–15</div>
              <div className="metric-label">Top referrers brought 13–15 hosts each</div>
            </div>
          </div>

          {/* Info grid */}
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-label">Goals</div>
              <ul>
                <li>Increase new host onboarding via referrals</li>
                <li>Improve D0–D7 activation and early call depth</li>
                <li>Build motivation loops that sustain engagement</li>
                <li>Make the system scalable across product ecosystems</li>
              </ul>
            </div>
            <div className="info-card">
              <div className="info-card-label">Constraints</div>
              <ul>
                <li>Must work within existing design systems (FZ + Vibely)</li>
                <li>Extremely fast turnaround for launch</li>
                <li>Limited engineering bandwidth initially</li>
                <li>Zero disruption to existing call workflows</li>
              </ul>
            </div>
            <div className="info-card">
              <div className="info-card-label">My Role</div>
              <ul>
                <li>Lead product design for referral & starter challenge systems</li>
                <li>User journey mapping and interaction design</li>
                <li>Scalable framework across FriendZone & Vibely</li>
                <li>Worked with PMs, engineers, and growth teams to define metrics</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PART I — Referral Program */}
        <section className="cs-section">
          <div className="step-label">
            <div className="step-number">I</div>
            <span className="step-name">Part 1 — Referral Program</span>
          </div>
          <h2 className="cs-section-title">Turning hosts into<br />distribution channels</h2>
          <p className="cs-section-desc">
            Referral traffic existed, but the experience around inviting friends and
            redeeming rewards lacked clarity. The redesign introduces a frictionless
            sender flow and a transparent receiver flow with reward tracking at every step.
          </p>

          {/* Sender's Flow */}
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)', marginTop: 32, marginBottom: 20 }}>
            Sender's flow — existing hosts inviting friends
          </div>
          <div className="screens-row">
            <div className="screen-card">
              <div className="screen-visual"><FeedScreen /></div>
              <div className="screen-caption"><strong>Invite Friends Card</strong> — entry point integrated into the host feed for max discoverability</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual"><ReferralPageScreen /></div>
              <div className="screen-caption"><strong>Referral Page</strong> — clear reward mechanics & high-visibility WhatsApp share CTA</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual">
                <div className="mobile-frame" style={{ background: 'linear-gradient(180deg, #DCF8C6 0%, var(--surface-3) 30%)' }}>
                  <div className="mf-notch" style={{ background: 'rgba(0,0,0,0.1)' }} />
                  <div style={{ background: 'white', borderRadius: 8, padding: 6, marginTop: 4, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ fontSize: 7, fontWeight: 700, color: '#075E54' }}>Join and win</div>
                    <div style={{ fontSize: 8, fontWeight: 800, color: '#075E54' }}>500 gems</div>
                    <div style={{ fontSize: 6, color: '#333', lineHeight: 1.4, marginTop: 4 }}>
                      Hey! I'm making money on Friend Zone. Earn up to ₹50,000/month talking to people. Use my code <strong>ABCD123</strong>.
                    </div>
                    <div style={{ fontSize: 5, color: '#888', marginTop: 4, textAlign: 'right' }}>3:45 PM</div>
                  </div>
                </div>
              </div>
              <div className="screen-caption"><strong>WhatsApp Share</strong> — pre-formatted message optimised for conversion</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual">
                <div className="mobile-frame">
                  <div className="mf-notch" />
                  <div style={{ fontSize: 7, fontWeight: 700, color: 'var(--text)' }}>Referral History</div>
                  <div className="mf-divider" />
                  {[
                    { name: 'Sneha S.', status: 'Earned 500 gems', date: '11/12/23' },
                    { name: 'Aakriti S.', status: 'Completed 5 paid calls', date: '8/12/23' },
                    { name: 'Chndn', status: 'Became a host', date: '5/12/23' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '3px 0', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 6.5, fontWeight: 700, color: 'var(--text)' }}>{item.name}</span>
                        <span style={{ fontSize: 5.5, color: 'var(--text-muted)' }}>{item.date}</span>
                      </div>
                      <div style={{ fontSize: 5.5, color: 'var(--accent)' }}>{item.status}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="screen-caption"><strong>Referral History</strong> — transparent tracker reduces support queries</div>
            </div>
          </div>

          {/* Sender impact */}
          <div style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: 'var(--radius)', padding: 20, marginTop: 24, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: 4 }}>IMPACT HIGHLIGHT</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Referral page redesign → +15–20% lift in share-CTA interaction</div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: 4 }}>IMPACT HIGHLIGHT</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>WhatsApp share message → +12–18% sign-up start-rate</div>
            </div>
          </div>

          {/* Claim screens */}
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)', marginTop: 48, marginBottom: 20 }}>
            Sender's flow — earning the reward
          </div>
          <div className="screens-row" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: 540 }}>
            <div className="screen-card">
              <div className="screen-visual">
                <div className="mobile-frame" style={{ height: 100, justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: 8 }}>
                    <div style={{ width: 24, height: 24, background: 'var(--accent)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white' }}>💎</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 7.5, fontWeight: 700, color: 'var(--text)' }}>500 gems won!</div>
                      <div style={{ fontSize: 6, color: 'var(--text-muted)' }}>Redeem your bonus now</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="screen-caption"><strong>Notification</strong> — contextual nudge that leads to claim</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual"><ClaimScreen /></div>
              <div className="screen-caption"><strong>Claim Winnings</strong> — gratifying reward experience with clear CTA</div>
            </div>
          </div>
        </section>

        {/* Receiver's Flow */}
        <section className="cs-section">
          <div className="step-label">
            <div className="step-number">II</div>
            <span className="step-name">Part 1 — Receiver's Flow</span>
          </div>
          <h2 className="cs-section-title">Capturing referrals at sign-up,<br />guiding new hosts to first calls</h2>
          <p className="cs-section-desc">
            For the new host, the referral code is captured up-front during onboarding,
            and the reward mechanic is reinforced through nudges, progress tracking,
            and celebratory claim screens — turning referral traffic into activated hosts.
          </p>

          <div className="screens-row">
            <div className="screen-card">
              <div className="screen-visual">
                <div className="mobile-frame">
                  <div className="mf-notch" />
                  <div style={{ fontSize: 8, fontWeight: 700, color: 'var(--text)' }}>Create profile</div>
                  <div className="mf-input"><span className="mf-input-text">Your name</span></div>
                  <div className="mf-input" style={{ marginTop: 3 }}><span className="mf-input-text">+91 phone number</span></div>
                  <div style={{ display: 'flex', gap: 3, marginTop: 3 }}>
                    <div style={{ flex: 1, padding: '3px 6px', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: 4, fontSize: 6, color: 'var(--accent)', textAlign: 'center' }}>Male</div>
                    <div style={{ flex: 1, padding: '3px 6px', background: 'var(--surface-3)', borderRadius: 4, fontSize: 6, color: 'var(--text-muted)', textAlign: 'center' }}>Female</div>
                  </div>
                  <div className="mf-input" style={{ marginTop: 3, background: 'var(--accent-dim)', borderColor: 'var(--accent-border)' }}>
                    <span className="mf-input-text" style={{ color: 'var(--accent)' }}>ABC1234</span>
                  </div>
                  <div style={{ fontSize: 5.5, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    Use friend's code: you both get 100 gems each
                  </div>
                  <div className="mf-btn">Create account</div>
                </div>
              </div>
              <div className="screen-caption"><strong>Sign-up</strong> — referral code captured with clear value prop</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual"><FeedScreen /></div>
              <div className="screen-caption"><strong>Host Feed</strong> — task prompt for the referral challenge</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual">
                <div className="mobile-frame">
                  <div className="mf-notch" />
                  <div style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: 6, padding: 8 }}>
                    <div style={{ fontSize: 7, fontWeight: 700, color: 'var(--accent)' }}>Referral Bonus</div>
                    <div style={{ fontSize: 8, fontWeight: 700, color: 'var(--text)', marginTop: 2, lineHeight: 1.2 }}>
                      Go online and<br/>take 3 calls to win<br/>500 gems!
                    </div>
                  </div>
                  <div style={{ fontSize: 6.5, fontWeight: 700, color: 'var(--text-secondary)', marginTop: 4 }}>Referral Task</div>
                  <div style={{ height: 5, background: 'var(--surface-3)', borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, width: '0%', background: 'var(--accent)' }} />
                  </div>
                  <div style={{ fontSize: 6, color: 'var(--text-muted)' }}>0 / 3 calls</div>
                  <div className="mf-btn" style={{ marginTop: 'auto' }}>Go online</div>
                </div>
              </div>
              <div className="screen-caption"><strong>Bonus Instruction</strong> — educates new host about reward mechanics</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual">
                <div className="mobile-frame">
                  <div className="mf-notch" />
                  <div style={{ fontSize: 7, fontWeight: 700, color: 'var(--accent)' }}>Referral task completed!</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--text)', marginTop: 2 }}>500 gems won</div>
                  <div style={{ fontSize: 6.5, fontWeight: 700, color: 'var(--text-secondary)', marginTop: 6 }}>Referral Task</div>
                  <div style={{ height: 5, background: 'var(--surface-3)', borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--accent), var(--accent-light))' }} />
                  </div>
                  <div style={{ fontSize: 6, color: 'var(--accent)', fontWeight: 700 }}>3 / 3 calls ✓</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)', textAlign: 'center', marginTop: 'auto' }}>500</div>
                  <div style={{ fontSize: 6, color: 'var(--text-muted)', textAlign: 'center' }}>Congratulations</div>
                  <div className="mf-btn">Claim</div>
                </div>
              </div>
              <div className="screen-caption"><strong>Claim Winnings</strong> — completes the referral loop & motivates further engagement</div>
            </div>
          </div>
        </section>

        {/* Adding competition */}
        <section className="cs-section">
          <div className="step-label">
            <div className="step-number">III</div>
            <span className="step-name">Layering Competition</span>
          </div>
          <h2 className="cs-section-title">Leaderboard turned high performers<br />into power referrers</h2>
          <p className="cs-section-desc">
            Once the base referral system was working, we added a leaderboard to surface
            the top-50 referrers each month. Top performers got personalised shareable
            splash cards as rewards — turning the most engaged hosts into amplifiers.
          </p>

          <div className="decision-grid">
            <div className="decision-card">
              <div className="decision-card-num">DECISION 01</div>
              <div className="decision-card-title">Visible widget on referral page</div>
              <div className="decision-card-desc">
                A leaderboard widget appears directly on the referral page so hosts see
                where they stand without navigating elsewhere. Tapping shows the full top-50.
              </div>
            </div>
            <div className="decision-card">
              <div className="decision-card-num">DECISION 02</div>
              <div className="decision-card-title">30-day reset cycle</div>
              <div className="decision-card-desc">
                The leaderboard refreshes every 30 days, giving every host a fresh chance
                to climb. Prevents the system from feeling locked-in for long-term winners.
              </div>
            </div>
            <div className="decision-card">
              <div className="decision-card-num">DECISION 03</div>
              <div className="decision-card-title">Personalised splash cards as rewards</div>
              <div className="decision-card-desc">
                Top-ranked hosts get a personalised shareable splash card at the end of
                each cycle — turning recognition into a viral loop and increasing social sharing.
              </div>
            </div>
            <div className="decision-card">
              <div className="decision-card-num">DECISION 04</div>
              <div className="decision-card-title">Onboarding video introduces leaderboard</div>
              <div className="decision-card-desc">
                The leaderboard is introduced upfront in the onboarding video, so even
                first-day hosts know the competitive layer exists.
              </div>
            </div>
          </div>

          <div className="screens-row" style={{ marginTop: 32, gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: 540 }}>
            <div className="screen-card">
              <div className="screen-visual"><LeaderboardScreen /></div>
              <div className="screen-caption"><strong>Leaderboard</strong> — top 50 referrers visible with refresh date</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual">
                <div className="mobile-frame" style={{ background: 'linear-gradient(180deg, var(--accent-dim) 0%, var(--surface-3) 100%)' }}>
                  <div className="mf-notch" />
                  <div style={{ fontSize: 7, fontWeight: 700, color: 'var(--accent)', textAlign: 'center', marginTop: 4 }}>Congratulations!</div>
                  <div style={{ fontSize: 6, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.4 }}>You made the highest number of referrals in the last 30 days</div>
                  <div style={{ width: 50, height: 50, background: 'linear-gradient(135deg, #FFD700, #FFA500)', borderRadius: '50%', margin: '8px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                    👑
                  </div>
                  <div style={{ fontSize: 7, fontWeight: 700, color: 'var(--text)', textAlign: 'center' }}>#1 Pooja Verma</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent)', textAlign: 'center', marginTop: 4 }}>1000</div>
                  <div style={{ fontSize: 5.5, color: 'var(--text-muted)', textAlign: 'center' }}>Reward Gems</div>
                  <div className="mf-btn" style={{ marginTop: 'auto' }}>Share Achievement</div>
                </div>
              </div>
              <div className="screen-caption"><strong>Splash Card</strong> — personalised shareable reward for top-50</div>
            </div>
          </div>

          <div style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: 'var(--radius)', padding: 20, marginTop: 24, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { tag: 'IMPACT', text: 'Leaderboard proposal → +30–40% weekly referrals' },
              { tag: 'IMPACT', text: 'Top-50 hosts → 2× higher call consistency' },
              { tag: 'IMPACT', text: 'Splash cards → +15–20% social sharing' },
            ].map(i => (
              <div key={i.text} style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: 4 }}>{i.tag}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{i.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PART II — Starter Challenge */}
        <section className="cs-section">
          <div className="step-label">
            <div className="step-number">IV</div>
            <span className="step-name">Part 2 — Starter Challenge</span>
          </div>
          <h2 className="cs-section-title">Designing early momentum<br />for new hosts</h2>
          <p className="cs-section-desc">
            Referrals brought hosts onto the platform — but new hosts often didn't know
            what meaningful activity looked like. The Starter Challenge structures the
            first 7 days into milestone-based rewards, building confidence and habits.
          </p>

          {/* Slabs visualisation */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 32 }}>
            {[
              { slab: 'Failed', range: '0–11 calls', reward: '—', dim: true },
              { slab: 'Slab 1', range: '12–24 calls', reward: '5,000 gems' },
              { slab: 'Slab 2', range: '25–49 calls', reward: '7,500 gems' },
              { slab: 'Slab 3', range: '50+ calls', reward: '12,500 gems', star: true },
            ].map((s, i) => (
              <div key={s.slab} style={{ background: s.star ? 'var(--accent-dim)' : 'var(--surface)', border: `1px solid ${s.star ? 'var(--accent-border)' : 'var(--border)'}`, borderRadius: 'var(--radius)', padding: 20, opacity: s.dim ? 0.55 : 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: s.star ? 'var(--accent)' : 'var(--text-muted)', marginBottom: 6 }}>{s.slab.toUpperCase()}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{s.range}</div>
                <div style={{ fontSize: 13, color: s.star ? 'var(--accent)' : 'var(--text-secondary)', fontWeight: s.star ? 700 : 500 }}>{s.reward}</div>
                {s.star && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>+ Star Host card on feed</div>}
              </div>
            ))}
          </div>

          <div className="screens-row" style={{ marginTop: 40 }}>
            <div className="screen-card">
              <div className="screen-visual"><StarterChallengeIntro /></div>
              <div className="screen-caption"><strong>Educational intro</strong> — sets clear expectations before the host begins</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual"><MilestoneScreen progress="12/50" label="Amazing Start, Rising Rockstar" gems="5,000" /></div>
              <div className="screen-caption"><strong>Slab 1 milestone</strong> — celebratory reinforcement after 12 calls</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual"><MilestoneScreen progress="25/50" label="Yaay! Halfway There Champ" gems="7,500" /></div>
              <div className="screen-caption"><strong>Slab 2 milestone</strong> — halfway to the top reward</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual"><MilestoneScreen progress="50/50" label="Congrats! You did it like a boss" gems="12,500" /></div>
              <div className="screen-caption"><strong>Slab 3 milestone</strong> — top reward with most gratifying animation</div>
            </div>
          </div>
        </section>

        {/* Scaling to Vibely */}
        <section className="cs-section">
          <div className="step-label">
            <div className="step-number">V</div>
            <span className="step-name">Scaling to Vibely</span>
          </div>
          <h2 className="cs-section-title">Same incentive system,<br />native to a new product</h2>
          <p className="cs-section-desc">
            Vibely launched as a specialised 1-on-1 calling app. The challenge was to
            preserve the behavioural incentives of FriendZone's growth system while
            making everything feel native to Vibely's design language. Tutorial videos
            were added so first-time users could learn platform mechanics quickly.
          </p>
          <div className="screens-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: 720, marginTop: 32 }}>
            <div className="screen-card">
              <div className="screen-visual"><VibelyHomeScreen /></div>
              <div className="screen-caption"><strong>Vibely home</strong> — challenge front-and-centre with tutorial videos</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual">
                <div className="mobile-frame">
                  <div className="mf-notch" />
                  <div style={{ fontSize: 7, fontWeight: 700, color: 'var(--accent)' }}>Starter Challenge</div>
                  <div style={{ fontSize: 6, color: 'var(--text-muted)' }}>7d 23h left</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2, marginTop: 4 }}>
                    Answer calls to earn up to 12,500 bonus Gems
                  </div>
                  <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
                    {[{c:'12 calls',g:'5000',d:true},{c:'25 calls',g:'7500'},{c:'50 calls',g:'12500'}].map(s => (
                      <div key={s.c} style={{ flex: 1, background: s.d ? 'var(--accent-dim)' : 'var(--surface-3)', border: s.d ? '1px solid var(--accent-border)' : '1px solid var(--border)', borderRadius: 4, padding: 4, textAlign: 'center' }}>
                        <div style={{ fontSize: 6, fontWeight: 700, color: 'var(--text)' }}>{s.c}</div>
                        <div style={{ fontSize: 5.5, color: s.d ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 700 }}>{s.g}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 6.5, fontWeight: 700, color: 'var(--text-secondary)', marginTop: 6 }}>Daily Progress</div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <div style={{ flex: 1, background: 'var(--surface-3)', padding: 4, borderRadius: 4 }}>
                      <div style={{ fontSize: 6, color: 'var(--text-muted)' }}>Earnings</div>
                      <div style={{ fontSize: 7, fontWeight: 700, color: 'var(--text)' }}>₹10</div>
                    </div>
                    <div style={{ flex: 1, background: 'var(--surface-3)', padding: 4, borderRadius: 4 }}>
                      <div style={{ fontSize: 6, color: 'var(--text-muted)' }}>Calls</div>
                      <div style={{ fontSize: 7, fontWeight: 700, color: 'var(--text)' }}>1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="screen-caption"><strong>In-progress view</strong> — daily progress + remaining slabs</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual"><MilestoneScreen progress="50/50" label="You did it like a boss" gems="12,500" /></div>
              <div className="screen-caption"><strong>Final claim</strong> — completes the challenge with full reward</div>
            </div>
          </div>
        </section>

        {/* Business + Host Impact */}
        <section className="cs-section">
          <div className="step-label">
            <span className="step-name">Outcomes</span>
          </div>
          <h2 className="cs-section-title">Business and host impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 32 }}>
            <div className="info-card">
              <div className="info-card-label" style={{ color: 'var(--accent)' }}>Business Impact</div>
              <ul>
                <li>Major uplift in onboarding quality and activation</li>
                <li>Strong motivation loops that compound retention</li>
                <li>Referral loop now scalable to Vibely and other verticals</li>
                <li>Clear measurement framework for future iterations</li>
                <li>Increased total call volume and platform earnings</li>
              </ul>
            </div>
            <div className="info-card">
              <div className="info-card-label" style={{ color: 'var(--accent)' }}>Host Experience Impact</div>
              <ul>
                <li>Clearer, faster reward journeys</li>
                <li>Better sense of progression and achievement</li>
                <li>Higher trust due to transparent status tracking</li>
                <li>More engaging first-week experience</li>
                <li>Stronger early call momentum that sustains</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Learnings */}
        <section style={{ paddingTop: 64 }}>
          <div className="step-label">
            <span className="step-name">Key Learnings</span>
          </div>
          <h2 className="cs-section-title">What this project taught me</h2>
          <div className="learnings-grid">
            <div className="learning-card">
              <div className="learning-num">01</div>
              <div className="learning-text">
                <strong>Growth is design, not just incentives</strong>
                Cash rewards alone didn't drive activation. The placement of the referral
                card on the feed, the framing of progress trackers, and celebratory
                moments at milestones drove the actual behavioural shift.
              </div>
            </div>
            <div className="learning-card">
              <div className="learning-num">02</div>
              <div className="learning-text">
                <strong>Layer competition only after the base loop works</strong>
                Adding the leaderboard before the referral system was solid would have
                muddled the data. We shipped sender/receiver flows first, validated lift,
                then layered competition on top — that sequencing mattered.
              </div>
            </div>
            <div className="learning-card">
              <div className="learning-num">03</div>
              <div className="learning-text">
                <strong>Slab-based rewards beat single-target goals</strong>
                Splitting the challenge into 12 / 25 / 50 calls (not just "50 calls")
                gave hosts intermediate wins. Hosts who stalled at slab 1 still earned
                something — and many returned to push to slab 2.
              </div>
            </div>
            <div className="learning-card">
              <div className="learning-num">04</div>
              <div className="learning-text">
                <strong>The same growth system can scale across products</strong>
                FriendZone's framework dropped into Vibely with minimal redesign because
                the core motivational structure (referral + slabs + leaderboard) is
                product-agnostic. Only the visual layer changed.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
