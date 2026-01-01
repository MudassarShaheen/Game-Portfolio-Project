
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import Skeleton from './Skeleton';
import { Play, ExternalLink, Video } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { embedUrl, thumbnailUrl } = useMemo(() => {
    let url = project.videoUrl;
    let thumb = '';

    // Robust YouTube ID extraction
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    const videoId = ytMatch ? ytMatch[1] : null;

    if (videoId) {
      // Use nocookie domain for better privacy and fewer blockages
      url = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      // Start with max resolution, fallback handled in img onError
      thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    } 
    else if (url.includes('drive.google.com')) {
      const driveIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      const driveId = driveIdMatch ? driveIdMatch[1] : null;

      if (driveId) {
        url = `https://drive.google.com/file/d/${driveId}/preview`;
        // Reliable thumbnail endpoint for public Drive files
        thumb = `https://drive.google.com/thumbnail?id=${driveId}&sz=w1280`;
      }
    }

    return { embedUrl: url, thumbnailUrl: thumb };
  }, [project.videoUrl]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true }}
      className="group relative flex flex-col glass rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500/50 transition-all duration-500"
    >
      {/* Media Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-zinc-950">
        <AnimatePresence mode="wait">
          {!isPlaying ? (
            <motion.div 
              key="poster"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              {thumbnailUrl ? (
                <img 
                  src={thumbnailUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (img.src.includes('maxresdefault')) {
                      // Some videos don't have maxres, fallback to hq
                      img.src = img.src.replace('maxresdefault', 'hqdefault');
                    } else {
                      // Total failure fallback
                      img.style.display = 'none';
                      if (img.parentElement) img.parentElement.classList.add('bg-zinc-900');
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                  <Video size={48} className="text-zinc-700" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-110 glow-violet">
                  <Play fill="currentColor" size={20} className="ml-1" />
                </div>
              </div>

              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 text-[9px] font-black uppercase tracking-widest bg-violet-600 text-white rounded shadow-lg">
                  {project.category}
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="player"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-0 bg-black"
            >
              {!isVideoLoaded && <Skeleton />}
              <iframe
                src={embedUrl}
                className={`w-full h-full transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                onLoad={() => setIsVideoLoaded(true)}
                title={project.title}
                frameBorder="0"
                allowFullScreen
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-zinc-500 text-xs mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-2 py-0.5 text-[8px] font-bold uppercase border border-zinc-800 rounded text-zinc-500 bg-zinc-900/50">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-2">
          <button
            onClick={() => setIsPlaying(true)}
            disabled={isPlaying}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 font-bold rounded-lg transition-all text-[10px] uppercase tracking-wider ${
              isPlaying 
                ? 'bg-zinc-800 text-zinc-500' 
                : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/20'
            }`}
          >
            <Play size={12} fill="currentColor" />
            {isPlaying ? 'Playing...' : 'Watch Demo'}
          </button>
          <a
            href={project.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg border border-zinc-800 transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
