import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initSmoothScroll, getLenis } from '../lib/smoothScroll'
import './Preloader.css'

const IMAGES = [
  '/john-matychuk-gUK3lA3K7Yo-unsplash.jpg',
  '/wes-hicks-MEL-jJnm7RQ-unsplash.jpg',
  '/omid-armin-0cbLoqUyz28-unsplash.jpg',
]

export default function Preloader({ onDone }) {
  const panelRefs = useRef([])
  const imgRefs = useRef([])
  const markRef = useRef(null)

  useEffect(() => {
    initSmoothScroll()
    getLenis()?.stop()
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        document.body.style.overflow = ''
        getLenis()?.start()
        ScrollTrigger.refresh()
        onDone?.()
      },
    })

    tl.set(imgRefs.current, { scale: 1.25 })
      .to(imgRefs.current, { scale: 1, duration: 1.7, stagger: 0.1 })
      .fromTo(
        markRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=1.1'
      )
      .to(markRef.current, { opacity: 0, y: -14, duration: 0.5 }, '+=0.5')
      .to(
        panelRefs.current,
        { yPercent: -100, duration: 1.1, ease: 'expo.inOut', stagger: 0.12 },
        '-=0.05'
      )

    return () => tl.kill()
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
    </div>
  )
}
