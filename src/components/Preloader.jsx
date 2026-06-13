import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initSmoothScroll, getLenis } from '../lib/smoothScroll'
import { useLang } from '../context/LanguageContext'
import './Preloader.css'

const IMAGES = [
  '/john-matychuk-gUK3lA3K7Yo-unsplash.jpg',
  '/wes-hicks-MEL-jJnm7RQ-unsplash.jpg',
  '/omid-armin-0cbLoqUyz28-unsplash.jpg',
]

export default function Preloader({ onDone }) {
  const { isAr } = useLang()
  const panelRefs = useRef([])
  const imgRefs = useRef([])
  const markRef = useRef(null)
  const hintRef = useRef(null)

  useEffect(() => {
    initSmoothScroll()
    getLenis()?.stop()
    document.body.style.overflow = 'hidden'

    let exited = false

    const isMobile = window.matchMedia('(max-width: 768px)').matches

    const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (isMobile) {
      gsap.set(panelRefs.current, { opacity: 0 })
      gsap.set(panelRefs.current[0], { opacity: 1 })
      gsap.set(imgRefs.current[0], { scale: 1.15 })

      introTl
        .to(imgRefs.current[0], { scale: 1, duration: 2.6, ease: 'none' })
        .fromTo(markRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .fromTo(hintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '+=0.3')
    } else {
      introTl
        .set(imgRefs.current, { scale: 1.25 })
        .to(imgRefs.current, { scale: 1, duration: 1.7, stagger: 0.1 })
        .fromTo(markRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, '-=1.1')
        .fromTo(hintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '+=0.3')
    }

    const exit = () => {
      if (exited) return
      exited = true
      removeListeners()
      introTl.kill()

      const exitTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          document.body.style.overflow = ''
          getLenis()?.start()
          ScrollTrigger.refresh()
          onDone?.()
        },
      })

      exitTl.to([markRef.current, hintRef.current], { opacity: 0, y: -14, duration: 0.4 })

      if (isMobile) {
        exitTl.to(panelRefs.current[0], { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=0.1')
      } else {
        exitTl.to(panelRefs.current, { yPercent: -100, duration: 1.1, ease: 'expo.inOut', stagger: 0.12 }, '-=0.1')
      }
    }

    const onWheel = (e) => { e.preventDefault(); exit() }
    const onTouchMove = (e) => { e.preventDefault(); exit() }
    const onKeyDown = (e) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '].includes(e.key)) exit()
    }

    function removeListeners() {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      introTl.kill()
      removeListeners()
    }
  }, [onDone])

  return (
    <div className="preloader">
      <div className="preloader-panels">
        {IMAGES.map((src, i) => (
          <div className="preloader-panel" key={src} ref={(el) => (panelRefs.current[i] = el)}>
            <img src={src} alt="" ref={(el) => (imgRefs.current[i] = el)} />
          </div>
        ))}
      </div>
      <div className="preloader-mark" ref={markRef}>
        <span className="preloader-note">&#9834;</span>
        <span className="preloader-name">MyMusicSchool</span>
      </div>
      <div className="preloader-hint" ref={hintRef}>
        <span className="preloader-hint-chevron">&#9660;</span>
        <span>{isAr ? 'مرر للدخول' : 'Scroll to enter'}</span>
      </div>
    </div>
  )
}
