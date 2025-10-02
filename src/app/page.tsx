import type React from "react";
import { getVenueNames } from "@/lib/actions/get-venue-names";
import { MUSIC_BRANDS } from "@/components/ui/brand-logo";
import { HomePageClient } from "@/components/pages/home-page-client";

export default async function HomePage() {
  let venueNames: string[] = [];

  try {
    venueNames = await getVenueNames();
  } catch (error) {
    console.error("Failed to fetch venue names:", error);
    venueNames = [...MUSIC_BRANDS];
  }

  // If no venues found, fallback to music brands
  if (venueNames.length === 0) {
    venueNames = [...MUSIC_BRANDS];
  }

  return <HomePageClient venueNames={venueNames} />;
}
