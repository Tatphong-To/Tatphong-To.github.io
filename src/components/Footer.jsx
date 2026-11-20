import { profile, navLinks, footer, hasUrl } from '../data.js'
import { socialIcons } from './Icons.jsx'
import { toRoman } from '../roman.js'
import './Footer.css'

const year = new Date().getFullYear()

export default function Footer() {
  const { firstName, lastName, email } = profile
  const socials = profile.socials.filter((s) => hasUrl(s.url))
  const initials = `${firstName[0]}${lastName[0]}`

  return (
    <footer className="footer" id="contact">
      <div className="container footer__grid">
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            <span className="footer__mark" aria-hidden="true">
              {initials}
            </span>
            <span>
              {firstName.toUpperCase()}
              <em>.dev</em>
            </span>
          </a>
          <p>{footer.tagline}</p>
          <a href={`mailto:${email}`} className="footer__email">
            {email}
          </a>
        </div>

        <nav className="footer__col" aria-label="ลิงก์ด่วน">
          <h2>Pages</h2>
          <ul className="footer__links">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {socials.length > 0 && (
          <div className="footer__col">
            <h2>Elsewhere</h2>
            <ul className="footer__links">
              {socials.map(({ label, icon, url }) => {
                const Icon = socialIcons[icon]
                return (
                  <li key={label}>
                    <a href={url} target="_blank" rel="noreferrer" className="footer__social">
                      {Icon && <Icon />}
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>
            &copy; <abbr title={String(year)}>{toRoman(year)}</abbr> {firstName} {lastName}
          </p>
          <p>Built with React and Vite</p>
        </div>
      </div>
    </footer>
  )
}
