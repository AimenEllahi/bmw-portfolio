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
    description: 'Engineered JavaScript automation scripts improving application reliability in one of the worlds largest enterprise software environments. Learned that enterprise software has its own laws of physics.',
    current: false,
  },
  {
    company: 'DNDAI',
    role: 'Lead Frontend Engineer',
    period: 'Jan 2024 – Oct 2024',
    location: 'Graz, Austria (Remote)',
    tags: ['Next.js', 'TypeScript', 'Team Lead'],
    description: 'Led frontend for an AI platform serving 10,000+ users. Architected a reusable component system that improved performance by 20%.',
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

export const projects = [
  {
    title: 'Cell Inventory & Traceability Tracker',
    subtitle: 'Built for BMW Battery Cell Competence Center',
    description: 'Full-stack battery cell lifecycle management system. Tracks cells from Received to Disposed with complete immutable audit trail, row-level CSV validation, and real-time dashboard.',
    tags: ['React', 'Node.js', 'MySQL', 'Express', 'MUI'],
    featured: true,
    demoUrl: 'YOUR_DEPLOYED_URL',
    githubUrl: 'https://github.com/AimenEllahi/cell-tracker',
    highlights: [
      'Immutable audit trail for every state change',
      'Row-level CSV import error reporting',
      'State machine with lifecycle enforcement',
      'Real-time dashboard with charts',
    ],
  },
  {
    title: 'Xiaomi 3D Product Showcase',
    subtitle: 'Interactive 3D product visualization',
    description: 'Optimized 3D product rendering in Next.js with Three.js. Focused on SEO performance and smooth interactions.',
    tags: ['Next.js', 'Three.js', 'TypeScript'],
    featured: false,
    githubUrl: 'https://github.com/AimenEllahi',
  },
  {
    title: 'Landau Boat Configurator',
    subtitle: 'Real-time 3D customization tool',
    description: 'Built a real-time boat customization tool with immersive UX and clean state management.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    featured: false,
    githubUrl: 'https://github.com/AimenEllahi',
  },
  {
    title: 'DNDAI Platform',
    subtitle: 'AI-integrated portal for 10,000+ users',
    description: 'Scalable backend and frontend handling high traffic for an AI-integrated portal.',
    tags: ['Next.js', 'Node.js', 'MongoDB'],
    featured: false,
    githubUrl: 'https://github.com/AimenEllahi',
  },
];
