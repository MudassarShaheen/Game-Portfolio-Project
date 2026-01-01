
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 overflow-hidden pt-24 pb-12">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-violet-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative glass p-10 md:p-16 rounded-[2.5rem] border-white/10 text-center max-w-5xl"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-block px-4 py-1.5 mb-6 text-xs font-mono font-bold tracking-[0.2em] uppercase text-cyan-400 bg-cyan-400/10 rounded-full border border-cyan-400/20"
        >
          Senior Unity Developer
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-600"
        >
          Mudassar Shaheen
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-zinc-400 text-xl md:text-2xl max-w-3xl mx-auto mb-10 font-light leading-relaxed"
        >
          Architecting high-performance gaming experiences across <span className="text-violet-400 font-medium">Hypercasual</span>, <span className="text-cyan-400 font-medium">VR/AR</span>, and <span className="text-zinc-100 font-medium">Steam/PC</span> platforms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-5"
        >
          <a 
            href="#projects"
            className="px-10 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl transition-all glow-violet hover:scale-105 active:scale-95 shadow-lg shadow-violet-900/20"
          >
            Explore Projects
          </a>
          <a 
            href="#contact"
            className="px-10 py-4 bg-transparent border border-zinc-700 hover:border-zinc-500 text-white font-bold rounded-2xl transition-all hover:bg-white/5 active:scale-95"
          >
            Let's Talk
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
