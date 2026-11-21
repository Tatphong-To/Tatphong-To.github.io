// ===== ของตกแต่งเส้นหมึกที่ใช้ร่วมกันหลาย section (SVG นิ่ง, aria-hidden) =====

// นกนางแอ่นเส้นหมึก (สไตล์ .ink .ink--bird ใน Skills.css)
export function Swallow({ className }) {
  return (
    <svg className={`ink ink--bird ${className}`} viewBox="0 0 60 30" aria-hidden="true" focusable="false">
      <path d="M 2 14 C 12 4 22 6 30 15 C 38 6 48 4 58 14" />
      <path d="M 26 15 L 30 22 L 34 15" />
      <path d="M 30 22 L 26 28 M 30 22 L 34 28" />
    </svg>
  )
}
