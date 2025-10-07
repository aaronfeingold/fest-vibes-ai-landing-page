"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { DEMO_CAPABILITIES } from "@/lib/homepage-data";
import { useAssistantName } from "@/hooks/use-feature-flags";
import TypingText from "@/components/ui/typing-text";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "There are some pretty siiic shows this weekend in New Orleans. Are you into funk or psychedelic? I've got a pretty good lineup this Saturday night.",
  },
  {
    id: 2,
    role: "user",
    content:
      "nah fam. i want a chill night out, been binging some DtMF Bad Bunny tho, so find somethings with those vibes. nothing late cause i gotta wake up to watch the Saints.",
  },
  {
    id: 3,
    role: "assistant",
    content:
      "Yah, an early Saturday night with some hints of reggaeton. \n\naight hang on one sec...\n\n5:30p - Javier Olondo y Su Banda at Bachannal\n7:15p - Ride share to Frenchman street\n7:30P - Rastafunk at Cafe Negril\n...\n\nSound like a plan?",
  },
  {
    id: 4,
    role: "user",
    content: "lit ty",
  },
];

const MASCOT_IMAGES = [
  "/mascots/no-background/mascot-1.png",
  "/mascots/no-background/mascot-2.png",
  "/mascots/no-background/mascot-3.png",
];

export function ChatDemoSection() {
  const assistantName = useAssistantName();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of component is visible
      }
    );

    if (chatContainerRef.current) {
      observer.observe(chatContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Start animation when component becomes visible
  useEffect(() => {
    if (!isVisible) return;

    const initialDelay = setTimeout(() => {
      setCurrentMessageIndex(0);
      setIsTyping(true);
    }, 500);

    return () => clearTimeout(initialDelay);
  }, [isVisible]);

  const handleTypingComplete = () => {
    setIsTyping(false);

    // Show typing indicator before next message
    setTimeout(() => {
      setShowTypingIndicator(true);

      // Then show next message
      setTimeout(() => {
        setShowTypingIndicator(false);
        setCurrentMessageIndex((prev) => {
          const nextIndex = prev + 1;
          if (nextIndex < CHAT_MESSAGES.length) {
            // Start typing next message
            setIsTyping(true);
            return nextIndex;
          }
          return prev;
        });
      }, 800); // Duration of typing indicator
    }, 500); // Pause before showing typing indicator
  };

  // Get all messages up to current index
  const displayedMessages = CHAT_MESSAGES.slice(0, currentMessageIndex + 1);

  return (
    <section id="demo" className="relative z-10 px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Say What's Up To{" "}
            {assistantName.charAt(0).toUpperCase() + assistantName.slice(1)},
          </h2>
          <p className="text-xl text-gray-300">
            {assistantName.charAt(0).toUpperCase() + assistantName.slice(1)} is
            your guide the best music shows in town
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Mobile Chat Interface */}
          <div className="flex justify-center">
            <div className="w-full max-w-lg" ref={chatContainerRef}>
              {/* Mobile Phone Container */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 px-6 py-4 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <img
                      src={MASCOT_IMAGES[0]}
                      alt={assistantName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-white font-semibold">
                        {assistantName.charAt(0).toUpperCase() +
                          assistantName.slice(1)}
                      </h3>
                      <p className="text-xs text-gray-400">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="bg-gray-900 p-4 space-y-4 min-h-[600px] max-h-[600px] overflow-y-auto">
                  {displayedMessages.map((message, index) => {
                    // Determine mascot image for assistant messages
                    const assistantMessageIndex =
                      displayedMessages
                        .slice(0, index + 1)
                        .filter((m) => m.role === "assistant").length - 1;
                    const mascotImage =
                      MASCOT_IMAGES[
                        assistantMessageIndex % MASCOT_IMAGES.length
                      ];

                    return (
                      <ChatMessageBubble
                        key={message.id}
                        message={message}
                        mascotImage={mascotImage}
                        isCurrentMessage={index === currentMessageIndex}
                        isTyping={isTyping && index === currentMessageIndex}
                        onTypingComplete={handleTypingComplete}
                      />
                    );
                  })}

                  {/* Typing Indicator */}
                  {showTypingIndicator && <TypingIndicator />}
                </div>

                {/* Chat Input (Disabled/Demo) */}
                <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      disabled
                      className="flex-1 bg-gray-700/50 text-gray-500 rounded-full px-4 py-2 text-sm cursor-not-allowed"
                    />
                    <button
                      disabled
                      className="bg-brand-primary/30 text-white rounded-full p-2 cursor-not-allowed"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities List */}
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

// Typing Indicator Component
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-end space-x-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center flex-shrink-0">
          <img
            src={MASCOT_IMAGES[0]}
            alt="Typing..."
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ChatMessageBubbleProps {
  message: ChatMessage;
  mascotImage: string;
  isCurrentMessage: boolean;
  isTyping: boolean;
  onTypingComplete: () => void;
}

function ChatMessageBubble({
  message,
  mascotImage,
  isCurrentMessage,
  isTyping,
  onTypingComplete,
}: ChatMessageBubbleProps) {
  // User messages: show immediately and trigger completion after pause
  useEffect(() => {
    if (message.role === "user" && isCurrentMessage && isTyping) {
      const timeout = setTimeout(() => {
        onTypingComplete();
      }, 800); // Brief pause after user message before continuing

      return () => clearTimeout(timeout);
    }
  }, [message.role, isCurrentMessage, isTyping, onTypingComplete]);

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="flex items-end space-x-2 max-w-[80%]">
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl rounded-br-sm px-4 py-2.5">
            <p className="text-white text-sm whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          <img
            src="/icons/saints.png"
            alt="User"
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
        </div>
      </div>
    );
  }

  // Assistant messages: use TypingText for GSAP-optimized animation
  return (
    <div className="flex justify-start">
      <div className="flex items-end space-x-2 max-w-[80%]">
        <img
          src={mascotImage}
          alt="Assistant"
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
        <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-2.5">
          {isCurrentMessage && isTyping ? (
            <TypingText
              text={[message.content, message.content]}
              as="p"
              className="text-gray-100 text-sm whitespace-pre-wrap"
              typingSpeed={10}
              deletingSpeed={0}
              pauseDuration={500}
              loop={false}
              showCursor={true}
              cursorClassName="!bg-gray-400 !h-4"
              hideCursorWhileTyping={false}
              onSentenceComplete={(_, index) => {
                if (index === 0) onTypingComplete();
              }}
              startOnVisible={false}
              reverseMode={false}
            />
          ) : (
            <p className="text-gray-100 text-sm whitespace-pre-wrap">
              {message.content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
