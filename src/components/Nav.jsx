import { useState, useEffect } from 'react'
import './Nav.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`nav${scrolled ? ' opaque' : ''}`}>
        <div className="nav-inner">
          <ul className="nav-left">
            <li><a href="#programs">Programs</a></li>
            <li><a href="#instructors">Faculty</a></li>
            <li><a href="#events">Events</a></li>
          </ul>

          <a href="#home" className="nav-logo">
            <span className="nav-logo-name">MyMusicSchool</span>
            <span className="nav-logo-sub">Est. 2011 · San Francisco</span>
          </a>

          <ul className="nav-right">
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#contact" className="nav-cta-pill">Book Free Trial</a></li>
          </ul>

          <button
            className="nav-burger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {['#programs','#instructors','#events','#pricing','#contact'].map((href, i) => (
          <a key={i} href={href} onClick={() => setMenuOpen(false)}>
            {['Programs','Faculty','Events','Pricing','Contact'][i]}
          </a>
        ))}
        <div className="mobile-menu-actions">
          <a href="#contact" className="btn-primary" onClick={() => setMenuOpen(false)}
            style={{ textAlign: 'center' }}>
            Book Free Trial Lesson
          </a>
        </div>
      </div>
    </>
  )
}
