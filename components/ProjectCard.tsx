
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import Skeleton from './Skeleton';
import { Play, ExternalLink, Video } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Derive the best embed URL and thumbnail
  const { embedUrl, thumbnailUrl } = useMemo(() => {
    let url = project.videoUrl;
    let thumb = '';

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // Extract ID to build a clean embed
      const idMatch = url.match(/(?:embed\/|v=|v\/|vi\/|youtu\.be\/|\/v\/|shorts\/)([^#&?]*).*/);
      const videoId = idMatch && idMatch[1].length === 11 ? idMatch[1] : null;
      
      if (videoId) {
        // IMPORTANT: We REMOVE enablejsapi and origin to bypass Error 153.
        // Using standard youtube.com as nocookie sometimes has tighter restrictions in previews.
        url = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=1`;
        thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } else if (url.includes('drive.google.com')) {
      // Ensure drive links always use the preview endpoint
      url = url.replace(/\/view.*/, '/preview').replace(/\/edit.*/, '/preview');
    }

    return { embedUrl: url, thumbnailUrl: thumb };
  }, [project.videoUrl]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col glass rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]"
    >
      {/* Media Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-zinc-950">
        {!isVideoLoaded && showVideo && <Skeleton />}
        
        {showVideo ? (
          <iframe
            src={embedUrl}
            className={`w-full h-full transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            // Add sandbox to allow necessary scripts while preventing top-level navigation issues
            sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation"
            // Use no-referrer to bypass domain-based security checks that cause Error 153
            referrerPolicy="no-referrer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            onLoad={() => setIsVideoLoaded(true)}
            title={project.title}
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <div className="relative w-full h-full group/preview cursor-pointer" onClick={() => setShowVideo(true)}>
            {thumbnailUrl ? (
              <img 
                src={thumbnailUrl} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = thumbnailUrl.replace('maxresdefault', 'hqdefault');
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-700">
                <Video size={48} strokeWidth={1} />
                <span className="text-[10px] mt-2 font-mono uppercase">Preview available</span>
              </div>
            )}
            
            {/* Click to Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center text-white shadow-2xl glow-violet group-hover:bg-violet-500">
                <Play fill="currentColor" size={24} className="ml-1" />
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2 pointer-events-none z-10">
           <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-violet-600/90 backdrop-blur-md text-white rounded-md shadow-lg">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-zinc-900/50 to-zinc-950/80">
        <h3 className="text-xl font-black mb-2 text-white group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-[10px] font-bold uppercase border border-zinc-800 rounded-md text-zinc-500 bg-zinc-900/50"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-3">
          <button
            onClick={() => setShowVideo(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-xl transition-all active:scale-95 text-xs tracking-widest uppercase shadow-lg shadow-violet-900/20"
          >
            <Play size={14} fill="currentColor" />
            {showVideo ? 'Now Playing' : 'Play Demo'}
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
