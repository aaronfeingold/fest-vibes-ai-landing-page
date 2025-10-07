import type React from "react";
import { useState, useEffect, useRef } from "react";
import { FeatureCard } from "@/splash/components/FeatureCard";
import { FEATURES } from "@/lib/homepage-data";
import { ContentData, useAssistantName } from "@/hooks";

interface FeaturesSectionProps {
  contentData: ContentData | null;
}

export function FeaturesSection({ contentData }: FeaturesSectionProps) {
  const assistantName = useAssistantName();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState({ row1: 0, row2: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const carousel1Ref = useRef<HTMLDivElement>(null);
  const carousel2Ref = useRef<HTMLDivElement>(null);

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
    const createScrollHandler = (
      carousel: HTMLDivElement,
      rowKey: "row1" | "row2",
      maxItems: number
    ) => {
      return () => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = carousel.children[0]?.clientWidth || 376;
        const gap = 16; // 4 * 4 (gap-4 in Tailwind)
        const activeIndex = Math.round(scrollLeft / (cardWidth + gap));
        setActiveCardIndex((prev) => ({
          ...prev,
          [rowKey]: Math.min(activeIndex, maxItems - 1),
        }));
      };
    };

    const carousel1 = carousel1Ref.current;
    const carousel2 = carousel2Ref.current;

    if (carousel1) {
      const handleScroll1 = createScrollHandler(carousel1, "row1", 3);
      carousel1.addEventListener("scroll", handleScroll1);
    }

    if (carousel2) {
      const handleScroll2 = createScrollHandler(carousel2, "row2", 3);
      carousel2.addEventListener("scroll", handleScroll2);
    }

    return () => {
      if (carousel1) {
        carousel1.removeEventListener(
          "scroll",
          createScrollHandler(carousel1, "row1", 3)
        );
      }
      if (carousel2) {
        carousel2.removeEventListener(
          "scroll",
          createScrollHandler(carousel2, "row2", 3)
        );
      }
    };
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

  // Split features into two rows of 3
  const row1Features = featuresWithAssistantName.slice(0, 3);
  const row2Features = featuresWithAssistantName.slice(3, 6);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative z-10 px-6 lg:px-8 py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${isVisible ? "animate-slide-up" : ""}`}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            {contentData?.featuresIntro?.title ||
              "Everything You Need for the Perfect"}
            <span className="text-white">
              {" "}
              {contentData?.featuresIntro?.titleHighlight}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {contentData?.featuresIntro?.subtitle ||
              "From smart planning to social collaboration, we're covering every aspect of your music experience."}
          </p>
        </div>

        {/* Desktop: Two rows of 3 cards */}
        <div className="hidden md:block space-y-12">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {row1Features.map((feature, index) => (
              <div
                key={index}
                className={`${isVisible ? "animate-slide-in-right-cards" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FeatureCard feature={feature} index={index} />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {row2Features.map((feature, index) => (
              <div
                key={index + 3}
                className={`${isVisible ? "animate-slide-in-right-cards" : ""}`}
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <FeatureCard feature={feature} index={index + 3} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Two separate horizontal scrolling carousels */}
        <div className="md:hidden space-y-8">
          {/* Row 1 Carousel */}
          <div className="relative">
            <div
              ref={carousel1Ref}
              className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
            >
              {row1Features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 snap-center ${isVisible ? "animate-slide-in-right-cards" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <FeatureCard feature={feature} index={index} />
                </div>
              ))}
            </div>

            {/* Row 1 Pagination dots */}
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-2">
                {row1Features.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                      index === activeCardIndex.row1
                        ? "bg-white/80"
                        : "bg-white/30"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 Carousel */}
          <div className="relative">
            <div
              ref={carousel2Ref}
              className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
            >
              {row2Features.map((feature, index) => (
                <div
                  key={index + 3}
                  className={`flex-shrink-0 snap-center ${isVisible ? "animate-slide-in-right-cards" : ""}`}
                  style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                >
                  <FeatureCard feature={feature} index={index + 3} />
                </div>
              ))}
            </div>

            {/* Row 2 Pagination dots */}
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-2">
                {row2Features.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                      index === activeCardIndex.row2
                        ? "bg-white/80"
                        : "bg-white/30"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
