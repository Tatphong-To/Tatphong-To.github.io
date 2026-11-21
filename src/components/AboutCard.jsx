import { profile } from '../data.js'
import { strengthIcons } from './Icons.jsx'
import AboutDecor from './AboutDecor.jsx'
import ThaiPhrases from './ThaiPhrases.jsx'
import './AboutCard.css'

// ===== About: การ์ดสีหมึกมุมโค้ง | ซ้าย About Me + ข้อความ | เส้นทอง | ขวา Strengths & Capabilities =====
// ข้อมูลติดต่อ (ชื่อ อีเมล ฯลฯ) อยู่ที่ส่วน Contact แล้ว คอลัมน์ขวาจึงบอกสิ่งที่ทำได้แทน
export default function AboutCard() {
  const { aboutHeadline, about, strengths = [] } = profile

  return (
    <section className="about" id="about">
      <div className="container">
        {/* เวที: การ์ด + กิ่งมะกอกโผล่จากหลังการ์ด มุมทอง นกนางแอ่น (ตกแต่ง) */}
        <div className="about__stage">
          <AboutDecor />
          <div className="about__card">
            <div className="about__intro">
              <h2 className="section-title">About Me</h2>
              {aboutHeadline && (
                <p className="about__headline">
                  <ThaiPhrases text={aboutHeadline} />
                </p>
              )}
              <p className="about__text">
                <ThaiPhrases text={about} />
              </p>
            </div>

            {strengths.length > 0 && (
              <div className="about__info">
                <h3 className="about__subhead">Strengths &amp; Capabilities</h3>
                <ul className="about__list">
                  {strengths.map(({ title, description, icon }) => {
                    const Icon = strengthIcons[icon]
                    return (
                      <li key={title}>
                        <span className="about__icon" aria-hidden="true">
                          {Icon && <Icon />}
                        </span>
                        <div>
                          <span className="about__label">{title}</span>
                          <p className="about__value">
                            <ThaiPhrases text={description} />
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
