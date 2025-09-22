"use client";

import React, { useState, useEffect } from "react";

interface TypewriterProps {
  messages: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  initialDelay?: number;
  firstMessagePause?: number;
  className?: string;
}

export function Typewriter({
  messages,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  initialDelay = 4000,
  firstMessagePause = 5000,
  className = ""
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState(messages[0] || "");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Initial delay before starting the typewriter cycle
    if (!hasStarted) {
      const initialTimer = setTimeout(() => {
        setHasStarted(true);
        setIsTyping(false); // Start by deleting the first message
      }, initialDelay);
      return () => clearTimeout(initialTimer);
    }

    const currentMessage = messages[messageIndex];

    if (isTyping) {
      // Typing animation
      if (displayText.length < currentMessage.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentMessage.slice(0, displayText.length + 1));
        }, typeSpeed);
        return () => clearTimeout(timer);
      } else {
        // Finished typing, pause then start deleting
        // Use longer pause for first message
        const currentPause =
          messageIndex === 0 ? firstMessagePause : pauseDuration;
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, currentPause);
        return () => clearTimeout(timer);
      }
    } else {
      // Deleting animation
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
        return () => clearTimeout(timer);
      } else {
        // Finished deleting, move to next message
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setIsTyping(true);
      }
    }
  }, [
    displayText,
    messageIndex,
    isTyping,
    hasStarted,
    messages,
    typeSpeed,
    deleteSpeed,
    pauseDuration,
    initialDelay,
    firstMessagePause,
  ]);

  // Cursor blinking effect - sync with typing state
  useEffect(() => {
    let cursorTimer: NodeJS.Timeout;

    if (!hasStarted) {
      // Blink cursor before animation starts
      cursorTimer = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);
    } else if (
      isTyping &&
      displayText.length < (messages[messageIndex]?.length || 0)
    ) {
      // Show solid cursor during typing
      setShowCursor(true);
    } else if (!isTyping && displayText.length > 0) {
      // Show solid cursor during deleting
      setShowCursor(true);
    } else {
      // Blink cursor during pauses (when message is complete or fully deleted)
      cursorTimer = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);
    }

    return () => {
      if (cursorTimer) clearInterval(cursorTimer);
    };
  }, [isTyping, hasStarted, displayText.length, messageIndex, messages]);

  return (
    <span className={className}>
      {displayText}
      {/* this is just a blinking span */}
      <span
        className={`inline-block w-1 h-8 md:h-12 lg:h-16 bg-white ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}
      ></span>
    </span>
  );
}
