import { useLang } from '../context/LanguageContext'
import './Gallery.css'

const imageSrcs = [
  { src: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80', height: 320 },
  { src: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80', height: 220 },
  { src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', height: 260 },
  { src: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=600&q=80', height: 200 },
  { src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80', height: 280 },
  { src: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80', height: 200 },
]

export default function Gallery() {
  const { t } = useLang()
  const g = t('gallery')
  const labels = t('gallery.images')

  return (
    <section className="gallery-section" id="gallery">
      <div className="wrap">
        <div className="section-label reveal">{g.label}</div>
        <h2 className="section-heading reveal d1">
          {g.heading1}<br /><strong>{g.heading2}</strong>
        </h2>
        <div className="gallery-masonry reveal d2">
          {imageSrcs.map((img, i) => (
            <div className="gallery-item" key={i}>
              <img src={img.src} alt={labels[i]} style={{ height: img.height, objectFit: 'cover' }} />
              <div className="gallery-item-caption">{labels[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
