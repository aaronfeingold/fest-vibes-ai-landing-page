"use client";

import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";
import { BrandLogo } from "@/components/ui/BrandLogo";

export type Speed = "slow" | "normal" | "fast";

interface VenueMarqueeProps {
  venueNames: string[];
  speed?: Speed;
  className?: string;
}

const speedMap: Record<Speed, number> = {
  slow: 30,
  normal: 40,
  fast: 50,
} as const;

export const VenueMarquee = ({
  venueNames,
  speed = "slow",
  className,
}: VenueMarqueeProps) => (
  <Marquee className={className}>
    <MarqueeContent speed={speedMap[speed]}>
      {venueNames.map((name, index) => (
        <MarqueeItem
          key={`${name}-${index}`}
          className="h-12 md:h-16 grayscale transition-all duration-300 hover:grayscale-0"
        >
          <BrandLogo name={name} />
        </MarqueeItem>
      ))}
    </MarqueeContent>
  </Marquee>
);

