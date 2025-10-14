import type React from "react";
import { useState, useEffect, useRef } from "react";
import { PricingCard } from "@/splash-components";
import { mergePricingWithContent } from "@/lib/splash-page-data";
import { useAssistantName } from "@/hooks";
import { ContentData } from "@/lib/content-loader";

interface PricingSectionProps {
  onJoinBetaClick: () => void;
  contentData: ContentData | null;
}

export function PricingSection({
  onJoinBetaClick,
  contentData,
}: PricingSectionProps) {
  const assistantName = useAssistantName();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Get merged pricing plans with content from CMS
  const pricingPlans = mergePricingWithContent(contentData);

  // Update the Vibes Plan with assistant name
  const plansWithAssistantName = pricingPlans.map((plan) => {
    if (plan.name === "Vibes Plan") {
      return {
        ...plan,
        features: plan.features.map((feature) =>
          feature.includes("Chat assistance")
            ? `Chat and Plan with ${assistantName.charAt(0).toUpperCase() + assistantName.slice(1)}`
            : feature
        ),
      };
    }
    return plan;
  });

  // Track scroll position for pagination dots
  useEffect(() => {
    const carousel = carouselRef.current;

    const handleScroll = carousel
      ? () => {
          const scrollLeft = carousel.scrollLeft;
          const cardWidth = carousel.children[0]?.clientWidth || 0;
          const gap = 32; // 8 * 4 (gap-8 in Tailwind)
          const activeIndex = Math.round(scrollLeft / (cardWidth + gap));
          setActiveCardIndex(
            Math.min(activeIndex, plansWithAssistantName.length - 1)
          );
        }
      : null;

    if (carousel && handleScroll) {
      carousel.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (carousel && handleScroll) {
        carousel.removeEventListener("scroll", handleScroll);
      }
    };
  }, [plansWithAssistantName.length]);

  return (
    <section id="pricing" className="relative z-10 px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Vibe
          </h2>
          <p className="text-xl text-gray-300">
            Start free, upgrade when you're ready to chat with{" "}
            {assistantName.charAt(0).toUpperCase() + assistantName.slice(1)}
          </p>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-2 gap-8 max-w-4xl mx-auto pt-6">
          {plansWithAssistantName.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              onJoinBetaClick={onJoinBetaClick}
            />
          ))}
        </div>

        {/* Mobile: Horizontal scroll row */}
        <div className="md:hidden">
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-6 pb-4"
          >
            {plansWithAssistantName.map((plan, index) => (
              <div
                key={index}
                className="flex-shrink-0 snap-center w-[calc(100vw-3rem)] max-w-md"
              >
                <PricingCard plan={plan} onJoinBetaClick={onJoinBetaClick} />
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              {plansWithAssistantName.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                    index === activeCardIndex ? "bg-white/80" : "bg-white/30"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            All plans include access to New Orleans music events. Cancel
            anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
