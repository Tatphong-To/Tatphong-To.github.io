# Tatphong Tongyuang — Resume / Portfolio

เว็บ resume และ portfolio ส่วนตัวของทัตพงส์ ทองยวง รวมข้อมูลแนะนำตัว ทักษะ โปรเจกต์ และช่องทางติดต่อ พร้อมปุ่มดาวน์โหลด resume เป็น PDF

🌐 **เว็บไซต์:** https://tatphong-to.github.io

## เทคโนโลยี

- React + Vite
- CSS ธรรมดา แยกไฟล์ตาม component
- Deploy ขึ้น GitHub Pages อัตโนมัติด้วย GitHub Actions (`.github/workflows/deploy.yml`)

## รันในเครื่อง

ต้องใช้ Node.js 20.19 ขึ้นไป หรือ 22.12 ขึ้นไป

```bash
npm install
npm run dev       # เปิดเซิร์ฟเวอร์สำหรับพัฒนา
npm run lint      # ตรวจโค้ด
npm run build     # build ไปที่โฟลเดอร์ dist/
npm run preview   # ดูผลลัพธ์ที่ build แล้ว
```

## แก้ไขเนื้อหา

ข้อมูลทั้งหมดของเว็บอยู่ที่ `src/data.js` ส่วนรูปและไฟล์ PDF วางไว้ในโฟลเดอร์ `public/`
