"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import {
  useLogoPosition,
  useLogoVariant,
  useAssistantName,
} from "@/hooks/use-feature-flags";
import { useDarkMode } from "@/hooks/use-dark-mode";

interface ABTestNavigationProps {
  onBoomyClick: () => void;
  onJoinBetaClick: () => void;
}

export function ABTestNavigation({
  onBoomyClick,
  onJoinBetaClick,
}: ABTestNavigationProps) {
  const logoPosition = useLogoPosition();
  const logoVariant = useLogoVariant();
  const assistantName = useAssistantName();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMobileMenu && !(event.target as Element).closest("nav")) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMobileMenu]);

  // Handle hamburger menu click (mobile only)
  const handleMenuClick = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Handle Boomy click - always show vibes animation (easter egg)
  const handleBoomyClick = () => {
    onBoomyClick(); // Show vibes animation
  };

  // Mascot component (just the mascot)
  const MascotComponent = () => (
    <button
      onClick={onBoomyClick}
      className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-lg"
    >
      <img
        src="/mascots/nav/mascot-nav.png"
        alt={`${assistantName.charAt(0).toUpperCase() + assistantName.slice(1)} the Cat`}
        className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-lg object-cover"
      />
    </button>
  );

  // Logo component (desktop - includes both mascot and logo)
  const LogoComponent = () => (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <MascotComponent />
      <img
        src="/logos/nav/nav-logo.png"
        alt="Fest Vibes Logo"
        className="h-20 sm:h-24 md:h-28 w-auto object-contain transition-transform hover:scale-105"
      />
    </div>
  );

  // Mobile dropdown menu
  const MobileMenu = () => (
    <div
      className={`absolute top-full left-0 right-0 bg-festival-slate-900/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-slate-600 dark:border-gray-600 shadow-xl transition-all duration-300 ${showMobileMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
    >
      <div className="px-6 py-4 space-y-4">
        <a
          href="#features"
          onClick={() => setShowMobileMenu(false)}
          className="block text-gray-300 hover:text-white transition-colors text-lg py-2"
        >
          Features
        </a>
        <a
          href="#demo"
          onClick={() => setShowMobileMenu(false)}
          className="block text-gray-300 hover:text-white transition-colors text-lg py-2"
        >
          Demo
        </a>
        <a
          href="#analytics"
          onClick={() => setShowMobileMenu(false)}
          className="block text-gray-300 hover:text-white transition-colors text-lg py-2"
        >
          Analytics
        </a>
        <button
          onClick={() => {
            setShowMobileMenu(false);
            toggleDarkMode();
          }}
          className="flex items-center text-gray-300 hover:text-white transition-colors text-lg py-2 w-full"
        >
          <span className="mr-2">Vibes</span>
          {isDarkMode ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
        <Button
          onClick={() => {
            setShowMobileMenu(false);
            onJoinBetaClick();
          }}
          className="w-full bg-brand-gradient hover:from-festival-purple-500 hover:to-festival-pink-500 mt-4"
        >
          Join the Waitlist
        </Button>
      </div>
    </div>
  );

  // Navigation links component (desktop only)
  const NavLinks = () => (
    <div className="hidden md:flex items-center space-x-8">
      <a
        href="#features"
        className="text-gray-300 hover:text-white transition-colors"
      >
        Features
      </a>
      <a
        href="#demo"
        className="text-gray-300 hover:text-white transition-colors"
      >
        Demo
      </a>
      <a
        href="#analytics"
        className="text-gray-300 hover:text-white transition-colors"
      >
        Analytics
      </a>
      <button
        onClick={toggleDarkMode}
        className="flex items-center text-gray-300 hover:text-white transition-colors"
      >
        <span className="mr-2">Vibes</span>
        {isDarkMode ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </button>
      <Button
        onClick={onJoinBetaClick}
        className="bg-brand-gradient hover:from-festival-purple-500 hover:to-festival-pink-500"
      >
        Join the Waitlist
      </Button>
    </div>
  );

  // Hamburger menu button component
  const HamburgerButton = () => (
    <button
      onClick={handleMenuClick}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800/50 dark:bg-gray-800/50 border border-slate-600 dark:border-gray-600 hover:bg-slate-700/50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
      aria-label="Toggle navigation menu"
    >
      {showMobileMenu ? (
        <X className="w-5 h-5 text-white" />
      ) : (
        <Menu className="w-5 h-5 text-white" />
      )}
    </button>
  );

  // Mobile Logo component (mobile version - just the text logo, centered)
  const MobileLogoComponent = () => (
    <img
      src="/logos/nav/nav-logo.png"
      alt="Fest Vibes Logo"
      className="h-24 sm:h-28 md:h-32 w-auto object-contain transition-transform hover:scale-105"
    />
  );

  // Mobile layout with centered logo and A/B testing for mascot/hamburger positions
  const MobileLayout = () => {
    if (logoPosition === "right") {
      // A/B Test Variant: Hamburger on left, centered logo, mascot on right
      return (
        <nav className="relative z-10 md:hidden w-full">
          <div className="flex items-center justify-between w-full p-6">
            <HamburgerButton />
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <MobileLogoComponent />
            </div>
            <MascotComponent />
          </div>
          <MobileMenu />
        </nav>
      );
    }

    // Default: Mascot on left, centered logo, hamburger on right
    return (
      <nav className="relative z-10 md:hidden w-full">
        <div className="flex items-center justify-between w-full p-6">
          <MascotComponent />
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <MobileLogoComponent />
          </div>
          <HamburgerButton />
        </div>
        <MobileMenu />
      </nav>
    );
  };

  // Desktop layout (based on A/B test)
  const DesktopLayout = () => {
    if (logoPosition === "right") {
      return (
        <nav className="hidden md:flex items-center justify-between p-6 lg:px-8">
          <NavLinks />
          <LogoComponent />
        </nav>
      );
    }

    if (logoPosition === "center") {
      return (
        <nav className="hidden md:flex flex-col items-center p-6 lg:px-8 space-y-4">
          <LogoComponent />
          <NavLinks />
        </nav>
      );
    }

    // Default: left position
    return (
      <nav className="hidden md:flex items-center justify-between p-6 lg:px-8">
        <LogoComponent />
        <NavLinks />
      </nav>
    );
  };

  return (
    <>
      <MobileLayout />
      <DesktopLayout />
    </>
  );
}
