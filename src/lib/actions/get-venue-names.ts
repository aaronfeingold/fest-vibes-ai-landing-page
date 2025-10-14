"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/v0-db";
import { venues } from "@/lib/db/v0-schema";
import { unstable_cache } from "next/cache";

function normalizeVenueName(name: string): string {
  // Handle cases like "venue, the" -> "the venue"
  const commaPattern = /^(.+),\s*(the|a|an)$/i;
  const match = name.match(commaPattern);

  if (match) {
    const [, mainPart, article] = match;
    return `${article.toLowerCase()} ${mainPart.trim()}`;
  }

  return name;
}

async function fetchVenueNames(): Promise<string[]> {
  try {
    // Get venue names and normalize them in one chain
    const normalizedNames = await db
      .select({ name: venues.name })
      .from(venues)
      .where(eq(venues.isActive, true))
      .limit(100)
      .then((rows) => rows.map((row) => normalizeVenueName(row.name)));

    // Randomize the order
    for (let i = normalizedNames.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [normalizedNames[i], normalizedNames[j]] = [
        normalizedNames[j],
        normalizedNames[i],
      ];
    }

    return normalizedNames;
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
