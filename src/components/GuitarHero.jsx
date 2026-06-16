import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'
import './GuitarHero.css'

// ── FRAME CONFIG ────────────────────────────────────────────────────────────
// Frames live in /public/frames/ named frame_0001.jpg → frame_0076.jpg
const FRAME_COUNT = 76
const FRAME_EXT   = 'jpg'
const frameSrc    = (i) =>
  `/frames/frame_${String(i + 1).padStart(4, '0')}.${FRAME_EXT}`
// ────────────────────────────────────────────────────────────────────────────

export default function GuitarHero() {
  const { t, isAr } = useLang()
  const sectionRef  = useRef(null)
  const canvasRef   = useRef(null)
  const imgsRef     = useRef([])
  const frameRef    = useRef(0)

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

      ctx.clearRect(0, 0, pw, ph)
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    // ── Preload all frames ──────────────────────────────────────────────────
    setSize()
    imgsRef.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image()
      img.src = frameSrc(i)
      if (i === 0) img.onload = () => { setSize(); draw(0) }
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

    const st = ScrollTrigger.create({
      trigger : sectionRef.current,
      start   : 'top top',
      end     : 'bottom bottom',
      onUpdate: ({ progress }) => {
        const idx = Math.round(progress * (FRAME_COUNT - 1))
        if (idx !== frameRef.current) {
          frameRef.current = idx
          draw(idx)
        }
      },
    })

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

        {/* ── editorial text — bottom-left (or right in RTL) ── */}
        <div className={`guitar-overlay${isAr ? ' guitar-overlay--ar' : ''}`}>
          <p className="guitar-eyebrow">{t('hero.eyebrow')}</p>
          <h1 className="guitar-h1" style={{ fontStyle: isAr ? 'normal' : 'italic' }}>
            {t('hero.headline1')}<br />
            <strong>{t('hero.headline2')}</strong>
          </h1>
        </div>

        {/* ── scroll cue — bottom-center ── */}
        <div className="guitar-scroll-hint">
          <span className="guitar-scroll-line" />
          <span className="guitar-scroll-label">{t('hero.scroll')}</span>
        </div>

      </div>
    </section>
  )
}
