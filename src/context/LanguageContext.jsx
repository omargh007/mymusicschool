import { createContext, useContext, useState, useEffect } from 'react'
import ar from '../locales/ar.json'
import en from '../locales/en.json'

const dicts = { ar, en }

const Ctx = createContext(null)

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('ar')

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')
    html.setAttribute('lang', locale)
  }, [locale])

  const toggle = () => setLocale(l => l === 'ar' ? 'en' : 'ar')
  const t = (path) => {
    const keys = path.split('.')
    let val = dicts[locale]
    for (const k of keys) val = val?.[k]
    return val ?? path
  }

  return (
    <Ctx.Provider value={{ locale, toggle, t, isAr: locale === 'ar' }}>
      {children}
    </Ctx.Provider>
  )
}

export const useLang = () => useContext(Ctx)
