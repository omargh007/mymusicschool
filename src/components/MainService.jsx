import { useLayoutEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'
import './MainService.css'

gsap.registerPlugin(ScrollTrigger)

export default function MainService() {
  const { t, isAr } = useLang()
  const hero = t('hero')
  const courses = t('courses')

  const introRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)

  const trackRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 })

  const { scrollXProgress } = useScroll({ container: trackRef })
  const progress = useTransform(scrollXProgress, v => Math.abs(v))
  const progressFill = useSpring(progress, { stiffness: 120, damping: 30 })

  const onPointerDown = (e) => {
    const track = trackRef.current
    if (!track) return
    drag.current = { active: true, startX: e.clientX, scrollLeft: track.scrollLeft }
    track.classList.add('dragging')
  }
  const onPointerMove = (e) => {
    if (!drag.current.active) return
    const track = trackRef.current
    track.scrollLeft = drag.current.scrollLeft - (e.clientX - drag.current.startX)
  }
  const endDrag = () => {
    drag.current.active = false
    trackRef.current?.classList.remove('dragging')
  }

  /* ── heading & sub slide in from the leading edge on scroll ── */
  useLayoutEffect(() => {
    const fromX = isAr ? 110 : -110

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      })
        .from(headingRef.current, { x: fromX, opacity: 0, duration: 0.95, ease: 'power3.out' })
        .from(subRef.current, { x: fromX * 0.6, opacity: 0, duration: 0.85, ease: 'power3.out' }, '-=0.6')
    })

    return () => ctx.revert()
  }, [isAr])

  const titleParts = hero.title.split('\n')

  return (
    <section className="main-service" id="main-service">
      <span className="watermark-num">01</span>

      <div className="wrap ms-header">
        <div className="ms-intro" ref={introRef}>
          <div className="section-label reveal">{hero.badge}</div>
          <h2 className="section-heading" ref={headingRef}>
            {titleParts[0]}
            {titleParts[1] && <><br /><strong>{titleParts[1]}</strong></>}
          </h2>
          <p className="ms-sub" ref={subRef}>{hero.sub}</p>
        </div>
        <div className="ms-actions reveal d1">
          <a href="#contact" className="btn-primary">{hero.cta}</a>
          <a href="#programs" className="btn-secondary">{hero.explore}</a>
        </div>
      </div>

      <div className="ms-filmstrip-wrap reveal d2">
        <div
          className="ms-filmstrip"
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          {courses.map((c, i) => (
            <div className="ms-item" key={i}>
              <span className="ms-item-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="ms-item-title">{c.title}</h3>
              <p className="ms-item-desc">{c.desc}</p>
              <span className="ms-item-level">{c.level}</span>
            </div>
          ))}
          <a href="#programs" className="ms-item ms-item-end">
            <span className="ms-end-arrow">&rarr;</span>
            <p className="ms-end-text">{hero.explore}</p>
          </a>
        </div>
      </div>

      <div className="wrap">
        <div className="ms-progress-track">
          <motion.div className="ms-progress-fill" style={{ scaleX: progressFill }} />
        </div>
      </div>
    </section>
  )
}
