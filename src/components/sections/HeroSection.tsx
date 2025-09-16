import type React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ContentData } from "@/hooks/use-homepage-state";

interface HeroSectionProps {
  isVisible: boolean;
  contentData: ContentData | null;
  onJoinBetaClick: () => void;
}

export function HeroSection({
  isVisible,
  contentData,
  onJoinBetaClick,
}: HeroSectionProps) {
  return (
    <section id="hero" className="relative z-10 px-6 lg:px-8 pt-20 pb-32">
      <div className="mx-auto max-w-4xl text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Your
            <span className="text-brand-accent"> Hometown</span>
            <br />
            Is Your Own
            <span className="text-festival-pink-400"> Music Fest</span>
          </h1>
          <p
            id="hero-subtitle"
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {contentData?.hero?.subtitle ||
              "Transform any day into a personalized music festival. Discover live local music, plan with friends, and experience the ultimate decentralized festival vibes in your pocket."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={onJoinBetaClick}
              className="bg-brand-gradient hover:from-festival-purple-500 hover:to-festival-pink-500 text-base sm:text-lg px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-center"
            >
              <span className="text-center whitespace-normal">
                Join the Waitlist!
              </span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 flex-shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}