import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Mic2 } from "lucide-react";
import { MockEvent, EVENT_ICONS } from "@/lib/splash-page-data";

interface EventCardProps {
  event: MockEvent;
  index?: number;
}

export function EventCard({ event, index }: EventCardProps) {
  const getEventIcon = (eventName: string) => {
    const iconPath = EVENT_ICONS[eventName as keyof typeof EVENT_ICONS];

    if (typeof iconPath === "string") {
      return (
        <img
          src={iconPath}
          alt={`${eventName} icon`}
          className="w-6 h-6 object-contain"
        />
      );
    }

    // Default to Mic2 icon for events without custom icons
    return <Mic2 className="w-5 h-5 text-white" />;
  };

  return (
    <div
      key={index}
      className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-brand-gradient rounded-lg flex items-center justify-center">
          {getEventIcon(event.name)}
        </div>
        <div>
          <h4 className="text-white font-medium">{event.name}</h4>
          <p className="text-gray-400 text-sm">
            {event.venue} • {event.time}
          </p>
        </div>
      </div>
      <div className="text-right">
        <Badge
          variant="secondary"
          className="bg-brand-primary/20 text-brand-accent"
        >
          {event.genre}
        </Badge>
        <p className="text-gray-400 text-sm mt-1">{event.attendees} going</p>
      </div>
    </div>
  );
}
