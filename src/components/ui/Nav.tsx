"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useLogoPosition, useAssistantName } from "@/hooks/use-feature-flags";
import { useMascotAsset, useLogoAsset } from "@/hooks/use-brand-assets";
import { useDarkMode } from "@/hooks/use-dark-mode";

interface NavProps {
  onMascotClick: () => void;
  onJoinBetaClick: () => void;
}

export function Nav({ onMascotClick, onJoinBetaClick }: NavProps) {
  const logoPosition = useLogoPosition();
  const assistantName = useAssistantName();
  const mascotAsset = useMascotAsset("nav");
  const logoAsset = useLogoAsset("nav");
  const { isDarkMode, toggleDarkModeWithTransition, isHydrated } =
    useDarkMode();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Shared navigation items
  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#demo", label: "Demo" },
    { href: "#analytics", label: "Analytics" },
  ];

  // Check if we're on mobile and track scroll position
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    checkMobile();
    handleScroll();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
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

  // Handle smooth scrolling to sections with header offset
  const handleSmoothScroll = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        // Calculate header height dynamically - use more reliable selector
        const header = document
          .querySelector("nav")
          ?.closest(".fixed") as HTMLElement;
        const headerHeight = header ? header.offsetHeight : 80; // Fallback to reasonable default
        const additionalBuffer = 24; // Extra breathing room for better UX
        const totalOffset = headerHeight + additionalBuffer;

        // Get element position and scroll with offset for all sections
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - totalOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition), // Ensure we don't scroll to negative position
          behavior: "smooth",
        });
      }
    }
  };

  // Mascot component (just the mascot)
  const MascotComponent = () => (
    <button
      onClick={onMascotClick}
      className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-lg"
    >
      <img
        src={mascotAsset}
        alt={`${assistantName.charAt(0).toUpperCase() + assistantName.slice(1)} the Cat`}
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg object-contain"
      />
    </button>
  );

  // Logo component (desktop - includes both mascot and logo)
  const LogoComponent = () => (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <MascotComponent />
      <img
        src={logoAsset}
        alt="Fest Vibes Logo"
        className="h-16 sm:h-18 md:h-20 w-auto object-contain transition-transform hover:scale-105"
      />
    </div>
  );

  // Mobile dropdown menu
  const MobileMenu = () => {
    const mobileLinkClassName =
      "block text-gray-300 hover:text-white transition-colors text-lg py-2";

    return (
      <div
        className={`absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md shadow-xl transition-all duration-300 ${showMobileMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <div className="px-6 py-4 space-y-4">
          {navItems.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => {
                setShowMobileMenu(false);
                handleSmoothScroll(href);
              }}
              className={mobileLinkClassName}
            >
              {label}
            </button>
          ))}
          <button
            onClick={(e) => {
              setShowMobileMenu(false);
              toggleDarkModeWithTransition(e);
            }}
            className={`flex items-center ${mobileLinkClassName} w-full group mode-toggle-button`}
          >
            <span className="mr-3">Vibes</span>
            <div className="relative w-4 h-4 flex items-center justify-center">
              {isHydrated ? (
                isDarkMode ? (
                  <Sun className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-300 group-hover:text-blue-200 transition-colors" />
                )
              ) : (
                <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse" />
              )}
            </div>
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
  };

  // Navigation links component (desktop only)
  const NavLinks = () => {
    const linkClassName = "text-gray-300 hover:text-white transition-colors";

    return (
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map(({ href, label }) => (
          <button
            key={href}
            onClick={() => handleSmoothScroll(href)}
            className={linkClassName}
          >
            {label}
          </button>
        ))}
        <button
          onClick={toggleDarkModeWithTransition}
          className={`flex items-center ${linkClassName} group mode-toggle-button`}
        >
          <span className="mr-3">Vibes</span>
          <div className="relative w-4 h-4 flex items-center justify-center">
            {isHydrated ? (
              isDarkMode ? (
                <Sun className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
              ) : (
                <Moon className="w-4 h-4 text-blue-300 group-hover:text-blue-200 transition-colors" />
              )
            ) : (
              <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse" />
            )}
          </div>
        </button>
        <Button
          onClick={onJoinBetaClick}
          className="bg-brand-gradient hover:from-festival-purple-500 hover:to-festival-pink-500"
        >
          Join the Waitlist
        </Button>
      </div>
    );
  };

  // Hamburger menu button component
  const HamburgerButton = () => (
    <button
      onClick={handleMenuClick}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800/50 dark:bg-slate-800/70 border border-slate-600 dark:border-slate-600/80 hover:bg-slate-700/50 dark:hover:bg-slate-700/80 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
      aria-label="Toggle navigation menu"
    >
      {showMobileMenu ? (
        <X className="w-5 h-5 text-white" />
      ) : (
        <Menu className="w-5 h-5 text-white" />
      )}
    </button>
  );

  // Mobile Logo component (mobile version - uses the same dynamic logo as desktop)
  const MobileLogoComponent = () => (
    <img
      src={logoAsset}
      alt="Fest Vibes Logo"
      className="h-16 sm:h-18 md:h-20 w-auto object-contain transition-transform hover:scale-105"
    />
  );

  // Mobile layout with centered logo and A/B testing for mascot/hamburger positions
  const MobileLayout = () => {
    if (logoPosition === "right") {
      // A/B Test Variant: Hamburger on left, centered logo, mascot on right
      return (
        <nav className="relative z-10 md:hidden w-full">
          <div className="flex items-center justify-between w-full p-2 sm:p-3">
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
        <div className="flex items-center justify-between w-full p-2 sm:p-3">
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
        <nav className="hidden md:flex items-center justify-between p-2 lg:px-6">
          <NavLinks />
          <LogoComponent />
        </nav>
      );
    }

    if (logoPosition === "center") {
      return (
        <nav className="hidden md:flex flex-col items-center p-2 lg:px-6 space-y-2">
          <LogoComponent />
          <NavLinks />
        </nav>
      );
    }

    // Default: left position
    return (
      <nav className="hidden md:flex items-center justify-between p-2 lg:px-6">
        <LogoComponent />
        <NavLinks />
      </nav>
    );
  };

  // Calculate dynamic transparency based on scroll
  const scrollOpacity = Math.min(scrollY / 100, 0.9); // Max opacity of 0.9
  const backgroundClass = `bg-black/${Math.round(20 + scrollOpacity * 60)}`; // 20% to 80% opacity

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${backgroundClass} backdrop-blur-md transition-all duration-300`}
    >
      <MobileLayout />
      <DesktopLayout />
    </div>
  );
}
