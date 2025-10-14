"use client";

import { ChatMessage } from "@/lib/splash-page-data";
import { ChatMessageBubble } from "./ChatMessageBubble";

interface ChatMessagesProps {
  displayedMessages: ChatMessage[];
  currentMessageIndex: number;
  isTyping: boolean;
  mascotImages: string[];
  onTypingComplete: () => void;
}

export function ChatMessages({
  displayedMessages,
  currentMessageIndex,
  isTyping,
  mascotImages,
  onTypingComplete,
}: ChatMessagesProps) {
  return (
    <div className="bg-gray-900 p-4 space-y-4 min-h-[600px] max-h-[600px] overflow-y-auto">
      {displayedMessages.map((message, index) => {
        // Determine mascot image for assistant messages
        const assistantMessageIndex =
          displayedMessages
            .slice(0, index + 1)
            .filter((m) => m.role === "assistant").length - 1;
        const mascotImage =
          mascotImages[assistantMessageIndex % mascotImages.length];

        return (
          <ChatMessageBubble
            key={message.id}
            message={message}
            mascotImage={mascotImage}
            isCurrentMessage={index === currentMessageIndex}
            isTyping={isTyping && index === currentMessageIndex}
            onTypingComplete={onTypingComplete}
          />
        );
      })}
    </div>
  );
}
