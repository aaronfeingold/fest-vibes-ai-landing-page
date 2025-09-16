import type React from "react";

interface MascotVibesOverlayProps {
  show: boolean;
  assistantName: string;
  mascotStandalone: string;
}

export function MascotVibesOverlay({
  show,
  assistantName,
  mascotStandalone,
}: MascotVibesOverlayProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={`relative transition-all duration-1000 ${
          show
            ? "animate-bounce-in opacity-100 scale-100"
            : "opacity-0 scale-50"
        }`}
      >
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <img
            src={mascotStandalone}
            alt={`${assistantName.charAt(0).toUpperCase() + assistantName.slice(1)} the Cat in vibrant New Orleans street art style`}
            className="w-96 h-96 object-cover animate-spin"
            style={{ animationDuration: "3s" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-gradient rounded-full animate-ping" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-stage-sky to-stage-turquoise rounded-full animate-ping delay-500" />
      </div>
    </div>
  );
}