import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import './Nav.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, toggle, locale, isAr } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#programs',    label: t('nav.programs') },
    { href: '#instructors', label: t('nav.faculty') },
    { href: '#events',      label: t('nav.events') },
  ]
  const navRight = [
    { href: '#contact', label: t('nav.contact') },
  ]

  return (
    <>
      <nav className={`nav${scrolled ? ' opaque' : ''}`}>
        <div className="nav-inner">
          <ul className="nav-left">
            {navLinks.map(l => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>

          <a href="#home" className="nav-logo">
            <span className="nav-logo-name">MyMusicSchool</span>
            <span className="nav-logo-sub">Est. 2011 · San Francisco</span>
          </a>

          <ul className="nav-right">
            {navRight.map(l => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
            {/* Language toggle */}
            <li>
              <motion.button
                className="lang-toggle"
                onClick={toggle}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                title={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={locale}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isAr ? 'EN' : 'ع'}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </li>
            <li>
              <a href="#contact" className="nav-cta-pill">{t('nav.bookTrial')}</a>
            </li>
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu open"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {[...navLinks, ...navRight].map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <div className="mobile-menu-actions">
              <button className="lang-toggle lang-toggle-mobile" onClick={toggle}>
                {isAr ? 'English' : 'العربية'}
              </button>
              <a href="#contact" className="btn-primary" onClick={() => setMenuOpen(false)}
                style={{ textAlign: 'center' }}>
                {t('nav.bookTrial')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
