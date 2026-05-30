import './Contact.css'

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="wrap">
        <div className="section-label reveal">Enroll</div>
        <h2 className="section-heading reveal d1">
          Begin your<br /><strong>journey</strong>
        </h2>
        <div className="contact-grid">
          <form className="contact-form reveal d1" onSubmit={e => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input className="form-input" type="text" placeholder="Jane" />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input className="form-input" type="text" placeholder="Smith" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="jane@example.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="form-input" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="form-group">
              <label className="form-label">Instrument Interest</label>
              <select className="form-select form-input">
                <option value="" disabled defaultValue="">Select an instrument</option>
                {['Piano','Guitar','Violin','Drums','Voice / Vocals','Music Theory','Music Production',"Children's Program (Ages 3–7)",'Not sure yet'].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                placeholder="Tell us about your goals, experience level, preferred schedule…"
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              Send Message
            </button>
          </form>

          <div className="contact-sidebar reveal d2">
            {[
              { label: 'Phone',   value: '+1 (555) 742-8391' },
              { label: 'Email',   value: 'hello@harmoniamusic.com' },
              { label: 'Address', value: '284 Melody Lane, Suite 3\nSan Francisco, CA 94102' },
            ].map(({ label, value }) => (
              <div className="contact-info-block" key={label}>
                <div className="contact-info-label">{label}</div>
                <div className="contact-info-val" style={{ whiteSpace: 'pre-line' }}>{value}</div>
              </div>
            ))}
            <div className="contact-info-block">
              <div className="contact-info-label">Hours</div>
              <div className="hours-grid">
                <div className="hours-day">Mon – Fri</div><div className="hours-time">9am – 9pm</div>
                <div className="hours-day">Saturday</div><div className="hours-time">9am – 6pm</div>
                <div className="hours-day">Sunday</div><div className="hours-time">10am – 5pm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
