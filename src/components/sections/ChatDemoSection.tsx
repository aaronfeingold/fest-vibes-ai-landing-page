import type React from "react";
import { DEMO_CAPABILITIES } from "@/lib/homepage-data";
import { useAssistantName } from "@/hooks/use-feature-flags";

export function ChatDemoSection() {
  const assistantName = useAssistantName();

  return (
    <section id="demo" className="relative z-10 px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Test{" "}
            {assistantName.charAt(0).toUpperCase() + assistantName.slice(1)},
            Your Planning Assistant
          </h2>
          <p className="text-xl text-gray-300">
            Let{" "}
            {assistantName.charAt(0).toUpperCase() + assistantName.slice(1)}{" "}
            suggest and organize your perfect music weekend
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src="/demo/chat-demo.png"
              alt={`${assistantName.charAt(0).toUpperCase() + assistantName.slice(1)} the Cat chat interface showing conversation about finding electronic music shows`}
              className="w-full max-w-lg rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              {assistantName.charAt(0).toUpperCase() + assistantName.slice(1)}{" "}
              Can Help You:
            </h3>
            <div className="space-y-4">
              {DEMO_CAPABILITIES.map((item, index) => (
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
        </div>
      </div>
    </section>
  );
}