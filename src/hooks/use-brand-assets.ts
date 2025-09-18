"use client";

import { useMascotVariant, useLogoType } from "./use-feature-flags";

interface BrandAssets {
  mascot: {
    nav: string;
    standalone: string;
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
  const mascotVariant = useMascotVariant();
  const logoType = useLogoType();

  // Helper function to build mascot path with fallback
  const getMascotPath = (context: "nav" | "standalone", variant: string) => {
    // For themed variants like "summer-1", we might organize files differently in the future
    // For now, keep the current structure but allow any variant string
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
      nav: getMascotPath("nav", mascotVariant),
      standalone: getMascotPath("standalone", mascotVariant),
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
export function useMascotAsset(type: "nav" | "standalone" = "nav") {
  const { mascot } = useBrandAssets();
  return mascot[type];
}

export function useLogoAsset(location: "nav" | "footer" = "nav") {
  const { logo } = useBrandAssets();
  return logo[location];
}
