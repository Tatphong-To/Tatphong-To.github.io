import { profile, hasUrl } from '../data.js'
import { DownloadIcon, socialIcons } from './Icons.jsx'
import './Hero.css'

export default function Hero() {
  const { firstName, lastName, role, tagline, photo, resumeUrl, status } = profile
  const socials = profile.socials.filter((s) => hasUrl(s.url))

  return (
    <section className="hero" id="home">
      <div className="container">
        <p className="hero__hello">Hello, I&rsquo;m</p>

        {/* ชื่อแบบจารึกโรมัน: คั่นคำด้วยจุดกลาง (interpunct) */}
        <h1 className="hero__name" aria-label={`${firstName} ${lastName}`}>
          <span className="hero__word">{firstName}</span>
          <span className="hero__punct" aria-hidden="true">
            ·
          </span>
          <span className="hero__word">{lastName}</span>
        </h1>

        {/* คานหิน (entablature) ใต้ชื่อ */}
        <div className="hero__beam" aria-hidden="true" />

        <div className="hero__body">
          <div className="hero__intro">
            <p className="hero__role">{role}</p>
            {tagline && <p className="hero__tagline">{tagline}</p>}
          </div>

          <figure className="hero__photo">
            <div className="hero__arch">
              <img src={photo} alt={`${firstName} ${lastName}`} />
            </div>
            {status && <figcaption className="hero__status">{status}</figcaption>}
          </figure>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              View projects
            </a>
            <a href={resumeUrl} className="btn btn--ghost" download>
              Download resume
              <DownloadIcon />
            </a>

            {socials.length > 0 && (
              <ul className="hero__social">
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
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
