import { Swallow } from './Ornaments.jsx'

// ===== ของตกแต่งรอบการ์ด About: แบบภาพพฤกษศาสตร์ในหนังสือเก่า =====
// การ์ดเหมือนวางทับกิ่งมะกอกที่อัดแห้งไว้: กิ่งโผล่จากหลังการ์ด (ซ้ายบน / ขวาล่าง)
// มุมทองบาง ๆ แบบกรอบหนังสือ (ขวาบน / ซ้ายล่าง) + นกนางแอ่นเหนือมุมขวาบน
// SVG นิ่งทั้งหมด aria-hidden ไม่วางทับข้อความ (กิ่งอยู่ใต้การ์ด)

const f = (n) => +n.toFixed(1)

// จุดบนเส้นโค้ง cubic
const cubic = (p0, p1, p2, p3) => (t) => {
  const u = 1 - t
  return [0, 1].map((k) => u ** 3 * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t ** 3 * p3[k])
}

const pathOf = (at, n = 32) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const [x, y] = at(i / n)
    return `${i ? 'L' : 'M'}${f(x)} ${f(y)}`
  }).join('')

// ใบมะกอกเรียวยาวตามแนวกิ่ง สลับซ้าย-ขวา ใบเล็กลงไปทางปลาย
function leavesOn(at, { from, to, count, len, spread = 38, shrink = 0.45, startSide = 0 }) {
  return Array.from({ length: count }, (_, i) => {
    const t = from + ((to - from) * i) / Math.max(1, count - 1)
    const [x, y] = at(t)
    const [x2, y2] = at(Math.min(1, t + 0.01))
    const side = (i + startSide) % 2 ? 1 : -1
    const ang = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI + side * spread
    return { x: f(x), y: f(y), ang: f(ang), l: f(len * (1 - (shrink * i) / count)) }
  })
}

function Leaf({ x, y, ang, l }) {
  const w = l * 0.2
  return (
    <g transform={`translate(${x} ${y}) rotate(${ang})`}>
      <path
        className="botanic__leaf"
        d={`M0 0C${f(l * 0.3)} ${f(-w)} ${f(l * 0.72)} ${f(-w * 0.8)} ${l} 0C${f(l * 0.72)} ${f(w * 0.8)} ${f(l * 0.3)} ${f(w)} 0 0Z`}
      />
      <path className="botanic__rib" d={`M${f(l * 0.08)} 0L${f(l * 0.8)} 0`} />
    </g>
  )
}

// ----- กิ่งยาว (แนวตั้ง viewBox 150x380): โคนที่มุมขวาบน (ซ่อนหลังการ์ด) โค้งออกซ้ายแล้วทิ้งตัวลง -----
const MAIN = cubic([146, 16], [48, 26], [6, 170], [52, 370])
// กิ่งแขนงแตกจากกิ่งหลักราวหนึ่งในสาม
const twigBase = MAIN(0.34)
const TWIG_AT = cubic(twigBase, [twigBase[0] - 20, twigBase[1] + 6], [twigBase[0] - 34, twigBase[1] + 30], [twigBase[0] - 30, twigBase[1] + 64])
const BRANCH = {
  stem: pathOf(MAIN),
  twig: pathOf(TWIG_AT, 16),
  leaves: [
    ...leavesOn(MAIN, { from: 0.12, to: 0.96, count: 13, len: 34 }),
    ...leavesOn(TWIG_AT, { from: 0.3, to: 0.95, count: 4, len: 22, startSide: 1 }),
  ],
  tip: (() => {
    const [x, y] = MAIN(1)
    const [x0, y0] = MAIN(0.98)
    return { x: f(x), y: f(y), ang: f((Math.atan2(y - y0, x - x0) * 180) / Math.PI), l: 20 }
  })(),
  // ลูกมะกอกห้อยเป็นพวงเล็ก ๆ จากกิ่ง
  olives: [0.46, 0.5, 0.62].map((t, i) => {
    const [x, y] = MAIN(t)
    const dx = [16, 8, 14][i]
    const dy = [10, 18, 6][i]
    return { sx: f(x), sy: f(y), cx: f(x + dx), cy: f(y + dy), rot: [-30, -10, -40][i] }
  }),
}

function OliveBranch({ className }) {
  return (
    <svg className={`botanic ${className}`} viewBox="0 0 150 380" focusable="false">
      <path className="botanic__stem" d={BRANCH.stem} />
      <path className="botanic__stem botanic__stem--thin" d={BRANCH.twig} />
      {BRANCH.olives.map((o, i) => (
        <g key={i}>
          <path className="botanic__stem botanic__stem--thin" d={`M${o.sx} ${o.sy}L${o.cx} ${o.cy}`} />
          <ellipse className="botanic__olive" cx={o.cx} cy={o.cy} rx="4.2" ry="5.6" transform={`rotate(${o.rot} ${o.cx} ${o.cy})`} />
        </g>
      ))}
      {BRANCH.leaves.map((l, i) => (
        <Leaf key={i} {...l} />
      ))}
      <Leaf {...BRANCH.tip} />
    </svg>
  )
}

// ----- กิ่งสั้น (แนวนอน viewBox 200x70): ใช้บนจอแคบ โผล่เหนือ/ใต้มุมการ์ด -----
const SPRIG_AT = cubic([196, 60], [150, 40], [70, 12], [8, 22])
const SPRIG = {
  stem: pathOf(SPRIG_AT, 24),
  leaves: leavesOn(SPRIG_AT, { from: 0.14, to: 0.94, count: 8, len: 24, spread: 42 }),
}

export function OliveSprig({ className }) {
  return (
    <svg className={`botanic ${className}`} viewBox="0 0 200 70" focusable="false">
      <path className="botanic__stem" d={SPRIG.stem} />
      {SPRIG.leaves.map((l, i) => (
        <Leaf key={i} {...l} />
      ))}
      <ellipse className="botanic__olive" cx="104" cy="44" rx="3.6" ry="4.8" transform="rotate(-20 104 44)" />
    </svg>
  )
}

// ----- มุมทองแบบกรอบหนังสือ: เส้นคู่ + ปลายม้วน + เพชรเล็กที่มุม (วาดเป็นมุมซ้ายบน หมุนด้วย CSS) -----
function GoldCorner({ className }) {
  return (
    <svg className={`gold-corner ${className}`} viewBox="0 0 80 80" focusable="false">
      <path d="M6 74V6H74" />
      <path className="gold-corner__fine" d="M12 62V12H62" />
      <path className="gold-corner__fine" d="M6 74c0 3 4 4 5 1M74 6c3 0 4 4 1 5" />
      <path className="gold-corner__gem" d="M6 1L11 6L6 11L1 6Z" />
    </svg>
  )
}

export default function AboutDecor() {
  return (
    <div className="about__decor" aria-hidden="true">
      <OliveBranch className="botanic--branch-tl" />
      <OliveBranch className="botanic--branch-br" />
      <OliveSprig className="botanic--sprig-tl" />
      <OliveSprig className="botanic--sprig-br" />
      <GoldCorner className="gold-corner--tr" />
      <GoldCorner className="gold-corner--bl" />
      <Swallow className="about__bird about__bird--1" />
      <Swallow className="about__bird about__bird--2" />
    </div>
  )
}
