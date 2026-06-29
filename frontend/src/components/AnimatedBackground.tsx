import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Animated Glowing Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/15 dark:bg-blue-600/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-500/15 dark:bg-purple-600/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-600/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl animate-pulse-slow" />

      {/* 2. Cybernetic Road Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 70%, transparent 100%)'
        }}
      />

      {/* 3. Floating Geometric Traffic Sign Silhouettes */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-15">
        {/* Warning Triangle Silhouette */}
        <div className="absolute top-1/4 left-[10%] animate-float text-blue-500/30 dark:text-blue-400/20 transform -rotate-12">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Stop Octagon Silhouette */}
        <div className="absolute top-2/3 right-[15%] animate-float animation-delay-3000 text-red-500/25 dark:text-red-400/15 transform rotate-12">
          <svg className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z" />
          </svg>
        </div>

        {/* Speed Limit Circle Silhouette */}
        <div className="absolute bottom-1/4 left-[20%] animate-float animation-delay-1500 text-indigo-500/25 dark:text-indigo-400/15">
          <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 9h4v6m-4 0h4" />
          </svg>
        </div>

        {/* Priority Diamond Silhouette */}
        <div className="absolute top-1/3 right-[25%] animate-float animation-delay-4000 text-amber-500/25 dark:text-amber-400/15 transform rotate-45">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        </div>
      </div>
    </div>
  );
};
