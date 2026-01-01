
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const SkillCloud: React.FC = () => {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Proficiency</h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="glass p-6 rounded-2xl group border-white/5 hover:border-violet-500/30 transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">{skill.icon}</span>
              <div className="flex-1">
                <h4 className="font-bold text-zinc-100">{skill.name}</h4>
                <div className="w-full bg-zinc-800 h-2 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
              </div>
            </div>
            <p className="text-zinc-500 text-xs font-mono uppercase text-right">
              {skill.proficiency}% Expertise
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillCloud;
