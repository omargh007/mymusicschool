import { useLang } from '../context/LanguageContext'
import './WhySection.css'

export default function WhySection() {
  const { t } = useLang()
  const why = t('why')

  return (
    <>
      <section className="why-section" id="why">
        <div className="wrap">
          <div className="section-label reveal">{why.label}</div>
          <h2 className="section-heading reveal d1">
            {why.heading1}<br /><strong>{why.heading2}</strong>
          </h2>
          <div className="why-grid">
            {why.features.map((f, i) => (
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
