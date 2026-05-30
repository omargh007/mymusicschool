import './CtaDark.css'

export default function CtaDark() {
  return (
    <div className="cta-dark">
      <div className="wrap">
        <div className="cta-dark-eyebrow reveal">Your first lesson is free</div>
        <h2 className="cta-dark-title reveal d1">
          The best time to begin<br /><strong>is now</strong>
        </h2>
        <p className="cta-dark-sub reveal d2">
          No experience needed. No commitment required. Just curiosity.
        </p>
        <div className="cta-dark-actions reveal d3">
          <a href="#contact" className="btn-ivory">Book Free Trial</a>
          <a href="#programs" className="btn-ghost">View All Programs</a>
        </div>
      </div>
    </div>
  )
}
