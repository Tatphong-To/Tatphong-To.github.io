import { profile } from '../data.js'
import { UserIcon, MailIcon, PhoneIcon, PinIcon, CapIcon, SparkIcon } from './Icons.jsx'
import AboutDecor from './AboutDecor.jsx'
import './AboutCard.css'

// ===== About: การ์ดสีหมึกมุมโค้ง | ซ้าย About Me + ข้อความ | เส้นทอง | ขวา ไอคอน + ป้าย + ค่า =====
export default function AboutCard() {
  const { firstName, lastName, aboutHeadline, about, phone, email, location, education, status } = profile

  // ใช้เฉพาะข้อมูลที่มีใน data.js (ช่องไหนว่างจะไม่แสดง)
  const info = [
    { label: 'Name', value: `${firstName} ${lastName}`, Icon: UserIcon },
    { label: 'Email', value: email, Icon: MailIcon, href: `mailto:${email}` },
    { label: 'Tel.', value: phone, Icon: PhoneIcon, href: `tel:${phone?.replace(/[^\d+]/g, '')}` },
    { label: 'Location', value: location, Icon: PinIcon },
    { label: 'Education', value: education, Icon: CapIcon },
    { label: 'Status', value: status, Icon: SparkIcon },
  ].filter((item) => item.value?.trim())

  return (
    <section className="about" id="about">
      <div className="container">
        {/* เวที: การ์ด + เสาไอโอนิกสองข้าง กิ่งมะกอก นกนางแอ่น (ตกแต่ง) */}
        <div className="about__stage">
          <AboutDecor />
          <div className="about__card">
            <div className="about__intro">
              <h2 className="section-title">About Me</h2>
              {aboutHeadline && <p className="about__headline">{aboutHeadline}</p>}
              <p className="about__text">{about}</p>
            </div>

            <ul className="about__info">
              {info.map(({ label, value, Icon, href }) => (
                <li key={label}>
                  <span className="about__icon" aria-hidden="true">
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
      </div>
    </section>
  )
}
