import { useLang } from '../context/LanguageContext'
import './Footer.css'

export default function Footer() {
  const { t } = useLang()
  const f = t('footer')

  return (
    <footer>
      <div className="wrap">
        <div className="footer-masthead">
          <span className="footer-logo-name">MyMusicSchool</span>
          <span className="footer-logo-sub">Music Academy · San Francisco · Est. 2011</span>
        </div>
        <div className="footer-grid">
          <div>
            <p className="footer-tagline">{f.sub}</p>
            <div className="footer-contact-line">hello@mymusicschool.com &nbsp;·&nbsp; +1 (555) 742-8391</div>
          </div>
          <div>
            <div className="footer-col-title">{f.academyTitle}</div>
            <ul className="footer-links">
              {f.academyLinks.map(([href, label]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">{f.programsTitle}</div>
            <ul className="footer-links">
              {f.programsLinks.map(p => (
                <li key={p}><a href="#programs">{p}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">{f.infoTitle}</div>
            <ul className="footer-links">
              {f.infoLinks.map(([href, label]) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">{f.copy}</span>
          <ul className="footer-legal">
            <li><a href="#">{f.privacy}</a></li>
            <li><a href="#">{f.terms}</a></li>
            <li><a href="#">{f.cookies}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
