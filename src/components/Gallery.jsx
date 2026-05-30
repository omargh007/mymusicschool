import './Gallery.css'

const images = [
  { src: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80', height: 320, label: 'Piano Masterclass' },
  { src: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80', height: 220, label: 'Guitar Workshop' },
  { src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', height: 260, label: 'Vocal Performance' },
  { src: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=600&q=80', height: 200, label: 'Violin Ensemble' },
  { src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80', height: 280, label: 'Drum Clinic' },
  { src: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80', height: 200, label: 'Recital Night' },
]

export default function Gallery() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="wrap">
        <div className="section-label reveal">Gallery</div>
        <h2 className="section-heading reveal d1">
          Life at<br /><strong>Harmonia</strong>
        </h2>
        <div className="gallery-masonry reveal d2">
          {images.map((img, i) => (
            <div className="gallery-item" key={i}>
              <img
                src={img.src}
                alt={img.label}
                style={{ height: img.height, objectFit: 'cover' }}
              />
              <div className="gallery-item-caption">{img.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
