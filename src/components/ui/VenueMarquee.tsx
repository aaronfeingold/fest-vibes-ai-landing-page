"use client";

import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface VenueMarqueeProps {
  venueNames: string[];
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export function VenueMarquee({
  venueNames,
  speed = "slow",
  className,
}: VenueMarqueeProps) {
  const speedMap = {
    slow: 30,
    normal: 40,
    fast: 50,
  };

  return (
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
}
