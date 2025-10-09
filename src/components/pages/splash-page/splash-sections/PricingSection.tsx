import type React from "react";
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plansWithAssistantName.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              onJoinBetaClick={onJoinBetaClick}
            />
          ))}
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
