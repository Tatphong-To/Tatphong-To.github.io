// TEMP: สวิตช์เลือกแบบหลังคา navbar ชั่วคราว ?roof=a|b (ค่าเริ่มต้น a)
// เลือกได้แล้ว -> ลบไฟล์นี้ + import ใน main.jsx + บล็อก CSS ที่มีป้าย "TEMP" ของแบบที่ไม่ใช้
const q = new URLSearchParams(window.location.search)
document.documentElement.dataset.roof = q.get('roof') === 'b' ? 'b' : 'a'
