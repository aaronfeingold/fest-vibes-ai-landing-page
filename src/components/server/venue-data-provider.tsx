import { getVenueNames } from "@/lib/actions/get-venue-names";
import { MUSIC_BRANDS } from "@/components/ui/brand-logo";

interface VenueDataProviderProps {
  children: (venueNames: string[]) => React.ReactNode;
}

export async function VenueDataProvider({ children }: VenueDataProviderProps) {
  let venueNames: string[] = [];

  try {
    venueNames = await getVenueNames();
  } catch (error) {
    console.error("Failed to fetch venue names:", error);
    venueNames = [...MUSIC_BRANDS]; // Fallback to static brands
  }

  // If no venues found, fallback to music brands
  if (venueNames.length === 0) {
    venueNames = [...MUSIC_BRANDS];
  }

  return <>{children(venueNames)}</>;
}