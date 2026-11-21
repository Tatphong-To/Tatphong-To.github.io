import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { skills } from '../data.js'
import { toRoman } from '../roman.js'
import './Skills.css'
import { Swallow } from './Ornaments.jsx'

// ===== Skills: กระดาษ 3 แผ่นห้อยบนโซ่ บนพื้นกระดาษของหน้า =====
// desktop: Front-end (ซ้ายบน) -> Back-end (กลางล่าง) -> Tools (ขวาบน) เป็นสามเหลี่ยม
// มือถือ: เรียงแนวตั้ง โซ่ต่อลงมาแบบซิกแซก
// ตำแหน่งห่วงโซ่คำนวณด้วย JS ตอนจัดวาง / ฟอนต์โหลดเสร็จ / ขนาดเปลี่ยน เท่านั้น (ไม่คำนวณทุกเฟรม)
// ของตกแต่งเส้นหมึก (เลขโรมัน, ลอเรล, กิ่งดอกไม้, นก) วาดเป็น SVG เอง ความทึบ 8-14% aria-hidden ทั้งหมด

const MOBILE = '(max-width: 899px)'

// สุ่มแบบกำหนดค่าตายตัว
function seeded(seed) {
  let s = seed
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

// ขอบกระดาษฉีกไม่เรียบ: polygon ที่หยักเข้าไม่เกิน ~5px รอบขอบ
function tornEdge(seed) {
  const rand = seeded(seed)
  const j = (max) => (rand() * max).toFixed(1)
  const pts = []
  for (let i = 0; i <= 24; i++) pts.push(`${(i * 100) / 24}% ${j(5)}px`)
  for (let i = 1; i < 18; i++) pts.push(`calc(100% - ${j(4)}px) ${(i * 100) / 18}%`)
  for (let i = 24; i >= 0; i--) pts.push(`${(i * 100) / 24}% calc(100% - ${j(6)}px)`)
  for (let i = 17; i > 0; i--) pts.push(`${j(4)}px ${(i * 100) / 18}%`)
  return `polygon(${pts.join(', ')})`
}

// ความต่างของแต่ละแผ่น: เอียง (<= ±2°), รอบแกว่ง, เฟส
const SHEETS = [
  { tilt: '-1.6deg', dur: '7s', delay: '-1.4s', seed: 11 },
  { tilt: '1.2deg', dur: '8.4s', delay: '-4.1s', seed: 23 },
  { tilt: '-0.8deg', dur: '7.7s', delay: '-2.6s', seed: 37 },
]

// ----- โซ่ -----
const PITCH = 13 // ระยะห่างห่วง (px)

// โค้งหย่อน (quadratic) ระหว่างจุด a -> b แล้ววางห่วงทุก PITCH px ตามความยาวเส้น
function placeLinks(a, b, sag, startIndex) {
  const c = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + sag]
  const at = (t) => [
    (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * c[0] + t ** 2 * b[0],
    (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * c[1] + t ** 2 * b[1],
  ]
  const steps = 240
  const links = []
  let prev = at(0)
  let travelled = 0
  let next = PITCH / 2
  let k = startIndex
  for (let i = 1; i <= steps; i++) {
    const p = at(i / steps)
    const seg = Math.hypot(p[0] - prev[0], p[1] - prev[1])
    while (travelled + seg >= next) {
      const f = (next - travelled) / seg
      const x = prev[0] + (p[0] - prev[0]) * f
      const y = prev[1] + (p[1] - prev[1]) * f
      const ang = (Math.atan2(p[1] - prev[1], p[0] - prev[0]) * 180) / Math.PI
      links.push({ x, y, a: ang, face: k % 2 === 0 })
      k++
      next += PITCH
    }
    travelled += seg
    prev = p
  }
  return links
}

function computeChain(section) {
  const box = section.getBoundingClientRect()
  const mobile = window.matchMedia(MOBILE).matches
  const center = (el) => {
    const r = el.getBoundingClientRect()
    return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top]
  }
  // เลือกห่วงที่โซ่ผ่านช่องว่างระหว่างแผ่น ไม่ลากทับเนื้อหา
  //   จอ 900px ขึ้นไป (สามแผ่นแถวเดียว แผ่นกลางต่ำกว่าเล็กน้อย): ซ้ายบน -> ขวาบน
  //   มือถือ (แนวตั้ง): ซ้ายบน -> ขวาล่าง
  const sheets = [...section.querySelectorAll('.sheet')]
  const [a, b] = mobile ? ['tl', 'br'] : ['tl', 'tr']
  const nodes = sheets.map((s) => {
    return {
      in: center(s.querySelector(`[data-eyelet="${a}"]`)),
      out: center(s.querySelector(`[data-eyelet="${b}"]`)),
    }
  })
  if (!nodes.length) return null

  // เส้นทาง: นอกจอซ้าย -> แผ่น 1 -> แผ่น 2 -> แผ่น 3 -> นอกจอขวา
  const first = nodes[0].in
  const last = nodes[nodes.length - 1].out
  // จอ 900px ขึ้นไป: ปลายสองข้างเฉียงขึ้นออกนอกจอ (ความชัน ~0.18) แบบโซ่ขึง
  const RISE = 0.18
  const startY = mobile ? first[1] - 36 : first[1] - RISE * (first[0] + 40)
  const endY = mobile ? last[1] + 36 : last[1] - RISE * (box.width + 40 - last[0])
  const route = [[[-40, startY], first]]
  for (let i = 0; i < nodes.length - 1; i++) route.push([nodes[i].out, nodes[i + 1].in])
  route.push([last, [box.width + 40, endY]])

  // นกเกาะโซ่: จอ 900px ขึ้นไป = ช่วงเข้า-ออกนอกจอ (ช่วงระหว่างแผ่นสั้นเกินให้นกเกาะ)
  // มือถือ = ช่วงแผ่น 1 -> 2
  const perchOn = mobile ? [1] : [0, route.length - 1]
  const links = []
  const perches = []
  route.forEach(([a, b], i) => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1])
    // จอ 900px ขึ้นไป: โซ่หย่อนตามแรงโน้มถ่วง (จุดต่ำสุดลึก ~20% ของความยาวช่วง) / มือถือคงเดิม
    // หมายเหตุ: sag คือระยะจุดควบคุม เส้นโค้งจริงลึกครึ่งหนึ่งของค่านี้
    const sag = mobile ? Math.min(70, 0.12 * len + 8) : Math.min(90, 0.4 * len + 10)
    const seg = placeLinks(a, b, sag, links.length)
    if (perchOn.includes(i) && seg.length >= 3) {
      const mid = seg[Math.floor(seg.length * (i === 0 ? 0.6 : i === route.length - 1 ? 0.4 : 0.5))]
      perches.push({ x: mid.x, y: mid.y, flip: perches.length % 2 === 1 })
    }
    links.push(...seg)
  })
  return { w: box.width, h: box.height, links, perches }
}

