import { profile } from '../data.js'
import { UserIcon, MailIcon, PhoneIcon, PinIcon, CapIcon, SparkIcon } from './Icons.jsx'
import './AboutCard.css'

export default function AboutCard() {
  const {
    firstName,
    lastName,
    aboutHeadline,
    about,
    phone,
    email,
    location,
    education,
    status,
  } = profile

  // รายการข้อมูลด้านขวา (ช่องไหนว่างจะไม่แสดง)
  const info = [
    { label: 'Name', value: `${firstName} ${lastName}`, Icon: UserIcon },
    { label: 'Tel.', value: phone, Icon: PhoneIcon, href: `tel:${phone?.replace(/[^\d+]/g, '')}` },
    { label: 'Email', value: email, Icon: MailIcon, href: `mailto:${email}` },
    { label: 'Location', value: location, Icon: PinIcon },
    { label: 'Education', value: education, Icon: CapIcon },
    { label: 'Status', value: status, Icon: SparkIcon },
  ].filter((item) => item.value?.trim())

  // ถ้าจำนวนช่องเป็นเลขคี่ (เช่น ลบเบอร์โทรออก) ให้ช่องสุดท้ายกินเต็มแถว -> grid เต็มทุกแถว
  if (info.length % 2 === 1) info[info.length - 1].wide = true

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__card">
          <div className="about__intro">
            <p className="about__eyebrow">About Me</p>
            {aboutHeadline && <h2 className="about__headline">{aboutHeadline}</h2>}
            <p className="about__text">{about}</p>
          </div>

          <ul className="about__info">
            {info.map(({ label, value, Icon, href, wide }) => (
              <li key={label} className={wide ? 'about__wide' : undefined}>
                <span className="about__icon">
                  <Icon />
                </span>
                <div>
                  <span className="about__label">{label}</span>
                  {href ? (
                    <a href={href} className="about__value">
                      {value}
                    </a>
                  ) : (
                    <span className="about__value">{value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
