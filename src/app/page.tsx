"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { PageLoader } from "@/components/ui/page-loader";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ChatDemoSection } from "@/components/sections/ChatDemoSection";
import { AnalyticsSection } from "@/components/sections/AnalyticsSection";
import { CTASection } from "@/components/sections/CTASection";
import { FooterSection } from "@/components/sections/FooterSection";
import { EmailSignupModal } from "@/components/modals/EmailSignupModal";
import { MascotVibesOverlay } from "@/components/modals/MascotVibesOverlay";
import BetaSignupModal from "@/components/BetaSignupModal";
import { ABTestNavigation } from "@/components/ab-test-navigation";
import { useHomepageState } from "@/hooks/use-homepage-state";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const state = useHomepageState();

  useEffect(() => {
    // Show loader, then start content animations
    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
      // Start content animations shortly after loader disappears
      setTimeout(() => {
        setShowContent(true);
      }, 100);
    }, 3000); // Show loader for 3 seconds

    return () => clearTimeout(loaderTimer);
  }, []);

  return (
    <>
      <PageLoader isLoading={isLoading} />

      <div className="min-h-screen bg-brand-gradient-br dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
           style={{ display: isLoading ? 'none' : 'block' }}>
        <AnimatedBackground />

        <ABTestNavigation {...state.navigationProps} />

        <HeroSection {...state.heroProps} showContent={showContent} />
        <FeaturesSection contentData={state.contentData} />
        <PricingSection onJoinBetaClick={state.handleJoinBetaClick} />
        <ChatDemoSection />
        <AnalyticsSection />
        <CTASection onJoinBetaClick={state.handleJoinBetaClick} />
        <FooterSection {...state.footerProps} />

        {/* Modals */}
        <BetaSignupModal {...state.betaModalProps} />
        <EmailSignupModal {...state.emailModalProps} />
        <MascotVibesOverlay {...state.mascotProps} />
      </div>
    </>
  );
}
