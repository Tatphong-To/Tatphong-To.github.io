import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { projects, projectsMoreUrl, hasUrl } from '../data.js'
import { toRoman } from '../roman.js'
import { ArrowLeftIcon, ArrowRightIcon, GithubIcon, ExternalIcon } from './Icons.jsx'
import './Projects.css'

// ===== Projects: ทีละโปรเจกต์ เต็มจอ =====
// เลขโรมัน + คำยักษ์ (ชื่อโปรเจกต์) อยู่หลังภาพ, ภาพในกรอบโค้งแบบซุ้มพร้อมใบลอเรลและชิ้นโมเสก
// เปลี่ยนโปรเจกต์ด้วยลูกศรข้างภาพ / เหรียญด้านล่าง / คีย์บอร์ด / ปัด (ไม่เปลี่ยนเอง)

// สีพื้นของแต่ละโปรเจกต์: ตัวแปรสีการ์ดโปรเจกต์ใน tokens (ตัวอักษรสีกระดาษ contrast 5.5-10:1)
const COLORS = ['var(--roman-red)', 'var(--verdigris)', 'var(--tyrian)', 'var(--umber)']
const colorOf = (i) => COLORS[i % COLORS.length]

// คำยักษ์ = ส่วนแรกของชื่อ (ก่อน " — ")
const wordOf = (title) => title.split(' — ')[0].trim()

// รูปที่ต้นฉบับมีพื้นว่างเอียงข้าง: ใช้สำเนาที่ตัดขอบว่างแล้วใน public/projects/framed/ (ต้นฉบับไม่ถูกแก้)
const FRAMED = { '/projects/cinema-app.jpg': '/projects/framed/cinema-app.jpg' }
const imageOf = (p) => FRAMED[p.image] ?? p.image

// สีพื้นรองภาพ = ค่าเฉลี่ยสีมุมทั้ง 4 ของรูป เพื่อให้ขอบที่เว้นกลืนกับรูป
function cornerColor(img) {
  try {
    const n = 24
    const c = document.createElement('canvas')
    c.width = c.height = n
    const g = c.getContext('2d', { willReadFrequently: true })
    g.drawImage(img, 0, 0, n, n)
    const px = [[0, 0], [n - 1, 0], [0, n - 1], [n - 1, n - 1]].map(([x, y]) => g.getImageData(x, y, 1, 1).data)
    const avg = (k) => Math.round(px.reduce((s, p) => s + p[k], 0) / px.length)
    return `rgb(${avg(0)} ${avg(1)} ${avg(2)})`
  } catch {
    return null
  }
}

// ภาพในกรอบโค้ง: object-fit contain อยู่กึ่งกลางกล่องที่พ้นโค้งซุ้ม ไม่ยืด ไม่ตัด
function FramedImage({ src, alt }) {
  const [matte, setMatte] = useState({ src: null, color: null })
  return (
    <div className="pj__mat" style={matte.src === src && matte.color ? { background: matte.color } : undefined}>
      <img
        src={src}
        alt={alt}
        draggable="false"
        onLoad={(e) => setMatte({ src, color: cornerColor(e.currentTarget) })}
      />
    </div>
  )
}

const SWIPE_MIN = 50
const DURATION = 750

// ชิ้นโมเสกลอยรอบภาพ (ตำแหน่งคงที่)
const TILES = [
  { x: -6, y: 12, s: 14, r: 18, c: 'var(--paper)' },
  { x: -3, y: 70, s: 10, r: -12, c: '#c9a24f' },
  { x: 103, y: 8, s: 12, r: 32, c: '#c9a24f' },
  { x: 101, y: 58, s: 16, r: -20, c: 'var(--paper)' },
  { x: 92, y: 96, s: 9, r: 8, c: 'rgb(239 230 210 / 0.6)' },
  { x: 8, y: 98, s: 11, r: -28, c: 'rgb(201 162 79 / 0.8)' },
]

