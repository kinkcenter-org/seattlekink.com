import type { Organization } from "../types";
import image from "./logo.avif";

export default {
  name: "Sanctum Seattle",
  description: [
    "Sanctum Seattle, founded with the vision of creating inclusive social, and educational events, aims to provide opportunities for personal growth and community building in a risk-aware and consent-forward environment",
    "Sanctum Seattle is dedicated to establishing consistent social gatherings in the Greater Seattle Area, offering a variety of themed events to promote inclusivity and community engagement.",
  ],
  comments: [
    "Sanctum Seattle hosts play parties nearly every weekend and multiple socials throughout each week.",
  ],
  image,
  socials: [
    "https://www.instagram.com/sanctumseattle/",
    "https://discord.gg/pVWajc7fy",
  ],
  website: "https://www.sanctumseattle.com/",
  ticketTailorFeedUrl:
    "https://calendar.apiboomtech.com/api/ticket_tailor_events?comp_id=comp-mjgnq1v1&instance=viJNHINmm0a0FxqXgyk5suPjYR08tyqlMmhPXrkLk38.eyJpbnN0YW5jZUlkIjoiOTE1NGQyYzEtMWM3Yi00ZTAyLTg0YmEtYjY1MjY4NGFiMzBkIiwiYXBwRGVmSWQiOiIxM2I0YTAyOC0wMGZhLTcxMzMtMjQyZi00NjI4MTA2YjhjOTEiLCJzaWduRGF0ZSI6IjIwMjYtMDMtMDZUMjA6NDU6MjcuODY5WiIsInZlbmRvclByb2R1Y3RJZCI6InBybyIsImRlbW9Nb2RlIjpmYWxzZSwiYWlkIjoiNjM0OTlhYWUtNTJhMi00NzI1LTkwYzctZmEyMjQ4NWQ1MmFhIiwic2l0ZU93bmVySWQiOiI5NzkyNGZkOC1jZjU1LTQ3YjYtYTI4NS0wYzNlMmJhNGZlYTEiLCJicyI6ImJYR3FleWZoVWF1NkMzaXJkb0lLY2FFWno3emhPWVktdG9WMVUxVVVTbmsiLCJzY2QiOiIyMDI0LTA4LTIyVDIzOjM2OjM2LjU0NFoifQ",
} satisfies Organization;
