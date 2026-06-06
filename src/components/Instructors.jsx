import { useLang } from '../context/LanguageContext'
import './Instructors.css'

const imgs = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
]

export default function Instructors() {
  const { t } = useLang()
  const ins = t('instructors')

  return (
    <section className="instructors-section" id="instructors">
      <div className="wrap" style={{ position: 'relative', marginBottom: 64 }}>
        <span className="watermark-num">02</span>
        <div className="section-label reveal">{ins.label}</div>
        <h2 className="section-heading reveal d1">
          {ins.heading1}<br /><strong>{ins.heading2}</strong>
        </h2>
      </div>

      {ins.list.map((instructor, i) => (
        <div className={`instructor-row reveal${i === 1 ? ' flip' : ''}`} key={i}>
          <div className="instructor-img-col">
            <div className="instructor-img-wrap">
              <img src={imgs[i]} alt={instructor.name} />
            </div>
          </div>
          <div className="instructor-text-col" style={i === 1 ? { background: 'var(--ivory-2)' } : {}}>
            <div className="instructor-idx">{ins.facultyLabel} — 0{i + 1}</div>
            <div className="instructor-name">{instructor.name}</div>
            <div className="instructor-title">{instructor.title}</div>
            <div className="instructor-bio">{instructor.bio}</div>
            <div className="instructor-tags">
              {instructor.tags.map(tag => <span className="instructor-tag" key={tag}>{tag}</span>)}
            </div>
            <a href="#contact" className="instructor-link">{ins.viewProfile}</a>
          </div>
        </div>
      ))}
    </section>
  )
}
