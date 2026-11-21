import { profile, hasUrl } from '../data.js'
import { ArrowRightIcon, DownloadIcon, MailIcon, socialIcons } from './Icons.jsx'
import './Hero.css'

// Summary: ใส่ข้อความตรงนี้ ('' = ไม่แสดงอะไร) จะแสดงใต้ตำแหน่งงาน
const SUMMARY = ''

// เครดิตภาพมือ (สาธารณสมบัติ)
const HANDS_SOURCE = 'https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg'

export default function Hero() {
  const { firstName, lastName, role, tagline, photo, resumeUrl, email } = profile

  // "find me on": เฉพาะช่องทางที่มีใน data.js (social ที่มีลิงก์จริง + อีเมล)
  const channels = [
    ...profile.socials.filter((s) => hasUrl(s.url)).map((s) => ({ ...s, Icon: socialIcons[s.icon], external: true })),
    ...(email?.trim() ? [{ label: 'Email', url: `mailto:${email}`, Icon: MailIcon }] : []),
  ]

  return (
    <section className="hero" id="home">
      {/* ลายกรีกเมเนอร์เป็นวงซ้อนจาง ๆ (ตกแต่ง) */}
      <div className="hero__rings" aria-hidden="true" />

      {/* มือจาก The Creation of Adam (ตกแต่ง ซ่อนบนจอเล็ก) */}
      <img
        className="hero__hand hero__hand--god"
        src="/images/hands/god-hand.webp"
        alt=""
        aria-hidden="true"
        width="760"
        height="342"
      />
      <img
        className="hero__hand hero__hand--adam"
        src="/images/hands/adam-hand.webp"
        alt=""
        aria-hidden="true"
        width="715"
        height="317"
      />

      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__hello">Hello, I&rsquo;m</p>
          <h1 className="hero__name">
            <span>{firstName}</span> <span>{lastName}</span>
          </h1>
          <p className="hero__role">{role}</p>
          {SUMMARY && <p className="hero__summary">{SUMMARY}</p>}
          {tagline && <p className="hero__tagline">{tagline}</p>}
        </div>

        {/* วงกลมทองเก่า + วงลายเมเนอร์ รูปคน (PNG พื้นโปร่งใส) ยื่นเกินวงด้านล่าง */}
        <figure className="hero__portrait">
          <span className="hero__disc" aria-hidden="true" />
          <img src={photo} alt={`${firstName} ${lastName}`} width="500" height="631" />
        </figure>

        <div className="hero__side">
          {channels.length > 0 && (
            <div className="hero__find">
              <span>Find me on</span>
              <ul>
                {channels.map(({ label, url, Icon, external }) => (
                  <li key={label}>
                    <a
                      href={url}
                      aria-label={label}
                      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                      {Icon ? <Icon /> : label[0]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a href="#projects" className="hero__pill hero__pill--primary">
            My Project
            <span className="hero__go" aria-hidden="true">
              <ArrowRightIcon />
            </span>
          </a>
          <a href={resumeUrl} className="hero__pill" download>
            Download Resume
            <DownloadIcon />
          </a>
        </div>
      </div>

      <p className="hero__credit">
        ภาพมือ: Michelangelo, The Creation of Adam (ราว ค.ศ. 1512), สาธารณสมบัติ ผ่าน{' '}
        <a href={HANDS_SOURCE} target="_blank" rel="noreferrer">
          Wikimedia Commons
        </a>
      </p>
    </section>
  )
}
