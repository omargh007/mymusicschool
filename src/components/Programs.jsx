import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal, StaggerContainer, StaggerItem } from '../animations'
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
      <div className="courses-section-inner">

        {/* ── header ── */}
        <div className="courses-header wrap">
          <ScrollReveal direction="up">
            <div className="section-label">{cs.label}</div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="section-heading">
              {cs.heading1}<br /><strong>{cs.heading2}</strong>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="courses-sub">{cs.sub}</p>
          </ScrollReveal>
        </div>

        {/* ── grid ── */}
        <StaggerContainer className="courses-grid wrap" delay={0.1}>
          {courses.map((c, i) => (
            <StaggerItem key={i}>
              <motion.div
                className={`course-card${active === i ? ' active' : ''}`}
                onClick={() => setActive(active === i ? null : i)}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(26,18,8,0.12)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
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
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <a href="#contact" className="course-enroll-btn">
                        {cs.enroll} →
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  className="course-card-arrow"
                  animate={{ rotate: active === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  +
                </motion.div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* bottom label */}
        <ScrollReveal direction="fade" delay={0.2}>
          <p className="courses-bottom-note">{cs.allLevels}</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
