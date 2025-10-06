"use client";

import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
}

export function Marquee({
  children,
  className = "",
  speed = "normal",
  direction = "left"
}: MarqueeProps) {
  const speedMap = {
    slow: { desktop: "40s", mobile: "20s" },
    normal: { desktop: "25s", mobile: "12s" },
    fast: { desktop: "15s", mobile: "8s" },
  };

  const animationDirection = direction === "right" ? "reverse" : "normal";

  return (
    <div
      id="marquee-container"
      className={`relative w-full overflow-hidden bg-transparent ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, transparent 20%, black 35%, black 65%, transparent 80%, transparent 100%)",
      }}
    >
      <div
        id="marquee-content"
        className="flex whitespace-nowrap animate-marquee"
        style={{
          animationDuration: speedMap[speed].mobile,
          animationDirection: animationDirection,
          // @ts-ignore - CSS custom property
          "--marquee-duration-desktop": speedMap[speed].desktop,
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface MarqueeItemProps {
  children: React.ReactNode;
  className?: string;
}

export function MarqueeItem({ children, className = "" }: MarqueeItemProps) {
  return (
    <span className={`inline-block px-4 md:px-8 marquee-item ${className}`}>
      <span className="flex h-12 min-w-fit items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 md:h-16 whitespace-nowrap">
        {children}
      </span>
    </span>
  );
}
