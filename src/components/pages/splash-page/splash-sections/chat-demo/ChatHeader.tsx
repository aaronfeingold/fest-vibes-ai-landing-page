import { capitalize } from "@/lib/utils";

interface ChatHeaderProps {
  assistantName: string;
  mascotImage: string;
}

export function ChatHeader({ assistantName, mascotImage }: ChatHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 px-6 py-4 border-b border-gray-700">
      <div className="flex items-center space-x-3">
        <img
          src={mascotImage}
          alt={assistantName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="text-white font-semibold">
            {capitalize(assistantName)}
          </h3>
          <p className="text-xs text-gray-400">Online</p>
        </div>
      </div>
    </div>
  );
}
