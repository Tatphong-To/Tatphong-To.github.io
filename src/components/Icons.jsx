// ไอคอน SVG ที่ใช้ร่วมกันทั้งเว็บ (ไม่ต้องลง library เพิ่ม)

const Svg = ({ children, stroke = false, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    fill={stroke ? 'none' : 'currentColor'}
    stroke={stroke ? 'currentColor' : 'none'}
    strokeWidth={stroke ? 2 : undefined}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
)

export const FacebookIcon = () => (
  <Svg>
    <path d="M12 2a10 10 0 0 0-1.56 19.88v-7H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v7A10 10 0 0 0 12 2z" />
  </Svg>
)

export const GithubIcon = () => (
  <Svg>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </Svg>
)

export const LinkedinIcon = () => (
  <Svg>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z" />
  </Svg>
)

export const ArrowRightIcon = () => (
  <Svg stroke>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
)

export const DownloadIcon = () => (
  <Svg stroke>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </Svg>
)

export const ArrowLeftIcon = () => (
  <Svg stroke>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Svg>
)

export const ExternalIcon = () => (
  <Svg stroke>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </Svg>
)

export const UserIcon = () => (
  <Svg stroke>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </Svg>
)

export const MailIcon = () => (
  <Svg stroke>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Svg>
)

export const PhoneIcon = () => (
  <Svg stroke>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </Svg>
)

export const PinIcon = () => (
  <Svg stroke>
    <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </Svg>
)

export const CapIcon = () => (
  <Svg stroke>
    <path d="M2 9l10-5 10 5-10 5z" />
    <path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M22 9v6" />
  </Svg>
)

export const SparkIcon = () => (
  <Svg stroke>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
  </Svg>
)

export const SendIcon = () => (
  <Svg stroke>
    <path d="M21 3 10 14M21 3l-7 18-4-7-7-4z" />
  </Svg>
)

export const MenuIcon = () => (
  <Svg stroke>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
)

export const CloseIcon = () => (
  <Svg stroke>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)

export const HeartIcon = () => (
  <Svg>
    <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.1 0 3.5 1.1 5.2 3 1.7-1.9 3.1-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z" />
  </Svg>
)

// map ชื่อ icon ใน data.js -> component
export const socialIcons = {
  facebook: FacebookIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
}
