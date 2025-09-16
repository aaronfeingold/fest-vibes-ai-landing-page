"use client";

import type React from "react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
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
  const state = useHomepageState();

  return (
    <div className="min-h-screen bg-brand-gradient-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <AnimatedBackground />

      <ABTestNavigation {...state.navigationProps} />

      <HeroSection {...state.heroProps} />
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
  );
}
