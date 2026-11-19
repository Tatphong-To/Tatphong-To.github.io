import { profile, hasUrl } from '../data.js'
import { ArrowRightIcon, DownloadIcon, socialIcons } from './Icons.jsx'
import './Hero.css'

export default function Hero() {
  const { firstName, lastName, role, tagline, photo, resumeUrl, status } = profile
  const socials = profile.socials.filter((s) => hasUrl(s.url))

  return (
    <section className="hero" id="home">
      <div className="container hero__inner">
        <div className="hero__intro">
          <p className="hero__hello reveal" style={{ '--d': '0ms' }}>
            Hello, I&rsquo;m
          </p>
          <h1 className="hero__name reveal" style={{ '--d': '80ms' }}>
            {firstName} <span className="hero__mark">{lastName}</span>
          </h1>
          <p className="hero__role reveal" style={{ '--d': '160ms' }}>
            {role}
          </p>
          {tagline && (
            <p className="hero__tagline reveal" style={{ '--d': '240ms' }}>
              {tagline}
            </p>
          )}
        </div>

        <div className="hero__photo reveal" style={{ '--d': '120ms' }}>
          <div className="hero__ring" aria-hidden="true" />
          <div className="hero__circle" aria-hidden="true" />
          <img src={photo} alt={`${firstName} ${lastName}`} />

          {status && (
            <span className="hero__status">
              <span className="hero__dot" aria-hidden="true" />
              {status}
            </span>
          )}
        </div>

        <div className="hero__actions reveal" style={{ '--d': '320ms' }}>
          <div className="hero__social">
            <span>find me on</span>
            <ul>
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
          </div>

          <a href="#projects" className="btn btn--primary">
            My Project
            <span className="btn__icon">
              <ArrowRightIcon />
            </span>
          </a>

          <a href={resumeUrl} className="btn btn--ghost" download>
            Download Resume
            <span className="btn__icon">
              <DownloadIcon />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
