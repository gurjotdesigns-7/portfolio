import './experience.css'

const experience = [
  {
    company: 'ShareChat', location: 'Bengaluru', period: 'Aug 2022 – Jun 2026',
    title: 'Senior Product Designer / UX Designer II',
    description: 'Designed across Moj, FriendZone / Vibely and ShareChat, from creator monetisation and verification to AI-powered experiences and shared design systems.',
    roles: [
      ['Senior Product Designer / UX Designer II', 'Sep 2024 – Jun 2026'],
      ['Product Designer / UX Designer I', 'Oct 2022 – Sep 2024'],
      ['Design Intern', 'Aug 2022 – Sep 2022'],
    ],
    highlights: ['Sole designer on Moj Spot, reaching a ₹7.7 crore annualised run rate.', 'Built component libraries, tokens and patterns across three live products.'],
    tags: ['Product design', 'Creator monetisation', 'Design systems', 'Generative AI'],
  },
  {
    company: 'Aarcobe Design Consultants', location: 'Chandigarh', period: 'Sep 2021 – Jan 2022',
    title: 'Architect & 3D Visualiser',
    description: 'Applied systems thinking to residential facade design and floor-plan circulation.',
    tags: ['Architecture', '3D visualisation', 'Spatial planning'],
  },
  {
    company: 'Artur Gartner Architektengesellschaft mbH', location: 'Berlin', period: 'Jul 2019 – Dec 2019',
    title: 'Intern Architect',
    description: 'Completed a six-month supervised internship on the adaptive reuse of a wartime steel structure into student housing.',
    tags: ['Adaptive reuse', 'Architecture', 'Student housing'],
  },
]

function ThumbPin() {
  return <span className="experience-pin" aria-hidden="true"><span /></span>
}

export default function Experience() {
  return <section id="experience" className="experience-section" aria-labelledby="experience-heading">
    <header className="section-heading">
      <h2 id="experience-heading" className="section-h2">Experience</h2>
      <p className="experience-caption">From spaces to screens.</p>
    </header>
    <ol className="experience-timeline">
      {experience.map((job, index) => <li className="experience-entry" key={job.company}>
        <div className="experience-date"><span className="experience-dot" aria-hidden="true" /><span>{job.period}</span></div>
        <article className={`experience-paper experience-paper--${index}`}>
          <ThumbPin />
          <div className="experience-company"><span className="experience-company-mark" aria-hidden="true">{index === 0 ? 'S' : index === 1 ? 'A' : 'AG'}</span><div><h3>{job.company}</h3><p>{job.location}</p></div></div>
          <h4 className="experience-title">{job.title}</h4>
          <p className="experience-description">{job.description}</p>
          {job.highlights && <ul className="experience-highlights">{job.highlights.map(text => <li key={text}>{text}</li>)}</ul>}
          {job.roles && <ol className="experience-roles" aria-label="Role progression at ShareChat">{job.roles.map(([title, period]) => <li key={title}><span>{title}</span><span>{period}</span></li>)}</ol>}
          <ul className="experience-tags" aria-label="Areas of work">{job.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </article>
      </li>)}
    </ol>
  </section>
}
