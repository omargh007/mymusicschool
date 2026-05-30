import './Events.css'

const events = [
  {
    month: 'Jun', day: '14',
    title: 'Spring Recital 2026',
    venue: 'Main Hall', time: '7:00 PM', who: 'All ages welcome',
    desc: 'Our flagship semi-annual showcase. Students from all programs perform for family and friends in a professional concert setting.',
  },
  {
    month: 'Jun', day: '28',
    title: 'Jazz Workshop with Rafael Torres',
    venue: 'Studio B', time: '2:00 PM', who: 'Intermediate — Advanced',
    desc: 'An afternoon of improvisation, theory, and jam sessions. Open to intermediate and advanced guitar students.',
  },
  {
    month: 'Jul', day: '05',
    title: 'Summer Piano Masterclass',
    venue: 'Concert Hall', time: '10:00 AM', who: 'All piano students',
    desc: 'Summer intensive with guest artist Dr. Elena Vasquez. Four hours of technique, interpretation, and coaching.',
  },
]

export default function Events() {
  return (
    <section className="events-section" id="events">
      <span className="watermark-num">03</span>
      <div className="wrap" style={{ position: 'relative' }}>
        <div className="section-label reveal">Calendar</div>
        <h2 className="section-heading reveal d1">
          Upcoming<br /><strong>Events</strong>
        </h2>
        <div className="events-list">
          {events.map((e, i) => (
            <div className={`event-row reveal d${i}`} key={i}>
              <div className="event-date-block">
                <span className="event-date-month">{e.month}</span>
                <span className="event-date-day">{e.day}</span>
              </div>
              <div className="event-info">
                <div className="event-title">{e.title}</div>
                <div className="event-meta">
                  <span>{e.venue}</span>
                  <span>{e.time}</span>
                  <span>{e.who}</span>
                </div>
                <div className="event-desc">{e.desc}</div>
              </div>
              <a href="#contact" className="btn-outline-sm">Register</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
