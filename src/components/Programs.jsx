import './Programs.css'

const programs = [
  { num: '01', emoji: '🎹', name: 'Piano',            age: 'Age 5+',  dur: '45 min', level: 'All Levels',          desc: 'Classical technique, theory, and contemporary styles. The foundation of musical understanding for all ages.' },
  { num: '02', emoji: '🎸', name: 'Guitar',           age: 'Age 7+',  dur: '45 min', level: 'All Levels',          desc: 'Acoustic, electric, and classical. From open chords to advanced fingerpicking and improvisation.' },
  { num: '03', emoji: '🎻', name: 'Violin',           age: 'Age 5+',  dur: '45 min', level: 'Beginner — Advanced',  desc: 'Suzuki and traditional methods. Bow technique, posture, and classical repertoire from the first lesson.' },
  { num: '04', emoji: '🥁', name: 'Drums',            age: 'Age 8+',  dur: '60 min', level: 'Beginner — Intermediate', desc: 'Rudiments, groove, rock, jazz, and afrobeats. Full kit lessons in soundproofed studios.' },
  { num: '05', emoji: '🎤', name: 'Voice',            age: 'Age 10+', dur: '45 min', level: 'All Levels',          desc: 'Breath control, pitch, range, and performance confidence across classical and contemporary styles.' },
  { num: '06', emoji: '📖', name: 'Music Theory',     age: 'Age 8+',  dur: '60 min', level: 'Beginner — Advanced',  desc: 'Notation, harmony, scales, and composition. The language behind every instrument.' },
  { num: '07', emoji: '🎛️', name: 'Music Production', age: 'Age 14+', dur: '60 min', level: 'Teen — Adult',         desc: 'DAW fundamentals, beat-making, mixing and mastering. From idea to finished track.' },
  { num: '08', emoji: '🌟', name: "Children's Music",  age: 'Age 3–7', dur: '30 min', level: 'Early Start',         desc: 'Rhythm, pitch, and ear-training through song, play, and movement. The perfect musical first step.' },
]

export default function Programs() {
  return (
    <section className="programs-section" id="programs">
      <div className="wrap" style={{ position: 'relative' }}>
        <span className="watermark-num">01</span>
        <div className="section-label reveal">Programs</div>
        <h2 className="section-heading reveal d1">
          Find your<br /><strong>instrument</strong>
        </h2>
      </div>
      <div className="programs-scroll-outer">
        <div className="programs-track">
          {programs.map((p, i) => (
            <div className={`prog-card reveal d${Math.min(i, 5)}`} key={p.num}>
              <span className="prog-num">{p.num}</span>
              <span className="prog-emoji">{p.emoji}</span>
              <div className="prog-name">{p.name}</div>
              <div className="prog-meta-row">
                <span>{p.age}</span>
                <span>{p.dur}</span>
              </div>
              <div className="prog-desc">{p.desc}</div>
              <span className="prog-level">{p.level}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="programs-hint reveal">← Scroll to see all programs →</div>
    </section>
  )
}
