import { profile, hasUrl } from '../data.js'
import { MailIcon, socialIcons } from './Icons.jsx'
import { toRoman } from '../roman.js'
import './Footer.css'

const year = new Date().getFullYear()

// ตำแหน่งป้าย = จุดกึ่งกลางป้ายเป็น % ของกรอบรูป (x จากซ้าย, y จากบน) วัดจากเรือในไฟล์จริง (1600x680)
//   ลำเรือที่ y 40%: x 18-89%, ที่ y 66%: x 27-84%, ผิวน้ำเริ่มราว y 79%
const SPOTS = {
  3: { facebook: [23, 40], github: [85, 40], email: [57, 66] },
  // ป้ายหายหนึ่งอัน: จัดสองป้ายที่เหลือให้สมดุลบนลำเรือ
  2: { first: [40, 40], second: [62, 66] },
  1: { first: [55, 52] },
}

// ===== Contact (ทำหน้าที่เป็น footer): หัวข้อใหญ่ + ข้อความ | เรือกระดาษบนคลื่น + ป้ายติดต่อ =====
// ค่าติดต่อทั้งหมดมาจาก data.js (ช่องไหนว่างจะไม่แสดงป้าย)
export default function Footer() {
  const { firstName, lastName, email } = profile
  const social = (icon) => profile.socials.find((s) => s.icon === icon && hasUrl(s.url))

  const fb = social('facebook')
  const gh = social('github')
  const pills = [
    fb && { key: 'facebook', label: fb.label, href: fb.url, Icon: socialIcons.facebook, external: true },
    gh && { key: 'github', label: gh.label, href: gh.url, Icon: socialIcons.github, external: true },
    email?.trim() && { key: 'email', label: email, href: `mailto:${email}`, Icon: MailIcon },
  ].filter(Boolean)

  const spots = SPOTS[pills.length]
  const spotOf = (key, i) => (pills.length === 3 ? spots[key] : spots[i === 0 ? 'first' : 'second'])

  return (
    <footer className="contact" id="contact">
      <h2 className="contact__title">
        <span>My</span> <span>Contact!</span>
      </h2>

      <p className="contact__lede">
        <span>I&rsquo;d love the chance to learn and grow with your team.</span>{' '}
        <span>Currently seeking a Co-op Full-Stack Developer internship. Let&rsquo;s connect!</span>
      </p>

      {/* เรือกระดาษบนคลื่น (ตกแต่ง) + ป้ายติดต่อวางทับเรือ */}
      <div className="contact__sea">
        <img
          className="contact__boat"
          src="/images/boat-waves.webp"
          alt=""
          width="1600"
          height="680"
          loading="lazy"
          decoding="async"
        />
        {pills.length > 0 && (
          <ul className="contact__pills" aria-label="ช่องทางติดต่อ">
            {pills.map(({ key, label, href, Icon, external }, i) => {
              const [x, y] = spotOf(key, i)
              return (
                <li key={key} className="contact__pill-item" style={{ '--x': `${x}%`, '--y': `${y}%` }}>
                  <a href={href} className="contact__pill" {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    {Icon && <Icon />}
                    <span>{label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <p className="contact__copy">
        &copy; <abbr title={String(year)}>{toRoman(year)}</abbr> {firstName} {lastName}
      </p>
    </footer>
  )
}
