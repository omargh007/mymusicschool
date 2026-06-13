import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* drifts the big background numerals as their section scrolls past */
export function useWatermarkParallax() {
  useEffect(() => {
    const tweens = gsap.utils.toArray('.watermark-num').map((el) =>
      gsap.fromTo(
        el,
        { yPercent: -16 },
        {
          yPercent: 16,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') || el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    )

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      tweens.forEach((tw) => tw.scrollTrigger?.kill())
    }
  }, [])
}
