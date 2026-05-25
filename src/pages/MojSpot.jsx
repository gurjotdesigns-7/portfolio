import { useEffect } from 'react'

function PhoneScreen({ src, caption, annotation }) {
  return (
    <div className="moj-phone-wrap">
      <div className="moj-phone-frame">
        <img
          src={src}
          alt={caption}
          className="moj-phone-screen"
          onError={e => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div className="moj-phone-placeholder" style={{ display: 'none' }}>
          <div className="moj-placeholder-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
              stroke="rgba(255,255,255,0.3)" strokeWidth="1.2">
              <rect x="1" y="1" width="12" height="12" rx="2"/>
              <path d="M4 7h6M4 4.5h6M4 9.5h4"/>
            </svg>
          </div>
          <div className="moj-placeholder-name">{src.replace('/', '')}</div>
        </div>
      </div>
      <div className="moj-phone-caption">{caption}</div>
      {annotation && (
        <div className="moj-annotation">
          <div className="moj-annotation-label">Context</div>
          <div className="moj-annotation-body">{annotation}</div>
        </div>
      )}
    </div>
  )
}

function ScreensSection({ eyebrow, title, desc, screens }) {
  return (
    <section className="moj-screens-section">
      <div className="moj-container">
        <div className="moj-screens-label">{eyebrow}</div>
        <h2 className="moj-screens-title">{title}</h2>
        <p className="moj-screens-desc">{desc}</p>
        <div className="moj-screens-row">
          {screens.map(s => <PhoneScreen key={s.src} {...s} />)}
        </div>
      </div>
    </section>
  )
}

export default function MojSpot({ navigate }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Moj Spot · Gurjot Ahluwalia'
    return () => { document.title = 'Gurjot Ahluwalia · UX Designer' }
  }, [])

  return (
    <div>
      <nav className="moj-nav">
        <a href="#" onClick={e => { e.preventDefault(); navigate('home') }} className="moj-nav-logo">Gurjot Ahluwalia</a>
        <a href="#" onClick={e => { e.preventDefault(); navigate('home') }} className="moj-nav-back">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            stroke="currentColor" strokeWidth="1.5">
            <path d="M9 11L5 7l4-4"/>
          </svg>
          Back to work
        </a>
      </nav>

      <section className="moj-hero">
        <div className="moj-hero-inner">
          <div className="moj-eyebrow">
            <span className="moj-eyebrow-dot" />
            01 — ShareChat · Moj
          </div>
          <h1 className="moj-hero-title">
            Moj Spot — <em>Creator</em><br />Monetisation System
          </h1>
          <p className="moj-hero-sub">
            Designed a paid content-boosting platform from zero. Scaled through
            audience targeting, multi-campaign support, and analytics.
            ₹44L in the first 2.5 months. ₹65L projected monthly by July.
          </p>
          <div className="moj-hero-meta">
            {[
              { label: 'Company',  value: 'ShareChat · Moj' },
              { label: 'Role',     value: 'UX Designer II — end to end' },
              { label: 'Timeline', value: 'Feb 2023 — Ongoing' },
              { label: 'Type',     value: 'Creator Monetisation' },
            ].map(m => (
              <div key={m.label} className="moj-meta-item">
                <div className="moj-meta-label">{m.label}</div>
                <div className="moj-meta-value">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="moj-stat-strip">
        <div className="moj-stat-inner">
          {[
            { num: '₹65L',  label: 'Projected monthly revenue by July — up from ₹44L in first 2.5 months' },
            { num: '₹2.1L', label: 'Daily run rate in July, up from ₹1.85L in June' },
            { num: '+14%',  label: 'Daily campaign frequency after Multispot — 1.05 to 1.2 per creator' },
          ].map(s => (
            <div key={s.num} className="moj-stat-item">
              <div className="moj-stat-num">{s.num}</div>
              <div className="moj-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <ScreensSection
        eyebrow="Entry Point"
        title="Where creators discover Moj Spot"
        desc="Moj Spot lives inside Creator Hub — a centralised dashboard on the self-profile page. The Moj Spot card sits alongside Insights, Trending, and Leaderboard, giving it consistent visibility."
        screens={[
          { src: '/mojspot-screen-01.png', caption: 'Self Profile — Creator Hub entry point' },
          { src: '/mojspot-screen-02.png', caption: 'Creator Hub — Moj Spot alongside creator tools' },
        ]}
      />

      <ScreensSection
        eyebrow="Phase 1 — Purchase Funnel"
        title="From coupon selection to a live spot"
        desc="Duration selection with dual-currency payment (coins or INR), video eligibility filtering, payment method choice, and the celebratory confirmation. Every step builds confidence before asking for commitment."
        screens={[
          { src: '/mojspot-screen-03.png', caption: 'Coupon Selection — first-time user' },
          { src: '/mojspot-screen-04.png', caption: 'Video Selection — 4 of 4 selected' },
          { src: '/mojspot-screen-05.png', caption: 'Choose Payment — INR or Mints' },
          { src: '/mojspot-screen-06.png', caption: 'Payment Successful — verification queued' },
        ]}
      />

      <ScreensSection
        eyebrow="Edge Cases"
        title="Protecting creators when things go wrong"
        desc="Verification failure gives two explicit paths: try different videos, or get a full refund. The returning user flow shows the last completed campaign before a new purchase."
        screens={[
          { src: '/mojspot-screen-07.png', caption: 'Verification Failed — two recovery paths' },
          { src: '/mojspot-screen-08.png', caption: 'Returning user — last campaign visible' },
        ]}
      />

      <ScreensSection
        eyebrow="Phase 2 — Multispot and Insights"
        title="Simultaneous campaigns and performance visibility"
        desc="My Activity tracks all campaigns with distinct colour coding per state. Spot Insights shows the exact ROI of each campaign and surfaces a direct re-boost CTA."
        screens={[
          { src: '/mojspot-screen-09.png', caption: 'My Activity — processing, live, and gain states' },
          { src: '/mojspot-screen-10.png', caption: 'Spot Insights — 25% overall increase in views' },
        ]}
      />

      <ScreensSection
        eyebrow="Phase 3 — Audience Targeting"
        title="Precision reach at a premium"
        desc='The Spot Hub sheet organises all Spot features. Tapping "Create your Spot" opens the targeting setup — age, gender, and location. The available audience count updates live.'
        screens={[
          {
            src: '/mojspot-screen-11.png',
            caption: 'Spot Hub — "Create your Spot" opens targeting flow',
            annotation: '"Spot Targeting" is a feature banner. Tap "Create your Spot NEW" below it to start the audience selection flow shown in the next screen.',
          },
          { src: '/mojspot-screen-12.png', caption: 'Targeting Step 2 — audience selection (24,000 available)' },
        ]}
      />

      <section className="moj-outcomes">
        <div className="moj-container">
          <p className="moj-section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Outcomes</p>
          <h2 className="moj-section-title" style={{ color: '#fff' }}>A new revenue line, built from scratch</h2>
          <p className="moj-section-body" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '560px' }}>
            Moj Spot opened a category that did not exist on the platform.
            Within months it became a recurring revenue stream with strong creator repeat-usage.
          </p>
          <div className="moj-outcome-grid">
            {[
              { num: '₹65L',  color: '#f5c518', label: 'Projected July monthly revenue. ₹44L first 2.5 months, ₹55L June.' },
              { num: '₹2.1L', color: '#f5c518', label: 'Daily run rate in July, up from ₹1.85L in June.' },
              { num: '+14%',  color: '#34d399', label: 'Campaign frequency lift — 1.05 to 1.2 daily spots per creator.' },
              { num: '₹12K',  color: '#f5c518', label: 'Daily revenue gain from funnel optimisation — auto-select higher SKU.' },
            ].map(o => (
              <div key={o.num} className="moj-outcome-card">
                <div className="moj-outcome-num" style={{ color: o.color }}>{o.num}</div>
                <div className="moj-outcome-label">{o.label}</div>
              </div>
            ))}
          </div>
          <div className="moj-quote">
            <p className="moj-quote-text">
              "Shoutout to Gurjot for his design contributions in creating a new revenue stream
              for our organization. Moj Spot has experienced a tremendous boost, with daily
              revenues averaging around ₹1.8L from approximately 1,000 creators. This is a
              testament to the effectiveness of your design."
            </p>
            <div className="moj-quote-cite">Design Director, ShareChat · Moj</div>
          </div>
        </div>
      </section>

      <footer className="moj-footer">
        <p>Gurjot Ahluwalia · <a href="#" onClick={e => { e.preventDefault(); navigate('home') }}>Back to portfolio</a></p>
      </footer>
    </div>
  )
}
