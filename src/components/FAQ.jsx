import { useState } from 'react'
import './FAQ.css'

const faqs = [
  { q: 'What age can my child start music lessons?', a: 'We accept children from age 3 for our early childhood programs. Individual instrument lessons typically begin at age 5–7 depending on the instrument. Our faculty recommends the best starting point during a free assessment.' },
  { q: 'Which instruments do you offer?', a: 'Piano, Guitar (acoustic, electric, classical), Violin, Viola, Drums, Voice, Trumpet, Flute, Saxophone, Music Theory, and Music Production. New instruments are added based on demand.' },
  { q: 'What happens during the free trial lesson?', a: 'Your first lesson is completely free and commitment-free. The instructor assesses your current level, discusses your goals, introduces foundational concepts, and recommends a learning path.' },
  { q: 'What is your cancellation and rescheduling policy?', a: 'Lessons cancelled at least 24 hours in advance can be rescheduled at no charge. Late cancellations within 24 hours are charged at 50% of the lesson rate. Members can pause for up to one month per year without penalty.' },
  { q: 'How much should students practice at home?', a: 'Beginners: 15–20 minutes daily. Intermediate: 30–45 minutes. Advanced: 60–90 minutes. Consistency matters far more than duration; short daily sessions outperform weekly marathons every time.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="faq-section" id="faq">
      <div className="wrap">
        <div className="faq-grid">
          <div>
            <div className="section-label reveal">FAQ</div>
            <h2 className="section-heading reveal d1">
              Common<br /><strong>questions</strong>
            </h2>
            <p className="faq-intro reveal d2">
              Can't find what you're looking for? Reach out directly and we'll be happy to help.
            </p>
            <a href="#contact" className="faq-contact-link reveal d3">Contact us &rarr;</a>
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
