import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { FadeUp, FloatBob, StaggerContainer, StaggerItem } from '../animations'
import { useLang } from '../context/LanguageContext'
import './Hero.css'

const ease = [0.25, 0.46, 0.45, 0.94]

export default function Hero() {
  const { t, isAr } = useLang()
  const courses = t('courses')

  /* ── parallax on scroll ── */
  const sectionRef = useRef(null)
  const { scrollY } = useScroll()
  const imgY       = useTransform(scrollY, [0, 600], [0, -80])
  const overlayOp  = useTransform(scrollY, [0, 400], [1, 0.4])

  /* ── mouse parallax ── */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 40, damping: 18 })
  const springY = useSpring(rawY, { stiffness: 40, damping: 18 })
  const depth1X = useTransform(springX, v => v * 1 * 30)
  const depth1Y = useTransform(springY, v => v * 1 * 30)
  const depth2X = useTransform(springX, v => v * 0.4 * 30)
  const depth2Y = useTransform(springY, v => v * 0.4 * 30)

  const onMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(((e.clientX - rect.left) / rect.width  - 0.5) * 2)
    rawY.set(((e.clientY - rect.top)  / rect.height - 0.5) * 2)
  }
  const onMouseLeave = () => { rawX.set(0); rawY.set(0) }

  return (
    <section
      className="hero"
      id="home"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ── LEFT: image panel ── */}
      <div className="hero-image-panel">
        <motion.img
          src="/music-hero.jpg"
          alt="Music Academy"
          loading="eager"
          style={{ y: imgY, x: depth2X }}
        />
        <motion.div className="hero-image-overlay" style={{ opacity: overlayOp }} />

        {/* floating musical note */}
        <FloatBob className="hero-float-note" duration={7.5}>♩</FloatBob>
        <FloatBob className="hero-float-note-2" duration={9.2}>♪</FloatBob>

        <div className="hero-image-content">
          <FadeUp delay={0.1}>
            <div className="hero-image-eyebrow">{t('hero.eyebrow')}</div>
          </FadeUp>
          <FadeUp delay={0.28}>
            <motion.h1
              className="hero-h1"
              style={{ x: depth1X, y: depth1Y, fontStyle: isAr ? 'normal' : 'italic' }}
            >
              {t('hero.headline1')}<br />
              <strong>{t('hero.headline2')}</strong>
            </motion.h1>
          </FadeUp>
          <FadeUp delay={0.46}>
            <div className="hero-scroll-hint">
              <motion.svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
              {t('hero.scroll')}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── RIGHT: services panel ── */}
      <div className="hero-cta-panel">
        <FloatBob className="hero-watermark" duration={11}>♩</FloatBob>

        <FadeUp delay={0.15}>
          <div className={`hero-cta-badge ${isAr ? 'ar' : ''}`}>{t('hero.badge')}</div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <h2 className="hero-cta-title" style={{ fontFamily: isAr ? 'var(--ff-ar)' : 'var(--ff-display)', lineHeight: isAr ? 1.45 : 1.15 }}>
            {t('hero.title').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
        </FadeUp>

        <FadeUp delay={0.42}>
          <p className="hero-cta-sub">{t('hero.sub')}</p>
        </FadeUp>

        {/* ── 8 courses staggered grid ── */}
        <StaggerContainer className="hero-courses-grid" delay={0.55}>
          {courses.map((c, i) => (
            <StaggerItem key={i}>
              <motion.div
                className="hero-course-card"
                whileHover={{ scale: 1.03, borderColor: 'var(--sienna)', boxShadow: '0 4px 20px rgba(181,69,27,0.15)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <span className="hero-course-num">0{i + 1}</span>
                <div className="hero-course-body">
                  <div className="hero-course-title">{c.title}</div>
                  <div className="hero-course-desc">{c.desc}</div>
                </div>
                <motion.div
                  className="hero-course-arrow"
                  initial={{ opacity: 0, x: -4 }}
                  whileHover={{ opacity: 1, x: 0 }}
                >›</motion.div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={1.1}>
          <div className="hero-actions">
            <motion.a
              href="#contact"
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {t('hero.cta')}
            </motion.a>
            <motion.a
              href="#programs"
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M5.5 5.2l3 1.8-3 1.8V5.2z" fill="currentColor"/>
              </svg>
              {t('hero.explore')}
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
