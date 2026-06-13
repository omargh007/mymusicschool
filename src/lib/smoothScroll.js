import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

function onAnchorClick(e) {
  const link = e.target.closest('a[href^="#"]')
  if (!link) return
  const id = link.getAttribute('href')
  if (!id || id.length < 2) return
  const target = document.querySelector(id)
  if (!target) return
  e.preventDefault()
  lenis.scrollTo(target, { offset: -64, duration: 1.4 })
}

export function initSmoothScroll() {
  if (lenis) return lenis

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  document.addEventListener('click', onAnchorClick)

  return lenis
}

export function getLenis() {
  return lenis
}
