import { useState, useEffect, useRef } from "react";
import { CHAT_MESSAGES } from "@/lib/splash-page-data";

export function useChatAnimation() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
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

    // Move to next message after a brief pause
    setTimeout(() => {
      setCurrentMessageIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex < CHAT_MESSAGES.length) {
          setIsTyping(true);
          return nextIndex;
        }
        return prev;
      });
    }, 500); // Pause before next message
  };

  // Get all messages up to current index
  const displayedMessages = CHAT_MESSAGES.slice(0, currentMessageIndex + 1);

  return {
    displayedMessages,
    isTyping,
    currentMessageIndex,
    handleTypingComplete,
    chatContainerRef,
  };
}
