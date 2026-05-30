import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-masthead">
          <span className="footer-logo-name">MyMusicSchool</span>
          <span className="footer-logo-sub">Music Academy · San Francisco · Est. 2011</span>
        </div>
        <div className="footer-grid">
          <div>
            <p className="footer-tagline">
              Inspiring musicians of all ages since 2011. World-class instruction for every instrument, every level, every dream.
            </p>
            <div className="footer-contact-line">hello@mymusicschool.com &nbsp;·&nbsp; +1 (555) 742-8391</div>
          </div>
          <div>
            <div className="footer-col-title">Academy</div>
            <ul className="footer-links">
              {[['#why','Why MyMusicSchool'],['#instructors','Our Faculty'],['#events','Events'],['#gallery','Gallery'],['#contact','Contact']].map(([href,label]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Programs</div>
            <ul className="footer-links">
              {['Piano','Guitar','Violin','Voice','Music Production',"Children's Music"].map(p => (
                <li key={p}><a href="#programs">{p}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Information</div>
            <ul className="footer-links">
              {[['#pricing','Pricing'],['#faq','FAQ'],['#contact','Enroll Now'],['#','Student Portal'],['#','Gift Cards']].map(([href,label]) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 MyMusicSchool. All rights reserved.</span>
          <ul className="footer-legal">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Cookies</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
