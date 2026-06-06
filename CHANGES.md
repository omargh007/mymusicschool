# MyMusicSchool — Change Log

## Session Summary

---

### 1. Hero Section

- Replaced Unsplash stock image with local `music-hero.jpg` (uploaded to `public/`)
- Removed generic stats (500+ students, 18 faculty, etc.)
- Right panel now showcases **Music Theory Courses** as the main service
- 8 course mini-cards displayed in a 2-column grid with course number, title, description, and animated arrow
- Framer Motion entrance animations: badge → title → subtitle → grid → CTA, staggered delays
- Mouse parallax on headline (spring physics, depth multiplier)
- Organic floating musical notes (♩ ♪) bob independently at different speeds
- Parallax scroll on hero image (`useScroll` + `useTransform`)
- Overlay opacity fades on scroll

---

### 2. Bilingual Arabic / English System

**New files:**
- `src/context/LanguageContext.jsx` — React context with `locale`, `toggle()`, `t()`, `isAr`
- `src/locales/ar.json` — Full Arabic translation for every section
- `src/locales/en.json` — Full English translation for every section

**How it works:**
- Default language: **Arabic (RTL)**
- `EN` / `ع` button in navbar toggles instantly — no page reload
- `html[dir]` and `html[lang]` update on toggle
- Cairo font loaded for Arabic; Cormorant Garamond for English
- Every component reads copy via `useLang().t('key.path')`

**Sections fully translated:**
- Nav, Hero, WhySection, Courses, Instructors, Testimonials, Gallery, FAQ, Contact, Footer, Free Session CTA

---

### 3. Courses Section (replaced "Find Your Instrument")

- Removed the horizontal-scroll instrument cards (Piano, Guitar, Violin…)
- New **split sticky layout**: left column is `position: sticky` with heading, subtitle, and animated progress tracker; right column scrolls with 8 course rows
- Hover or click a card → it slides right (spring), shows "Enroll" link via AnimatePresence expand
- Progress tracker: sienna line grows + counter ticks (01/08) as you interact
- Level badges color-coded: green = beginner, rust = intermediate, navy = advanced

---

### 4. WhySection — Sticky Scroll-Jack

- Section height: **400vh**
- Inner panel: `position: sticky; top: 0; height: 100vh`
- `useScroll` + `useMotionValueEvent` drives active feature index (0–3)
- **Background transitions**: ivory ↔ dark ink as features cycle
- Giant decorative number fades/scales in the background per feature
- Feature icon bounces in with spring, title + description blur-fade via `AnimatePresence mode="wait"`
- Vertical progress spine on the side: dots scale + fill, line grows
- Bottom counter strip: all 4 feature labels, dimmed except active
- Whole panel exits with opacity fade at 88–100% scroll progress
- Mobile: falls back to plain stacked layout

---

### 5. Instructors — Parallax & Curtain Reveal

- `InstructorRow` is a dedicated sub-component (hooks can't run in loops)
- Per-row `useScroll` + `useTransform`: image drifts 60px up over its scroll range
- **Curtain reveal**: a sienna-colored div covers the image and `scaleX` wipes away on entry (`transformOrigin` flips for alternating rows)
- Mouse magnetic effect: `useMotionValue` → `useSpring` (stiffness 60, damping 20) shifts image with cursor
- Text slides in from alternating sides via `useTransform` on scrollYProgress
- `ScrollReveal` staggered on idx, title, bio, tags, link
- Tags have hover spring: border + color animate to sienna
- "View Profile" link gap animates wider on hover

---

### 6. Nav — Scroll Progress Bar

- Thin **2px sienna bar** sits at the bottom edge of the navbar
- `useScroll()` tracks `scrollYProgress` (0 → 1)
- `useSpring(scrollYProgress, { stiffness: 100, damping: 30 })` smooths the motion
- `scaleX` applied with `transformOrigin: right` in RTL, `left` in LTR

---

### 7. Removed Sections

| Removed | Reason |
|---|---|
| **Pricing / Subscriptions** | Not needed per client request |
| **Events (Upcoming Events)** | Replaced by Free Session CTA |

---

### 8. Free Session CTA (replaced CtaDark)

- Dark cinematic section with radial sienna glow + parallax background (`useScroll` scroll-linked `y` drift)
- Three floating musical glyphs (♩ ♪ 𝄞) bob at independent durations
- Left: headline + CTA button with spring hover glow
- Social proof: 5 avatar dots + "500+ students started this way"
- Right: frosted glass "promise card" with 4 guarantees, animated checkmark circles (spring scale-in), divider, strikethrough price → **مجاني / Free**

---

### 9. Animations Library — `src/animations/index.jsx`

Reusable Framer Motion wrappers used across the site:

| Export | Description |
|---|---|
| `ScrollReveal` | `whileInView` with direction (up/left/right/scale/fade), once, amount 0.05 |
| `StaggerContainer` | `staggerChildren: 0.12`, viewport once |
| `StaggerItem` | Spring `stiffness: 80, damping: 20` |
| `FadeUp` | Mount entrance, staggered delay |
| `FloatBob` | Organic y/x bob loop, configurable duration |

---

### 10. Tech Stack

| | |
|---|---|
| Framework | React 18 + Vite 5 |
| Animations | Framer Motion 12 |
| Fonts | Cormorant Garamond (EN) · Cairo (AR) · DM Sans (UI) |
| i18n | Custom `LanguageContext` + JSON locale files |
| Deployment | GitHub → Vercel (auto-deploy on push to `main`) |
| Repo | `https://github.com/omargh007/mymusicschool` |
