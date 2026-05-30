import { useState } from 'react'
import './Testimonials.css'

const testimonials = [
  {
    quote: "I joined with zero musical background at 34. Within six months I was playing pieces I had always dreamed of. Maya's patience and method are nothing short of extraordinary.",
    name: 'Sarah Kimura', role: 'Adult Piano Student, 2 years', initials: 'SK', color: '#b5451b',
  },
  {
    quote: "My daughter has been with Harmonia for three years. She performed her first recital at age 7 and just won her regional youth violin competition.",
    name: 'David Moreau', role: 'Parent of Violin Student', initials: 'DM', color: '#5b6ea0',
  },
  {
    quote: "Rafael didn't just teach me guitar — he showed me how music production works end-to-end. I released my first EP at 19 thanks to what I learned here.",
    name: 'Jordan Achebe', role: 'Guitar & Production Student', initials: 'JA', color: '#3d8a6e',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const t = testimonials[current]

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="wrap">
        <div className="section-label reveal" style={{ justifyContent: 'center', marginBottom: 56 }}>
          Student Stories
        </div>
        <div className="testimonial-slider reveal">
          <span className="testimonial-mark">"</span>
          <blockquote className="testimonial-quote">{t.quote}</blockquote>
          <div className="testimonial-attribution">
            <div className="t-avatar" style={{ background: t.color }}>{t.initials}</div>
            <div>
              <div className="t-name">{t.name}</div>
              <div className="t-role">{t.role}</div>
            </div>
          </div>
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`t-dot${i === current ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
