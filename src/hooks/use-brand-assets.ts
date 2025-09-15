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
 * Makes it easy to drop new assets and A/B test them
 */
export function useBrandAssets(): BrandAssets {
  const mascotVariant = useMascotVariant();
  const logoType = useLogoType();

  return {
    mascot: {
      nav: `/mascots/nav/mascot-${mascotVariant}.png`,
      standalone: `/mascots/standalone/mascot-${mascotVariant}.png`,
    },
    logo: {
      nav: `/logos/nav/logo-${logoType}-${mascotVariant}.png`,
      footer: `/logos/footer/logo-${logoType}-${mascotVariant}.png`,
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
