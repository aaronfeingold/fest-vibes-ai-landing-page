import type React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button, TypingText, VenueMarquee } from "@/ui";
import { ContentData, useNoBackgroundMascots } from "@/hooks";

interface HeroSectionProps {
  isVisible: boolean;
  contentData: ContentData | null;
  onJoinBetaClick: () => void;
  showContent?: boolean;
  venueNames: string[];
}

export function HeroSection({
  isVisible,
  contentData,
  onJoinBetaClick,
  showContent = true,
  venueNames,
}: HeroSectionProps) {
  const messages = contentData?.hero?.typewriterMessages || [
    "Make Your Hometown your own Music Fest",
    "Jam pack my weekend with all the funk",
    "When can I catch my favorite band this month?",
    "Help me bop around downtown.",
  ];

  // Centralize mascot asset resolution via mapping to avoid brittle hard-coded paths
  const availableMascots = useNoBackgroundMascots();
  const mascotAssetMap = {
    left: availableMascots[1] ?? availableMascots[0],
    right: availableMascots[2] ?? availableMascots[0],
  } as const;

  return (
    <section
      id="hero"
      className="z-10 relative flex min-h-[100vh] animate-fade-in flex-col items-center justify-center px-6 lg:px-8"
    >
      <div id="hero-main-wrapper" className="mx-auto max-w-4xl text-center">
        <div
          id="hero-animation-container"
          className={`relative transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Left floating mascot - behind header */}
          <div
            id="hero-mascot-left"
            className={`absolute hidden md:block w-40 lg:w-48 -z-20 ${showContent ? "animate-slide-in-left" : "opacity-0"}`}
            style={{
              animationDelay: "0.5s",
              left: "-200px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <div className="animate-float-mascot-left">
              <Image
                id="hero-mascot-left-image"
                src={mascotAssetMap.left}
                alt="Festival Mascot"
                width={192}
                height={192}
                className="w-full h-auto object-contain opacity-40 transition-all duration-500 hover:opacity-60"
                style={{
                  filter:
                    "blur(0.5px) brightness(0.7) drop-shadow(rgba(0, 0, 0, 0.3) 0px 15px 30px)",
                }}
                priority
              />
            </div>
          </div>

          {/* Right floating mascot - behind header */}
          <div
            id="hero-mascot-right"
            className={`absolute hidden md:block w-40 lg:w-48 -z-20 ${showContent ? "animate-slide-in-right" : "opacity-0"}`}
            style={{
              animationDelay: "0.5s",
              right: "-200px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <div className="animate-float-mascot-right">
              <Image
                id="hero-mascot-right-image"
                src={mascotAssetMap.right}
                alt="Festival Mascot"
                width={192}
                height={192}
                className="w-full h-auto object-contain opacity-40 transition-all duration-500 hover:opacity-60"
                style={{
                  filter:
                    "blur(0.5px) brightness(0.7) drop-shadow(rgba(0, 0, 0, 0.3) 0px 15px 30px)",
                }}
                priority
              />
            </div>
          </div>

          {/* Hero text with slide up animation */}
          <div
            id="hero-content"
            className={`${showContent ? "animate-slide-up" : "opacity-0 translate-y-12"}`}
            style={{ animationDelay: "1.2s" }}
          >
            <div
              id="hero-header-container"
              className="mb-8 mx-auto px-[20px] transition-all duration-300 md:px-0 w-full max-w-[854px] min-h-[160px] lg:min-h-[216px] flex items-center justify-center"
            >
              <h1
                id="hero-header"
                className="text-center font-sans text-5xl lg:text-7xl font-bold text-white leading-tight"
              >
                <TypingText
                  text={messages}
                  className="text-white"
                  typingSpeed={30}
                  deletingSpeed={10}
                  pauseDuration={3500}
                  initialDelay={1000}
                  loop={true}
                  showCursor={true}
                  cursorClassName="!bg-white lg:!h-16 !h-12"
                  variableSpeed={{ min: 40, max: 80 }}
                  startOnVisible={true}
                />
              </h1>
            </div>
            <p
              id="hero-subtitle"
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {contentData?.hero?.subtitle ||
                "Transform any day into a personalized music festival. Discover live local music, plan with friends, and experience the ultimate decentralized festival vibes in your pocket."}
            </p>
            <div
              id="hero-cta-container"
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                id="hero-join-beta-button"
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

      {/* Venue Marquee - positioned at bottom of hero right above the fold */}
      <div
        id="hero-venue-marquee-container"
        className="relative mt-8 w-full [@media(min-height:550px)]:absolute [@media(min-height:550px)]:bottom-10 [@media(min-height:550px)]:left-0 [@media(min-height:550px)]:-z-10 [@media(min-height:550px)]:mt-0"
      >
        <VenueMarquee speed="slow" venueNames={venueNames} />
      </div>
    </section>
  );
}
