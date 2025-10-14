"use client";

import type { RefObject } from "react";
import { ChatMessage } from "@/lib/splash-page-data";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

interface ChatWindowProps {
  assistantName: string;
  mascotImages: string[];
  displayedMessages: ChatMessage[];
  currentMessageIndex: number;
  isTyping: boolean;
  onTypingComplete: () => void;
  containerRef: RefObject<HTMLDivElement | null>;
}

export function ChatWindow({
  assistantName,
  mascotImages,
  displayedMessages,
  currentMessageIndex,
  isTyping,
  onTypingComplete,
  containerRef,
}: ChatWindowProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg" ref={containerRef}>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
          <ChatHeader
            assistantName={assistantName}
            mascotImage={mascotImages[0]}
          />
          <ChatMessages
            displayedMessages={displayedMessages}
            currentMessageIndex={currentMessageIndex}
            isTyping={isTyping}
            mascotImages={mascotImages}
            onTypingComplete={onTypingComplete}
          />
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
