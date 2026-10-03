import type { Organization } from "../organizations/types";

export type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
  calendarLink?: string;
  eventUrl?: string;
};

// --- Google Calendar ---

type GoogleCalendarDateTime = {
  date?: string;
  dateTime?: string;
  timeZone?: string;
};

type GoogleCalendarPerson = {
  email?: string;
  displayName?: string;
  self?: boolean;
};

export type GoogleCalendarEvent = {
  kind?: string;
  etag?: string;
  id: string;
  status?: string;
  htmlLink?: string;
  created?: string;
  updated?: string;
  summary?: string;
  description?: string;
  location?: string;
  creator?: GoogleCalendarPerson;
  organizer?: GoogleCalendarPerson;
  start?: GoogleCalendarDateTime;
  end?: GoogleCalendarDateTime;
  recurringEventId?: string;
  originalStartTime?: GoogleCalendarDateTime;
  iCalUID?: string;
  sequence?: number;
  eventType?: string;
  extendedProperties?: {
    private?: Record<string, string>;
    shared?: Record<string, string>;
  };
};

type GoogleCalendarResponse = {
  items?: GoogleCalendarEvent[];
  error?: { message: string };
};

function extractUrlFromDescription(description?: string): string | undefined {
  if (!description) return undefined;
  const hrefMatch = description.match(/href="(https?:\/\/[^"]+)"/);
  if (hrefMatch) return hrefMatch[1];
  const plainMatch = description.match(/https?:\/\/\S+/);
  return plainMatch?.[0];
}

function parseGoogleDate(dt?: GoogleCalendarDateTime): Date {
  if (!dt) return new Date();
  return new Date(dt.dateTime ?? dt.date ?? "");
}

async function getEventsFromGoogleCalendar(
  calendarId: string,
  apiKey: string,
  calendarEventToUrl?: Organization["calendarEventToUrl"],
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
    throw new Error(
      `Google Calendar error for ${calendarId}: ${data.error.message}`,
    );
  }

  return (data.items ?? []).map((item) => {
    let eventUrl = extractUrlFromDescription(item.description);
    if (calendarEventToUrl && Object.keys(calendarEventToUrl).length) {
      const keyOfItem = Object.keys(calendarEventToUrl)[0] as keyof typeof item;
      const urlPattern = Object.values(calendarEventToUrl)[0];
      eventUrl = urlPattern.replace(
        `{${keyOfItem}}`,
        // @ts-expect-error -- This is always true
        item[keyOfItem] ?? "",
      );
    }

    return {
      id: item.id,
      title: item.summary ?? "Untitled Event",
      description: item.description,
      location: item.location,
      start: parseGoogleDate(item.start),
      end: parseGoogleDate(item.end),
      calendarLink: item.htmlLink,
      eventUrl,
    };
  });
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
      eventUrl: item.checkout_url,
    }));
}

// --- Wix Events ---

// App ID of Wix Events, the same on every Wix site.
const WIX_EVENTS_APP_ID = "140603ad-af8d-84a5-2c80-a0f60cb47351";

type WixAccessTokens = {
  apps?: Record<string, { instance?: string }>;
};

type WixEvent = {
  id: string;
  title?: string;
  description?: string;
  slug?: string;
  location?: { address?: string };
  scheduling?: {
    config?: { scheduleTbd?: boolean; startDate?: string; endDate?: string };
  };
};

type WixCalendarResponse = {
  events?: WixEvent[];
};

async function getEventsFromWix({
  siteUrl,
  compId,
}: NonNullable<Organization["wixEvents"]>): Promise<CalendarEvent[]> {
  const now = new Date();
  const max = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  // The calendar endpoint rejects requests without the site's visitor token.
  const tokenRes = await fetch(`${siteUrl}/_api/v1/access-tokens`);
  const tokens: WixAccessTokens = await tokenRes.json();
  const instance = tokens.apps?.[WIX_EVENTS_APP_ID]?.instance;
  if (!instance) throw new Error(`No Wix Events token for ${siteUrl}`);

  const params = new URLSearchParams({
    referenceDate: now.toISOString(),
    filter: "1",
    byEventId: "false",
    members: "true",
    paidPlans: "true",
    locale: "en",
    showcase: "false",
    filterType: "2",
    sortOrder: "0",
    multiDayExperimentEnabled: "true",
    expandBounds: "true",
    fetchBadges: "true",
    draft: "false",
    compId,
    tz: "America/Los_Angeles",
  });

  const res = await fetch(
    `${siteUrl}/_api/wix-one-events-server/web/calendar-events/viewer?${params}`,
    { headers: { Authorization: instance } },
  );
  if (!res.ok)
    throw new Error(`Wix Events error for ${siteUrl}: ${res.status}`);
  const data: WixCalendarResponse = await res.json();

  return (data.events ?? [])
    .filter((item) => {
      const config = item.scheduling?.config;
      if (!config?.startDate || !config.endDate || config.scheduleTbd) {
        return false;
      }
      return (
        new Date(config.endDate) >= now && new Date(config.startDate) <= max
      );
    })
    .map((item) => ({
      id: item.id,
      title: item.title ?? "Untitled Event",
      description: item.description,
      location: item.location?.address,
      start: new Date(item.scheduling?.config?.startDate ?? ""),
      end: new Date(item.scheduling?.config?.endDate ?? ""),
      eventUrl: item.slug ? `${siteUrl}/event-details/${item.slug}` : siteUrl,
    }));
}

// --- Main entry point ---

export function hasCalendarFeed(org: Organization): boolean {
  return !!(org.calendarId || org.ticketTailorFeedUrl || org.wixEvents);
}

export async function getEventsFromOrganization(
  org: Organization,
  googleApiKey?: string,
): Promise<CalendarEvent[]> {
  if (org.calendarId) {
    // Without this, a build missing the key shows every Google org as loaded with no events.
    if (!googleApiKey) throw new Error("NEXT_PUBLIC_GOOGLE_API_KEY is not set");
    return getEventsFromGoogleCalendar(
      org.calendarId,
      googleApiKey,
      org.calendarEventToUrl,
    );
  }
  if (org.ticketTailorFeedUrl) {
    return getEventsFromTicketTailor(org.ticketTailorFeedUrl);
  }
  if (org.wixEvents) {
    return getEventsFromWix(org.wixEvents);
  }
  return [];
}
