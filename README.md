# MyMusicSchool Music Academy — React App

## Quick Start

```bash
cd harmonia-react
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Project Structure

```
src/
├── main.jsx          # Entry point
├── App.jsx           # Root component + scroll reveal
├── index.css         # Global tokens, utilities, animations
├── hooks/
│   └── useReveal.js  # IntersectionObserver hook
└── components/
    ├── Nav           # Sticky center-logo nav
    ├── Hero          # Split-viewport hero with image
    ├── WhySection    # 4-column features
    ├── Programs      # Horizontal scroll editorial strip
    ├── Instructors   # Alternating full-width rows
    ├── Testimonials  # Typography-only quote slider
    ├── Gallery       # Masonry image grid
    ├── Events        # List-style event rows
    ├── Pricing       # Comparison table with toggle
    ├── FAQ           # Accordion
    ├── Contact       # Split form + sidebar
    ├── CtaDark       # Full-bleed dark CTA section
    └── Footer        # Broadsheet newspaper footer
```
