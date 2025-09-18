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
    slow: "40s",
    normal: "25s",
    fast: "15s"
  };

  const animationDirection = direction === "right" ? "reverse" : "normal";

  return (
    <div
      className={`relative w-full overflow-hidden bg-transparent ${className}`}
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, transparent 20%, black 35%, black 65%, transparent 80%, transparent 100%)"
      }}
    >
      <div
        className="flex whitespace-nowrap animate-marquee"
        style={{
          animationDuration: speedMap[speed],
          animationDirection: animationDirection
        }}
      >
        {children}
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
    <span className={`inline-block px-3 md:px-6 ${className}`}>
      <span className="flex h-12 w-24 items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 md:h-16 md:w-32">
        {children}
      </span>
    </span>
  );
}