"use client";

import React, { useState, useEffect } from "react";

interface TypewriterProps {
  messages: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  initialDelay?: number;
  className?: string;
}

export function Typewriter({
  messages,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  initialDelay = 4000,
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
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
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
  }, [displayText, messageIndex, isTyping, hasStarted, messages, typeSpeed, deleteSpeed, pauseDuration, initialDelay]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span className={`inline-block w-1 h-8 md:h-12 lg:h-16 bg-white ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
        |
      </span>
    </span>
  );
}