"use client";

import React from "react";

interface PageLoaderProps {
  isLoading: boolean;
}

export function PageLoader({ isLoading }: PageLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-gradient-br">
      {/* Background aura effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-festival-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-festival-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Spinning mascot loader - only mascot-3 */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 animate-spin-slow">
          <img
            src="/mascots/no-background/mascot-3.png"
            alt="Loading..."
            className="w-full h-full object-contain"
          />
        </div>

        {/* Loading text */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Loading Fest Vibes
          </h2>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-festival-purple-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-festival-pink-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-festival-purple-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}