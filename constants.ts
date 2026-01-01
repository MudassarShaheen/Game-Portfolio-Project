
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  // --- Client Projects ---
  {
    id: 'c1',
    title: 'AI Agents English Learning',
    description: 'Immersive language learning powered by intelligent AI conversational agents.',
    category: 'Client Projects',
    videoUrl: 'https://drive.google.com/file/d/1GAEzFRGQ-yegm6k0EILEk0zyrt7mZdpc/preview',
    techStack: ['Unity', 'AI Agents', 'NLP', 'C#']
  },
  {
    id: 'c2',
    title: 'Royal Champs',
    description: 'Competitive arena battler with polished casual mechanics.',
    category: 'Client Projects',
    videoUrl: 'https://drive.google.com/file/d/1snmlPrDNJZBrBlRuCaOMWgm_r_G4G2IN/preview',
    techStack: ['Unity', 'Multiplayer', 'URP']
  },
  {
    id: 'c3',
    title: 'Kids Game Project',
    description: 'Educational and interactive 3D environment designed for young children.',
    category: 'Client Projects',
    videoUrl: 'https://drive.google.com/file/d/137Ty4nBKqdfnLHL5Sra5ULowBcw6YSbs/preview',
    techStack: ['Unity', 'UI/UX', 'Mobile']
  },
  {
    id: 'c4',
    title: 'Car Paint Project',
    description: 'Advanced automotive visualization with realistic paint shaders and lighting.',
    category: 'Client Projects',
    videoUrl: 'https://www.youtube.com/embed/kdRgFFxWmk4',
    techStack: ['Unity', 'Shader Graph', 'HDRP']
  },

  // --- Hypercasual ---
  {
    id: 'h1',
    title: 'SkinCare ASMR',
    description: 'Satisfying skincare simulation with advanced haptic feedback.',
    category: 'Hypercasual',
    videoUrl: 'https://drive.google.com/file/d/1FfMIwz4FrLhHXio9hsf21zQUaBousql0/preview',
    techStack: ['Unity', 'Mobile', 'ASMR']
  },
  {
    id: 'h2',
    title: 'Magic Master',
    description: 'Gesture-based magic combat with dynamic particle effects.',
    category: 'Hypercasual',
    videoUrl: 'https://drive.google.com/file/d/1RIWUbyLqBS4zN45Bws3HLK8MXz2V9Mur/preview',
    techStack: ['Unity', 'VFX Graph']
  },
  {
    id: 'h3',
    title: 'Prisoner Escape',
    description: 'Stealth-based escape mechanics with intuitive one-touch controls.',
    category: 'Hypercasual',
    videoUrl: 'https://drive.google.com/file/d/1AoDpziTDPSbuzsNAai6-MFXrpNJrAPgA/preview',
    techStack: ['Unity', 'AI Navigation']
  },
  {
    id: 'h4',
    title: 'School Rush 3D',
    description: 'High-energy runner with stylized 3D environment assets.',
    category: 'Hypercasual',
    videoUrl: 'https://drive.google.com/file/d/17BLYD6fgtAid-zJeq5IfaAT9yQDCc2rg/preview',
    techStack: ['Unity', 'Stylized Art']
  },
  {
    id: 'h5',
    title: 'Survival Rush',
    description: 'Fast-paced survival runner with obstacle avoidance and collection loops.',
    category: 'Hypercasual',
    videoUrl: 'https://drive.google.com/file/d/1LWwaxWjnajrlLQAxSxouKD3l31rQDwCj/preview',
    techStack: ['Unity', 'Game Design']
  },
  {
    id: 'h6',
    title: 'Boomerang Master',
    description: 'Unique physics-based boomerang throwing mechanics.',
    category: 'Hypercasual',
    videoUrl: 'https://drive.google.com/file/d/1Ch-GwtEYWIwa4XKviFWXGBSgpHRBCGd_/preview',
    techStack: ['Unity', 'Physics']
  },
  {
    id: 'h7',
    title: 'Digit Run',
    description: 'Mathematical gate runner focusing on quick mental math.',
    category: 'Hypercasual',
    videoUrl: 'https://drive.google.com/file/d/1icB9QEC3kjdaA--HbkrEderjFv8FkmK3/preview',
    techStack: ['Unity', 'Mobile Optimization']
  },
  {
    id: 'h8',
    title: 'Train Rush',
    description: 'Avoidance-based runner set in a high-speed transit environment.',
    category: 'Hypercasual',
    videoUrl: 'https://drive.google.com/file/d/1D8Ym1CqBoXdfjay8z3nJM2LLdSFHFNDa/preview',
    techStack: ['Unity', 'Environment Art']
  },
  {
    id: 'h9',
    title: 'Tailor Master Idle',
    description: 'Idle arcade management game for high retention.',
    category: 'Hypercasual',
    videoUrl: 'https://drive.google.com/file/d/1gDZsoMXL-aCWovgtXrdhWsGcd26ZEqOk/preview',
    techStack: ['Unity', 'Idle Systems']
  },
  {
    id: 'h10',
    title: 'Water Park Simulation',
    description: 'Fun, physics-driven slides and water interaction mechanics.',
    category: 'Hypercasual',
    videoUrl: 'https://drive.google.com/file/d/1xoGOVFBOvSeWxv9se2mAifCJRfGtgVGI/preview',
    techStack: ['Unity', 'Fluid Effects']
  },

  // --- Puzzle Games ---
  {
    id: 'p1',
    title: 'Traffic Jam',
    description: 'Strategic puzzle game requiring clearing blocked paths.',
    category: 'Puzzle',
    videoUrl: 'https://drive.google.com/file/d/1-8lXtzitCIQJBIWxvKT21zrIgDVU4KDP/preview',
    techStack: ['Unity', 'Puzzle Logic']
  },
  {
    id: 'p2',
    title: 'Number Puzzle',
    description: 'Math-centric logic challenge with minimalist design.',
    category: 'Puzzle',
    videoUrl: 'https://drive.google.com/file/d/1dOdoUD9ti7xdXeOk5V3dHe_ufJTx5gdb/preview',
    techStack: ['Unity', 'UI Toolkit']
  },

  // --- Steam Project ---
  {
    id: 's1',
    title: 'Fracture Fables',
    description: 'Epic RPG adventure with high-fidelity graphics and deep systems.',
    category: 'Steam/PC',
    videoUrl: 'https://www.youtube.com/embed/2hyubtj3m0o',
    techStack: ['Unity', 'HDRP', 'PC/Steam']
  },

  // --- Tutorials ---
  {
    id: 't1',
    title: 'Vector3 Techniques',
    description: 'Professional grade Vector3 techniques for cleaner Unity code.',
    category: 'Tutorials',
    videoUrl: 'https://www.youtube.com/embed/RQpWAN8-1bg',
    techStack: ['Unity', 'Math', 'Education']
  },
  {
    id: 't2',
    title: 'Lerp vs Slerp',
    description: 'Mastering smooth rotations and movement in Unity.',
    category: 'Tutorials',
    videoUrl: 'https://www.youtube.com/embed/KXgyGR03uSw',
    techStack: ['Unity', 'Animation', 'Physics']
  },
  {
    id: 't3',
    title: 'Raycast vs CapsuleCast',
    description: 'Understanding advanced physics detection for robust mechanics.',
    category: 'Tutorials',
    videoUrl: 'https://www.youtube.com/embed/oNHwBn3CnNU',
    techStack: ['Unity', 'Physics', 'Optimization']
  },

  // --- VR Projects ---
  {
    id: 'v1',
    title: 'Immersive VR Meditation',
    description: 'Oculus Quest meditation experience with environmental storytelling.',
    category: 'VR/AR',
    videoUrl: 'https://www.youtube.com/embed/VrpOE-4iQU8',
    techStack: ['Unity', 'Oculus Integration', 'Meditation']
  },
  {
    id: 'v2',
    title: 'VR Physics & Rigidbody',
    description: 'Realistic physical hand interactions and object manipulation.',
    category: 'VR/AR',
    videoUrl: 'https://www.youtube.com/embed/UKLCynXzaf8',
    techStack: ['Unity', 'VR Physics', 'Rigidbody']
  },
  {
    id: 'v3',
    title: 'VR Meditation Demo',
    description: 'Meditation project tailored for client-specific VR requirements.',
    category: 'VR/AR',
    videoUrl: 'https://www.youtube.com/embed/s1Tto1bQ0gE',
    techStack: ['Unity', 'Quest 2', 'Client Demo']
  },
  {
    id: 'v4',
    title: 'Meta Quest Hand Interaction',
    description: 'Advanced Meta Quest hand tracking and interaction implementation.',
    category: 'VR/AR',
    videoUrl: 'https://www.youtube.com/embed/yuKlAclu2uo',
    techStack: ['Unity', 'Hand Tracking', 'Metaverse']
  }
];

export const SKILLS: Skill[] = [
  { name: 'Unity Engine', proficiency: 98, icon: '🎮', color: '#8b5cf6' },
  { name: 'C# Programming', proficiency: 95, icon: '⌨️', color: '#06b6d4' },
  { name: 'VR/AR Development', proficiency: 92, icon: '🥽', color: '#8b5cf6' },
  { name: 'Shader Graph', proficiency: 88, icon: '🌈', color: '#06b6d4' },
  { name: 'Mobile Optimization', proficiency: 94, icon: '📱', color: '#8b5cf6' },
  { name: 'Physics Systems', proficiency: 90, icon: '⚛️', color: '#06b6d4' },
  { name: 'Multiplayer', proficiency: 85, icon: '🌐', color: '#8b5cf6' },
  { name: 'Technical Tutorials', proficiency: 90, icon: '📖', color: '#06b6d4' }
];

export const SOCIAL_LINKS = {
  github: 'https://github.com/MudassarShaheen',
  linkedin: 'https://www.linkedin.com/in/mudassar-shaheen-49145451/',
  email: 'mudasar.cr@gmail.com'
};
