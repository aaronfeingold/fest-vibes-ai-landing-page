"use client";

import type { HTMLAttributes } from "react";
import type { MarqueeProps as FastMarqueeProps } from "react-fast-marquee";
import FastMarquee from "react-fast-marquee";
import { cn } from "@/lib/utils";

export type MarqueeProps = HTMLAttributes<HTMLDivElement>;

export const Marquee = ({ className, ...props }: MarqueeProps) => {
  return (
    <>
      <style>{`
        .marquee-container {
          mask-image: linear-gradient(to right, transparent 0%, transparent 5%, black 15%, black 85%, transparent 95%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, transparent 5%, black 15%, black 85%, transparent 95%, transparent 100%);
        }
        @media (min-width: 768px) {
          .marquee-container {
            mask-image: linear-gradient(to right, transparent 0%, transparent 20%, black 35%, black 65%, transparent 80%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, transparent 0%, transparent 20%, black 35%, black 65%, transparent 80%, transparent 100%);
          }
        }
      `}</style>
      <div
        className={cn(
          "relative w-full overflow-hidden marquee-container",
          className
        )}
        {...props}
      />
    </>
  );
};

export type MarqueeContentProps = FastMarqueeProps;

export const MarqueeContent = ({
  loop = 0,
  autoFill = true,
  pauseOnHover = true,
  ...props
}: MarqueeContentProps) => (
  <FastMarquee
    autoFill={autoFill}
    loop={loop}
    pauseOnHover={pauseOnHover}
    {...props}
  />
);

export type MarqueeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: "left" | "right";
};

export const MarqueeFade = ({
  className,
  side,
  ...props
}: MarqueeFadeProps) => (
  <div
    className={cn(
      "absolute top-0 bottom-0 z-10 h-full pointer-events-none",
      side === "left" ? "left-0 w-[20%]" : "right-0 w-[20%]",
      className
    )}
    style={{
      background:
        side === "left"
          ? "linear-gradient(to right, hsl(var(--background)) 0%, transparent 100%)"
          : "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)",
    }}
    {...props}
  />
);

export type MarqueeItemProps = HTMLAttributes<HTMLDivElement>;

export const MarqueeItem = ({ className, ...props }: MarqueeItemProps) => (
  <div
    className={cn("mx-2 flex-shrink-0 object-contain", className)}
    {...props}
  />
);
