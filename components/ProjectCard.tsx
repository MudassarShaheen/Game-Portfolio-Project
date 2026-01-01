
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import Skeleton from './Skeleton';
import { Play, ExternalLink, Video, Box } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Advanced parser for various video sources
  const { embedUrl, thumbnailUrl } = useMemo(() => {
    let url = project.videoUrl;
    let thumb = '';

    // Handle YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // Improved regex to handle /embed/, /watch?v=, /shorts/, etc.
      const idMatch = url.match(/(?:embed\/|v=|v\/|vi\/|youtu\.be\/|\/v\/|shorts\/|watch\?v=)([^#&?]*).*/);
      const videoId = idMatch && idMatch[1].length === 11 ? idMatch[1] : null;
      
      if (videoId) {
        url = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&mute=0`;
        // YouTube provides several thumbnail qualities
        thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } 
    // Handle Google Drive
    else if (url.includes('drive.google.com')) {
      // Extract File ID
      const driveIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      const driveId = driveIdMatch ? driveIdMatch[1] : null;

      if (driveId) {
        url = `https://drive.google.com/file/d/${driveId}/preview`;
        // Public thumbnail service for Google Drive files
        thumb = `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`;
      }
    }

    return { embedUrl: url, thumbnailUrl: thumb };
  }, [project.videoUrl]);

  const handlePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying(true);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true }}
      className="group relative flex flex-col glass rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]"
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
              onClick={() => handlePlay()}
            >
              {/* Poster Image */}
              <div className="relative w-full h-full">
                {thumbnailUrl ? (
                  <img 
                    src={thumbnailUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      if (thumbnailUrl.includes('maxresdefault')) {
                        // Fallback to high quality if maxres is missing (common for older YT videos)
                        img.src = thumbnailUrl.replace('maxresdefault', 'hqdefault');
                      } else {
                        // If it's a Drive thumbnail failure or secondary YT failure, hide and show icon
                        img.parentElement?.classList.add('bg-zinc-900');
                        img.style.display = 'none';
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950">
                    <Video size={48} className="text-zinc-800" />
                  </div>
                )}
                
                {/* Visual Polish Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 bg-violet-600/5 group-hover:bg-violet-600/0 transition-colors duration-500" />
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center text-white shadow-2xl transition-all duration-300 group-hover:scale-115 group-hover:bg-violet-500 glow-violet">
                  <Play fill="currentColor" size={24} className="ml-1" />
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 flex gap-2 pointer-events-none">
                <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-violet-600/90 backdrop-blur-md text-white rounded-md shadow-lg border border-white/10">
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
      <div className="p-6 flex flex-col flex-grow bg-zinc-900/50">
        <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors mb-2">
          {project.title}
        </h3>
        
        <p className="text-zinc-400 text-sm mb-6 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[9px] font-bold uppercase border border-zinc-800 rounded-md text-zinc-500 bg-zinc-900/80"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-3">
          <button
            onClick={() => handlePlay()}
            disabled={isPlaying}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-black rounded-xl transition-all active:scale-95 text-[10px] tracking-widest uppercase shadow-lg ${
              isPlaying 
                ? 'bg-zinc-800 text-zinc-500 cursor-default' 
                : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-900/20'
            }`}
          >
            <Play size={14} fill="currentColor" />
            {isPlaying ? 'Streaming Demo' : 'Watch Demo'}
          </button>
          <a
            href={project.videoUrl.replace('/embed/', '/watch?v=').replace('/preview', '')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 rounded-xl border border-zinc-800 transition-all active:scale-95 group"
            title="Open Original Source"
          >
            <ExternalLink size={16} className="group-hover:text-cyan-400 transition-colors" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
