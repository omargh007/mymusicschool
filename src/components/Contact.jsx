import { useLang } from '../context/LanguageContext'
import './Contact.css'

export default function Contact() {
  const { t } = useLang()
  const c = t('contact')
  const hours = t('contact.hours')
  const instruments = t('contact.instruments')

  return (
    <section className="contact-section" id="contact">
      <div className="wrap">
        <div className="section-label reveal">{c.label}</div>
        <h2 className="section-heading reveal d1">
          {c.heading1}<br /><strong>{c.heading2}</strong>
        </h2>
        <div className="contact-grid">
          <form className="contact-form reveal d1" onSubmit={e => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{c.firstName}</label>
                <input className="form-input" type="text" placeholder={c.firstNamePh} />
              </div>
              <div className="form-group">
                <label className="form-label">{c.lastName}</label>
                <input className="form-input" type="text" placeholder={c.lastNamePh} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">{c.email}</label>
              <input className="form-input" type="email" placeholder={c.emailPh} />
            </div>
            <div className="form-group">
              <label className="form-label">{c.phone}</label>
              <input className="form-input" type="tel" placeholder={c.phonePh} />
            </div>
            <div className="form-group">
              <label className="form-label">{c.instrument}</label>
              <select className="form-select form-input">
                <option value="" disabled defaultValue="">{c.instrumentSelect}</option>
                {instruments.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{c.message}</label>
              <textarea className="form-textarea" placeholder={c.messagePh} />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              {c.send}
            </button>
          </form>

          <div className="contact-sidebar reveal d2">
            {[
              { label: c.phoneLabel,   value: '+1 (555) 742-8391' },
              { label: c.emailLabel,   value: 'hello@harmoniamusic.com' },
              { label: c.addressLabel, value: c.addressVal },
            ].map(({ label, value }) => (
              <div className="contact-info-block" key={label}>
                <div className="contact-info-label">{label}</div>
                <div className="contact-info-val" style={{ whiteSpace: 'pre-line' }}>{value}</div>
              </div>
            ))}
            <div className="contact-info-block">
              <div className="contact-info-label">{c.hoursLabel}</div>
              <div className="hours-grid">
                {hours.map(([day, time], i) => (
                  <div key={i} style={{ display: 'contents' }}>
                    <div className="hours-day">{day}</div>
                    <div className="hours-time">{time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
