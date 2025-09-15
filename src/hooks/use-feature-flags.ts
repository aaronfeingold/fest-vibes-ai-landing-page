"use client";

import { useEffect, useState } from "react";
import { useFeatureFlagEnabled } from "posthog-js/react";

interface FeatureFlags {
  logoPosition: "left" | "right" | "center";
  mascotVariant: "1" | "2" | "3";
  logoType: "minimal" | "standard" | "full";
  copyVariant: "original" | "alternative" | "concise";
  heroLayout: "default" | "compact" | "expanded";
  assistantName: "boomy" | "bumi";
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

  // Get flags from PostHog (will override bootstrap once loaded)
  const logoPositionFlag = useFeatureFlagEnabled("logo-position");
  const mascotVariantFlag = useFeatureFlagEnabled("mascot-variant");
  const logoTypeFlag = useFeatureFlagEnabled("logo-type");
  const copyVariantFlag = useFeatureFlagEnabled("copy-variant");
  const heroLayoutFlag = useFeatureFlagEnabled("hero-layout");
  const assistantNameFlag = useFeatureFlagEnabled("assistant-name");

  useEffect(() => {
    // Start with bootstrap flags (from middleware)
    const bootstrapFlags = getBootstrapFlags();

    setFlags((prev) => ({
      logoPosition:
        (bootstrapFlags.logoPosition as "left" | "right" | "center") ||
        prev.logoPosition,
      mascotVariant:
        (bootstrapFlags.mascotVariant as "1" | "2" | "3") || prev.mascotVariant,
      logoType:
        (bootstrapFlags.logoType as "minimal" | "standard" | "full") ||
        prev.logoType,
      copyVariant:
        (bootstrapFlags.copyVariant as
          | "original"
          | "alternative"
          | "concise") || prev.copyVariant,
      heroLayout:
        (bootstrapFlags.heroLayout as "default" | "compact" | "expanded") ||
        prev.heroLayout,
      assistantName:
        (bootstrapFlags.assistantName as "boomy" | "bumi") ||
        prev.assistantName,
    }));
  }, []);

  // Update with PostHog flags when available
  useEffect(() => {
    if (logoPositionFlag !== undefined) {
      setFlags((prev) => ({
        ...prev,
        logoPosition: logoPositionFlag as "left" | "right" | "center",
      }));
    }
  }, [logoPositionFlag]);

  useEffect(() => {
    if (mascotVariantFlag !== undefined) {
      setFlags((prev) => ({
        ...prev,
        mascotVariant: mascotVariantFlag as "1" | "2" | "3",
      }));
    }
  }, [mascotVariantFlag]);

  useEffect(() => {
    if (logoTypeFlag !== undefined) {
      setFlags((prev) => ({
        ...prev,
        logoType: logoTypeFlag as "minimal" | "standard" | "full",
      }));
    }
  }, [logoTypeFlag]);

  useEffect(() => {
    if (copyVariantFlag !== undefined) {
      setFlags((prev) => ({
        ...prev,
        copyVariant: copyVariantFlag as "original" | "alternative" | "concise",
      }));
    }
  }, [copyVariantFlag]);

  useEffect(() => {
    if (heroLayoutFlag !== undefined) {
      setFlags((prev) => ({
        ...prev,
        heroLayout: heroLayoutFlag as "default" | "compact" | "expanded",
      }));
    }
  }, [heroLayoutFlag]);

  useEffect(() => {
    if (assistantNameFlag !== undefined) {
      setFlags((prev) => ({
        ...prev,
        assistantName: assistantNameFlag as "boomy" | "bumi",
      }));
    }
  }, [assistantNameFlag]);

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
