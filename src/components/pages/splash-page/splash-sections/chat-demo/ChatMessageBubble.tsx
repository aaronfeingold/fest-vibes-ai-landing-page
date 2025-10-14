"use client";

import { useEffect } from "react";
import { ChatMessage } from "@/lib/splash-page-data";
import { TypingText } from "@/ui";

export interface ChatMessageBubbleProps {
  message: ChatMessage;
  mascotImage: string;
  isCurrentMessage: boolean;
  isTyping: boolean;
  onTypingComplete: () => void;
}

export function ChatMessageBubble({
  message,
  mascotImage,
  isCurrentMessage,
  isTyping,
  onTypingComplete,
}: ChatMessageBubbleProps) {
  // Handle message completion timing
  useEffect(() => {
    if (!isCurrentMessage || !isTyping) return;

    let timeout: NodeJS.Timeout;

    if (message.role === "user") {
      // User messages appear instantly, brief pause before next message
      timeout = setTimeout(onTypingComplete, 800);
    } else {
      // Assistant messages type out character by character
      // Wait for typing animation to complete: (characters × speed per char) + buffer
      const typingDuration = message.content.length * 10 + 500;
      timeout = setTimeout(onTypingComplete, typingDuration);
    }

    return () => clearTimeout(timeout);
  }, [
    message.role,
    message.content.length,
    isCurrentMessage,
    isTyping,
    onTypingComplete,
  ]);

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
              text={message.content}
              as="p"
              className="text-gray-100 text-sm whitespace-pre-wrap"
              typingSpeed={10}
              loop={false}
              showCursor={true}
              cursorClassName="!bg-gray-400 !h-4"
              hideCursorWhileTyping={false}
              startOnVisible={false}
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