// ----- ของตกแต่งเส้นหมึก -----

// กิ่งลอเรล: ก้านโค้ง + ใบรีพร้อมเส้นกลางใบ
function LaurelSprig({ className }) {
  const at = (t) => [60 + 120 * t - 40 * t * t, 200 - 170 * t + 20 * t * t]
  const leaves = Array.from({ length: 11 }, (_, i) => {
    const t = 0.06 + i * 0.085
    const [x, y] = at(t)
    const [x2, y2] = at(t + 0.01)
    const ang = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI + (i % 2 ? 48 : -48)
    return { x, y, ang, s: 1 - i * 0.035 }
  })
  return (
    <svg className={`ink ${className}`} viewBox="0 0 240 240" aria-hidden="true" focusable="false">
      <path d="M 60 200 Q 120 110 140 50" />
      {leaves.map((l, i) => (
        <g key={i} transform={`rotate(${l.ang.toFixed(1)} ${l.x.toFixed(1)} ${l.y.toFixed(1)})`}>
          <path
            d={`M ${l.x.toFixed(1)} ${l.y.toFixed(1)} q ${12 * l.s} ${-7 * l.s} ${26 * l.s} 0 q ${-14 * l.s} ${7 * l.s} ${-26 * l.s} 0 z`}
          />
          <path d={`M ${l.x.toFixed(1)} ${l.y.toFixed(1)} l ${22 * l.s} 0`} />
        </g>
      ))}
    </svg>
  )
}

// กิ่งดอกไม้: ก้าน + ใบ + ดอก 5 กลีบ 3 ดอก
function FlowerBranch({ className }) {
  const flower = (cx, cy, r) => (
    <g>
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i * 72 * Math.PI) / 180
        const px = cx + Math.cos(a) * r
        const py = cy + Math.sin(a) * r
        return <ellipse key={i} cx={px} cy={py} rx={r * 0.75} ry={r * 0.5} transform={`rotate(${i * 72} ${px} ${py})`} />
      })}
      <circle cx={cx} cy={cy} r={r * 0.4} />
    </g>
  )
  const leaves = [
    [230, 176, 20],
    [200, 162, -30],
    [150, 140, 25],
    [110, 104, -35],
    [60, 70, 15],
  ]
  return (
    <svg className={`ink ${className}`} viewBox="0 0 280 200" aria-hidden="true" focusable="false">
      <path d="M 270 190 C 210 170 150 150 90 90 C 70 70 50 60 20 60" />
      <path d="M 170 152 C 160 120 170 100 190 90" />
      <path d="M 120 118 C 130 90 120 70 100 58" />
      {leaves.map(([x, y, a], i) => (
        <path key={i} transform={`rotate(${a} ${x} ${y})`} d={`M ${x} ${y} q 12 -10 26 -2 q -12 12 -26 2 z`} />
      ))}
      {flower(192, 86, 7)}
      {flower(98, 54, 6)}
      {flower(24, 58, 5)}
    </svg>
  )
}

