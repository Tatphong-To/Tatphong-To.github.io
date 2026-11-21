// ===== ข้อมูลทั้งหมดของเว็บ แก้ที่ไฟล์นี้ไฟล์เดียว =====
// รูป: วางไฟล์จริงไว้ใน public/ แล้วเปลี่ยน path ด้านล่าง
// ลิงก์ที่เป็น '' หรือ '#' ปุ่มจะซ่อนเอง

export const profile = {
  firstName: 'Tatphong',
  lastName: 'Tongyuang',
  role: 'Full Stack Developer Intern',
  tagline: 'สร้างเว็บและแอปที่ใช้งานได้จริง ตั้งแต่หน้าจอไปจนถึง API และระบบข้อมูล', // ตัดบรรทัดได้เฉพาะที่เว้นวรรค (และ |)
  photo: '/images/profile.png',
  resumeUrl: '/Tatphong_Resume.pdf', // วางไฟล์ที่ public/Tatphong_Resume.pdf
  status: 'เปิดรับฝึกงาน 4–6 เดือน', // ป้ายสถานะใน Hero และ Footer (ใส่ '' เพื่อซ่อน)
  // ===== About Me =====
  // การตัดบรรทัดภาษาไทย: ตัดได้เฉพาะที่เว้นวรรค และที่เครื่องหมาย | (ไม่แสดงบนหน้า)
  //   คำที่ต้องอยู่บรรทัดเดียวกันให้คั่นด้วย \u00a0 (เว้นวรรคแบบไม่ตัดบรรทัด)
  aboutHeadline: 'นักพัฒนาที่ชอบเปลี่ยนไอเดีย|ให้เป็นระบบที่ใช้งานได้จริง',
  about:
    'มีประสบการณ์พัฒนา Backend และ REST\u00a0API ด้วย Spring\u00a0Boot, Web\u00a0Scraping และ Data\u00a0Pipeline ด้วย Airflow รวมถึง|ประยุกต์ใช้ LLM กับระบบแนะนำ|อาหารและสินค้า พร้อมทำงานกับ Docker และ CI/CD เพื่อพัฒนา|และจัดการระบบ|อย่างเป็นระบบ',
  // คอลัมน์ขวาของการ์ด About (icon ที่ใช้ได้: container, server, pipeline, team, bulb)
  // ใช้ | และ \u00a0 ได้เหมือนข้อความ about ด้านบน
  strengths: [
    {
      title: 'Containerization',
      description: 'ใช้งาน Docker และจัดการ Container สำหรับพัฒนาและรันระบบ',
      icon: 'container',
    },
    {
      title: 'Server & Deployment',
      description: 'มีประสบการณ์ตั้งค่า VPS และ Deploy แอปพลิเคชันบน Server',
      icon: 'server',
    },
    {
      title: 'CI/CD & Automation',
      description: 'ใช้งาน GitHub\u00a0Actions สำหรับจัดการ Build, Testing และ Workflow อัตโนมัติ',
      icon: 'pipeline',
    },
    {
      title: 'Team Collaboration',
      description: 'สามารถทำงานร่วมกับทีมผ่าน Git และ GitHub รวมถึงการจัดการ Version\u00a0Control',
      icon: 'team',
    },
    {
      title: 'Problem Solving',
      description: 'เรียนรู้เทคโนโลยีใหม่ได้รวดเร็ว พร้อมวิเคราะห์และแก้ไขปัญหา|ในการพัฒนาระบบ',
      icon: 'bulb',
    },
  ],
  education: 'ม.เกษตรศาสตร์ กำแพงแสน · วท.บ. เทคโนโลยีสารสนเทศ', // ใส่ '' เพื่อซ่อน
  phone: '', // ใส่ '' เพื่อซ่อน
  email: 'tatphong.to@gmail.com',
  location: 'สมุทรสงคราม, ไทย',
  // icon ที่ใช้ได้: facebook, github, linkedin
  socials: [
    { label: 'GitHub', icon: 'github', url: 'https://github.com/Tatphong-To' },
    { label: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/that.phngs.thxng.ywng/' },
  ],
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

// ===== Skills (3 หมวด) =====
// items: ชื่อ skill ที่มีโลโก้แล้ว -> HTML, CSS, JavaScript, React, Flutter, Git, GitHub, Docker
//        (ชื่ออื่นใส่ได้ จะแสดงเป็นชิปตัวอักษรแทนโลโก้)
export const skills = [
  {
    title: 'Front-end',
    icon: 'frontend',
    description: 'หน้าเว็บและแอปมือถือที่ใช้งานง่าย รองรับหลายหน้าจอ',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Angular', 'Flutter'],
  },
  {
    title: 'Back-end',
    icon: 'backend',
    description: 'API และระบบหลังบ้านที่เชื่อมกับฐานข้อมูล',
    items: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'PostgreSQL'],
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
    image: '/projects/kinraidee.jpg',
    link: 'https://natcha-runsri.github.io/KinRaiDee-Demo/',
    repo: 'https://github.com/natcha-runsri/KinRaiDee-Demo',
  },
  {
    title: 'AuoYoo — แนะนำและเปรียบเทียบอุปกรณ์ไอที',
    description:
      'เว็บแนะนำและเปรียบเทียบอุปกรณ์ไอทีจาก 3 ร้าน งานของผม: data pipeline (10,138 → 8,386 รายการ), ตัวอ่านงบและหมวดสินค้าไทย/อังกฤษ และ CI/CD ที่ deploy เฉพาะเมื่อเทสต์ผ่าน',
    tags: ['Python', 'Angular', 'Docker', 'GitHub Actions'],
    image: '/projects/auoyoo.jpg',
    link: 'https://natcha-runsri.github.io/Auoyoo-Demo/',
    repo: 'https://github.com/natcha-runsri/Auoyoo-Demo',
  },
  {
    title: 'food_ml — ระบบแนะนำเมนูตามโภชนาการ',
    description:
      'API แนะนำเมนูตามเป้าหมายพลังงานรายวันและอาหารที่แพ้ พร้อม Airflow ETL รายวันและ K-Means ที่ติดตามด้วย MLflow',
    tags: ['FastAPI', 'Airflow', 'MLflow', 'PostgreSQL'],
    image: '/projects/food-ml.jpg',
    link: '',
    repo: 'https://github.com/Tatphong-To/food_ml_model',
  },
  {
    title: 'MOVI — แอปจองตั๋วหนัง',
    description:
      'แอปจองตั๋วหนังด้วย Flutter + Firebase ตั้งแต่สมัครสมาชิก ดูตัวอย่างหนัง เลือกรอบและที่นั่ง (ใช้ Firestore transaction กันจองซ้ำ) จนถึงรับตั๋วเป็น QR Code งานของผม (ร่วมพัฒนาทีม 2 คน): หน้าแอป ระบบ login ด้วย Firebase Auth และการเชื่อมข้อมูลกับ Firestore',
    tags: ['Flutter', 'Firebase', 'Firestore'],
    image: '/projects/cinema-app.jpg',
    link: 'https://natcha-runsri.github.io/Movie_App/',
    repo: 'https://github.com/natcha-runsri/Movie_App',
  },
]

// ลิงก์ใช้ได้จริงไหม ('' / '#' / ช่องว่าง = ไม่ใช่) ใช้ซ่อนปุ่มที่ยังไม่มีลิงก์
export const hasUrl = (url) => typeof url === 'string' && url.trim() !== '' && url.trim() !== '#'
