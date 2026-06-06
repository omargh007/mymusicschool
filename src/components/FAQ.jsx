import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import './FAQ.css'

export default function FAQ() {
  const { t } = useLang()
  const faq = t('faq')
  const faqs = t('faq.list')
  const [open, setOpen] = useState(null)

  return (
    <section className="faq-section" id="faq">
      <div className="wrap">
        <div className="faq-grid">
          <div>
            <div className="section-label reveal">{faq.label}</div>
            <h2 className="section-heading reveal d1">
              {faq.heading1}<br /><strong>{faq.heading2}</strong>
            </h2>
            <p className="faq-intro reveal d2">{faq.intro}</p>
            <a href="#contact" className="faq-contact-link reveal d3">{faq.contact}</a>
          </div>
          <div className="faq-list reveal d1">
            {faqs.map((item, i) => (
              <div className={`faq-item${open === i ? ' open' : ''}`} key={i}>
                <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
