import { useState, useEffect } from 'react'

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

const STEPS = [
  { num: '01', name: 'Idea' },
  { num: '02', name: 'Script' },
  { num: '03', name: 'Characters' },
  { num: '04', name: 'Locations' },
  { num: '05', name: 'Clips' },
  { num: '06', name: 'Export' },
]

/* ── PDF-style screen subsection: subtitle + thinking + decisions + image ── */
function ScreenSection({ heading, intent, decisions, image, caption, cut }) {
  return (
    <div className={`pdf-screen ${cut ? 'pdf-screen-cut' : ''}`}>
      {heading && <div className="pdf-screen-heading">{heading}</div>}
      <div className="pdf-screen-grid">
        <div className="pdf-screen-text">
          {intent && (
            <div className="pdf-block">
              <div className="pdf-block-label">User is thinking</div>
              <ul className="pdf-quotes">
                {intent.map((q, i) => <li key={i}>"{q}"</li>)}
              </ul>
            </div>
          )}
          {decisions && (
            <div className="pdf-block">
              <div className="pdf-block-label pdf-block-label-decision">
                {cut ? 'Removed in final design' : 'Design decision in this sketch'}
              </div>
              <ul className="pdf-bullets">
                {decisions.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          )}
        </div>
        <figure className="pdf-screen-image">
          <img src={image} alt={caption || heading} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      </div>
    </div>
  )
}

function StepHeader({ num, name, title, summary }) {
  return (
    <div className="pdf-step-header">
      <div className="pdf-step-eyebrow">
        <span className="pdf-step-num">Step {num}</span>
        <span className="pdf-step-divider" />
        <span className="pdf-step-name">{name}</span>
      </div>
      <h2 className="pdf-step-title">{title}</h2>
      {summary && <p className="pdf-step-summary">{summary}</p>}
    </div>
  )
}

export default function CaseStudyCineflow({ navigate }) {
  useParallaxHeadings()
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="cs-page">
      <div className="container">
        <button className="cs-back" onClick={() => navigate('home')}>
          <BackArrow /> Back to work
        </button>

        {/* ── Hero (PDF first page) ── */}
        <section className="cs-hero">
          <div className="cs-eyebrow">
            <span className="eyebrow-tag">Case Study</span>
            <span className="eyebrow-divider" />
            <span className="eyebrow-meta">Product Design · Strategy · User Journey · Scalability</span>
          </div>
          <h1 className="cs-title">
            First-time User Experience<br />for AI Episode Creation
          </h1>
          <p className="cs-subtitle">
            48-hour design Sprint · Web desktop · Solo designer
          </p>

          <div className="info-grid" style={{ marginTop: 56 }}>
            <div className="info-card">
              <div className="info-card-label">My Role</div>
              <ul>
                <li>End-to-end product design for the first-time user experience of Cineflow's core creation flow</li>
                <li>Information architecture, interaction design, generative UI patterns across all six steps</li>
                <li>Worked independently within a 48-hour brief — defined the problem, mapped the journey, delivered hi-fi screens</li>
              </ul>
            </div>
            <div className="info-card">
              <div className="info-card-label">Problem Statement</div>
              <ul>
                <li>First-time creators on AI video platforms face a fragmented, tool-heavy workflow with no clear starting point</li>
                <li>Observed a creator use 6 separate tools — ChatGPT, a script tool, Midjourney, an environment generator, a video tool, and an editor — to produce a single AI video</li>
                <li>Every tool switch broke creative momentum</li>
              </ul>
            </div>
            <div className="info-card">
              <div className="info-card-label">Constraints</div>
              <ul>
                <li>48-hour time limit with no access to user research or analytics</li>
                <li>Output must work for first-time casual creators and experienced filmmakers</li>
                <li>AI generation output is non-deterministic — design must handle uncertainty gracefully</li>
                <li>Web desktop only, no mobile consideration in scope</li>
              </ul>
            </div>
          </div>

          <div className="info-grid" style={{ marginTop: 16 }}>
            <div className="info-card" style={{ gridColumn: 'span 2' }}>
              <div className="info-card-label">Goals</div>
              <ul>
                <li>Design a first-time user experience that feels guided, not overwhelming</li>
                <li>Reduce the number of decisions a user must make before seeing their first output</li>
                <li>Create a consistent generative interaction pattern that works across all steps</li>
                <li>Make the flow feel creative and intentional rather than technical</li>
              </ul>
            </div>
            <div className="info-card">
              <div className="info-card-label">Output</div>
              <ul>
                <li>6 hi-fidelity desktop screens covering the complete creation flow</li>
                <li>One consistent generative pattern: dual options + persistent chat bar</li>
                <li>Process documentation: sketches → wireframes → final design</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Design Approach (PDF narrative section) ── */}
        <section className="cs-section pdf-approach">
          <div className="step-label">
            <span className="step-name">Design Approach</span>
          </div>
          <h2 className="cs-section-title">A guided creative journey,<br/>not a technical workflow</h2>
          <div className="pdf-approach-grid">
            <p>
              I approached this as a guided creative journey rather than a technical workflow.
              The goal was to simplify a complex AI pipeline into a clear, step-by-step
              experience for first-time creators.
            </p>
            <p>
              The flow is structured into six stages: Idea, Script, Characters, Locations,
              Clips, and Export. This ensures users always understand where they are and
              what comes next, reducing cognitive load and preventing confusion.
            </p>
            <p>
              To support both generation and manual input without creating branching
              complexity, I introduced a persistent chat-based interaction model. This allows
              users to generate, edit, or refine content at any stage within the same interface.
            </p>
            <p>
              Consistency across steps — dual options and edit-and-select patterns —
              improves learnability. Built-in iteration ensures users can refine outputs
              without restarting the flow. The experience is designed to make the first
              generated output feel intentional, not accidental.
            </p>
          </div>

          {/* Tools before */}
          <div className="pdf-tools">
            <div className="pdf-tools-label">Before — fragmented multi-tool workflow</div>
            <div className="pdf-tools-row">
              {[
                { name: 'ChatGPT', role: 'Brainstorm ideas' },
                { name: 'Script Tool', role: 'Idea → Script generation' },
                { name: 'Midjourney', role: 'Generate reference images for locations and characters' },
                { name: 'Location Gen', role: 'Browsing different sources like Pinterest to get the context and environment right' },
                { name: 'Video Tool', role: 'Generating video based on reference images. Mostly found inconsistent.' },
                { name: 'Editor', role: 'Compile the clips into an episode' },
              ].map((tool, i) => (
                <div key={tool.name} className="pdf-tool-step">
                  <div className="pdf-tool-card">
                    <div className="pdf-tool-name">{tool.name}</div>
                    <div className="pdf-tool-role">{tool.role}</div>
                  </div>
                  {i < 5 && <span className="pdf-tool-arrow">→</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Success Criteria ── */}
        <section className="cs-section">
          <div className="step-label">
            <span className="step-name">Success Criteria</span>
          </div>
          <h2 className="cs-section-title">How to measure if this works</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-title" style={{ fontSize: 16, marginBottom: 12 }}>Completion rate</div>
              <div className="insight-desc">
                Percentage of new users who reach Export on their first session.
              </div>
            </div>
            <div className="insight-card">
              <div className="insight-title" style={{ fontSize: 16, marginBottom: 12 }}>Time to first export</div>
              <div className="insight-desc">
                How long a first-time user takes from idea input to downloading their episode.
              </div>
            </div>
            <div className="insight-card">
              <div className="insight-title" style={{ fontSize: 16, marginBottom: 12 }}>Edit rate per step</div>
              <div className="insight-desc">
                A high edit rate at a specific step signals a generation quality issue,
                not a UX issue.
              </div>
            </div>
          </div>
        </section>

        {/* ── 6-step flow nav ── */}
        <section className="cs-section">
          <div className="step-label">
            <span className="step-name">The 6 stages</span>
          </div>
          <div className="flow-steps">
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                className={`flow-step ${activeStep === i ? 'active' : ''}`}
                onClick={() => {
                  setActiveStep(i)
                  document.getElementById(`cf-step-${i+1}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="flow-step-num">{s.num}</div>
                <div className="flow-step-name">{s.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* STEP 1 · Idea */}
        <section className="cs-section pdf-step" id="cf-step-1">
          <StepHeader
            num="01"
            name="Idea input"
            title="The user has a story in their head"
          />

          <ScreenSection
            heading="Initial sketch — single text input"
            intent={[
              "I have an idea but I don't know where to start",
              "I want to just describe what I'm imagining and have the tool figure out the rest",
              "I don't want to fill in multiple forms — I just want to type one thing and go",
            ]}
            decisions={[
              "Single text input — one place to describe the story, nothing else required",
              "Inspiration chips for users who don't know how to start",
              "\"I already have a script\" shortcut for users who don't need generation",
            ]}
            image="/cf-sketch-step1.png"
            caption="Early sketch — single input, step indicators, inspiration chips"
          />

          <ScreenSection
            heading="Final design — Step 1 of 6"
            decisions={[
              "Inspiration chips materialise as quick-pick prompts",
              "Skip-to-Step-2 shortcut for users who already have a script",
              "Clear current step ('Idea — You are here') in the left rail",
            ]}
            image="/cf-step1-idea.png"
            caption="Step 1 of 6 — final design"
          />
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* STEP 2 · Script */}
        <section className="cs-section pdf-step" id="cf-step-2">
          <StepHeader
            num="02"
            name="Script"
            title="The user decides how to get a script,
then chooses between two options"
          />

          {/* Cut screen */}
          <ScreenSection
            cut
            heading="Cut sketch — Generate vs Write Script?"
            intent={[
              "Do I want the tool to write this for me, or do I want to write it myself?",
              "I might already have a script — I need a way to bring it in",
            ]}
            decisions={[
              "Two clear options presented as equal cards — generate vs write manually",
              "User's idea from Step 1 shown back as a summary pill — confirmation of continuity",
              "Why this was cut: Step 1 already handles both paths, and the chat bar on the Script screen handles manual writing. Showing the same choice twice was redundant.",
            ]}
            image="/cf-sketch-step1b.png"
            caption="This screen was cut from the final design"
          />

          {/* Two-script comparison sketch */}
          <ScreenSection
            heading="The user sees two script options and picks one"
            intent={[
              "I want to see what the tool came up with before committing to anything",
              "I want options — not just one thing I have to accept or reject",
              "I want to be able to change parts of a script without rewriting everything",
            ]}
            decisions={[
              "Two scripts side by side — user compares and chooses",
              "Edit and Select CTAs on each card independently",
              "Chat bar at the bottom for refining either script or writing a new one",
            ]}
            image="/cf-sketch-step2.png"
            caption="Sketch — side-by-side script comparison with persistent chat bar"
          />

          {/* Wireframe */}
          <ScreenSection
            heading="Wireframe iteration"
            decisions={[
              "Left rail anchored to track current step",
              "Two equal-weight cards stacked horizontally",
              "Footer reserved for chat-based refinement input",
            ]}
            image="/cf-wf-step2.png"
            caption="Wireframe — refined layout with left rail and chat input"
          />

          {/* Hi-fi */}
          <ScreenSection
            heading="Final design — Step 2 of 6"
            decisions={[
              "Option A surfaces a 'Recommended' tag based on the script's tone alignment",
              "Each script previews 4 scenes with horror genre + length metadata",
              "Refinement chat bar reads: \"Refine tone, change a scene, add a character, or paste your own script\"",
            ]}
            image="/cf-step2-script.png"
            caption="Step 2 of 6 — final design"
          />
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* STEP 3 · Characters */}
        <section className="cs-section pdf-step" id="cf-step-3">
          <StepHeader
            num="03"
            name="Characters"
            title="The user reviews characters
auto-extracted from the script"
          />

          <ScreenSection
            heading="Initial sketch — characters as a card grid"
            intent={[
              "The script already mentions these characters — I shouldn't have to redefine them",
              "I want to see what each character looks like before the clips are generated",
            ]}
            decisions={[
              "Characters auto-extracted from the script with image, role, and scene mapping",
              "Card grid for at-a-glance review of all characters",
              "Make characters from text from scratch — manual fallback for edge cases",
            ]}
            image="/cf-wf-step3a.png"
            caption="Sketch — character grid with chat bar"
          />

          <ScreenSection
            heading="Sketch iteration — character detail focus"
            decisions={[
              "Single-character focus mode for editing one character at a time",
              "Detail rail surfaces character traits + scene appearances",
              "Edit applies to current character without affecting others",
            ]}
            image="/cf-wf-step3b.png"
            caption="Sketch — detail-focused single-character editor"
          />

          <ScreenSection
            heading="Wireframe — edit mode with original + refined"
            intent={[
              "I want to make small changes to a character without losing what was generated",
              "I should be able to compare the original to the refined version",
            ]}
            decisions={[
              "Edit view keeps the original card alongside refined versions, so you can compare",
              "Inspiration chips seed the refinement prompt (e.g. 'Reduce age to 35', 'Make Aldric look like a king')",
              "Each character has its own Edit and Regenerate button — independent control",
            ]}
            image="/cf-wf-step3-edit.png"
            caption="Wireframe — character edit mode"
          />

          <ScreenSection
            heading="Final design — Step 3 of 6"
            decisions={[
              "Three characters auto-extracted: Aldric (protagonist), The Creature (antagonist), Malina (support)",
              "Each card shows age, scene mapping, and short character note",
              "Persistent chat bar at the bottom: 'Describe a new character or make changes to an existing one'",
            ]}
            image="/cf-step3-characters.png"
            caption="Step 3 of 6 — final design"
          />

          <ScreenSection
            heading="Final design — character editor"
            decisions={[
              "Edit view shows the original character card on the left, refinement options on the right",
              "Inspiration chips ('Reduce age to 35', 'Make Aldric look like a king', 'Groomed, formally dressed') seed the prompt",
              "Refined versions appear as new cards below — never overwrite the original",
            ]}
            image="/cf-step3-edit.png"
            caption="Editing Aldric — chips seed the refinement prompt"
          />
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* STEP 4 · Locations */}
        <section className="cs-section pdf-step" id="cf-step-4">
          <StepHeader
            num="04"
            name="Locations"
            title="The user picks a world
for the script to live in"
          />

          <ScreenSection
            heading="Initial sketch — A vs B side-by-side"
            intent={[
              "I want to see how my world looks before committing",
              "Different scenes need different locations — show me ranges, not one image",
            ]}
            decisions={[
              "Two locations side by side (mirrors the Script step pattern)",
              "Each option shows a primary preview tile",
              "Chat bar handles location refinement",
            ]}
            image="/cf-wf-step4a.png"
            caption="Sketch — two-option grid"
          />

          <ScreenSection
            heading="Sketch iteration — multi-tile per option"
            decisions={[
              "Each location option expands to multiple visual variations",
              "User sees range within a single style, not just one image",
              "Edit and Select buttons preserved per-option",
            ]}
            image="/cf-wf-step4b.png"
            caption="Sketch — multi-tile variations within each option"
          />

          <ScreenSection
            heading="Final design — Step 4 of 6"
            decisions={[
              "Option A: 'The Great Cave' (Natural Exterior · Medieval · Torchlit) — Recommended",
              "Option B: 'King's Hall' (Interior · Gothic · Warm Lighting)",
              "Two image tiles per option give a feel for the visual range, not a single static reference",
            ]}
            image="/cf-step4-locations.png"
            caption="Step 4 of 6 — final design"
          />
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* STEP 5 · Clips */}
        <section className="cs-section pdf-step" id="cf-step-5">
          <StepHeader
            num="05"
            name="Clips"
            title="The user reviews generated clips
and refines what doesn't land"
          />

          <ScreenSection
            heading="Initial sketch — clips as a 2-column grid"
            intent={[
              "I want to see how each scene plays before exporting",
              "AI video generation is inconsistent — I need a way to retry without starting over",
              "I want to edit a single clip without rebuilding the others",
            ]}
            decisions={[
              "One clip per scene, displayed in a 2-column grid",
              "Each clip has Edit + Regenerate — same pattern as Characters",
              "Persistent chat bar handles 'add a new scene' or 'describe changes'",
            ]}
            image="/cf-wf-step5.png"
            caption="Sketch — 2-column clip grid with footer chat"
          />

          <ScreenSection
            heading="Sketch iteration — scene-numbered cards"
            decisions={[
              "Each card numbered to match scene order in the script",
              "Edit button per scene to refine without affecting others",
              "Add-scene affordance via plus button in the chat input",
            ]}
            image="/cf-wf-step5b.png"
            caption="Sketch — scene-numbered cards with per-scene controls"
          />

          <ScreenSection
            heading="Final design — Step 5 of 6"
            decisions={[
              "Four scenes presented with poster frames, scene number, length, and tone tag",
              "Cinematic / Impactful / Climax tags help users skim narrative pacing",
              "Fullscreen icon on every clip for verification",
            ]}
            image="/cf-step5-clips.png"
            caption="Step 5 of 6 — final design"
          />

          <ScreenSection
            heading="Alternative layout — emphasis on active scene"
            decisions={[
              "Active scene gets larger poster frame for closer review",
              "Other scenes remain accessible in the same view",
              "Same Edit + Regenerate controls preserved per scene",
            ]}
            image="/cf-step5-clips-alt.png"
            caption="Alternative layout explored"
          />
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* STEP 6 · Export */}
        <section className="cs-section pdf-step" id="cf-step-6">
          <StepHeader
            num="06"
            name="Export"
            title="The user previews the full episode
before downloading"
          />

          <ScreenSection
            heading="Sketch — player + export options"
            intent={[
              "Before I share this, I want to watch the whole thing top to bottom",
              "I want to know what's coming out — format, length, watermark",
              "If something feels off, I should be able to jump back and fix it",
            ]}
            decisions={[
              "Full-screen video player as the centrepiece — no distractions",
              "Export options panel on the right (resolution, format, share settings)",
              "Scene scrubber lets the user jump to any moment to verify",
              "Easy back-step — Export is not a one-way door",
            ]}
            image="/cf-wf-step6.png"
            caption="Sketch — Export with player + options panel"
          />
        </section>

        {/* ── Key Learnings ── */}
        <section style={{ paddingTop: 64 }}>
          <div className="step-label">
            <span className="step-name">Key Learnings</span>
          </div>
          <h2 className="cs-section-title">What this project taught me</h2>
          <div className="learnings-grid">
            <div className="learning-card">
              <div className="learning-num">01</div>
              <div className="learning-text">
                <strong>Constraints produce better decisions</strong>
                With no user research or analytics, I had to design from first principles
                and observed behaviour. The 48-hour limit forced prioritisation — every
                decision had to earn its place.
              </div>
            </div>
            <div className="learning-card">
              <div className="learning-num">02</div>
              <div className="learning-text">
                <strong>Generative UI needs a consistent interaction model</strong>
                Defining one pattern — dual options + chat bar + Edit/Select — across all
                6 steps made the system learnable. Users only needed to understand the
                interaction once, then apply it everywhere.
              </div>
            </div>
            <div className="learning-card">
              <div className="learning-num">03</div>
              <div className="learning-text">
                <strong>Cut screens that ask the same question twice</strong>
                The intermediate "Generate vs Write" screen was an early instinct that
                proved redundant. Removing it tightened the flow without losing any
                user path — the chat bar already handled the manual case.
              </div>
            </div>
            <div className="learning-card">
              <div className="learning-num">04</div>
              <div className="learning-text">
                <strong>The first output must feel intentional, not accidental</strong>
                AI output is non-deterministic, but the experience of receiving it doesn't
                have to feel random. Framing, context, and presentation make the difference.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
