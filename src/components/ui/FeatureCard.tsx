import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Feature } from "@/lib/homepage-data";

interface FeatureCardProps {
  feature: Feature;
  index?: number;
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <div className="flex h-[320px] w-[320px] max-w-[90vw] min-w-[280px] shrink-0 flex-col items-start rounded-[24px] border border-white/10 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group p-6">
      <div className="mb-4 w-full">
        <div
          className={`w-12 h-12 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300 ${
            feature.iconImage
              ? ""
              : `bg-gradient-to-r ${feature.color} flex items-center justify-center`
          }`}
        >
          {feature.iconImage ? (
            <img
              src={feature.iconImage}
              alt={`${feature.title} icon`}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <feature.icon className="w-6 h-6 text-white" />
          )}
        </div>

        <h3 className="mb-4 font-sans text-[20px] leading-6 font-medium text-white">
          {feature.title}
        </h3>

        <div className="mb-6 font-sans text-[16px] leading-6 font-medium text-white/70">
          {feature.description}
        </div>
      </div>

      {/* Spacer to push content to bottom if needed */}
      <div className="flex-grow"></div>
    </div>
  );
}