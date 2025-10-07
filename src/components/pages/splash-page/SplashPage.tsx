"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { AnimatedBackground } from "@/components/pages/splash-page/components/AnimatedBackground";
import { PageLoader } from "@/components/ui/PageLoader";
import { HeroSection } from "@/components/pages/splash-page/splash-sections/HeroSection";
import { FeaturesSection } from "@/components/pages/splash-page/splash-sections/FeaturesSection";
import { PricingSection } from "@/components/pages/splash-page/splash-sections/PricingSection";
import { ChatDemoSection } from "@/components/pages/splash-page/splash-sections/ChatDemoSection";
import { AnalyticsSection } from "@/components/pages/splash-page/splash-sections/AnalyticsSection";
import { CTASection } from "@/components/pages/splash-page/splash-sections/CTASection";
import { FooterSection } from "@/components/pages/splash-page/splash-sections/FooterSection";
import { EmailSignupModal } from "@/components/modals/EmailSignupModal";
import { MascotOverlay } from "@/components/modals/MascotOverlay";
import BetaSignupModal from "@/components/modals/BetaSignupModal";
import { Nav } from "@/components/Nav";
import { useHomepageState } from "@/hooks/use-homepage-state";

interface SplashPageProps {
  venueNames: string[];
}

export function SplashPage({ venueNames }: SplashPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const state = useHomepageState();

  useEffect(() => {
    // Step 1: Prepare animations (while content is still hidden)
    const prepareTimer = setTimeout(() => {
      setShowContent(true);

      // Step 2: Make content visible AFTER animations are ready
      setTimeout(() => {
        setContentVisible(true);

        // Step 3: Hide loader AFTER content is visible
        setTimeout(() => {
          setIsLoading(false);
        }, 50);
      }, 100);
    }, 2800); // Start preparing 200ms before loader finishes

    return () => clearTimeout(prepareTimer);
  }, []);

  return (
    <>
      <PageLoader isLoading={isLoading} />

      <div
        id="home-page-container"
        className="scrollbar-hide relative flex h-full w-full flex-col overflow-x-hidden overflow-y-scroll scroll-smooth min-h-screen bg-brand-gradient-br dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
        style={{ display: contentVisible ? "block" : "none" }}
      >
        <AnimatedBackground />

        <Nav {...state.navigationProps} />

        <HeroSection
          {...state.heroProps}
          showContent={showContent}
          venueNames={venueNames}
        />
        <FeaturesSection contentData={state.contentData} />
        <PricingSection onJoinBetaClick={state.handleJoinBetaClick} />
        <ChatDemoSection />
        <AnalyticsSection />
        <CTASection onJoinBetaClick={state.handleJoinBetaClick} />
        <FooterSection {...state.footerProps} />

        {/* Modals */}
        <BetaSignupModal {...state.betaModalProps} />
        <EmailSignupModal {...state.emailModalProps} />
        <MascotOverlay {...state.mascotProps} />
      </div>
    </>
  );
}
