import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'
import './GuitarHero.css'

// ── FRAME CONFIG ────────────────────────────────────────────────────────────
// Frames live in /public/frames/ named frame_0001.webp → frame_0122.webp
const FRAME_COUNT = 122
const FRAME_EXT   = 'webp'
const frameSrc    = (i) =>
  `/frames/frame_${String(i + 1).padStart(4, '0')}.${FRAME_EXT}`
// ────────────────────────────────────────────────────────────────────────────

// Text scenes — each owns a window of the scroll progress (0–1).
// STAGE_FADE controls how much of the edge is used to cross-fade into/out
// of the neighbouring scene.
const STAGE_FADE = 0.06
const STAGES = [
  { start: 0.02, end: 0.18 },
  { start: 0.25, end: 0.41 },
  { start: 0.48, end: 0.64 },
  { start: 0.71, end: 0.90 },
]

function stageOpacity(progress, { start, end }) {
  if (progress <= start - STAGE_FADE || progress >= end + STAGE_FADE) return 0
  if (progress < start) return (progress - (start - STAGE_FADE)) / STAGE_FADE
  if (progress > end) return 1 - (progress - end) / STAGE_FADE
  return 1
}

export default function GuitarHero() {
  const { t, isAr } = useLang()
  const sectionRef  = useRef(null)
  const canvasRef   = useRef(null)
  const imgsRef     = useRef([])
  const frameRef    = useRef(0)
  const stageRefs   = useRef([])
  const tagRefs     = useRef([])
  const hintRef     = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    // Size the canvas backing store to physical pixels
    const setSize = () => {
      const dpr     = window.devicePixelRatio || 1
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
    }

    // Draw one frame — object-fit: cover in physical pixel space
    const draw = (idx) => {
      const img = imgsRef.current[idx]
      if (!img?.complete || !img.naturalWidth) return

      const pw = canvas.width
      const ph = canvas.height
      const ir = img.naturalWidth / img.naturalHeight
      const cr = pw / ph
      let dx, dy, dw, dh

      if (ir > cr) {
        // image wider → fit by height, crop sides
        dh = ph; dw = ph * ir
        dx = (pw - dw) / 2; dy = 0
      } else {
        // image taller → fit by width, crop top/bottom
        dw = pw; dh = pw / ir
        dx = 0;  dy = (ph - dh) / 2
      }

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.clearRect(0, 0, pw, ph)
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    // ── Preload all frames ──────────────────────────────────────────────────
    // Each frame redraws itself on load if it's still the active frame —
    // otherwise a frame requested mid-scroll before it finished loading would
    // silently never repaint until some later scroll event happened to land
    // on an already-loaded frame, which felt like the rotation "catching up".
    setSize()
    imgsRef.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        if (i === 0) setSize()
        if (frameRef.current === i) draw(i)
      }
      img.src = frameSrc(i)
      return img
    })

    // ── Resize handler ──────────────────────────────────────────────────────
    const onResize = () => {
      setSize()
      draw(frameRef.current)
    }
    window.addEventListener('resize', onResize)

    // ── ScrollTrigger — map scroll progress → frame index ──────────────────
    gsap.registerPlugin(ScrollTrigger)

    const updateUI = (progress) => {
      const idx = Math.round(progress * (FRAME_COUNT - 1))
      if (idx !== frameRef.current || progress === 0) {
        frameRef.current = idx
        draw(idx)
      }

      stageRefs.current.forEach((el, i) => {
        if (!el) return
        const o = stageOpacity(progress, STAGES[i])
        el.style.opacity   = o
        el.style.transform = `translateY(${(1 - o) * 16}px)`
      })

      tagRefs.current.forEach((el, i) => {
        if (!el) return
        const o = stageOpacity(progress, STAGES[i])
        el.style.opacity   = o
        el.style.transform = `translateY(${(1 - o) * -10}px)`
      })

      if (hintRef.current) {
        const hintO = Math.max(0, 1 - progress / 0.12)
        hintRef.current.style.opacity = hintO
      }
    }

    const st = ScrollTrigger.create({
      trigger : sectionRef.current,
      start   : 'top top',
      end     : 'bottom bottom',
      onUpdate: ({ progress }) => updateUI(progress),
    })

    // ScrollTrigger only invokes onUpdate on scroll — run once immediately
    // so the first scene is visible before the user has scrolled at all.
    updateUI(st.progress)

    return () => {
      st.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="guitar-hero" ref={sectionRef} id="home">
      <div className="guitar-sticky">

        {/* ── rotating guitar canvas ── */}
        <canvas ref={canvasRef} className="guitar-canvas" />

        {/* ── top tag — small label above the guitar, one per scene ── */}
        <div className="guitar-tags">
          {['tag1', 'tag2', 'tag3', 'tag4'].map((key, i) => (
            <span
              className="guitar-tag"
              key={key}
              ref={el => (tagRefs.current[i] = el)}
            >
              {t(`hero.${key}`)}
            </span>
          ))}
        </div>

        {/* ── editorial text — bottom-left (or right in RTL) ── */}
        <div className={`guitar-overlay${isAr ? ' guitar-overlay--ar' : ''}`}>
          <div className="guitar-stage" ref={el => (stageRefs.current[0] = el)}>
            <p className="guitar-eyebrow">{t('hero.eyebrow')}</p>
            <h1 className="guitar-h1" style={{ fontStyle: isAr ? 'normal' : 'italic' }}>
              {t('hero.headline1')}<br />
              <strong>{t('hero.headline2')}</strong>
            </h1>
          </div>

          <div className="guitar-stage" ref={el => (stageRefs.current[1] = el)}>
            <p className="guitar-eyebrow">{t('hero.stage2Eyebrow')}</p>
            <h1 className="guitar-h1" style={{ fontStyle: isAr ? 'normal' : 'italic' }}>
              {t('hero.stage2Line1')}<br />
              <strong>{t('hero.stage2Line2')}</strong>
            </h1>
          </div>

          <div className="guitar-stage" ref={el => (stageRefs.current[2] = el)}>
            <p className="guitar-eyebrow">{t('hero.stage3Eyebrow')}</p>
            <h1 className="guitar-h1" style={{ fontStyle: isAr ? 'normal' : 'italic' }}>
              {t('hero.stage3Line1')}<br />
              <strong>{t('hero.stage3Line2')}</strong>
            </h1>
          </div>

          <div className="guitar-stage" ref={el => (stageRefs.current[3] = el)}>
            <p className="guitar-eyebrow">{t('hero.stage4Eyebrow')}</p>
            <h1 className="guitar-h1" style={{ fontStyle: isAr ? 'normal' : 'italic' }}>
              {t('hero.stage4Line1')}<br />
              <strong>{t('hero.stage4Line2')}</strong>
            </h1>
          </div>
        </div>

        {/* ── scroll cue — bottom-center ── */}
        <div className="guitar-scroll-hint" ref={hintRef}>
          <span className="guitar-scroll-line" />
          <span className="guitar-scroll-label">{t('hero.scroll')}</span>
        </div>

      </div>
    </section>
  )
}
