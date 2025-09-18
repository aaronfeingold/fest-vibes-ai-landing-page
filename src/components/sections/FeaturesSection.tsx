import type React from "react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FEATURES } from "@/lib/homepage-data";
import { ContentData } from "@/hooks/use-homepage-state";
import { useAssistantName } from "@/hooks/use-feature-flags";

interface FeaturesSectionProps {
  contentData: ContentData | null;
}

export function FeaturesSection({ contentData }: FeaturesSectionProps) {
  const assistantName = useAssistantName();

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
    <section id="features" className="relative z-10 px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresWithAssistantName.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
