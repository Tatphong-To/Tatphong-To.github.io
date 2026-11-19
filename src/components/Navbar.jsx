import { useEffect, useRef, useState } from 'react'
import { profile, navLinks } from '../data.js'
import { SendIcon, MenuIcon, CloseIcon } from './Icons.jsx'
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
            Let&rsquo;s Talk
            <SendIcon />
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
