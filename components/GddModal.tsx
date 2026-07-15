import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZANTHALAR_GDD, GddSection } from '../zanthalarGdd';
import { 
  Compass, 
  RefreshCw, 
  Layers, 
  BookOpen, 
  Cpu, 
  Gamepad2, 
  X, 
  ChevronRight, 
  Server, 
  Terminal, 
  Activity 
} from 'lucide-react';

interface GddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Compass,
  RefreshCw,
  Layers,
  BookOpen,
  Cpu,
  Gamepad2,
  Server,
  Terminal
};

const GddModal: React.FC<GddModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentSection = ZANTHALAR_GDD.find(sec => sec.id === activeTab) || ZANTHALAR_GDD[0];
  const ActiveIcon = iconMap[currentSection.icon] || Compass;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative glass w-full max-w-5xl h-[85vh] md:h-[80vh] rounded-3xl border border-white/10 flex flex-col md:flex-row overflow-hidden shadow-2xl z-10"
        >
          {/* Sidebar / Top Navigation */}
          <div className="w-full md:w-72 bg-zinc-950/40 border-b md:border-b-0 md:border-r border-white/5 flex flex-col">
            {/* Header branding */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono uppercase font-black text-violet-400 tracking-wider">Game Design Spec</span>
                <h3 className="text-lg font-black text-white font-mono tracking-tighter">ZANTHALAR</h3>
              </div>
              
              {/* Close button inside sidebar on mobile */}
              <button 
                onClick={onClose}
                className="md:hidden p-2 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible md:overflow-y-auto p-4 md:p-5 gap-1.5 scrollbar-none whitespace-nowrap">
              {ZANTHALAR_GDD.map((section) => {
                const TabIcon = iconMap[section.icon] || Compass;
                const isActive = activeTab === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 select-none ${
                      isActive 
                        ? 'text-white' 
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeModalTab"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        className="absolute inset-0 bg-violet-600/20 border border-violet-500/30 rounded-xl -z-10"
                      />
                    )}
                    <TabIcon size={16} className={isActive ? 'text-violet-400' : 'text-zinc-500'} />
                    <span>{section.title}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Connection Status Panel (Visual detail) */}
            <div className="hidden md:block mt-auto p-5 border-t border-white/5 bg-zinc-950/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">Socket Server</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-mono">
                Running real-time game loops with authoritative collision & action validation.
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col h-full bg-zinc-950/20 overflow-hidden">
            {/* Topbar close button for desktop */}
            <div className="hidden md:flex justify-end p-4 border-b border-white/5">
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white transition-all hover:rotate-90 duration-300"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Document Details */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth">
              {/* Active Tab Introduction Header */}
              <div className="space-y-3 pb-6 border-b border-white/5">
                <div className="flex items-center gap-3 text-violet-400">
                  <ActiveIcon size={24} />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded">
                    SECTION {ZANTHALAR_GDD.findIndex(s => s.id === activeTab) + 1}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-white leading-none">
                  {currentSection.title}
                </h1>
                <p className="text-zinc-400 text-sm md:text-base font-light">
                  {currentSection.description}
                </p>
              </div>

              {/* Subsections list */}
              <div className="space-y-8">
                {currentSection.subsections.map((sub, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="text-sm font-bold text-zinc-100 font-mono flex items-center gap-2">
                      <span className="text-violet-500">#</span>
                      {sub.title}
                    </h4>
                    
                    {Array.isArray(sub.content) ? (
                      <ul className="space-y-2.5 pl-2">
                        {sub.content.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-3 text-zinc-300 text-sm leading-relaxed">
                            <ChevronRight size={14} className="text-violet-500 mt-1 flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-zinc-300 text-sm leading-relaxed pl-5 border-l border-white/5">
                        {sub.content}
                      </p>
                    )}
                  </div>
                ))}

                {/* Additional custom backend visual callout for backend tab */}
                {activeTab === 'backend' && (
                  <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 border border-white/5 space-y-4">
                    <div className="flex items-center gap-2.5 text-cyan-400">
                      <Activity size={18} />
                      <span className="text-xs font-bold uppercase font-mono tracking-wider">Technical Implementation Stack</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      The game client connects to a standalone high-throughput Node.js application hosting multiple game instances via state-authoritative WebSockets. A binary protocol layer ensures compact frame serialization, handling matches with minimal memory overhead.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {['WebSocket / TCP', 'Authoritative Sync', 'Room Routing', 'Binary Encoding', 'Node.js Cluster'].map((tech) => (
                        <span key={tech} className="px-2 py-1 text-[9px] font-mono font-bold uppercase border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GddModal;
