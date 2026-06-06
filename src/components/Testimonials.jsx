import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import './Testimonials.css'

export default function Testimonials() {
  const { t } = useLang()
  const testimonials = t('testimonials.list')
  const label = t('testimonials.label')
  const [current, setCurrent] = useState(0)
  const item = testimonials[current]

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="wrap">
        <div className="section-label reveal" style={{ justifyContent: 'center', marginBottom: 56 }}>
          {label}
        </div>
        <div className="testimonial-slider reveal">
          <span className="testimonial-mark">"</span>
          <blockquote className="testimonial-quote">{item.quote}</blockquote>
          <div className="testimonial-attribution">
            <div className="t-avatar" style={{ background: item.color }}>{item.initials}</div>
            <div>
              <div className="t-name">{item.name}</div>
              <div className="t-role">{item.role}</div>
            </div>
          </div>
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`t-dot${i === current ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
