import type React from "react";
import { useState, useEffect, useRef } from "react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FEATURES } from "@/lib/homepage-data";
import { ContentData } from "@/hooks/use-homepage-state";
import { useAssistantName } from "@/hooks/use-feature-flags";

interface FeaturesSectionProps {
  contentData: ContentData | null;
}

export function FeaturesSection({ contentData }: FeaturesSectionProps) {
  const assistantName = useAssistantName();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Intersection observer to trigger animations when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Track scroll position for pagination dots
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.children[0]?.clientWidth || 376;
      const gap = 32; // 8 * 4 (gap-8 in Tailwind)
      const activeIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveCardIndex(Math.min(activeIndex, featuresWithAssistantName.length - 1));
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  // Update the chat assistance feature description with the assistant name
  const featuresWithAssistantName = FEATURES.map((feature) => {
    if (feature.title === "Chat Assistance") {
      return {
        ...feature,
        description: `Vibe with ${assistantName.charAt(0).toUpperCase() + assistantName.slice(1)} to craft personalized weekend music experiences`,
      };
    }
    return feature;
  });

  return (
    <section ref={sectionRef} id="features" className="relative z-10 px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-7xl">
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : ''}`}>
          <h2 className="text-4xl font-bold text-white mb-4">
            {contentData?.featuresIntro?.title ||
              "Everything You Need for the Perfect"}
            <span className="text-white">
              {" "}
              {contentData?.featuresIntro?.titleHighlight || "Music Weekend"}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {contentData?.featuresIntro?.subtitle ||
              "From smart planning to social collaboration, we're covering every aspect of your music experience."}
          </p>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {featuresWithAssistantName.map((feature, index) => (
            <div
              key={index}
              className={`${isVisible ? 'animate-slide-in-right-cards' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard feature={feature} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile: Horizontal scrolling carousel */}
        <div className="md:hidden">
          <div className="relative">
            <div ref={carouselRef} className="scrollbar-hide flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4">
              {featuresWithAssistantName.map((feature, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 snap-center ${isVisible ? 'animate-slide-in-right-cards' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <FeatureCard feature={feature} index={index} />
                </div>
              ))}
            </div>

            {/* Left gradient overlay */}
            <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-slate-900/50 dark:from-slate-950/60 to-transparent"></div>

            {/* Right gradient overlay */}
            <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-slate-900/50 dark:from-slate-950/60 to-transparent"></div>
          </div>

          {/* Pagination dots */}
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              {featuresWithAssistantName.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                    index === activeCardIndex ? 'bg-white/80' : 'bg-white/30'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