// นกพิราบเกาะโซ่ (เท้าอยู่ที่จุด x,y บนโซ่)
function PerchedDove({ x, y, flip }) {
  return (
    <g transform={`translate(${x.toFixed(1)} ${(y - 3).toFixed(1)}) scale(${flip ? -1 : 1} 1)`} className="perch">
      <path d="M -16 -14 C -18 -26 -6 -34 6 -32 C 9 -40 20 -40 22 -32 L 29 -30 L 22 -27 C 22 -16 12 -8 0 -8 C -8 -8 -14 -10 -26 -6 Z" />
      <path d="M -6 -22 C 2 -18 8 -18 14 -22" />
      <circle cx="16" cy="-33" r="1.2" />
      <path d="M -2 -8 L -3 0 M 6 -9 L 6 0 M -5 0 L 0 0 M 3 0 L 9 0" />
    </g>
  )
}

function Sheet({ title, description, items, look, index }) {
  return (
    <li className="sheet" style={{ '--tilt': look.tilt, '--dur': look.dur, '--delay': look.delay }}>
      {/* เลขโรมันตัวใหญ่จาง ๆ หลังแผ่น (โผล่ออกนอกขอบ ไม่อยู่ใต้ข้อความ) */}
      <span className="sheet__numeral" aria-hidden="true">
        {toRoman(index + 1)}
      </span>
      <div className="sheet__shadow">
        <div className="sheet__paper" style={{ clipPath: tornEdge(look.seed) }}>
          <h3>{title}</h3>
          {description && <p className="sheet__desc">{description}</p>}
          {items?.length > 0 ? (
            <ul className="sheet__items">
              {items.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          ) : (
            import.meta.env.DEV && <p className="sheet__desc">เพิ่ม skill ได้ที่ src/data.js</p>
          )}
        </div>
        {/* ห่วงโลหะ (eyelet) 4 มุม: โซ่เลือกใช้คู่ที่เหมาะกับเลย์เอาต์ */}
        {['tl', 'tr', 'bl', 'br'].map((pos) => (
          <span key={pos} className={`sheet__eyelet sheet__eyelet--${pos}`} data-eyelet={pos} aria-hidden="true" />
        ))}
      </div>
    </li>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [chain, setChain] = useState(null)

  // แอนิเมชันเล่นเฉพาะตอนฉากอยู่ในจอ
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // คำนวณโซ่: ตอนจัดวาง, ฟอนต์โหลดเสร็จ, ขนาดเปลี่ยน
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setChain(computeChain(el)))
    }
    update()
    document.fonts?.ready.then(update)
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
    }
  }, [])

  return (
    <section ref={ref} className={`skills${playing ? ' is-playing' : ''}`} id="skills">
      {/* ของตกแต่งเส้นหมึกด้านหลัง (จาง ๆ ไม่อยู่ใต้ข้อความ) */}
      <div className="skills__decor" aria-hidden="true">
        <LaurelSprig className="decor--laurel" />
        <FlowerBranch className="decor--flowers" />
        <Swallow className="decor--bird1" />
        <Swallow className="decor--bird2" />
        <Swallow className="decor--bird3" />
      </div>

      <div className="container">
        <h2 className="section-title">Skills</h2>
      </div>

      <ul className="skills__sheets">
        {skills.map((group, i) => (
          <Sheet key={group.title} {...group} index={i} look={SHEETS[i % SHEETS.length]} />
        ))}
      </ul>

      {/* โซ่: ห่วงรีสลับด้านหน้า (วง) กับด้านข้าง (แท่ง) + นกเกาะ */}
      {chain && (
        <svg
          className="skills__chain"
          style={{ width: chain.w, height: chain.h }}
          viewBox={`0 0 ${chain.w} ${chain.h}`}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {/* เหล็กสีเข้ม เด่นบนพื้นกระดาษ */}
            <linearGradient id="chain-metal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6b5e4e" />
              <stop offset="0.45" stopColor="#3a332c" />
              <stop offset="1" stopColor="#1d1a17" />
            </linearGradient>
            <g id="chain-face">
              <ellipse rx="8.5" ry="5" fill="none" stroke="#120f0c" strokeWidth="4.4" />
              <ellipse rx="8.5" ry="5" fill="none" stroke="url(#chain-metal)" strokeWidth="2.8" />
              <path d="M 1.5 -4.6 Q 7.8 -4.2 8.3 -0.8" fill="none" stroke="#f5ead2" strokeOpacity="0.55" strokeWidth="1" />
            </g>
            <g id="chain-edge">
              <rect x="-9.5" y="-2.3" width="19" height="4.6" rx="2.3" fill="#120f0c" />
              <rect x="-9" y="-1.6" width="18" height="3.2" rx="1.6" fill="url(#chain-metal)" />
              <line x1="-6" y1="-1.1" x2="6" y2="-1.1" stroke="#f5ead2" strokeOpacity="0.45" strokeWidth="0.8" />
            </g>
          </defs>
          {chain.links.map((l, i) => (
            <use
              key={i}
              href={l.face ? '#chain-face' : '#chain-edge'}
              transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.a.toFixed(1)})`}
            />
          ))}
          {/* นกพิราบเกาะบนโซ่ (นิ่ง) */}
          {chain.perches.map((p, i) => (
            <PerchedDove key={i} {...p} />
          ))}
        </svg>
      )}
    </section>
  )
}
