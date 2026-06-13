import { useLang } from '../context/LanguageContext'
import './WhySection.css'

export default function WhySection() {
  const { t } = useLang()
  const why = t('why')
  const features = t('why.features')

  return (
    <section className="why-section" id="why">
      <span className="watermark-num">02</span>
      <div className="wrap">
        <div className="why-header">
          <div className="section-label reveal">{why.label}</div>
          <h2 className="section-heading reveal d1">
            {why.heading1}<br /><strong>{why.heading2}</strong>
          </h2>
        </div>

        <div className="why-grid">
          {features.map((f, i) => (
            <div className={`why-card reveal d${i + 1}`} key={i}>
              <div className="why-card-top">
                <span className="why-card-icon">{f.icon}</span>
                <span className="why-card-num">{f.num}</span>
              </div>
              <h3 className="why-card-title">{f.title}</h3>
              <p className="why-card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
