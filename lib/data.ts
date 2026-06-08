export const education = [
  {
    degree: 'MSc Media Informatics',
    school: 'Saarland University',
    location: 'Saarbrücken, Germany',
    period: '2024 – Present',
    current: true,
  },
];

export const skills = {
  frontend: [
    { name: 'TypeScript', percentage: 95 },
    { name: 'React.js', percentage: 92 },
    { name: 'Next.js', percentage: 90 },
    { name: 'Three.js', percentage: 80 },
    { name: 'Tailwind CSS', percentage: 88 },
    { name: 'Framer Motion', percentage: 75 },
  ],
  backend: [
    { name: 'Node.js', percentage: 85 },
    { name: 'SQL / MySQL', percentage: 78 },
    { name: 'Python', percentage: 70 },
    { name: 'Docker', percentage: 72 },
    { name: 'Git & CI/CD', percentage: 85 },
    { name: 'REST APIs', percentage: 88 },
  ],
};

export const techPills = [
  'TypeScript', 'React', 'Next.js', 'Three.js', 'Node.js',
  'Tailwind CSS', 'MUI', 'Socket.IO', 'Python', 'MySQL',
  'MongoDB', 'Docker', 'Jest', 'Vitest', 'Git', 'Vite',
  'Framer Motion', 'GitHub Copilot', 'Agile', 'WebGL',
];

export const experiences = [
  {
    company: 'Think3DDD GbR',
    role: '3D Software Engineering Intern',
    period: 'Mar 2026 – Present',
    location: 'Berlin, Germany (Remote)',
    tags: ['React', 'TypeScript', '3D Visualization'],
    description: 'Building a high-performance visualization platform for 3D medical models. Implementing modular UI components and optimizing frontend interactions.',
    current: true,
  },
  {
    company: 'SAP',
    role: 'Werkstudent JavaScript Developer',
    period: 'Jun 2025 – Nov 2025',
    location: 'Walldorf, Germany',
    tags: ['JavaScript', 'Agile', 'Enterprise'],
    description: 'Engineered JavaScript automation scripts improving application reliability in one of the worlds largest enterprise software environments.',
    current: false,
  },
  {
    company: 'DNDAI',
    role: 'Frontend Engineer',
    period: 'Jan 2024 – Oct 2024',
    location: 'Graz, Austria (Remote)',
    tags: ['Next.js', 'TypeScript', 'React'],
    description: 'Handled all frontend for an AI platform serving 10,000+ users. Built the component system and shipped every user-facing screen.',
    current: false,
  },
  {
    company: 'Freelance',
    role: 'Full-Stack Developer',
    period: 'Feb 2022 – Jul 2023',
    location: 'Remote',
    tags: ['React', 'Node.js', '50+ Projects'],
    description: '50+ projects across responsive design and full-stack TypeScript solutions. Every project a different problem. Every one shipped.',
    current: false,
  },
];

export interface Project {
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  category: string;
  featured?: boolean;
  interviewBuilt?: boolean;
  pinned?: boolean;
  isDemo?: boolean;
  demoUrl?: string;
  embedUrl?: string;
  /** Site sends X-Frame-Options / CSP that blocks iframe embed — open in new tab instead. */
  embedBlocked?: boolean;
  githubUrl?: string;
}

/** Cell Tracker and other pinned projects always appear first in the slider. */
export function getPresentationProjects(): Project[] {
  return [...projects].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    if (a.interviewBuilt && !b.interviewBuilt) return -1;
    if (!a.interviewBuilt && b.interviewBuilt) return 1;
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}

export const projects: Project[] = [
  {
    title: 'Cell Inventory & Traceability Tracker',
    subtitle: 'Built for BMW Battery Cell Competence Center',
    description: 'Full-stack battery cell lifecycle management with immutable audit trail, CSV validation, and real-time dashboard.',
    tags: ['React', 'Node.js', 'MySQL', 'Express', 'MUI'],
    category: 'Full Stack',
    featured: true,
    interviewBuilt: true,
    pinned: true,
    demoUrl: 'https://bmw-cell-tracker.vercel.app/',
    embedUrl: 'https://bmw-cell-tracker.vercel.app/',
    githubUrl: 'https://github.com/AimenEllahi/cell-tracker',
  },
  {
    title: 'DNDAI Platform',
    subtitle: 'AI-powered gameplay platform',
    description: 'Handled all frontend for a live AI platform scaling gameplay sessions for 10,000+ active users worldwide.',
    tags: ['Next.js', 'Node.js', 'MongoDB'],
    category: 'Full Stack',
    demoUrl: 'https://dndai.app/',
    embedUrl: 'https://dndai.app/',
    embedBlocked: true,
  },
  {
    title: 'Landau Boat Configurator',
    subtitle: 'Real-time 3D customization',
    description: 'Real-time boat configurator with water shading, part swapping, and polished UX — built for Landau Alure.',
    tags: ['R3F', 'Next.js', 'Tailwind'],
    category: '3D UX',
    demoUrl: 'https://landau-alure-232.vercel.app/Island',
    embedUrl: 'https://landau-alure-232.vercel.app/Island',
  },
  {
    title: 'Xiaomi 3D Showcase',
    subtitle: 'Interactive product visualization',
    description: 'Product storytelling with real-time WebGL, scroll-driven animations, and SEO-optimized Next.js architecture.',
    tags: ['Three.js', 'Next.js', 'GSAP'],
    category: '3D Web',
    demoUrl: 'https://o16u.vercel.app/',
    embedUrl: 'https://o16u.vercel.app/',
  },
  {
    title: 'Car Configurator Demo',
    subtitle: 'Configure your drive',
    description: 'In-browser 3D car configurator — pick a part, swap a finish, see it instantly. Built into my portfolio.',
    tags: ['R3F', 'Next.js', 'Three.js'],
    category: '3D Demo',
    isDemo: true,
    demoUrl: 'https://aimen-qaiser.vercel.app/configurator',
    embedUrl: 'https://aimen-qaiser.vercel.app/configurator',
  },
  {
    title: 'TaskBoard Pro',
    subtitle: 'Sprint management dashboard',
    description: 'Sprint dashboards, filters, and responsive task grids for agile team workflows.',
    tags: ['Angular', 'Tailwind'],
    category: 'Frontend',
    demoUrl: 'https://angular-project-ashy.vercel.app/dashboard',
    embedUrl: 'https://angular-project-ashy.vercel.app/dashboard',
  },
];
