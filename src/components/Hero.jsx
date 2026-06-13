import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { FadeUp, FloatBob } from '../animations'
import { useLang } from '../context/LanguageContext'
import './Hero.css'

const ease = [0.25, 0.46, 0.45, 0.94]

export default function Hero() {
  const { t, isAr } = useLang()

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
      {/* ── full-bleed background image ── */}
      <motion.img
        src="/music-hero.jpg"
        alt="Music Academy"
        className="hero-bg-image"
        loading="eager"
        style={{ y: imgY, x: depth2X }}
      />
      <motion.div className="hero-bg-overlay" style={{ opacity: overlayOp }} />

      {/* ── LEFT: headline panel ── */}
      <div className="hero-image-panel">
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
    </section>
  )
}
