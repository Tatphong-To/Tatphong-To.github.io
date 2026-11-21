import { useEffect, useRef, useState } from 'react'
import { profile, navLinks } from '../data.js'
import { MenuIcon, CloseIcon } from './Icons.jsx'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(navLinks[0]?.href)

  // ตอนกดเมนู ให้ล็อกไฮไลต์ไว้ที่ลิงก์ที่กด จนกว่าการเลื่อนจะเสร็จ
  const lockUntil = useRef(0)

  // เงาใต้ navbar + ไฮไลต์เมนูตาม section ที่กำลังดูอยู่
  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 8)
      // ยังเลื่อนอยู่หลังกดเมนู -> ต่อเวลาล็อกไปจนกว่าจะหยุดเลื่อน
      if (Date.now() < lockUntil.current) {
        lockUntil.current = Date.now() + 200
        return
      }

      const sections = navLinks
        .map((link) => document.querySelector(link.href))
        .filter(Boolean)
      if (!sections.length) return

      const doc = document.documentElement
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 4
      let current = sections[0]

      if (window.scrollY < 80) {
        // อยู่บนสุดของหน้า -> Home
        current = sections[0]
      } else if (atBottom) {
        // เลื่อนสุดหน้าแล้ว -> section สุดท้าย (Contact)
        current = sections[sections.length - 1]
      } else {
        // section ล่าสุดที่ขอบบนเลยเส้น 35% ของจอขึ้นไปแล้ว
        const line = window.innerHeight * 0.35
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= line) current = section
        }
      }
      setActive(`#${current.id}`)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goTo = (href) => {
    setActive(href)
    lockUntil.current = Date.now() + 500
    setOpen(false)
  }

  // ปิดเมนูมือถือเมื่อกด Esc / แตะนอกเมนู / ขยายจอกลับเป็น desktop
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onClickOutside = (e) => {
      if (!e.target.closest('.nav')) setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 961px)')
    const onResize = () => desktop.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClickOutside)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onClickOutside)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  const initials = `${profile.firstName[0]}${profile.lastName[0]}`

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}>
      {/* หลังคาวิหาร (ตกแต่ง): แบบ b หน้าจั่วเตี้ย + ปลายหลังคา (acroterion) + ดอกกุหลาบกลาง
          แบบ a (ฟันหยัก + แถบเมเนอร์) วาดด้วย ::before/::after ใน Navbar.css */}
      <span className="nav__roof" aria-hidden="true">
        <svg className="nav__rake" viewBox="0 0 100 14" preserveAspectRatio="none" focusable="false">
          <path d="M0 14L50 0.7L100 14" vectorEffect="non-scaling-stroke" />
          <path d="M3 14L50 3.8L97 14" vectorEffect="non-scaling-stroke" />
        </svg>
        {['l', 'r'].map((s) => (
          <svg key={s} className={`nav__acro nav__acro--${s}`} viewBox="0 0 14 14" focusable="false">
            <path d="M7 13.5C5 10 2.2 8.4 1 5.4M7 13.5C6 9.6 4.8 6.6 4.6 2.6M7 13.5V1M7 13.5C8 9.6 9.2 6.6 9.4 2.6M7 13.5C9 10 11.8 8.4 13 5.4M4 13.5H10" />
          </svg>
        ))}
        <svg className="nav__rosette" viewBox="0 0 10 10" focusable="false">
          <circle cx="5" cy="5" r="4.4" />
          <path d="M5 1.4V8.6M1.4 5H8.6M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" />
        </svg>
      </span>

      <div className="container nav__inner">
        <a href="#home" className="nav__logo" onClick={() => goTo('#home')}>
          <span className="nav__mark" aria-hidden="true">
            {initials}
          </span>
          <span className="nav__brand">
            {profile.firstName.toUpperCase()}
            <span>.dev</span>
          </span>
        </a>

        <nav id="nav-menu" className="nav__menu" aria-label="เมนูหลัก">
          <ul className="nav__links">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={active === href ? 'is-active' : undefined}
                  aria-current={active === href ? 'true' : undefined}
                  onClick={() => goTo(href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="nav__cta" onClick={() => goTo('#contact')}>
            Let&rsquo;s talk
          </a>
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'}
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  )
}
