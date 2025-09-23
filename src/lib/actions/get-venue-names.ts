"use server";

import { eq } from "drizzle-orm";
import { venuesDb } from "@/lib/db/venues-db";
import { venues } from "@/lib/db/venues-schema";
import { unstable_cache } from "next/cache";

async function fetchVenueNames(): Promise<string[]> {
  try {
    const venueList = await venuesDb
      .select({ name: venues.name })
      .from(venues)
      .where(eq(venues.isActive, true));

    const venueNames = venueList.map(venue => venue.name);

    // Randomize the order
    for (let i = venueNames.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [venueNames[i], venueNames[j]] = [venueNames[j], venueNames[i]];
    }

    return venueNames;
  } catch (error) {
    console.error("Failed to fetch venue names:", error);
    return [];
  }
}

export const getVenueNames = unstable_cache(
  fetchVenueNames,
  ["venue-names"],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ["venues"],
  }
);