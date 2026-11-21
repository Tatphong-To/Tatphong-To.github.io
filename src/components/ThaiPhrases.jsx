// ตัดบรรทัดภาษาไทยเฉพาะจุดที่กำหนด: แต่ละวลี (คั่นด้วยเว้นวรรคหรือ |) ห้ามตัดกลาง
// เบราว์เซอร์ตัดคำไทยเองได้ไม่แม่น (เช่น "ได้ / จริง") จึงคุมจุดตัดเองจาก data.js
// ต้องมี CSS .nobr { white-space: nowrap } ในส่วนที่ใช้
export default function ThaiPhrases({ text }) {
  return text.split(/( |\|)/).map((part, i) => {
    if (part === ' ') return ' '
    if (part === '|') return <wbr key={i} />
    return part ? (
      <span key={i} className="nobr">
        {part}
      </span>
    ) : null
  })
}
