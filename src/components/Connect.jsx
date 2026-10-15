import './connect.css'

const BOOKING_URL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2OyAGz2QVFnMBi98lW9sCs92RDRND7PcFLsYcIGOWLom-TFAs6bbUd35iJV8ER9wcjKxRBgmIZ'

export default function Connect() {
  return <section id="connect" className="connect-section" aria-label="Book a conversation">
    <div className="connect-card">
      <div className="connect-copy">
        <p className="connect-eyebrow">30-MINUTE GOOGLE MEET</p>
        <h2>Setup time for a wholesome conversation</h2>
        <p>Have a project in mind, a design question, or just want to say hello? Let’s find a time to talk.</p>
        <p className="connect-hours">Every day · 2–8 pm IST</p>
        <p className="connect-provider">Choose a date and an available time, then confirm your booking here.</p>
      </div>
      <div className="connect-booking">
        <iframe src={BOOKING_URL} title="Book a 30-minute call with Gurjot" className="connect-booking-frame" loading="lazy" />
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Having trouble? Open the booking page ↗</a>
      </div>
    </div>
  </section>
}
