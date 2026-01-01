
import React from 'react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="border-t border-zinc-900 bg-zinc-950 py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-center md:text-left">
          <div className="text-3xl font-black bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent mb-3">
            MS_DEVELOPER
          </div>
          <p className="text-zinc-500 text-base max-w-xs">Mastering the art of game development through code and creativity.</p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <span className="text-zinc-400 font-mono text-sm">CONNECT_WITH_ME</span>
          <div className="flex gap-4">
            <a 
              href={SOCIAL_LINKS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-zinc-900 rounded-2xl hover:text-violet-500 transition-all border border-zinc-800 hover:border-violet-500/50 hover:-translate-y-1 shadow-xl"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href={SOCIAL_LINKS.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-zinc-900 rounded-2xl hover:text-cyan-500 transition-all border border-zinc-800 hover:border-cyan-500/50 hover:-translate-y-1 shadow-xl"
            >
              <Github size={24} />
            </a>
            <a 
              href={`mailto:${SOCIAL_LINKS.email}`} 
              className="p-4 bg-zinc-900 rounded-2xl hover:text-violet-500 transition-all border border-zinc-800 hover:border-violet-500/50 hover:-translate-y-1 shadow-xl"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
        © 2026 Mudassar Shaheen. Built with React & Tailwind. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
