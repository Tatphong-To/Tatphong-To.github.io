import { profile, navLinks, footer, hasUrl } from '../data.js'
import { HeartIcon, socialIcons } from './Icons.jsx'
import './Footer.css'

export default function Footer() {
  const { firstName, lastName, status, email } = profile
  const socials = profile.socials.filter((s) => hasUrl(s.url))
  const initials = `${firstName[0]}${lastName[0]}`
  const year = new Date().getFullYear()

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
          <h2>Quick Links</h2>
          <ul className="footer__links">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2>Follow Me</h2>
          <ul className="footer__social">
            {socials.map(({ label, icon, url }) => {
              const Icon = socialIcons[icon]
              return (
                <li key={label}>
                  <a href={url} target="_blank" rel="noreferrer" aria-label={label}>
                    {Icon ? <Icon /> : label[0]}
                  </a>
                </li>
              )
            })}
          </ul>
          {status && (
            <p className="footer__status">
              {status}
              <br />
              Let&rsquo;s build something together!
            </p>
          )}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>
            &copy; {year} {firstName} {lastName}. All rights reserved.
          </p>
          <p className="footer__made">
            Made with <HeartIcon /> and React
          </p>
        </div>
      </div>
    </footer>
  )
}
