"use client";

import { useMascotVariant, useLogoType, useNavMascotVariant, useNoBackgroundMascotVariant } from "./use-feature-flags";

interface BrandAssets {
  mascot: {
    nav: string;
    noBackground: string;
  };
  logo: {
    nav: string;
    footer: string;
  };
}

/**
 * Hook to get current brand assets based on feature flags
 * Handles both numeric variants (1, 2, 3) and themed variants (summer-1, neon-2)
 * Falls back to variant "1" if the specified variant doesn't exist
 */
export function useBrandAssets(): BrandAssets {
  const noBackgroundMascotVariant = useNoBackgroundMascotVariant();
  const logoType = useLogoType();

  // Helper function to build mascot path with fallback
  const getMascotPath = (context: "nav" | "no-background", variant: string, navVariant?: string) => {
    if (context === "nav" && navVariant) {
      // Use A/B directory structure for nav mascots: /mascots/nav/A/mascot-1.png
      return `/mascots/${context}/${navVariant}/mascot-${variant}.png`;
    }
    // For no-background, use direct structure: /mascots/no-background/mascot-1.png
    return `/mascots/${context}/mascot-${variant}.png`;
  };

  // Helper function to build logo path based on type and context
  const getLogoPath = (context: "nav" | "footer", type: string) => {
    if (context === "nav") {
      return `/logos/nav/logo-${type}-1.png`;
    }
    // Footer uses "full" type regardless of the logoType setting for brand consistency
    return `/logos/footer/logo-full-1.png`;
  };

  return {
    mascot: {
      nav: getMascotPath("no-background", noBackgroundMascotVariant),
      noBackground: getMascotPath("no-background", noBackgroundMascotVariant),
    },
    logo: {
      nav: getLogoPath("nav", logoType),
      footer: getLogoPath("footer", logoType),
    },
  };
}

/**
 * Individual hooks for specific use cases
 */
export function useMascotAsset(type: "nav" | "noBackground" = "nav") {
  const { mascot } = useBrandAssets();
  return mascot[type];
}

export function useLogoAsset(location: "nav" | "footer" = "nav") {
  const { logo } = useBrandAssets();
  return logo[location];
}

/**
 * Hook to get all available no-background mascot images
 * Useful for parallax sections where multiple mascots may be displayed
 */
export function useNoBackgroundMascots(): string[] {
  // Return the known files based on the current structure
  const availableMascots = [
    "/mascots/no-background/mascot-1.png",
    "/mascots/no-background/mascot-2.png",
    "/mascots/no-background/mascot-3.png"
  ];

  return availableMascots;
}
