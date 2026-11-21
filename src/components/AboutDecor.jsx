import { Swallow } from './Ornaments.jsx'

// ===== ของตกแต่งรอบการ์ด About: เสาไอโอนิก 2 ต้น + กิ่งมะกอกเลื้อยเสา/ห้อยมุมการ์ด + นกนางแอ่น =====
// SVG นิ่งทั้งหมด (ไม่มีแอนิเมชัน ไม่ใช้ filter) และเป็น aria-hidden

const f = (n) => +n.toFixed(1)

// ใบไม้รีตามแนวเส้น: วางสลับซ้าย-ขวา ทำมุมกับเส้นตามทิศทาง
function leavesAlong(at, { from = 0.04, to = 0.96, step = 0.07, rx = 6, spread = 52 } = {}) {
  const out = []
  let i = 0
  for (let t = from; t <= to; t += step, i++) {
    const [x, y] = at(t)
    const [x2, y2] = at(t + 0.01)
    const ang = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI + (i % 2 ? spread : -spread)
    const rad = (ang * Math.PI) / 180
    out.push({
      cx: f(x + Math.cos(rad) * rx * 0.9),
      cy: f(y + Math.sin(rad) * rx * 0.9),
      rot: f(ang),
    })
  }
  return out
}

function stemPath(at, n = 40) {
  let d = ''
  for (let i = 0; i <= n; i++) {
    const [x, y] = at(i / n)
    d += `${i ? 'L' : 'M'}${f(x)} ${f(y)}`
  }
  return d
}

// กิ่งเลื้อยขึ้นลำเสา: เส้นคลื่นพันรอบเสาจากล่างขึ้นบน (viewBox 60x220)
const vineAt = (t) => [30 + 17 * Math.sin(t * Math.PI * 3.2), 216 - t * 206]
const VINE_STEM = stemPath(vineAt, 60)
const VINE_LEAVES = leavesAlong(vineAt, { from: 0.05, to: 0.97, step: 0.055 })

// กิ่งมะกอกห้อยโค้ง: จากหัวเสาไปมุมการ์ด (viewBox 220x70) + ลูกมะกอก
const swagAt = (t) => [6 + 208 * t, 8 + 46 * 4 * t * (1 - t) * (1 - 0.25 * t)]
const SWAG_STEM = stemPath(swagAt, 40)
const SWAG_LEAVES = leavesAlong(swagAt, {
  from: 0.06,
  to: 0.94,
  step: 0.06,
  rx: 7,
  spread: 58,
})
const OLIVES = [0.3, 0.52, 0.71].map((t) => {
  const [x, y] = swagAt(t)
  return { cx: f(x + 3), cy: f(y + 7) }
})

function Leaves({ items, rx, ry }) {
  return items.map((l, i) => (
    <ellipse key={i} cx={l.cx} cy={l.cy} rx={rx} ry={ry} transform={`rotate(${l.rot} ${l.cx} ${l.cy})`} />
  ))
}

export function OliveSwag({ className }) {
  return (
    <svg className={`olive ${className}`} viewBox="0 0 220 70" aria-hidden="true" focusable="false">
      <path className="olive__stem" d={SWAG_STEM} />
      <g className="olive__leaf">
        <Leaves items={SWAG_LEAVES} rx={7} ry={2.6} />
      </g>
      <g className="olive__fruit">
        {OLIVES.map((o, i) => (
          <ellipse key={i} cx={o.cx} cy={o.cy} rx="2.6" ry="3.4" />
        ))}
      </g>
    </svg>
  )
}

// เสาไอโอนิก: หัวเสา (ก้นหอย) / ลำเสาร่อง (ยืดตามความสูง) / ฐานเสา
function IonicColumn({ side }) {
  const flutes = [16, 26, 36, 44, 54, 64]
  return (
    <div className={`acol acol--${side}`} aria-hidden="true">
      <svg className="acol__capital" viewBox="0 0 120 46" focusable="false">
        <rect className="acol__stone" x="4" y="1" width="112" height="7" />
        <path className="acol__stone" d="M14 8H106C110 8 112 12 112 16V22H8V16C8 12 10 8 14 8Z" />
        {/* ก้นหอย (volute) สองข้าง */}
        <circle className="acol__stone" cx="16" cy="22" r="12" />
        <circle className="acol__stone" cx="104" cy="22" r="12" />
        <path className="acol__line" d="M16 22m0-7a7 7 0 1 1-7 7a4 4 0 0 1 4-4a2 2 0 0 1 2 2" />
        <path className="acol__line" d="M104 22m0-7a7 7 0 1 0 7 7a4 4 0 0 0-4-4a2 2 0 0 0-2 2" />
        {/* ไข่-ลูกศร (echinus) */}
        <path className="acol__line" d="M34 20q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0q6 8 12 0" />
        <rect className="acol__stone" x="22" y="34" width="76" height="5" rx="2" />
        <rect className="acol__stone" x="20" y="39" width="80" height="7" />
      </svg>

      <svg className="acol__shaft" viewBox="0 0 80 100" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id={`acol-marble-${side}`} x1="0" x2="1">
            <stop offset="0" stopColor="#d9cbae" />
            <stop offset="0.38" stopColor="#ece2cc" />
            <stop offset="0.62" stopColor="#e6dac0" />
            <stop offset="1" stopColor="#cfbf9f" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="80" height="100" fill={`url(#acol-marble-${side})`} />
        {flutes.map((x) => (
          <line key={x} className="acol__flute" x1={x} y1="0" x2={x} y2="100" vectorEffect="non-scaling-stroke" />
        ))}
        <line className="acol__line" x1="0.5" y1="0" x2="0.5" y2="100" vectorEffect="non-scaling-stroke" />
        <line className="acol__line" x1="79.5" y1="0" x2="79.5" y2="100" vectorEffect="non-scaling-stroke" />
      </svg>

      <svg className="acol__base" viewBox="0 0 120 34" focusable="false">
        <rect className="acol__stone" x="16" y="0" width="88" height="7" rx="3.5" />
        <path className="acol__stone" d="M20 7H100L96 14H24Z" />
        <rect className="acol__stone" x="10" y="14" width="100" height="9" rx="4.5" />
        <rect className="acol__stone" x="2" y="23" width="116" height="11" />
      </svg>

      {/* กิ่งมะกอกเลื้อยขึ้นลำเสา */}
      <svg className="olive acol__vine" viewBox="0 0 60 220" focusable="false">
        <path className="olive__stem" d={VINE_STEM} />
        <g className="olive__leaf">
          <Leaves items={VINE_LEAVES} rx={6} ry={2.3} />
        </g>
      </svg>
    </div>
  )
}

export default function AboutDecor() {
  return (
    <div className="about__decor" aria-hidden="true">
      <IonicColumn side="left" />
      <IonicColumn side="right" />
      <OliveSwag className="about__swag about__swag--left" />
      <OliveSwag className="about__swag about__swag--right" />
      <Swallow className="about__bird about__bird--1" />
      <Swallow className="about__bird about__bird--2" />
    </div>
  )
}
