"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Organization } from "../organizations/types";
import {
  type CalendarEvent,
  getEventsFromOrganization,
  hasCalendarFeed,
} from "./getEvents";

type SourcedEvent = CalendarEvent & {
  sourceName: string;
  sourceImage?: StaticImageData;
  sourceImageClassName?: string;
};

type OrgStatus = "unsupported" | "loading" | "done" | "error";

// --- Formatting helpers ---

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

// --- Status indicator ---

function StatusIcon({ status }: { status: OrgStatus }) {
  const base =
    "inline-flex items-center justify-center w-4 h-4 text-sm leading-none";
  switch (status) {
    case "unsupported":
      return (
        <span className={`${base} text-red-500`} title="No supported feed">
          &#x2717;
        </span>
      );
    case "loading":
      return (
        <span
          className={`${base} border-2 border-foreground/30 border-t-foreground rounded-full animate-spin`}
          title="Loading"
        />
      );
    case "done":
      return (
        <span className={`${base} text-green-500`} title="Loaded">
          &#x2713;
        </span>
      );
    case "error":
      return (
        <span className={`${base} text-red-500`} title="Failed to load">
          &#x2717;
        </span>
      );
  }
}

function SourceStatusBar({
  organizations,
  statuses,
}: {
  organizations: Organization[];
  statuses: Record<string, OrgStatus>;
}) {
  return (
    <div className="flex flex-wrap gap-3 w-full justify-center text-sm">
      {organizations.map((org) => (
        <div
          key={org.name}
          className="flex items-center gap-1.5 px-2 py-1 rounded border border-foreground/10"
        >
          {org.image ? (
            <Image
              src={org.image}
              alt={org.name}
              className={`w-4 h-4 object-contain rounded ${org.imageClassName ?? ""}`}
            />
          ) : null}
          <span className="text-foreground/60">{org.name}</span>
          <StatusIcon status={statuses[org.name] ?? "unsupported"} />
        </div>
      ))}
    </div>
  );
}

// --- Event card ---

function EventCard({ event }: { event: SourcedEvent }) {
  const isAllDay = event.start.getHours() === 0 && event.end.getHours() === 0;

  const timeLabel = isAllDay
    ? "All day"
    : formatTimeRange(event.start, event.end);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 p-3 rounded-lg border border-foreground/10 text-left">
      <div className="sm:hidden text-xs font-medium text-foreground/50 uppercase tracking-wide">
        {timeLabel}
      </div>
      <div className="flex flex-row gap-3 sm:gap-4 items-center flex-1 min-w-0">
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
        <div className="hidden sm:block sm:w-28 shrink-0 text-sm text-foreground/60">
          {timeLabel}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium">
            {event.eventUrl && !event.calendarLink ? (
              <a
                href={event.eventUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {event.title}
              </a>
            ) : !event.eventUrl && event.calendarLink ? (
              <a
                href={event.calendarLink}
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
          {event.eventUrl && event.calendarLink && (
            <div className="flex gap-3 mt-1 text-xs">
              <a
                href={event.eventUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground hover:underline"
              >
                Event page
              </a>
              <a
                href={event.calendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground hover:underline"
              >
                Add to calendar
              </a>
            </div>
          )}
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
    </div>
  );
}

// --- Main component ---

export default function CalendarEvents({
  organizations,
}: {
  organizations: Organization[];
}) {
  const [events, setEvents] = useState<SourcedEvent[]>([]);
  const [statuses, setStatuses] = useState<Record<string, OrgStatus>>(() => {
    const initial: Record<string, OrgStatus> = {};
    for (const org of organizations) {
      initial[org.name] = hasCalendarFeed(org) ? "loading" : "unsupported";
    }
    return initial;
  });

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  useEffect(() => {
    let cancelled = false;

    const fetchableOrgs = organizations.filter(hasCalendarFeed);
    if (fetchableOrgs.length === 0) return;

    for (const org of fetchableOrgs) {
      getEventsFromOrganization(org, apiKey ?? undefined)
        .then((orgEvents) => {
          if (cancelled) return;
          const sourced = orgEvents.map(({ location, ...e }) => ({
            ...e,
            location: location ?? org.address,
            sourceName: org.name,
            sourceImage: org.image,
            sourceImageClassName: org.imageClassName as string | undefined,
          }));
          setEvents((prev) => {
            const seen = new Set(prev.map((e) => e.id));
            const next = [...prev, ...sourced.filter((e) => !seen.has(e.id))];
            return next.sort((a, b) => a.start.getTime() - b.start.getTime());
          });
          setStatuses((prev) => ({ ...prev, [org.name]: "done" }));
        })
        .catch((err) => {
          console.error(`Failed to fetch events for ${org.name}:`, err);
          if (!cancelled) {
            setStatuses((prev) => ({ ...prev, [org.name]: "error" }));
          }
        });
    }

    return () => {
      cancelled = true;
    };
  }, [apiKey, organizations]);

  const allDone = Object.values(statuses).every((s) => s !== "loading");

  const grouped: Record<string, SourcedEvent[]> = {};
  for (const event of events) {
    const key = dateKey(event.start);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(event);
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <SourceStatusBar organizations={organizations} statuses={statuses} />

      {!allDone && events.length === 0 && (
        <p className="text-foreground/60">Loading events...</p>
      )}

      {allDone && events.length === 0 && (
        <p className="text-foreground/60">No upcoming events found.</p>
      )}

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
