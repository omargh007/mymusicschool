import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import WhySection from './components/WhySection'
import Programs from './components/Programs'
import Instructors from './components/Instructors'
import Testimonials from './components/Testimonials'
import Gallery from './components/Gallery'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import CtaDark from './components/CtaDark'
import Footer from './components/Footer'

function AppInner() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } }),
      { threshold: 0.06 }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    }, 100)
    return () => { clearTimeout(timer); obs.disconnect() }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhySection />
        <Programs />
        <Instructors />
        <Testimonials />
        <Gallery />
        <FAQ />
        <Contact />
        <CtaDark />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  )
}
