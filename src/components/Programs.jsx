import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StaggerContainer, StaggerItem } from '../animations'
import { useLang } from '../context/LanguageContext'
import './Programs.css'

const levelColors = {
  'مبتدئ': '#4a7c59', 'Beginner': '#4a7c59',
  'متوسط': '#b5451b', 'Intermediate': '#b5451b',
  'Inter. — Advanced': '#7a5c2e', 'متوسط — متقدم': '#7a5c2e',
  'Beginner — Inter.': '#6b7a4a', 'مبتدئ — متوسط': '#6b7a4a',
  'متقدم': '#1a3a5c', 'Advanced': '#1a3a5c',
}

export default function Programs() {
  const { t, isAr } = useLang()
  const courses = t('courses')
  const cs = t('coursesSection')
  const [active, setActive] = useState(null)

  return (
    <section className="courses-section" id="programs">
      <div className="courses-layout">

        {/* ── LEFT: sticky heading panel ── */}
        <div className="courses-sticky-col">
          <div className="courses-sticky-inner">
            <div className="section-label">{cs.label}</div>
            <h2 className="courses-sticky-heading">
              {cs.heading1}<br /><strong>{cs.heading2}</strong>
            </h2>
            <p className="courses-sticky-sub">{cs.sub}</p>

            {/* animated course counter */}
            <div className="courses-progress-wrap">
              <div className="courses-progress-track">
                <motion.div
                  className="courses-progress-fill"
                  animate={{ scaleY: active !== null ? (active + 1) / courses.length : 0 }}
                  transition={{ type: 'spring', stiffness: 60, damping: 18 }}
                  style={{ transformOrigin: 'top' }}
                />
              </div>
              <div className="courses-progress-label">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {active !== null ? `0${active + 1}` : '—'}
                </motion.span>
                {' / 08'}
              </div>
            </div>

            <a href="#contact" className="courses-sticky-cta btn-primary">
              {t('nav.bookTrial')}
            </a>
          </div>
        </div>

        {/* ── RIGHT: scrollable cards ── */}
        <div className="courses-cards-col">
          <StaggerContainer className="courses-list" delay={0.1}>
            {courses.map((c, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className={`course-card${active === i ? ' active' : ''}`}
                  onClick={() => setActive(active === i ? null : i)}
                  onHoverStart={() => setActive(i)}
                  onHoverEnd={() => setActive(null)}
                  whileHover={{ x: isAr ? -6 : 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  layout
                >
                  <div className="course-card-top">
                    <span className="course-num">0{i + 1}</span>
                    <span
                      className="course-level-badge"
                      style={{ color: levelColors[c.level] || 'var(--sienna)', borderColor: levelColors[c.level] || 'var(--sienna)' }}
                    >
                      {c.level}
                    </span>
                  </div>

                  <div className="course-card-body">
                    <h3 className="course-title">{c.title}</h3>
                    <p className="course-desc">{c.desc}</p>
                  </div>

                  <AnimatePresence>
                    {active === i && (
                      <motion.div
                        className="course-card-expand"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <a href="#contact" className="course-enroll-btn">
                          {cs.enroll} →
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="course-card-arrow"
                    animate={{ rotate: active === i ? 45 : 0, color: active === i ? 'var(--sienna)' : 'var(--ink-4)' }}
                    transition={{ duration: 0.22 }}
                  >+</motion.div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <p className="courses-bottom-note">{cs.allLevels}</p>
        </div>

      </div>
    </section>
  )
}
