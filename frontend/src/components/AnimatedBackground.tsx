import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Multi-Colored Vibrant Animated Glowing Orbs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/30 to-cyan-400/30 dark:from-blue-600/20 dark:to-cyan-400/20 rounded-full blur-3xl animate-blob" />
      
      <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-fuchsia-500/25 to-purple-600/25 dark:from-fuchsia-500/15 dark:to-purple-600/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
      
      <div className="absolute -bottom-40 left-1/4 w-[550px] h-[550px] bg-gradient-to-tr from-emerald-500/25 to-teal-400/25 dark:from-emerald-500/15 dark:to-teal-400/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
      
      <div className="absolute top-2/3 right-1/3 w-[450px] h-[450px] bg-gradient-to-tl from-amber-500/25 to-rose-500/25 dark:from-amber-500/15 dark:to-rose-500/15 rounded-full blur-3xl animate-pulse-slow" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-violet-600/15 via-pink-500/15 to-amber-400/15 rounded-full blur-3xl animate-blob animation-delay-1500" />

      {/* 2. Cybernetic Multi-Color Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(to right, #8b5cf6 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '4.5rem 4.5rem',
          maskImage: 'radial-gradient(ellipse 90% 60% at 50% 50%, #000 80%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 60% at 50% 50%, #000 80%, transparent 100%)'
        }}
      />

      {/* 3. Floating Colorful Geometric Traffic Sign Silhouettes */}
      <div className="absolute inset-0 overflow-hidden opacity-25 dark:opacity-30">
        {/* Cyan Warning Triangle Silhouette */}
        <div className="absolute top-1/4 left-[8%] animate-float text-cyan-500/50 dark:text-cyan-400/40 transform -rotate-12 drop-shadow-[0_0_10px_#06b6d4]">
          <svg className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Rose/Red Stop Octagon Silhouette */}
        <div className="absolute top-3/4 right-[12%] animate-float animation-delay-3000 text-rose-500/50 dark:text-rose-400/40 transform rotate-12 drop-shadow-[0_0_10px_#f43f5e]">
          <svg className="w-24 h-24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z" />
          </svg>
        </div>

        {/* Emerald Green Speed Limit Circle Silhouette */}
        <div className="absolute bottom-1/5 left-[18%] animate-float animation-delay-1500 text-emerald-500/50 dark:text-emerald-400/40 drop-shadow-[0_0_10px_#10b981]">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 9h4v6m-4 0h4" />
          </svg>
        </div>

        {/* Amber Gold Priority Diamond Silhouette */}
        <div className="absolute top-1/3 right-[22%] animate-float animation-delay-4000 text-amber-500/50 dark:text-amber-400/40 transform rotate-45 drop-shadow-[0_0_10px_#f59e0b]">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        </div>

        {/* Violet Direction Arrow Silhouette */}
        <div className="absolute top-1/2 left-[30%] animate-float animation-delay-2000 text-purple-500/40 dark:text-purple-400/30 transform -rotate-45 drop-shadow-[0_0_10px_#a855f7]">
          <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
          </svg>
        </div>
      </div>
    </div>
  );
};
