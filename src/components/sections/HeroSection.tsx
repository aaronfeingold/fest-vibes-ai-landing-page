import type React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ContentData } from "@/hooks/use-homepage-state";
import { Marquee, MarqueeItem } from "@/components/ui/marquee";
import { BrandLogo, MUSIC_BRANDS } from "@/components/ui/brand-logo";
import { Typewriter } from "@/components/ui/typewriter";

interface HeroSectionProps {
  isVisible: boolean;
  contentData: ContentData | null;
  onJoinBetaClick: () => void;
  showContent?: boolean;
}

export function HeroSection({
  isVisible,
  contentData,
  onJoinBetaClick,
  showContent = true,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100vh] animate-fade-in flex-col items-center justify-center px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl text-center">
        <div
          className={`relative transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Left floating mascot - behind header */}
          <div
            className={`absolute hidden md:block w-40 lg:w-48 -z-10 ${showContent ? "animate-slide-in-left" : "opacity-0"}`}
            style={{
              animationDelay: "0.5s",
              left: "-200px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <div className="animate-float-mascot-left">
              <img
                src="/mascots/no-background/mascot-2.png"
                alt="Festival Mascot"
                className="w-full h-auto object-contain opacity-40 transition-all duration-500 hover:opacity-60"
                style={{
                  filter:
                    "blur(0.5px) brightness(0.7) drop-shadow(rgba(0, 0, 0, 0.3) 0px 15px 30px)",
                }}
              />
            </div>
          </div>

          {/* Right floating mascot - behind header */}
          <div
            className={`absolute hidden md:block w-40 lg:w-48 -z-10 ${showContent ? "animate-slide-in-right" : "opacity-0"}`}
            style={{
              animationDelay: "0.5s",
              right: "-200px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <div className="animate-float-mascot-right">
              <img
                src="/mascots/no-background/mascot-3.png"
                alt="Festival Mascot"
                className="w-full h-auto object-contain opacity-40 transition-all duration-500 hover:opacity-60"
                style={{
                  filter:
                    "blur(0.5px) brightness(0.7) drop-shadow(rgba(0, 0, 0, 0.3) 0px 15px 30px)",
                }}
              />
            </div>
          </div>

          {/* Hero text with slide up animation */}
          <div
            className={`${showContent ? "animate-slide-up" : "opacity-0 translate-y-12"}`}
            style={{ animationDelay: "1.2s" }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight relative z-20">
              <Typewriter
                messages={
                  contentData?.hero?.typewriterMessages || [
                    "Make Your Hometown your own Music Fest",
                    "Jam pack my weekend with all the funk",
                    "When can I catch my favorite band this month?",
                    "Help me bop around downtown.",
                  ]
                }
                className="text-white"
                typeSpeed={60}
                deleteSpeed={15}
                pauseDuration={3000}
                initialDelay={7000}
                firstMessagePause={6000}
              />
            </h1>
            <p
              id="hero-subtitle"
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {contentData?.hero?.subtitle ||
                "Transform any day into a personalized music festival. Discover live local music, plan with friends, and experience the ultimate decentralized festival vibes in your pocket."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={onJoinBetaClick}
                className="bg-brand-gradient hover:from-festival-purple-500 hover:to-festival-pink-500 text-base sm:text-lg px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-center"
              >
                <span className="text-center whitespace-normal">
                  Join the Waitlist!
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 flex-shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Marquee - positioned at bottom like Suno */}
      <div className="relative mt-8 w-full [@media(min-height:550px)]:absolute [@media(min-height:550px)]:bottom-10 [@media(min-height:550px)]:left-0 [@media(min-height:550px)]:-z-10 [@media(min-height:550px)]:mt-0">
        <Marquee
          speed="slow"
          className="group relative w-full overflow-hidden bg-transparent"
        >
          {MUSIC_BRANDS.map((brand) => (
            <MarqueeItem key={brand}>
              <BrandLogo name={brand} />
            </MarqueeItem>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
