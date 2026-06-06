import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import './WhySection.css'

const ease = [0.25, 0.46, 0.45, 0.94]

const bgThemes = [
  { bg: '#faf8f4', text: '#1a1208', accent: '#b5451b', numColor: 'rgba(181,69,27,0.07)' },
  { bg: '#1a1208', text: '#faf8f4', accent: '#e8d5c4', numColor: 'rgba(232,213,196,0.06)' },
  { bg: '#f5f0ea', text: '#1a1208', accent: '#b5451b', numColor: 'rgba(181,69,27,0.06)' },
  { bg: '#1a1208', text: '#faf8f4', accent: '#e8d5c4', numColor: 'rgba(232,213,196,0.06)' },
]

export default function WhySection() {
  const { t, isAr } = useLang()
  const why = t('why')
  const features = t('why.features')

  const sectionRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [prevIdx, setPrevIdx] = useState(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  /* map progress → active feature index */
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(Math.floor(v * 4), 3)
    if (next !== activeIdx) {
      setPrevIdx(activeIdx)
      setActiveIdx(next)
    }
  })

  /* exit fade: whole section fades at very end */
  const exitOpacity = useTransform(scrollYProgress, [0.88, 1], [1, 0])

  const theme = bgThemes[activeIdx]
  const f = features[activeIdx]

  return (
    <>
      {/* ── sticky scroll-jack section ── */}
      <section ref={sectionRef} className="why-scroll-outer" id="why">
        <motion.div
          className="why-sticky"
          animate={{ backgroundColor: theme.bg }}
          transition={{ duration: 0.7, ease }}
          style={{ opacity: exitOpacity }}
        >
          {/* huge decorative number */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`num-${activeIdx}`}
              className="why-bg-num"
              style={{ color: theme.numColor }}
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.6, ease }}
            >
              {f.num}
            </motion.div>
          </AnimatePresence>

          {/* progress spine */}
          <div className="why-spine">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                className="why-spine-dot"
                animate={{
                  scale: i === activeIdx ? 1 : 0.5,
                  backgroundColor: i === activeIdx ? theme.accent : 'rgba(128,100,80,0.3)',
                }}
                transition={{ duration: 0.35 }}
              />
            ))}
            <motion.div
              className="why-spine-line"
              animate={{ scaleY: (activeIdx + 1) / 4, backgroundColor: theme.accent }}
              transition={{ duration: 0.6, ease }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {/* main content */}
          <div className="why-content-wrap">
            {/* section label */}
            <motion.div
              className="why-label"
              animate={{ color: theme.accent }}
              transition={{ duration: 0.5 }}
            >
              {why.label}
            </motion.div>

            {/* feature card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                className="why-feature-block"
                initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -40, filter: 'blur(4px)' }}
                transition={{ duration: 0.55, ease }}
              >
                <motion.span
                  className="why-icon"
                  initial={{ scale: 0.5, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
                >
                  {f.icon}
                </motion.span>

                <motion.h2
                  className="why-feature-title"
                  style={{ color: theme.text }}
                >
                  {f.title}
                </motion.h2>

                <motion.p
                  className="why-feature-desc"
                  style={{ color: activeIdx % 2 === 1 ? 'rgba(250,248,244,0.6)' : 'var(--ink-2)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease }}
                >
                  {f.desc}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* bottom counter strip */}
            <div className="why-counter-strip">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  className="why-counter-item"
                  animate={{ opacity: i === activeIdx ? 1 : 0.3 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="why-counter-num"
                    style={{ color: theme.accent }}
                  >
                    {feat.num}
                  </motion.div>
                  <div
                    className="why-counter-title"
                    style={{ color: theme.text }}
                  >
                    {feat.title}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* scroll hint */}
          <motion.div
            className="why-scroll-cue"
            style={{ color: activeIdx % 2 === 1 ? 'rgba(250,248,244,0.3)' : 'var(--ink-4)' }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </section>

      <div className="wrap">
        <div className="ornament"><div className="ornament-diamond" /></div>
      </div>
    </>
  )
}
