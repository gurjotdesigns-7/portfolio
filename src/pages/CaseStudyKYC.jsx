function BackArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function WalletScreen() {
  return (
    <div className="mobile-frame">
      <div className="mf-notch" />
      <div className="mf-header">EARNINGS</div>
      <div className="mf-amount">₹2,800</div>
      <div className="mf-sub">Eligible to redeem</div>
      <div className="mf-sub" style={{ color: 'var(--text-secondary)', marginTop: 2 }}>Total Earnings ₹5,000</div>
      <div className="mf-divider" />
      <div className="mf-bar w80" />
      <div className="mf-bar w65 accent-bar" style={{ marginTop: 3 }} />
      <div className="mf-bar w45" style={{ marginTop: 3 }} />
      <div className="mf-divider" />
      <div style={{ fontSize: 7, color: 'var(--text-muted)' }}>Manage Bank Accounts</div>
      <div style={{ fontSize: 6.5, color: 'var(--text-muted)', marginTop: 2 }}>HDFC BANK XXXX0177</div>
      <div className="mf-btn">Redeem</div>
    </div>
  )
}

function KYCStartScreen() {
  return (
    <div className="mobile-frame">
      <div className="mf-notch" />
      <div className="mf-header">EARNINGS</div>
      <div className="mf-amount">₹1,500</div>
      <div className="mf-sub">Eligible to redeem</div>
      <div className="mf-divider" />
      <div style={{ fontSize: 6, color: 'var(--text-secondary)', lineHeight: 1.4, marginTop: 2 }}>
        Keep your AADHAR CARD and PAN handy for KYC verification
      </div>
      <div className="mf-bar w80" style={{ marginTop: 4 }} />
      <div className="mf-bar w65" style={{ marginTop: 3 }} />
      <div className="mf-btn" style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent-light)' }}>
        Complete KYC to redeem
      </div>
    </div>
  )
}

