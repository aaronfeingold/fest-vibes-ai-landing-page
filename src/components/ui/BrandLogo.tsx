"use client";

import React from "react";

interface BrandLogoProps {
  name: string;
  className?: string;
}

export function BrandLogo({ name, className = "" }: BrandLogoProps) {
  return (
    <div
      className={`h-auto max-h-8 w-auto max-w-full object-contain md:max-h-10 flex items-center justify-center ${className}`}
    >
      <span className="text-gray-400 font-bold text-sm md:text-base uppercase tracking-wider">
        {name}
      </span>
    </div>
  );
}

// Predefined music industry brands for the marquee
export const MUSIC_BRANDS = [
  "Spotify",
  "Apple Music",
  "SoundCloud",
  "Bandcamp",
  "Coachella",
  "Lollapalooza",
  "Bonnaroo",
  "SXSW",
  "Rolling Stone",
  "Pitchfork",
  "Billboard",
  "Variety"
] as const;