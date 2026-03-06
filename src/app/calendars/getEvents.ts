import type { Organization } from "../organizations/types";

export type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
  htmlLink?: string;
};

// --- Google Calendar ---

type GoogleCalendarEvent = {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
};

type GoogleCalendarResponse = {
  items?: GoogleCalendarEvent[];
  error?: { message: string };
};

function parseGoogleDate(dt?: { dateTime?: string; date?: string }): Date {
  if (!dt) return new Date();
  return new Date(dt.dateTime ?? dt.date ?? "");
}

async function getEventsFromGoogleCalendar(
  calendarId: string,
  apiKey: string,
): Promise<CalendarEvent[]> {
  const timeMin = new Date().toISOString();
  const timeMax = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const params = new URLSearchParams({
    key: apiKey,
    singleEvents: "true",
    orderBy: "startTime",
    timeMin,
    timeMax,
    maxResults: "100",
  });

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;
  const res = await fetch(url);
  const data: GoogleCalendarResponse = await res.json();

  if (data.error) {
    console.error(`Google Calendar error for ${calendarId}:`, data.error.message);
    return [];
  }

  return (data.items ?? []).map((item) => ({
    id: item.id,
    title: item.summary ?? "Untitled Event",
    description: item.description,
    location: item.location,
    start: parseGoogleDate(item.start),
    end: parseGoogleDate(item.end),
    htmlLink: item.htmlLink,
  }));
}

// --- Ticket Tailor ---

type TicketTailorEvent = {
  id: string;
  name?: string;
  description?: string;
  start?: { iso?: string };
  end?: { iso?: string };
  status?: string;
  venue?: { name?: string };
  checkout_url?: string;
};

async function getEventsFromTicketTailor(
  feedUrl: string,
): Promise<CalendarEvent[]> {
  const now = new Date();
  const res = await fetch(feedUrl);
  const data = await res.json();

  const items: TicketTailorEvent[] = Array.isArray(data)
    ? data
    : Object.values(data).filter(
        (v): v is TicketTailorEvent =>
          typeof v === "object" && v !== null && "id" in v,
      );

  return items
    .filter(
      (item) =>
        item.status === "published" &&
        item.start?.iso &&
        new Date(item.start.iso) >= now,
    )
    .map((item) => ({
      id: String(item.id),
      title: item.name ?? "Untitled Event",
      description: item.description,
      location: item.venue?.name,
      start: new Date(item.start?.iso ?? ""),
      end: new Date(item.end?.iso ?? ""),
      htmlLink: item.checkout_url,
    }));
}

// --- Main entry point ---

export function hasCalendarFeed(org: Organization): boolean {
  return !!(org.calendarId || org.ticketTailorFeedUrl);
}

export async function getEventsFromOrganization(
  org: Organization,
  googleApiKey?: string,
): Promise<CalendarEvent[]> {
  if (org.calendarId && googleApiKey) {
    return getEventsFromGoogleCalendar(org.calendarId, googleApiKey);
  }
  if (org.ticketTailorFeedUrl) {
    return getEventsFromTicketTailor(org.ticketTailorFeedUrl);
  }
  return [];
}
