import type React from "react";
import { getVenueNames } from "@/lib/actions/get-venue-names";
import { MUSIC_BRANDS } from "@/ui";
import { SplashPage } from "@/splash/SplashPage";
import { loadContentData } from "@/lib/content-loader";

export default async function RootPage() {
  let venueNames: string[] = [];
  const contentData = await loadContentData();

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

  return <SplashPage venueNames={venueNames} contentData={contentData} />;
}
