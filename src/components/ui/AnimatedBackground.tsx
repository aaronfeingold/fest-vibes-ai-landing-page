import type React from "react";

export function AnimatedBackground() {
  return (
    <div
      id="background-elements"
      className="fixed inset-0 overflow-hidden pointer-events-none"
    >
      {/* Main Aura Orbs - Large glowing spheres */}
      <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-festival-purple-500/20 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-festival-pink-500/15 rounded-full blur-3xl animate-float-medium"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-festival-purple-400/25 rounded-full blur-3xl animate-float-fast"></div>

      {/* Secondary Aura Effects - Medium sized */}
      <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-festival-purple-900/30 rounded-full blur-2xl animate-float-medium" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-festival-pink-400/20 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '4s' }}></div>

      {/* Accent Glows - Smaller atmospheric effects */}
      <div className="absolute top-1/6 left-2/3 w-32 h-32 bg-stage-sky/25 rounded-full blur-xl animate-float-fast" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 right-1/6 w-40 h-40 bg-festival-purple-500/15 rounded-full blur-xl animate-float-medium" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-3/4 left-1/6 w-36 h-36 bg-festival-pink-500/20 rounded-full blur-xl animate-float-slow" style={{ animationDelay: '5s' }}></div>

      {/* Subtle Background Texture - Very large, very subtle */}
      <div className="absolute -top-1/4 -left-1/4 w-screen h-screen bg-festival-purple-900/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-screen h-screen bg-festival-slate-900/10 rounded-full blur-3xl"></div>
    </div>
  );
}