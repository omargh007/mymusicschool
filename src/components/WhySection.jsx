import './WhySection.css'

const features = [
  { num: '01', icon: '🎓', title: 'Expert Faculty', desc: 'Every instructor holds a conservatory degree and performs professionally. Real musicianship, real mentorship.' },
  { num: '02', icon: '🎹', title: 'All Instruments', desc: 'Twelve instruments across classical, contemporary, and electronic genres. One curriculum, infinite paths.' },
  { num: '03', icon: '📅', title: 'Flexible Scheduling', desc: 'Mornings, evenings, weekends. In-studio or online. We fit around your life, not the other way around.' },
  { num: '04', icon: '🎭', title: 'Performance Opportunities', desc: 'Recitals, workshops, and masterclasses year-round. Students become confident performers, not just players.' },
]

export default function WhySection() {
  return (
    <>
      <section className="why-section" id="why">
        <div className="wrap">
          <div className="section-label reveal">Why Harmonia</div>
          <h2 className="section-heading reveal d1">
            Music education that<br /><strong>transforms lives</strong>
          </h2>
          <div className="why-grid">
            {features.map((f, i) => (
              <div className={`why-item reveal d${i}`} key={f.num}>
                <div className="why-num">{f.num}</div>
                <div className="why-icon">{f.icon}</div>
                <div className="why-title">{f.title}</div>
                <div className="why-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="wrap">
        <div className="ornament"><div className="ornament-diamond" /></div>
      </div>
    </>
  )
}
