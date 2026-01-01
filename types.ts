
export type Category = 'All' | 'Client Projects' | 'Hypercasual' | 'Puzzle' | 'Steam/PC' | 'VR/AR' | 'Tutorials';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  videoUrl: string;
  techStack: string[];
  playUrl?: string;
  caseStudyUrl?: string;
}

export interface Skill {
  name: string;
  proficiency: number; // 0-100
  icon: string;
  color: string;
}
