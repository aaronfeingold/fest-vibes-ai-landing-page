"use client";

import { mergeDemoCapabilitiesWithContent } from "@/lib/splash-page-data";
import { useAssistantName, useNoBackgroundMascots } from "@/hooks";
import { ContentData } from "@/lib/content-loader";
import { capitalize } from "@/lib/utils";
import { ChatWindow, CapabilitiesList, useChatAnimation } from "./chat-demo";

interface ChatDemoSectionProps {
  contentData: ContentData | null;
}

export function ChatDemoSection({ contentData }: ChatDemoSectionProps) {
  const assistantName = useAssistantName();
  const mascotImages = useNoBackgroundMascots();
  const capabilities = mergeDemoCapabilitiesWithContent(contentData);

  const {
    displayedMessages,
    isTyping,
    currentMessageIndex,
    handleTypingComplete,
    chatContainerRef,
  } = useChatAnimation();

  return (
    <section id="demo" className="relative z-10 px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            {contentData?.chatDemo?.sectionTitle ||
              `Say What's Up To ${capitalize(assistantName)}`}
          </h2>
          <p className="text-xl text-gray-300">
            {contentData?.chatDemo?.sectionSubtitle ||
              `${capitalize(assistantName)} is your guide the best music shows in town`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ChatWindow
            assistantName={assistantName}
            mascotImages={mascotImages}
            displayedMessages={displayedMessages}
            currentMessageIndex={currentMessageIndex}
            isTyping={isTyping}
            onTypingComplete={handleTypingComplete}
            containerRef={chatContainerRef}
          />
          <CapabilitiesList
            assistantName={assistantName}
            capabilities={capabilities}
          />
        </div>
      </div>
    </section>
  );
}