function PANScreen() {
  return (
    <div className="mobile-frame">
      <div className="mf-notch" />
      <div className="mf-header">KYC VERIFICATION</div>
      <div className="mf-progress">
        <div className="mf-step-dot done" />
        <div className="mf-step-dot active" />
        <div className="mf-step-dot" />
        <div className="mf-step-dot" />
      </div>
      <div style={{ fontSize: 6.5, color: 'var(--text-secondary)', marginBottom: 3 }}>Upload PAN Card</div>
      <div style={{ height: 40, background: 'var(--surface-3)', border: '1px dashed var(--border-light)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: 'var(--text-muted)' }}>
        Tap to upload
      </div>
      <div className="mf-input" style={{ marginTop: 3 }}>
        <div className="mf-input-text">PAN Number (10 digits)</div>
      </div>
      <div className="mf-input" style={{ marginTop: 3 }}>
        <div className="mf-input-text">Name on PAN Card</div>
      </div>
      <div className="mf-input" style={{ marginTop: 3 }}>
        <div className="mf-input-text">Date of birth</div>
      </div>
      <div className="mf-btn">Verify</div>
    </div>
  )
}

function PANErrorScreen() {
  return (
    <div className="mobile-frame">
      <div className="mf-notch" />
      <div className="mf-header">KYC VERIFICATION</div>
      <div style={{ height: 36, background: 'var(--surface-3)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#f87171' }}>
        Image is not clear
      </div>
      <div className="mf-input" style={{ marginTop: 4 }}>
        <div className="mf-input-text">BXJPB4544E</div>
      </div>
      <div className="mf-error">Number does not match PAN Card</div>
      <div className="mf-input" style={{ marginTop: 3 }}>
        <div className="mf-input-text">Riya Sharma</div>
      </div>
      <div className="mf-input" style={{ marginTop: 3 }}>
        <div className="mf-input-text">10/10/2000</div>
      </div>
      <div className="mf-error">Age should be between 18 to 70 years</div>
      <div className="mf-btn">Verify</div>
    </div>
  )
}

function ESignScreen() {
  return (
    <div className="mobile-frame">
      <div className="mf-notch" />
      <div className="mf-header">E-SIGN</div>
      <div className="mf-progress">
        <div className="mf-step-dot done" />
        <div className="mf-step-dot done" />
        <div className="mf-step-dot active" />
        <div className="mf-step-dot" />
      </div>
      <div style={{ fontSize: 6.5, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>Terms and Conditions</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, overflow: 'hidden' }}>
        <div className="mf-bar w100" />
        <div className="mf-bar w80" />
        <div className="mf-bar w65" />
        <div className="mf-bar w80" />
        <div className="mf-bar w45" />
      </div>
      <div style={{ fontSize: 6, color: 'var(--text-muted)', marginTop: 2 }}>Sonia and 5,710 others completed E-Sign</div>
      <div className="mf-btn">Complete E-Sign</div>
    </div>
  )
}

function BankScreen() {
  return (
    <div className="mobile-frame">
      <div className="mf-notch" />
      <div className="mf-header">ADD BANK ACCOUNT</div>
      <div className="mf-progress">
        <div className="mf-step-dot done" />
        <div className="mf-step-dot done" />
        <div className="mf-step-dot done" />
        <div className="mf-step-dot active" />
      </div>
      <div className="mf-input" style={{ marginTop: 4 }}>
        <div className="mf-input-text">Beneficiary's name</div>
      </div>
      <div className="mf-input" style={{ marginTop: 3 }}>
        <div className="mf-input-text">Account Number (14 digits)</div>
      </div>
      <div className="mf-input" style={{ marginTop: 3 }}>
        <div className="mf-input-text">Enter account number again</div>
      </div>
      <div className="mf-input" style={{ marginTop: 3 }}>
        <div className="mf-input-text">IFSC Code (11 digits)</div>
      </div>
      <div style={{ fontSize: 6, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.4 }}>
        Find details on your cheque book or banking app
      </div>
      <div className="mf-btn">Verify Bank Account</div>
      <div style={{ fontSize: 6, color: 'var(--text-muted)', textAlign: 'center', marginTop: 2 }}>All transactions are safe and encrypted</div>
    </div>
  )
}

function WithdrawalScreen() {
  return (
    <div className="mobile-frame">
      <div className="mf-notch" />
      <div className="mf-header">WITHDRAWAL</div>
      <div className="mf-amount" style={{ fontSize: 14 }}>₹2,100</div>
      <div className="mf-sub">Amount after 10% tax: ₹1,890</div>
      <div className="mf-divider" />
      <div style={{ fontSize: 6.5, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 3 }}>Select account</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: 5 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
        <div style={{ fontSize: 6.5, color: 'var(--text)' }}>****7869 Verified</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', background: 'var(--surface-3)', borderRadius: 5, marginTop: 3 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--border-light)', flexShrink: 0 }} />
        <div style={{ fontSize: 6.5, color: 'var(--text-secondary)' }}>****2314 Verified</div>
      </div>
      <div className="mf-btn" style={{ marginTop: 'auto' }}>Redeem</div>
    </div>
  )
}

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

