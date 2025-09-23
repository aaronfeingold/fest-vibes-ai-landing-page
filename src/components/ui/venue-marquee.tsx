import { Marquee, MarqueeItem } from "@/components/ui/marquee";
import { BrandLogo, MUSIC_BRANDS } from "@/components/ui/brand-logo";
import { getVenueNames } from "@/lib/actions/get-venue-names";

async function DynamicMarqueeContent() {
  try {
    const venueNames = await getVenueNames();

    // If we have venue names, use them; otherwise fall back to music brands
    const displayItems = venueNames.length > 0 ? venueNames : MUSIC_BRANDS;

    return (
      <>
        {displayItems.map((name, index) => (
          <MarqueeItem key={`${name}-${index}`}>
            <BrandLogo name={name} />
          </MarqueeItem>
        ))}
      </>
    );
  } catch (error) {
    console.error("Error loading venue names:", error);
    // Fallback to static music brands
    return (
      <>
        {MUSIC_BRANDS.map((brand) => (
          <MarqueeItem key={brand}>
            <BrandLogo name={brand} />
          </MarqueeItem>
        ))}
      </>
    );
  }
}

function FallbackMarqueeContent() {
  return (
    <>
      {MUSIC_BRANDS.map((brand) => (
        <MarqueeItem key={brand}>
          <BrandLogo name={brand} />
        </MarqueeItem>
      ))}
    </>
  );
}

interface VenueMarqueeProps {
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export function VenueMarquee({ speed = "slow", className }: VenueMarqueeProps) {
  return (
    <Marquee
      speed={speed}
      className={`group relative w-full overflow-hidden bg-transparent ${className || ""}`}
    >
      <DynamicMarqueeContent />
    </Marquee>
  );
}