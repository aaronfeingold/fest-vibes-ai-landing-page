import { Marquee, MarqueeItem } from "@/components/ui/marquee";
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
  return (
    <div id="venue-marquee-wrapper">
      <Marquee
        speed={speed}
        className={`group relative w-full overflow-hidden bg-transparent ${className || ""}`}
      >
        {venueNames.map((name, index) => (
          <MarqueeItem key={`${name}-${index}`}>
            <BrandLogo name={name} />
          </MarqueeItem>
        ))}
      </Marquee>
    </div>
  );
}
