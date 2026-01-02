
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import SkillCloud from './components/SkillCloud';
import Footer from './components/Footer';
import { PROJECTS, SOCIAL_LINKS } from './constants';
import { Category } from './types';
import { ChevronRight, Gamepad2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const categories: Category[] = [
    'All', 
    'Client Projects', 
    'Hypercasual', 
    'Puzzle', 
    'Steam/PC', 
    'VR/AR', 
    'Tutorials'
  ];

  const filteredProjects = useMemo(() => {
    return activeCategory === 'All' 
      ? PROJECTS 
      : PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // Fixed header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen selection:bg-violet-500/30 selection:text-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div 
            className="text-xl font-black tracking-tighter flex items-center gap-2 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-violet-600 rounded-xl rotate-12 flex items-center justify-center text-white group-hover:rotate-0 transition-transform shadow-lg shadow-violet-900/40">
              <Gamepad2 size={20} />
            </div>
            <span className="hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 font-mono tracking-tighter">MS_ENGINE</span>
          </div>
          <div className="flex items-center gap-6 md:gap-10">
            <a 
              href="#projects" 
              onClick={(e) => handleScrollTo(e, 'projects')}
              className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
            >
              Work
            </a>
            <a 
              href="#skills" 
              onClick={(e) => handleScrollTo(e, 'skills')}
              className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
            >
              Skills
            </a>
            <a 
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black py-2.5 px-6 bg-violet-600 hover:bg-violet-500 text-white rounded-full transition-all active:scale-95 shadow-lg shadow-violet-900/20"
            >
              HIRE ME
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 max-w-7xl mx-auto scroll-mt-24">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Portfolio Showcase</h2>
            <p className="text-zinc-500 text-lg leading-relaxed">
              A curated selection of game development work spanning multiple years, engines, and platform specializations.
            </p>
          </div>

          <div className="w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0">
            <div className="flex gap-2 p-1.5 glass rounded-2xl border-white/5 whitespace-nowrap relative">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors duration-300 z-10 ${
                    activeCategory === cat ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.span
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      className="absolute inset-0 bg-violet-600 rounded-xl glow-violet -z-10 shadow-lg shadow-violet-900/40"
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Skills Section */}
      <div id="skills" className="relative scroll-mt-24">
        <div className="absolute inset-0 bg-zinc-900/20 pointer-events-none" />
        <SkillCloud />
      </div>

      {/* CTA Section */}
      <section className="py-32 px-4 max-w-5xl mx-auto text-center">
        <div className="glass p-16 md:p-24 rounded-[3rem] relative overflow-hidden group border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Bring your vision <br /> to life.</h2>
          <p className="text-zinc-400 mb-12 text-xl relative z-10 max-w-2xl mx-auto">
            Currently accepting new projects and collaboration opportunities for 2026.
          </p>
          <a 
            href={`mailto:${SOCIAL_LINKS.email}`} 
            className="inline-flex items-center gap-3 px-12 py-6 bg-white text-zinc-950 font-black rounded-2xl hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 group relative z-10 shadow-xl"
          >
            LET'S CONNECT
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
