"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  type CalendarEvent,
  getEventsFromOrganization,
} from "./getEvents";
import type { Organization } from "../organizations/types";

type SourcedEvent = CalendarEvent & {
  sourceName: string;
  sourceImage?: StaticImageData;
  sourceImageClassName?: string;
};

function formatHour(date: Date): string {
  const h = date.getHours() % 12 || 12;
  const m = date.getMinutes();
  return m ? `${h}:${String(m).padStart(2, "0")}` : `${h}`;
}

function formatTimeRange(start: Date, end: Date): string {
  const startStr = formatHour(start);
  const endStr = formatHour(end);
  const startSuffix = start.getHours() < 12 ? "am" : "pm";
  const endSuffix = end.getHours() < 12 ? "am" : "pm";
  if (startSuffix === endSuffix) return `${startStr}-${endStr}${endSuffix}`;
  return `${startStr}${startSuffix}-${endStr}${endSuffix}`;
}

function formatDateHeading(date: Date): string {
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function EventCard({ event }: { event: SourcedEvent }) {
  const isAllDay = event.start.getHours() === 0 && event.end.getHours() === 0;

  return (
    <div className="flex flex-row gap-3 sm:gap-4 p-3 rounded-lg border border-foreground/10 text-left items-center">
      {event.sourceImage ? (
        <Image
          src={event.sourceImage}
          alt={event.sourceName}
          className={`w-10 h-10 object-contain shrink-0 rounded ${event.sourceImageClassName ?? ""}`}
        />
      ) : (
        <div className="w-10 h-10 shrink-0 rounded bg-foreground/10 flex items-center justify-center text-xs font-bold text-foreground/40">
          {event.sourceName
            .split(" ")
            .map((word) => word?.at(0))
            .join("")
            .slice(0, 4)}
        </div>
      )}
      <div className="sm:w-28 shrink-0 text-sm text-foreground/60">
        {isAllDay ? "All day" : formatTimeRange(event.start, event.end)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium">
          {event.htmlLink ? (
            <a
              href={event.htmlLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {event.title}
            </a>
          ) : (
            event.title
          )}
        </div>
        {event.location && (
          <div className="text-sm text-foreground/60 mt-1">
            {event.location}
          </div>
        )}
        <div className="text-xs text-foreground/40 mt-1">
          {event.sourceName}
        </div>
      </div>
    </div>
  );
}

export default function CalendarEvents({
  organizations,
}: {
  organizations: Organization[];
}) {
  const [events, setEvents] = useState<SourcedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  useEffect(() => {
    if (organizations.length === 0) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    Promise.all(
      organizations.map(async (org) => {
        const events = await getEventsFromOrganization(org, apiKey ?? undefined);
        return events.map((e) => ({
          ...e,
          sourceName: org.name,
          sourceImage: org.image,
          sourceImageClassName: org.imageClassName as string | undefined,
        }));
      }),
    )
      .then((results) => {
        if (cancelled) return;
        const seen = new Set<string>();
        const all = results
          .flat()
          .filter((e) => {
            if (seen.has(e.id)) return false;
            seen.add(e.id);
            return true;
          })
          .sort((a, b) => a.start.getTime() - b.start.getTime());
        setEvents(all);
      })
      .catch((err) => {
        if (!cancelled) setError(`Failed to load calendar events: ${err}`);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [apiKey, organizations]);

  if (loading) {
    return <p className="text-foreground/60">Loading events...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (events.length === 0) {
    return <p className="text-foreground/60">No upcoming events found.</p>;
  }

  const grouped: Record<string, SourcedEvent[]> = {};
  for (const event of events) {
    const key = dateKey(event.start);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(event);
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {Object.entries(grouped).map(([key, dayEvents]) => (
        <div key={key}>
          <h2 className="text-lg font-medium mb-3 text-left border-b border-foreground/10 pb-1">
            {formatDateHeading(dayEvents[0].start)}
          </h2>
          <div className="flex flex-col gap-2">
            {dayEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
