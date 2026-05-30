import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-image-panel">
        <img
          src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1800&q=80"
          alt="Piano keys close-up"
          loading="eager"
        />
        <div className="hero-image-overlay" />
        <div className="hero-image-content">
          <div className="hero-image-eyebrow hero-animate-1">Est. 2011 — San Francisco</div>
          <h1 className="hero-h1 hero-animate-2">
            Unlock Your<br />
            <strong>Musical Potential</strong>
          </h1>
          <div className="hero-scroll-hint hero-animate-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Scroll to explore
          </div>
        </div>
      </div>

      <div className="hero-cta-panel">
        <div className="hero-watermark">♩</div>
        <div className="hero-cta-badge hero-animate-1">Now Enrolling</div>
        <h2 className="hero-cta-title hero-animate-2">
          Where music becomes a lifelong conversation
        </h2>
        <p className="hero-cta-sub hero-animate-3">
          World-class instruction for children, teenagers, and adults. Every instrument. Every level. In-person and online.
        </p>
        <div className="hero-actions hero-animate-4">
          <a href="#contact" className="btn-primary">Book a Free Trial Lesson</a>
          <a href="#programs" className="btn-secondary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M5.5 5.2l3 1.8-3 1.8V5.2z" fill="currentColor"/>
            </svg>
            Explore Programs
          </a>
        </div>
        <div className="hero-stats hero-animate-5">
          {[
            { val: '500+', label: 'Active Students' },
            { val: '18',   label: 'Expert Faculty' },
            { val: '15yr', label: 'Est. Since 2011' },
          ].map(({ val, label }) => (
            <div className="hero-stat" key={label}>
              <div className="hero-stat-val">{val}</div>
              <div className="hero-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
