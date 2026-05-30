import './Instructors.css'

const instructors = [
  {
    idx: '01', name: 'Maya Chen', title: 'Piano & Composition',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    bio: "A Juilliard graduate and concert pianist with 14 years of teaching experience. Maya specializes in bridging classical technique with modern musical sensibility, nurturing students who love both precision and expression.",
    tags: ['Classical', 'Jazz', 'Composition', 'ABRSM Examiner'],
  },
  {
    idx: '02', name: 'Rafael Torres', title: 'Guitar & Music Production', flip: true,
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    bio: "Berklee alumnus, session guitarist, and producer with credits on three Billboard-charting records. Rafael brings real-world industry knowledge to every lesson, from beginner strumming to professional studio production.",
    tags: ['Acoustic', 'Electric', 'Ableton', 'Flamenco'],
  },
  {
    idx: '03', name: 'Aisha Okafor', title: 'Voice & Performance',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    bio: "Royal College of Music graduate and active West End performer. Aisha's vocal method blends classical bel canto with contemporary technique, building voices that are powerful, flexible, and deeply expressive.",
    tags: ['Classical', 'Musical Theatre', 'R&B / Soul', 'Ear Training'],
  },
]

export default function Instructors() {
  return (
    <section className="instructors-section" id="instructors">
      <div className="wrap" style={{ position: 'relative', marginBottom: 64 }}>
        <span className="watermark-num">02</span>
        <div className="section-label reveal">Faculty</div>
        <h2 className="section-heading reveal d1">
          Learn from working<br /><strong>musicians</strong>
        </h2>
      </div>

      {instructors.map((ins) => (
        <div className={`instructor-row reveal${ins.flip ? ' flip' : ''}`} key={ins.idx}>
          <div className="instructor-img-col">
            <div className="instructor-img-wrap">
              <img src={ins.img} alt={`${ins.name} — ${ins.title}`} />
            </div>
          </div>
          <div className="instructor-text-col" style={ins.flip ? { background: 'var(--ivory-2)' } : {}}>
            <div className="instructor-idx">Faculty — {ins.idx}</div>
            <div className="instructor-name">{ins.name}</div>
            <div className="instructor-title">{ins.title}</div>
            <div className="instructor-bio">{ins.bio}</div>
            <div className="instructor-tags">
              {ins.tags.map(t => <span className="instructor-tag" key={t}>{t}</span>)}
            </div>
            <a href="#contact" className="instructor-link">View Profile &rarr;</a>
          </div>
        </div>
      ))}
    </section>
  )
}
