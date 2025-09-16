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
    <Card
      key={index}
      className="bg-slate-800/50 dark:bg-gray-800/50 border-slate-700/50 dark:border-gray-700/50 backdrop-blur-sm hover:bg-slate-800/70 dark:hover:bg-gray-800/70 transition-all duration-300 group"
    >
      <CardHeader>
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
        <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-300 text-base leading-relaxed">
          {feature.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}