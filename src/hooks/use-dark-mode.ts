"use client";

import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated to prevent SSR mismatch
    setIsHydrated(true);

    // Check if user has a saved preference
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      setIsDarkMode(JSON.parse(saved));
    } else {
      // Default to system preference
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    // Only apply dark mode class after hydration to prevent SSR mismatch
    if (!isHydrated) return;

    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save preference
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode, isHydrated]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return { isDarkMode, toggleDarkMode, isHydrated };
}
