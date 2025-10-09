"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useCircularTransition } from "./use-circular-transition";

export function useDarkMode() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const { toggleTheme: circularToggle } = useCircularTransition();

  // Track mounted state for SSR safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine current theme (resolving "system" to actual theme)
  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const isDarkMode = resolvedTheme === "dark";

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  const toggleDarkModeWithTransition = (event: React.MouseEvent) => {
    circularToggle(event, () => {
      setTheme(isDarkMode ? "light" : "dark");
    });
  };

  return {
    isDarkMode,
    toggleDarkMode,
    toggleDarkModeWithTransition,
    isHydrated: mounted,
  };
}
