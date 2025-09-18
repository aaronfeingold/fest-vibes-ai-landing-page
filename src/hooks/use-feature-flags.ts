"use client";

import { useEffect, useState } from "react";
import { usePostHog } from "posthog-js/react";

// Define valid values as const assertions for technical/UI flags
const VALID_LOGO_POSITIONS = ["left", "right", "center"] as const;
const VALID_LOGO_TYPES = ["minimal", "standard", "full"] as const;
const VALID_COPY_VARIANTS = ["original", "alternative", "concise"] as const;
const VALID_HERO_LAYOUTS = ["default", "compact", "expanded"] as const;

// Derive types from the const values for technical flags
// assistantName is a marketing string - can be any name marketing wants to test
interface FeatureFlags {
  logoPosition: (typeof VALID_LOGO_POSITIONS)[number];
  mascotVariant: string; // Brand content - can be numbered themes like "summer-1", "neon-2", or simple "1", "2"
  logoType: (typeof VALID_LOGO_TYPES)[number];
  copyVariant: (typeof VALID_COPY_VARIANTS)[number];
  heroLayout: (typeof VALID_HERO_LAYOUTS)[number];
  assistantName: string; // Marketing content - can be any name
}

// Get bootstrap flags from cookie (set by middleware)
function getBootstrapFlags(): Partial<FeatureFlags> {
  if (typeof window === "undefined") return {};

  try {
    const flagsCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("ph_bootstrap_flags="))
      ?.split("=")[1];

    if (!flagsCookie) return {};

    const flags = JSON.parse(decodeURIComponent(flagsCookie));
    return {
      logoPosition: flags["logo-position"] || "left",
      mascotVariant: flags["mascot-variant"] || "1",
      logoType: flags["logo-type"] || "standard",
      copyVariant: flags["copy-variant"] || "original",
      heroLayout: flags["hero-layout"] || "default",
      assistantName: flags["assistant-name"] || "boomy",
    };
  } catch {
    return {};
  }
}

export function useFeatureFlags(): FeatureFlags {
  const [flags, setFlags] = useState<FeatureFlags>(() => ({
    logoPosition: "left",
    mascotVariant: "1",
    logoType: "standard",
    copyVariant: "original",
    heroLayout: "default",
    assistantName: "boomy",
  }));

  const posthog = usePostHog();

  useEffect(() => {
    // Start with bootstrap flags (from middleware)
    const bootstrapFlags = getBootstrapFlags();

    // Get flags from PostHog
    const getPostHogFlag = (flagName: string, defaultValue: string) => {
      try {
        return posthog?.getFeatureFlag(flagName) || defaultValue;
      } catch {
        return defaultValue;
      }
    };

    const validateFlag = <T extends string>(
      value: any,
      validValues: readonly T[],
      defaultValue: T
    ): T => {
      if (typeof value === "string" && validValues.includes(value as T)) {
        return value as T;
      }
      return defaultValue;
    };

    const validateStringFlag = (value: any, defaultValue: string): string => {
      if (typeof value === "string" && value.trim().length > 0) {
        return value.trim();
      }
      return defaultValue;
    };

    setFlags({
      logoPosition: validateFlag(
        getPostHogFlag("logo-position", bootstrapFlags.logoPosition || "left"),
        VALID_LOGO_POSITIONS,
        "left"
      ),
      mascotVariant: validateStringFlag(
        getPostHogFlag("mascot-variant", bootstrapFlags.mascotVariant || "1"),
        "1"
      ),
      logoType: validateFlag(
        getPostHogFlag("logo-type", bootstrapFlags.logoType || "standard"),
        VALID_LOGO_TYPES,
        "standard"
      ),
      copyVariant: validateFlag(
        getPostHogFlag(
          "copy-variant",
          bootstrapFlags.copyVariant || "original"
        ),
        VALID_COPY_VARIANTS,
        "original"
      ),
      heroLayout: validateFlag(
        getPostHogFlag("hero-layout", bootstrapFlags.heroLayout || "default"),
        VALID_HERO_LAYOUTS,
        "default"
      ),
      assistantName: validateStringFlag(
        getPostHogFlag(
          "assistant-name",
          bootstrapFlags.assistantName || "boomy"
        ),
        "boomy"
      ),
    });
  }, [posthog]);

  return flags;
}

// Individual flag hooks for convenience
export function useLogoPosition() {
  const { logoPosition } = useFeatureFlags();
  return logoPosition;
}

export function useCopyVariant() {
  const { copyVariant } = useFeatureFlags();
  return copyVariant;
}

export function useMascotVariant() {
  const { mascotVariant } = useFeatureFlags();
  return mascotVariant;
}

export function useLogoType() {
  const { logoType } = useFeatureFlags();
  return logoType;
}

export function useHeroLayout() {
  const { heroLayout } = useFeatureFlags();
  return heroLayout;
}

export function useAssistantName() {
  const { assistantName } = useFeatureFlags();
  return assistantName;
}
