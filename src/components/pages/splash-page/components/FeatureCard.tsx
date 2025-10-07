import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Feature } from "@/lib/homepage-data";
import Image from "next/image";

interface FeatureCardProps {
  feature: Feature;
  index?: number;
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  // Generate unique ID for accessibility and testing
  const cardId = `feature-card-${feature.title.toLowerCase().replace(/\s+/g, "-")}-${index ?? 0}`;
  const iconId = `${cardId}-icon`;
  const titleId = `${cardId}-title`;
  const descriptionId = `${cardId}-description`;

  return (
    <Card
      id={cardId}
      data-testid={`feature-card-${index ?? 0}`}
      className="flex h-[320px] w-[320px] max-w-[90vw] min-w-[280px] shrink-0 flex-col items-start rounded-[24px] border border-white/10 dark:border-white/20 bg-slate-800/50 dark:bg-slate-800/70 backdrop-blur-sm hover:bg-slate-800/70 dark:hover:bg-slate-700/80 transition-all duration-300 group p-6"
    >
      <CardContent className="mb-4 w-full p-0">
        <div
          id={iconId}
          data-testid={`feature-icon-${index ?? 0}`}
          className={`w-12 h-12 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300 ${
            feature.iconImage
              ? ""
              : `bg-gradient-to-r ${feature.color} flex items-center justify-center`
          }`}
        >
          {feature.iconImage ? (
            <Image
              src={feature.iconImage}
              alt={`${feature.title} icon`}
              width={48}
              height={48}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <feature.icon className="w-6 h-6 text-white" />
          )}
        </div>

        <CardHeader className="p-0 mb-4">
          <CardTitle
            id={titleId}
            data-testid={`feature-title-${index ?? 0}`}
            className="font-sans text-[20px] leading-6 font-medium text-white dark:text-white"
          >
            {feature.title}
          </CardTitle>
        </CardHeader>

        <CardDescription
          id={descriptionId}
          data-testid={`feature-description-${index ?? 0}`}
          className="mb-6 font-sans text-[16px] leading-6 font-medium text-white/70 dark:text-white/80"
        >
          {feature.description}
        </CardDescription>
      </CardContent>

      {/* Spacer to push content to bottom if needed */}
      <div className="flex-grow"></div>
    </Card>
  );
}
