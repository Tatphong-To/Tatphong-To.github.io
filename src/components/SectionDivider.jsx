import './SectionDivider.css'

// เส้นคั่น section (ของตกแต่ง) สีหมึกจาง 35% เท่ากับ --rule ให้เป็นชุดเดียวกับเส้นคั่น Hero
//   variant="meander": แถบลายกรีกเมเนอร์ + เหรียญดอกกุหลาบ (Skills | Projects)
//   variant="scroll":  แถบลายคลื่นวิทรูเวียน + พวงมาลัยใบมะกอก (About | Skills)

const f = (n) => +n.toFixed(1)

// พวงมาลัยใบมะกอก: ใบสองแถวโค้งตามวง เปิดด้านบน ผูกริบบิ้นด้านล่าง (viewBox 40x40)
const WREATH_LEAVES = []
for (let i = 0; i < 7; i++) {
  const deg = 40 + i * 20 // ครึ่งขวา: จาก 40° (ใกล้ยอด) ถึง 160° (ใกล้ล่าง) วัดจากด้านบนตามเข็ม
  const a = (deg * Math.PI) / 180
  const x = 20 + 14 * Math.sin(a)
  const y = 20 - 14 * Math.cos(a)
  const rot = deg + (i % 2 ? 28 : -28) // ตามแนวสัมผัสวง เอียงสลับออก-เข้า
  WREATH_LEAVES.push({ x: f(x), y: f(y), rot: f(rot) })
  WREATH_LEAVES.push({ x: f(40 - x), y: f(y), rot: f(180 - rot) }) // ครึ่งซ้าย (สะท้อน)
}

function Rosette() {
  return (
    <svg className="divider__ornament" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="16.5" />
      <circle cx="18" cy="18" r="13" />
      {/* ดอกกุหลาบ 8 กลีบ */}
      {[0, 45, 90, 135].map((a) => (
        <ellipse key={a} cx="18" cy="18" rx="9.5" ry="3.2" transform={`rotate(${a} 18 18)`} />
      ))}
      <circle cx="18" cy="18" r="2.2" className="divider__dot" />
    </svg>
  )
}

function OliveWreath() {
  return (
    <svg className="divider__ornament divider__ornament--wreath" viewBox="0 0 40 40">
      <path d="M20 34A14 14 0 0 1 9 11M20 34A14 14 0 0 0 31 11" />
      {WREATH_LEAVES.map((l, i) => (
        <ellipse key={i} className="divider__leaf" cx={l.x} cy={l.y} rx="3.6" ry="1.5" transform={`rotate(${l.rot} ${l.x} ${l.y})`} />
      ))}
      {/* ริบบิ้นผูกด้านล่าง */}
      <path d="M20 34l-4 4M20 34l4 4" />
      <circle cx="20" cy="34" r="1.6" className="divider__dot" />
    </svg>
  )
}

export default function SectionDivider({ variant = 'meander' }) {
  return (
    <div className={`divider divider--${variant}`} aria-hidden="true">
      <span className="divider__band" />
      {variant === 'scroll' ? <OliveWreath /> : <Rosette />}
      <span className="divider__band" />
    </div>
  )
}
