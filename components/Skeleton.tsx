
import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-zinc-800 animate-pulse flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
        <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Loading Media...</span>
      </div>
    </div>
  );
};

export default Skeleton;
