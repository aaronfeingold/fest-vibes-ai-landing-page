import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PricingPlan } from "@/lib/homepage-data";

interface PricingCardProps {
  plan: PricingPlan;
  onJoinBetaClick: () => void;
}

export function PricingCard({ plan, onJoinBetaClick }: PricingCardProps) {
  const baseCardClass = `bg-slate-800/50 dark:bg-gray-800/50 border-slate-700/50 dark:border-gray-700/50 backdrop-blur-sm hover:bg-slate-800/70 dark:hover:bg-gray-800/70 transition-all duration-300 relative`;
  const popularCardClass = `bg-slate-800/50 dark:bg-gray-800/50 border-purple-500/50 backdrop-blur-sm hover:bg-slate-800/70 dark:hover:bg-gray-800/70 transition-all duration-300 relative`;

  return (
    <Card className={plan.isPopular ? popularCardClass : baseCardClass}>
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-brand-gradient text-white px-4 py-1">
            Most Popular
          </Badge>
        </div>
      )}
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl font-bold text-white mb-2">
          {plan.name}
        </CardTitle>
        <div className="text-4xl font-bold text-white mb-2">
          {plan.price}
          <span className="text-lg font-normal text-gray-400">/month</span>
        </div>
        <CardDescription className="text-gray-300">
          {plan.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div
                className={`w-5 h-5 ${
                  plan.isPopular
                    ? "bg-brand-gradient"
                    : "bg-gradient-to-r from-stage-mint to-emerald-500"
                } rounded-full flex items-center justify-center flex-shrink-0`}
              >
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
          {plan.excludedFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 opacity-50">
              <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-500">{feature}</span>
            </div>
          ))}
        </div>
        <Button
          onClick={onJoinBetaClick}
          className={`w-full mt-6 ${
            plan.isPopular
              ? "bg-brand-gradient hover:from-festival-purple-500 hover:to-festival-pink-500"
              : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
          }`}
        >
          {plan.buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}