const REDUCED = '(prefers-reduced-motion: reduce)'
const subscribeReduced = (cb) => {
  const mq = window.matchMedia(REDUCED)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const getReduced = () => window.matchMedia(REDUCED).matches

// กิ่งลอเรล (SVG วาดเอง)
function Laurel({ side, className }) {
  const P0 = [52, 200]
  const P1 = [4, 110]
  const P2 = [44, 10]
  const at = (t) => [
    (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t ** 2 * P2[0],
    (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t ** 2 * P2[1],
  ]
  const leaves = Array.from({ length: 9 }, (_, i) => {
    const t = 0.08 + i * 0.105
    const [x, y] = at(t)
    const [x2, y2] = at(t + 0.01)
    const ang = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI
    return { x, y, ang: ang + (i % 2 ? 42 : -42), s: 1 - i * 0.04 }
  })
  return (
    <svg
      className={className ?? `pj__laurel pj__laurel--${side}`}
      viewBox="0 0 100 210"
      aria-hidden="true"
      focusable="false"
    >
      <path d={`M ${P0} Q ${P1} ${P2}`} fill="none" stroke="#c9a24f" strokeWidth="2.4" strokeLinecap="round" />
      {leaves.map((l, i) => (
        <ellipse
          key={i}
          cx={l.x}
          cy={l.y}
          rx={13 * l.s}
          ry={5 * l.s}
          transform={`rotate(${l.ang} ${l.x} ${l.y}) translate(${11 * l.s} 0)`}
          fill={i % 3 === 0 ? '#e2c272' : '#c9a24f'}
        />
      ))}
    </svg>
  )
}

// ฉากของหนึ่งโปรเจกต์ (เลข + คำยักษ์ + ภาพ + ของตกแต่ง)
// ปรับขนาดคำยักษ์ให้พอดีความกว้างฉากเสมอ (วัดจริงหลังฟอนต์โหลด / ขนาดเปลี่ยน)
// ผลลัพธ์เก็บใน --word-size บนฉาก: ใช้กำหนดขนาดคำ เลขโรมัน และระยะที่ภาพทับคำ
const WORD_MIN = 24
function useFitWord(sceneRef) {
  useLayoutEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    const text = scene.querySelector('.pj__word-text')
    const fit = () => {
      const w = scene.clientWidth
      const h = scene.clientHeight
      if (!w || !h) return
      text.style.fontSize = '100px'
      const natural = text.scrollWidth || 1
      text.style.fontSize = ''
      const byWidth = (w * 0.92 * 100) / natural // กว้างไม่เกิน 92% ของฉาก
      const byHeight = h * 0.26 // สูงไม่เกิน 26% ของฉาก
      const size = Math.max(WORD_MIN, Math.min(byWidth, byHeight))
      scene.style.setProperty('--word-size', `${size.toFixed(1)}px`)
      // ชื่อยาวมากจนเล็กสุดแล้วยังไม่พอ: ให้ตัด 2 บรรทัดแบบสมดุลแทนการล้น
      scene.classList.toggle('is-wrapping', byWidth < WORD_MIN)
    }
    fit()
    document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(fit)
    ro.observe(scene)
    return () => ro.disconnect()
  }, [sceneRef])
}

function Scene({ project, index, phase }) {
  const word = wordOf(project.title)
  const ref = useRef(null)
  useFitWord(ref)
  return (
    <div ref={ref} className={`pj__scene${phase ? ` is-${phase}` : ''}`} aria-hidden={phase === 'leaving' || undefined}>
      {/* คำยักษ์ + เลขโรมันชิดมุมซ้ายบนของคำ */}
      <div className="pj__heading" aria-hidden="true">
        <span className="pj__numeral">{toRoman(index + 1)}</span>
        <span className="pj__word-text">{word}</span>
      </div>

      <div className="pj__figure">
        <Laurel side="left" />
        <Laurel side="right" />
        {TILES.map((t, i) => (
          <span
            key={i}
            className="pj__tile"
            aria-hidden="true"
            style={{ left: `${t.x}%`, top: `${t.y}%`, '--s': `${t.s}px`, '--r': `${t.r}deg`, background: t.c }}
          />
        ))}
        <div className="pj__frame">
          <FramedImage src={imageOf(project)} alt={phase === 'leaving' ? '' : `ภาพหน้าจอ ${project.title}`} />
        </div>
      </div>
    </div>
  )
}

// แถวพับได้: Details / Tech stack / Links
function Accordion({ project, index }) {
  const [open, setOpen] = useState({ details: true, tech: false, links: false })
  const links = [
    hasUrl(project.link) && { href: project.link, label: 'Open live demo', Icon: ExternalIcon },
    hasUrl(project.repo) && { href: project.repo, label: 'Source on GitHub', Icon: GithubIcon },
  ].filter(Boolean)

  const rows = [
    { key: 'details', label: 'Details', body: <p>{project.description}</p> },
    project.tags?.length > 0 && {
      key: 'tech',
      label: 'Tech stack',
      body: (
        <ul className="pj__tags">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      ),
    },
    links.length > 0 && {
      key: 'links',
      label: 'Links',
      body: (
        <ul className="pj__links">
          {links.map(({ href, label, Icon }) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noreferrer">
                <Icon />
                {label}
              </a>
            </li>
          ))}
        </ul>
      ),
    },
  ].filter(Boolean)

  return (
    <div className="pj__accordion">
      {rows.map(({ key, label, body }) => {
        const id = `pj-${index}-${key}`
        const isOpen = open[key]
        return (
          <div className={`pj__row${isOpen ? ' is-open' : ''}`} key={key}>
            <h4>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen((o) => ({ ...o, [key]: !o[key] }))}
              >
                {label}
                <span className="pj__plus" aria-hidden="true" />
              </button>
            </h4>
            <div id={id} className="pj__panel-body" hidden={!isOpen}>
              {body}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Projects() {
  const total = projects.length
  // touched = ผู้ใช้เปลี่ยนโปรเจกต์แล้ว (ประกาศผ่าน aria-live เฉพาะตอนนั้น)
  const [view, setView] = useState({ cur: 0, prev: null, dir: 1, touched: false })
  const reduced = useSyncExternalStore(subscribeReduced, getReduced)
  const drag = useRef(null)

  // เอาฉากเก่าออกเมื่อแอนิเมชันพื้นหลังจบ (onAnimationEnd) + กันพลาดด้วย timer
  useEffect(() => {
    if (view.prev === null) return
    const t = setTimeout(() => setView((v) => ({ ...v, prev: null })), DURATION * 2)
    return () => clearTimeout(t)
  }, [view.prev, view.cur])

  if (!total) return null
  const { cur, prev, dir } = view
  const wrap = (i) => ((i % total) + total) % total
  const endTransition = () => setView((v) => (v.prev === null ? v : { ...v, prev: null }))

  // ใช้ functional update: กดติดกันหลายครั้งก็นับครบ
  const move = (pick) =>
    setView((v) => {
      const { target, direction } = pick(v.cur)
      const next = wrap(target)
      if (next === v.cur) return v
      const d = direction ?? (next > v.cur ? 1 : -1)
      return { cur: next, prev: reduced ? null : v.cur, dir: d, touched: true }
    })
  const goTo = (i) => move(() => ({ target: i }))
  const step = (d) => move((c) => ({ target: c + d, direction: d }))
  const announce = view.touched ? `โปรเจกต์ ${cur + 1} จาก ${total}: ${projects[cur].title}` : ''

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      step(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      step(1)
    }
  }

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e) => {
    const d = drag.current
    drag.current = null
    if (!d) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(e.clientY - d.y)) step(dx < 0 ? 1 : -1)
  }

  const project = projects[cur]

  return (
    <section className="projects" id="projects">
      <div className="container projects__head">
        <h2 className="section-title projects__title">Projects</h2>
        {hasUrl(projectsMoreUrl) && (
          <a href={projectsMoreUrl} className="projects__more">
            All repositories on GitHub
          </a>
        )}
      </div>

      <div
        className={`pj${prev !== null ? ' is-animating' : ''}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="โปรเจกต์ (ใช้ปุ่มลูกศรซ้าย/ขวาเพื่อเปลี่ยน)"
        tabIndex={0}
        onKeyDown={onKeyDown}
        data-dir={dir}
        style={{ '--dir': dir }}
      >
        {/* พื้นสี: แถบเก่าเลื่อนออก แถบใหม่ขยายเข้ามา (wipe) */}
        <div className="pj__bgs" aria-hidden="true">
          {prev !== null && <div key={`out-${prev}-${cur}`} className="pj__bg is-out" style={{ background: colorOf(prev) }} />}
          <div
            key={`in-${cur}`}
            className={`pj__bg${prev !== null ? ' is-in' : ''}`}
            style={{ background: colorOf(cur) }}
            onAnimationEnd={endTransition}
          />
        </div>

        {/* ของตกแต่งในที่ว่างสองข้างของจอกว้าง (จาง ๆ ไม่อยู่ใต้ข้อความ) */}
        <div className="pj__side" aria-hidden="true">
          <span className="pj__side-band pj__side-band--left" />
          <span className="pj__side-band pj__side-band--right" />
          <Laurel side="left" className="pj__side-laurel pj__side-laurel--left" />
          <Laurel side="right" className="pj__side-laurel pj__side-laurel--right" />
          <svg className="pj__side-bird pj__side-bird--1" viewBox="0 0 60 30" focusable="false">
            <path d="M 2 14 C 12 4 22 6 30 15 C 38 6 48 4 58 14" />
          </svg>
          <svg className="pj__side-bird pj__side-bird--2" viewBox="0 0 60 30" focusable="false">
            <path d="M 2 14 C 12 4 22 6 30 15 C 38 6 48 4 58 14" />
          </svg>
        </div>

        <div className="pj__layout">
          <div
            className="pj__stage"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (drag.current = null)}
          >
            {prev !== null && <Scene key={`s-${prev}-out`} project={projects[prev]} index={prev} phase="leaving" />}
            <Scene key={`s-${cur}`} project={project} index={cur} phase={prev !== null ? 'entering' : null} />

            {/* ลูกศรอยู่สองข้างภาพโปรเจกต์ */}
            <button
              type="button"
              className="pj__arrow pj__arrow--prev"
              onClick={() => step(-1)}
              aria-label={`ไปโปรเจกต์ก่อนหน้า: ${projects[wrap(cur - 1)].title}`}
            >
              <ArrowLeftIcon />
            </button>
            <button
              type="button"
              className="pj__arrow pj__arrow--next"
              onClick={() => step(1)}
              aria-label={`ไปโปรเจกต์ถัดไป: ${projects[wrap(cur + 1)].title}`}
            >
              <ArrowRightIcon />
            </button>
          </div>

          <aside className="pj__aside" key={`a-${cur}`}>
            <h3 className="pj__title">{project.title}</h3>
            <Accordion project={project} index={cur} />
          </aside>
        </div>

        {/* แถบเหรียญด้านล่าง */}
        <nav className="pj__band" aria-label="เลือกโปรเจกต์">
          {/* เชือกทองร้อยเหรียญ + กิ่งลอเรลปลายเชือก (ตกแต่ง ซ่อนบนมือถือ) */}
          {['left', 'right'].map((side) => (
            <span key={side} className={`pj__cord pj__cord--${side}`} aria-hidden="true">
              <span className="pj__cord-laurel">
                <Laurel className="pj__cord-sprig" />
              </span>
              <span className="pj__cord-rope" />
              <span className="pj__cord-bead" />
            </span>
          ))}
          <ol className="pj__coins">
            {projects.map((p, i) => (
              <li key={p.title}>
                {i > 0 && (
                  <span className="pj__join" aria-hidden="true">
                    +
                  </span>
                )}
                <button
                  type="button"
                  className="pj__coin"
                  onClick={() => goTo(i)}
                  aria-label={`ไปที่ ${p.title}`}
                  aria-current={i === cur ? 'true' : undefined}
                >
                  <img src={imageOf(p)} alt="" draggable="false" />
                  <span className="pj__coin-num" aria-hidden="true">
                    {toRoman(i + 1)}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <p className="visually-hidden" aria-live="polite">
          {announce}
        </p>
      </div>
    </section>
  )
}
