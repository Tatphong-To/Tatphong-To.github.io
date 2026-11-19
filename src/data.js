// ===== ข้อมูลทั้งหมดของเว็บ แก้ที่ไฟล์นี้ไฟล์เดียว =====
// รูป: วางไฟล์จริงไว้ใน public/ แล้วเปลี่ยน path ด้านล่าง
// ลิงก์ที่เป็น '' หรือ '#' ปุ่มจะซ่อนเอง

export const profile = {
  firstName: 'Tatphong',
  lastName: 'Tongyuang',
  role: 'Full Stack Developer Intern',
  tagline: 'สร้างเว็บและแอปที่ใช้งานได้จริง ตั้งแต่หน้าจอไปจนถึง API และระบบข้อมูล',
  photo: '/images/profile-placeholder.svg', // TODO: ใส่รูปจริง
  resumeUrl: '/Tatphong_Resume.pdf', // วางไฟล์ที่ public/Tatphong_Resume.pdf
  status: 'เปิดรับฝึกงาน 4–6 เดือน', // ป้ายสถานะใน Hero และ Footer (ใส่ '' เพื่อซ่อน)
  // ===== About Me =====
  aboutHeadline: 'นักศึกษาที่ชอบเปลี่ยนไอเดียให้เป็นแอปที่ใช้งานได้จริง',
  about:
    'นักศึกษาชั้นปีที่ 4 สาขาเทคโนโลยีสารสนเทศ สนใจงานฝั่ง backend เป็นพิเศษ มีประสบการณ์สร้าง API, ระบบแนะนำที่ใช้ LLM, web scraping, data pipeline ด้วย Airflow และ Docker/CI/CD พร้อมเริ่มฝึกงานภายใน 2 สัปดาห์',
  education: 'ม.เกษตรศาสตร์ กำแพงแสน · วท.บ. เทคโนโลยีสารสนเทศ', // ใส่ '' เพื่อซ่อน
  phone: '', // ใส่ '' เพื่อซ่อน
  email: 'tatphong.to@gmail.com',
  location: 'สมุทรสงคราม, ไทย',
  // icon ที่ใช้ได้: facebook, github, linkedin
  socials: [{ label: 'GitHub', icon: 'github', url: 'https://github.com/Tatphong-To' }],
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skill', href: '#skills' },
  { label: 'Project', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const footer = {
  tagline: 'สร้างเว็บและแอปที่ใช้งานได้จริง ตั้งแต่หน้าจอไปจนถึงระบบหลังบ้าน',
}

// ===== Skills (การ์ด 4 หมวด) =====
// icon หมวด: frontend, backend, mobile, tools
// items: ชื่อ skill ที่มีโลโก้แล้ว -> HTML, CSS, JavaScript, React, Flutter, Git, GitHub, Docker
//        (ชื่ออื่นใส่ได้ จะแสดงเป็นชิปตัวอักษรแทนโลโก้)
export const skills = [
  {
    title: 'Front-end',
    icon: 'frontend',
    description: 'หน้าเว็บที่ใช้งานง่ายและรองรับหลายหน้าจอ',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Angular'],
  },
  {
    title: 'Back-end',
    icon: 'backend',
    description: 'API และระบบหลังบ้านที่เชื่อมกับฐานข้อมูล',
    items: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'PostgreSQL'],
  },
  {
    title: 'Mobile',
    icon: 'mobile',
    description: 'แอปข้ามแพลตฟอร์มจากโค้ดชุดเดียว',
    items: ['Flutter'],
  },
  {
    title: 'Tools',
    icon: 'tools',
    description: 'ควบคุมเวอร์ชัน ทำงานเป็นทีม และ deploy',
    items: ['Git', 'GitHub', 'Docker', 'GitHub Actions', 'Airflow', 'Ollama'],
  },
]

// ===== Projects =====
// image: รูปหน้าจอโปรเจกต์ (แนะนำสัดส่วน 16:10 เช่น 1280x800) วางไว้ใน public/
// link: ลิงก์เว็บ/เดโม, repo: ลิงก์ GitHub (ใส่ '' ถ้าไม่มี ปุ่มจะซ่อนเอง)
export const projectsMoreUrl = 'https://github.com/Tatphong-To?tab=repositories' // ลิงก์ปุ่ม "View all projects"

export const projects = [
  {
    title: 'KinRaiDee — มื้อนี้กินไรดี',
    description:
      'เว็บแนะนำเมนูอาหารไทยพร้อมวิเคราะห์การกิน งานของผม: scraper และตัว match วัตถุดิบ (711 สูตร, 7,191 สินค้า), ชั้น LLM ด้วย Ollama และหน้าวิเคราะห์ทั้ง Angular และ Spring Boot',
    tags: ['Spring Boot', 'Angular', 'Python', 'Ollama'],
    image: '/projects/kinraidee.png',
    link: 'https://natcha-runsri.github.io/KinRaiDee-Demo/',
    repo: 'https://github.com/natcha-runsri/KinRaiDee-Demo',
  },
  {
    title: 'AuoYoo — แนะนำและเปรียบเทียบอุปกรณ์ไอที',
    description:
      'เว็บแนะนำและเปรียบเทียบอุปกรณ์ไอทีจาก 3 ร้าน งานของผม: data pipeline (10,138 → 8,386 รายการ), ตัวอ่านงบและหมวดสินค้าไทย/อังกฤษ และ CI/CD ที่ deploy เฉพาะเมื่อเทสต์ผ่าน',
    tags: ['Python', 'Angular', 'Docker', 'GitHub Actions'],
    image: '/projects/auoyoo.png',
    link: 'https://natcha-runsri.github.io/Auoyoo-Demo/',
    repo: 'https://github.com/natcha-runsri/Auoyoo-Demo',
  },
  {
    title: 'food_ml — ระบบแนะนำเมนูตามโภชนาการ',
    description:
      'API แนะนำเมนูตามเป้าหมายพลังงานรายวันและอาหารที่แพ้ พร้อม Airflow ETL รายวันและ K-Means ที่ติดตามด้วย MLflow',
    tags: ['FastAPI', 'Airflow', 'MLflow', 'PostgreSQL'],
    image: '/projects/food-ml.png',
    link: '',
    repo: 'https://github.com/Tatphong-To/food_ml_model',
  },
  {
    title: 'MOVI — แอปจองตั๋วหนัง',
    description:
      'แอปจองตั๋วหนังด้วย Flutter + Firebase ตั้งแต่สมัครสมาชิก ดูตัวอย่างหนัง เลือกรอบและที่นั่ง (ใช้ Firestore transaction กันจองซ้ำ) จนถึงรับตั๋วเป็น QR Code งานของผม (ร่วมพัฒนาทีม 2 คน): หน้าแอป ระบบ login ด้วย Firebase Auth และการเชื่อมข้อมูลกับ Firestore',
    tags: ['Flutter', 'Firebase', 'Firestore'],
    image: '/projects/cinema-app.png',
    link: 'https://natcha-runsri.github.io/Movie_App/',
    repo: 'https://github.com/natcha-runsri/Movie_App',
  },
]

// ลิงก์ใช้ได้จริงไหม ('' / '#' / ช่องว่าง = ไม่ใช่) ใช้ซ่อนปุ่มที่ยังไม่มีลิงก์
export const hasUrl = (url) => typeof url === 'string' && url.trim() !== '' && url.trim() !== '#'
