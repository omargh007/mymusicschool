import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollReveal, StaggerContainer, StaggerItem, FloatBob } from '../animations'
import { useLang } from '../context/LanguageContext'
import './CtaDark.css'

export default function CtaDark() {
  const { t, isAr } = useLang()
  const fs = t('freeSession')
  const points = t('freeSession.points')

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <div className="free-session" ref={ref} id="free-session">
      {/* animated background layer */}
      <motion.div className="free-session-bg" style={{ y: bgY }} />
      <FloatBob className="free-session-note-1" duration={8}>♩</FloatBob>
      <FloatBob className="free-session-note-2" duration={11}>♪</FloatBob>
      <FloatBob className="free-session-note-3" duration={6.5}>𝄞</FloatBob>

      <div className="wrap free-session-inner">

        {/* left: text block */}
        <div className="free-session-left">
          <ScrollReveal direction="up">
            <div className="free-session-label">{fs.label}</div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.12}>
            <h2 className="free-session-heading" style={{ fontFamily: isAr ? 'var(--ff-ar)' : 'var(--ff-display)', lineHeight: isAr ? 1.4 : 1.1 }}>
              {fs.heading1}<br />
              <strong>{fs.heading2}</strong>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.22}>
            <p className="free-session-sub">{fs.sub}</p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.34}>
            <motion.a
              href="#contact"
              className="free-session-cta"
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(181,69,27,0.45)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {fs.cta}
            </motion.a>
          </ScrollReveal>

          <ScrollReveal direction="fade" delay={0.44}>
            <div className="free-session-social-proof">
              <div className="free-session-dots">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="free-session-avatar-dot"
                    initial={{ opacity: 0, x: isAr ? 8 : -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
                    style={{ zIndex: 5 - i, marginInlineStart: i === 0 ? 0 : -10 }}
                  />
                ))}
              </div>
              <span className="free-session-note">{fs.note}</span>
            </div>
          </ScrollReveal>
        </div>

        {/* right: promise card */}
        <ScrollReveal direction={isAr ? 'left' : 'right'} delay={0.18}>
          <div className="free-session-card">
            <div className="free-session-card-label">{fs.promise}</div>
            <StaggerContainer delay={0.28}>
              {points.map((point, i) => (
                <StaggerItem key={i}>
                  <div className="free-session-point">
                    <motion.div
                      className="free-session-check"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                    >
                      ✓
                    </motion.div>
                    <span>{point}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="free-session-divider" />

            <div className="free-session-price-block">
              <div className="free-session-price-label">{fs.priceLabel}</div>
              <div className="free-session-price">
                <span className="free-session-price-was">{fs.priceCrossed}</span>
                <span className="free-session-price-free">{fs.priceFree}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  )
}
