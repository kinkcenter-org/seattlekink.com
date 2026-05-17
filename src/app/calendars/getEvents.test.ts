import { describe, expect, test } from "bun:test";
import cspc from "../organizations/cspc";
import galleryErato from "../venues/gallery-erato";
import kinkcenter from "../venues/kinkcenter";
import { hasCalendarFeed } from "./getEvents";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "";

// All orgs/venues/groups that have a Google Calendar feed.
// Add an import here when a new entry with calendarId is added to the site.
const googleCalendarOrgs = [cspc, galleryErato, kinkcenter].filter(
  (org): org is typeof org & { calendarId: string } => !!org.calendarId,
);

describe("hasCalendarFeed", () => {
  test("returns true for an org with a calendarId", () => {
    expect(
      hasCalendarFeed({ name: "X", description: "", calendarId: "abc" }),
    ).toBe(true);
  });

  test("returns true for an org with a ticketTailorFeedUrl", () => {
    expect(
      hasCalendarFeed({
        name: "X",
        description: "",
        ticketTailorFeedUrl: "https://example.com",
      }),
    ).toBe(true);
  });

  test("returns false for an org with neither feed", () => {
    expect(hasCalendarFeed({ name: "X", description: "" })).toBe(false);
  });
});

// The API key is restricted to the site's domain, so requests without a
// Referer are blocked by Google. These tests send the expected Referer to
// validate each calendarId is actually accessible via the key.
describe("Google Calendar endpoints reachable from seattlekink.com", () => {
  for (const org of googleCalendarOrgs) {
    test(
      `${org.name} — calendarId accessible with site Referer`,
      async () => {
        const params = new URLSearchParams({
          key: API_KEY,
          singleEvents: "true",
          maxResults: "1",
        });
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(org.calendarId)}/events?${params}`;
        const res = await fetch(url, {
          headers: { Referer: "https://seattlekink.com" },
        });
        const data = await res.json();
        expect(data.error).toBeUndefined();
        expect(
          data.items === undefined || Array.isArray(data.items),
        ).toBe(true);
      },
      { timeout: 10_000 },
    );
  }
});
