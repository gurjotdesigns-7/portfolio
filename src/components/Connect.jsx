import './connect.css'

// Add the owner's public Google Calendar appointment schedule URL here.
const BOOKING_URL = ''
const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function Connect() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const days = new Date(year, month + 1, 0).getDate()
  const monthLabel = today.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return <section id="connect" className="connect-section" aria-label="Book a conversation">
    <div className="connect-card">
      <div className="connect-copy">
        <p className="connect-eyebrow">30-MINUTE CALL · GOOGLE MEET</p>
        <h2>A little time.<br />A good conversation.</h2>
        <p>Have a project in mind, a design question, or just want to say hello? Let’s find a time to talk.</p>
        <p className="connect-hours">Every day · 2–8 pm IST</p>
        {BOOKING_URL ? <a className="connect-book" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a time <span aria-hidden="true">↗</span></a> : <a className="connect-book" href="mailto:gurjot.cca@gmail.com">Email me to find a time <span aria-hidden="true">↗</span></a>}
        {BOOKING_URL && <span className="connect-provider">Choose an available slot on Google Calendar</span>}
      </div>
      <div className="connect-calendar" aria-label={`Calendar illustration for ${monthLabel}. Use the booking link to check availability.`}>
        <div className="connect-calendar-binding" aria-hidden="true"><i /><i /></div>
        <div className="connect-calendar-top"><span>{monthLabel}</span><span aria-hidden="true">✳</span></div>
        <div className="connect-calendar-grid" aria-hidden="true">
          {weekdays.map((day, i) => <span className="connect-weekday" key={`weekday-${i}`}>{day}</span>)}
          {Array.from({ length: firstDay }, (_, i) => <span key={`empty-${i}`} />)}
          {Array.from({ length: days }, (_, i) => <span className={i + 1 === today.getDate() ? 'connect-today' : ''} key={i}>{i + 1}</span>)}
        </div>
        <p className="connect-calendar-note">Let’s put something on the calendar.</p>
      </div>
    </div>
  </section>
}
