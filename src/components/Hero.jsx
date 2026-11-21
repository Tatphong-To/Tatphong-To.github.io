import { profile, hasUrl } from '../data.js'
import { ArrowRightIcon, ArrowDownIcon, DownloadIcon, MailIcon, socialIcons } from './Icons.jsx'
import ThaiPhrases from './ThaiPhrases.jsx'
import './Hero.css'

// Summary: ใส่ข้อความตรงนี้ ('' = ไม่แสดงอะไร) จะแสดงใต้ตำแหน่งงาน
const SUMMARY = ''

// แถบความถนัดด้านล่าง Hero
const FOCUS = ['Backend Development', 'Web Scraping', 'Data Pipeline', 'AI & LLM', 'DevOps & CI/CD']

// จำนวนชุดที่ซ้ำใน marquee: ต้องกว้างรวมเกินความกว้างแถบ + 1 ชุด เสมอ (4 ชุด ~4,400px พอสำหรับจอกว้าง)
const MARQUEE_COPIES = 4

// ภาพพื้นหลัง: Claude Lorrain, A Seaport at Sunrise (1674) สาธารณสมบัติ ที่มาและรายละเอียดอยู่ใน CREDITS.md

// ===== Hero: ปกเรซูเม่แบบนิตยสาร ชายฝั่งเมดิเตอร์เรเนียนสมัยโรมัน =====
// ซ้าย: ชื่อ (เด่นสุด) + ตำแหน่ง + คำแนะนำ + ปุ่ม | ขวา: ภาพทะเล/อาคารโรมัน จางเข้าพื้นครีม + รูปจริง (PNG พื้นโปร่งใส)
// ล่าง: แถบความถนัด
export default function Hero() {
  const { firstName, lastName, role, tagline, photo, resumeUrl, email } = profile

  // ช่องทางติดต่อ: เฉพาะที่มีใน data.js (social ที่มีลิงก์จริง + อีเมล)
  const channels = [
    ...profile.socials.filter((s) => hasUrl(s.url)).map((s) => ({ ...s, Icon: socialIcons[s.icon], external: true })),
    ...(email?.trim() ? [{ label: 'Email', url: `mailto:${email}`, Icon: MailIcon }] : []),
  ]

  return (
    <section className="hero" id="home">
      <div className="hero__inner">
        <div className="hero__text">
          <p className="hero__hello">Hello, I&rsquo;m</p>
          <h1 className="hero__name">
            <span className="hero__first">{firstName}</span>{' '}
            <span className="hero__last">{lastName}</span>
          </h1>
          <p className="hero__role">{role}</p>
          {SUMMARY && <p className="hero__summary">{SUMMARY}</p>}
          {tagline && (
            <p className="hero__tagline">
              <ThaiPhrases text={tagline} />
            </p>
          )}

          <div className="hero__actions">
            <a href="#projects" className="hero__cta">
              View Projects
              <ArrowRightIcon />
            </a>
            <a href="#about" className="hero__more">
              <span className="hero__more-icon" aria-hidden="true">
                <ArrowDownIcon />
              </span>
              Discover More
            </a>
          </div>

          <div className="hero__links">
            {channels.length > 0 && (
              <ul className="hero__social" aria-label="ช่องทางติดต่อ">
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
            )}
            <a href={resumeUrl} className="hero__resume" download>
              <DownloadIcon />
              Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* ภาพ: ฉากท่าเรือ + รูปจริง (desktop อยู่ขวาหลังข้อความ / มือถืออยู่ใต้ข้อความ) */}
      <div className="hero__visual">
        {/* ฉากหลัง: ภาพวาดท่าเรือโรมันยามเช้า จางไปทางซ้ายให้ข้อความอ่านง่าย */}
        <div className="hero__scene" aria-hidden="true">
          <img
            src="/images/hero/seaport-sunrise-2400.webp"
            srcSet="/images/hero/seaport-sunrise-1200.webp 1200w, /images/hero/seaport-sunrise-2400.webp 2400w"
            sizes="(max-width: 760px) 100vw, 64vw"
            alt=""
            width="2400"
            height="1755"
            fetchPriority="high"
          />
        </div>
        {/* รูปจริง: ยืนบนเส้นแถบความถนัด ขอบไหล่ซ้าย-ขวาและล่างจางเข้าฉาก */}
        <figure className="hero__portrait">
          <img src={photo} alt={`${firstName} ${lastName}`} width="500" height="631" />
        </figure>
      </div>

      {/* ตัวบอกให้เลื่อนลง (ตกแต่ง) */}
      <span className="hero__scroll" aria-hidden="true">
        Scroll
      </span>

      <div className="hero__strip">
        <svg className="hero__star" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <path d="M10 0C10.8 6.2 13.8 9.2 20 10C13.8 10.8 10.8 13.8 10 20C9.2 13.8 6.2 10.8 0 10C6.2 9.2 9.2 6.2 10 0Z" />
        </svg>
        {/* marquee วนไม่สิ้นสุด: ชุดเดียวกัน MARQUEE_COPIES ชุด เลื่อนซ้ายทีละ 1 ชุดแล้ววนใหม่ (ตำแหน่งเริ่ม = ตำแหน่งจบ จึงไม่กระตุก)
            ชุดแรกเท่านั้นที่ screen reader อ่าน ชุดที่เหลือเป็นสำเนา aria-hidden */}
        <div className="hero__marquee">
          <div className="hero__track" style={{ '--copies': MARQUEE_COPIES }}>
            {Array.from({ length: MARQUEE_COPIES }, (_, copy) => (
              <ul
                key={copy}
                className={`hero__focus${copy ? ' hero__focus--dup' : ''}`}
                {...(copy ? { 'aria-hidden': true } : { 'aria-label': 'ความถนัด' })}
              >
                {FOCUS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