export default function CaseStudyKYC({ navigate }) {
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
            <span className="eyebrow-meta">ShareChat · Vibely · 2023</span>
            <span className="eyebrow-divider" />
            <span className="eyebrow-meta">Pain Point Discovery · Policy Compliance · Cross-functional</span>
          </div>
          <h1 className="cs-title">
            KYC, Wallet & Cash-out<br />System Redesign
          </h1>
          <p className="cs-subtitle">
            Led the end-to-end redesign of the KYC verification and cashout flows for
            creators on ShareChat — later scaled to Vibely. Transformed a fragmented,
            high drop-off experience into a guided, trust-driven journey.
          </p>

          {/* Metrics */}
          <div className="metrics-strip">
            <div className="metric-item">
              <div className="metric-value">~25%</div>
              <div className="metric-label">KYC completion rate improvement after redesign</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">+32%</div>
              <div className="metric-label">PAN image upload success increased</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">+22%</div>
              <div className="metric-label">E-sign step completion, driven by social proof</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">+18%</div>
              <div className="metric-label">Successful withdrawals with fewer retries</div>
            </div>
          </div>

          {/* Info grid */}
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-label">Goals</div>
              <ul>
                <li>Increase KYC completion & reduce friction at every step</li>
                <li>Improve clarity in document upload, e-sign, and bank verification</li>
                <li>Redesign wallet for cleaner hierarchy and predictable next actions</li>
                <li>Build a trust-driven withdrawal flow with better status visibility</li>
              </ul>
            </div>
            <div className="info-card">
              <div className="info-card-label">Constraints</div>
              <ul>
                <li>Must work within PAN, e-sign, Aadhaar policy regulations</li>
                <li>Aadhaar verification page is external and cannot be modified</li>
                <li>Limited engineering bandwidth — need for quick rollout</li>
                <li>Design must be scalable to Vibely's design system</li>
              </ul>
            </div>
            <div className="info-card">
              <div className="info-card-label">My Role</div>
              <ul>
                <li>End-to-end design lead for KYC and cashout flows</li>
                <li>Worked with payments & policy teams on regulatory constraints</li>
                <li>Key design point of contact between product, engineering, compliance</li>
                <li>Scaled the solution to Vibely with minimal engineering overhead</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 1 — Wallet */}
        <section className="cs-section">
          <div className="step-label">
            <div className="step-number">1</div>
            <span className="step-name">Wallet Page & KYC Entry</span>
          </div>
          <h2 className="cs-section-title">Redesigning the earnings dashboard<br />to guide users into verification</h2>
          <p className="cs-section-desc">
            Users couldn't understand where they were in the verification process, what steps remained,
            or why they needed to earn gems before starting. Multiple CTAs and a redundant slab structure
            created cognitive overload. The redesign introduced a guided journey from the wallet entry point.
          </p>
          <div className="before-after">
            <div className="ba-card before">
              <div className="ba-header">
                <div className="ba-dot" />
                <span className="ba-label">Pain Points</span>
              </div>
              <div className="ba-content">
                <div className="ba-problems">
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    Confusing "Talent Partner" tab with no clear explanation
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    No visible progress indicators for KYC stages
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    Required earning gems before starting KYC — blocked new users
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    Multiple CTAs and redundant slab structure increased cognitive load
                  </div>
                </div>
              </div>
            </div>
            <div className="ba-card after">
              <div className="ba-header">
                <div className="ba-dot" />
                <span className="ba-label">Redesign Decisions</span>
              </div>
              <div className="ba-content">
                <div className="ba-wins">
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    Guided KYC journey with visible progress indicators and clear status feedback
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    KYC can start before host earns first gems — removed gem gate
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    CTA copy adapts: "Complete KYC to redeem" when earnings exist
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    Removed separate agency tab — single unified experience
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="screens-row">
            <div className="screen-card">
              <div className="screen-visual"><KYCStartScreen /></div>
              <div className="screen-caption">D0 View — guidelines & education before KYC</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual"><WalletScreen /></div>
              <div className="screen-caption">Post-KYC wallet — clean hierarchy, bank management</div>
            </div>
          </div>
        </section>

        {/* Step 2 — PAN */}
        <section className="cs-section">
          <div className="step-label">
            <div className="step-number">2</div>
            <span className="step-name">PAN Card Upload</span>
          </div>
          <h2 className="cs-section-title">Guided photo capture with<br />specific inline error feedback</h2>
          <p className="cs-section-desc">
            The old flow had no guidance on what a valid PAN image looked like, and vague error messages
            left users unable to correct failures. Adding a dummy PAN reference, clear capture tips,
            and specific inline validation drove a 32% increase in upload success.
          </p>
          <div className="before-after">
            <div className="ba-card before">
              <div className="ba-header">
                <div className="ba-dot" />
                <span className="ba-label">Pain Points</span>
              </div>
              <div className="ba-content">
                <div className="ba-problems">
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    Camera screen included unnecessary filters — wrong context
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    No feedback on why image failed — too blurry? Wrong size?
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    No visual reference for what a PAN card looks like
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    Hosts didn't understand how KYC status connected to earnings
                  </div>
                </div>
              </div>
            </div>
            <div className="ba-card after">
              <div className="ba-header">
                <div className="ba-dot" />
                <span className="ba-label">Redesign Decisions</span>
              </div>
              <div className="ba-content">
                <div className="ba-wins">
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    Dummy PAN card reference educates first-time users on correct format
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    Clear photo capture tips: good lighting, both name and number visible
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    Specific error messages — "Number does not match PAN Card" vs generic failure
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    Inline validation highlights the exact field with the issue
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="screens-row">
            <div className="screen-card">
              <div className="screen-visual"><PANScreen /></div>
              <div className="screen-caption">Upload flow with capture tips & guidance</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual"><PANErrorScreen /></div>
              <div className="screen-caption">Inline errors pinpoint the exact issue</div>
            </div>
          </div>
        </section>

        {/* Step 3 — E-Sign */}
        <section className="cs-section">
          <div className="step-label">
            <div className="step-number">3</div>
            <span className="step-name">E-Sign & Aadhaar Verification</span>
          </div>
          <h2 className="cs-section-title">Simplified consent flow with<br />social proof to build trust</h2>
          <p className="cs-section-desc">
            The original e-sign experience was a dense PDF view that hosts couldn't parse. The redesign
            broke it into structured steps, presented legal consent in plain readable format, and added
            social proof. E-sign completion improved by 22%.
          </p>
          <div className="before-after">
            <div className="ba-card before">
              <div className="ba-header">
                <div className="ba-dot" />
                <span className="ba-label">Pain Points</span>
              </div>
              <div className="ba-content">
                <div className="ba-problems">
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    Hosts unaware of what e-sign is or why it was required
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    Zoomed-in PDF view was unreadable and overwhelming
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    No trust signals or confirmation that the step was safe
                  </div>
                </div>
              </div>
            </div>
            <div className="ba-card after">
              <div className="ba-header">
                <div className="ba-dot" />
                <span className="ba-label">Redesign Decisions</span>
              </div>
              <div className="ba-content">
                <div className="ba-wins">
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    Dense PDF redesigned into step-by-step structured interaction
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    Legal consent in plain readable format with clear context
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    Social proof: "Sonia and 5,710 others have completed E-Sign"
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    Aadhaar page retained as-is (external regulatory requirement)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="screens-row">
            <div className="screen-card">
              <div className="screen-visual"><ESignScreen /></div>
              <div className="screen-caption">E-sign with social proof & structured layout</div>
            </div>
          </div>
        </section>

        {/* Step 4 — Bank */}
        <section className="cs-section">
          <div className="step-label">
            <div className="step-number">4</div>
            <span className="step-name">Bank Account & Withdrawals</span>
          </div>
          <h2 className="cs-section-title">Transparent withdrawals with<br />multi-account management</h2>
          <p className="cs-section-desc">
            The old system allowed only one bank account and provided no confirmation or trust signals
            during linking. The redesign introduced multi-account support, contextual IFSC guidance,
            and explicit confirmation states — resulting in 18% more successful withdrawals.
          </p>
          <div className="before-after">
            <div className="ba-card before">
              <div className="ba-header">
                <div className="ba-dot" />
                <span className="ba-label">Pain Points</span>
              </div>
              <div className="ba-content">
                <div className="ba-problems">
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    No reassurance or confirmation during bank linking
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    Bank could not be changed after adding — permanent mistake risk
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    Only one bank account supported — no flexibility
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✕</div>
                    Users unaware of withdrawal eligibility or tax deduction
                  </div>
                </div>
              </div>
            </div>
            <div className="ba-card after">
              <div className="ba-header">
                <div className="ba-dot" />
                <span className="ba-label">Redesign Decisions</span>
              </div>
              <div className="ba-content">
                <div className="ba-wins">
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    Structured bank linking with step-by-step guidance
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    Contextual help: "Find details on your passbook or cheque book"
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    Multi-account support with default account selection
                  </div>
                  <div className="ba-item">
                    <div className="ba-item-icon">✓</div>
                    Clear tax deduction display: "Amount after 10% deduction: ₹1,890"
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="screens-row">
            <div className="screen-card">
              <div className="screen-visual"><BankScreen /></div>
              <div className="screen-caption">Guided bank linking with contextual help</div>
            </div>
            <div className="screen-card">
              <div className="screen-visual"><WithdrawalScreen /></div>
              <div className="screen-caption">Account selection with clear tax visibility</div>
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
                <strong>Financial flows need trust before efficiency</strong>
                Users must understand why sensitive information is required before they'll provide it.
                Building trust at each step is not optional — it's a prerequisite for completion.
              </div>
            </div>
            <div className="learning-card">
              <div className="learning-num">02</div>
              <div className="learning-text">
                <strong>Smaller steps dramatically reduce cognitive load</strong>
                Breaking the KYC flow into four distinct, named steps reduced confusion and
                increased completion at every stage. Clarity about "where you are" matters.
              </div>
            </div>
            <div className="learning-card">
              <div className="learning-num">03</div>
              <div className="learning-text">
                <strong>Specific error feedback beats generic failures</strong>
                "Image is not clear" and "Number does not match PAN Card" are infinitely more
                actionable than "Verification failed." Inline errors drove the 32% upload improvement.
              </div>
            </div>
            <div className="learning-card">
              <div className="learning-num">04</div>
              <div className="learning-text">
                <strong>Modular design enables platform scaling</strong>
                Designing the system as composable steps made it straightforward to adapt the
                same framework to Vibely with minimal engineering changes. Scalability is a design decision.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
