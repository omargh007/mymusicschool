import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ScrollReveal, StaggerContainer, StaggerItem } from '../animations'
import { useLang } from '../context/LanguageContext'
import './Instructors.css'

const imgs = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
]

function InstructorRow({ instructor, img, idx, isFlipped, isAr }) {
  const rowRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const textX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [isFlipped ? 40 : -40, 0, isFlipped ? -20 : 20]
  )

  /* magnetic hover */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 60, damping: 20 })
  const my = useSpring(rawY, { stiffness: 60, damping: 20 })

  const onMove = (e) => {
    const rect = rowRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 24)
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 24)
  }
  const onLeave = () => { rawX.set(0); rawY.set(0) }

  const dir = {
    initial: { opacity: 0, x: isFlipped ? 60 : -60 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      ref={rowRef}
      className={`instructor-row${isFlipped ? ' flip' : ''}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* image with parallax */}
      <div className="instructor-img-col">
        <div className="instructor-img-wrap">
          <motion.img
            src={img}
            alt={instructor.name}
            style={{ y: imgY, x: mx, scale: 1.12 }}
          />
          {/* reveal frame */}
          <motion.div
            className="instructor-img-frame"
            initial={{ scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.77, 0, 0.18, 1] }}
            style={{ transformOrigin: isFlipped ? 'left' : 'right' }}
          />
        </div>
      </div>

      {/* text with parallax */}
      <motion.div
        className="instructor-text-col"
        style={isFlipped ? { background: 'var(--ivory-2)', x: textX } : { x: textX }}
      >
        <ScrollReveal direction={isFlipped ? 'right' : 'left'} delay={0.15}>
          <div className="instructor-idx">{`${instructor.idx} — 0${idx + 1}`}</div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.22}>
          <div className="instructor-name">{instructor.name}</div>
          <div className="instructor-title">{instructor.title}</div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.32}>
          <div className="instructor-bio">{instructor.bio}</div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.4}>
          <StaggerContainer className="instructor-tags" delay={0.45}>
            {instructor.tags.map(tag => (
              <StaggerItem key={tag}>
                <motion.span
                  className="instructor-tag"
                  whileHover={{ borderColor: 'var(--sienna)', color: 'var(--sienna)', scale: 1.04 }}
                  transition={{ duration: 0.18 }}
                >
                  {tag}
                </motion.span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.5}>
          <motion.a
            href="#contact"
            className="instructor-link"
            whileHover={{ gap: '18px', color: 'var(--sienna)' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            {instructor.viewProfile || 'View Profile →'}
          </motion.a>
        </ScrollReveal>
      </motion.div>
    </motion.div>
  )
}

export default function Instructors() {
  const { t, isAr } = useLang()
  const ins = t('instructors')

  return (
    <section className="instructors-section" id="instructors">
      <div className="wrap" style={{ position: 'relative', marginBottom: 64 }}>
        <span className="watermark-num">02</span>
        <ScrollReveal direction="up">
          <div className="section-label">{ins.label}</div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h2 className="section-heading">
            {ins.heading1}<br /><strong>{ins.heading2}</strong>
          </h2>
        </ScrollReveal>
      </div>

      {ins.list.map((instructor, i) => (
        <InstructorRow
          key={i}
          instructor={{ ...instructor, idx: ins.facultyLabel, viewProfile: ins.viewProfile }}
          img={imgs[i]}
          idx={i}
          isFlipped={i === 1}
          isAr={isAr}
        />
      ))}
    </section>
  )
}
