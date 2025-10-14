import type { ComponentType } from "react";
import { capitalize } from "@/lib/utils";

interface Capability {
  icon: ComponentType<{ className?: string }>;
  text: string;
}

interface CapabilitiesListProps {
  assistantName: string;
  capabilities: Capability[];
}

export function CapabilitiesList({
  assistantName,
  capabilities,
}: CapabilitiesListProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">
        {capitalize(assistantName)} Can Help You:
      </h3>
      <div className="space-y-4">
        {capabilities.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 text-gray-300"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-lg flex items-center justify-center">
              <item.icon className="w-4 h-4 text-brand-accent" />
            </div>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
