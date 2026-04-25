# AEO / SEO / Schema Plan

## Overview

Three parallel workstreams, executed in order:
1. **Per-page metadata (SEO)** — add `metadata` exports to every page and `generateMetadata` to dynamic routes
2. **AEO copy optimization** — rewrite all `description` / `comments` fields in venue and org data files to be entity-first, standalone, and declarative per AEO rules
3. **Structured data / JSON-LD** — add schema.org JSON-LD to layout, venue pages, org cards, and FAQ content

All content changes must be grounded in facts already present in the codebase. No new facts will be invented.

---

## Phase 1 — Per-Page Metadata (SEO)

### 1.1 `src/app/layout.tsx`
Update global metadata:
```ts
export const metadata: Metadata = {
  title: {
    default: "SeattleKink.com",
    template: "%s | SeattleKink.com",
  },
  description:
    "SeattleKink.com is a directory of Seattle kink venues, organizations, groups, and event calendars.",
};
```

### 1.2 `src/app/page.tsx`
Add metadata export:
```ts
export const metadata: Metadata = {
  title: "Seattle Kink — Venues, Organizations & Events",
  description:
    "SeattleKink.com provides a high-level orientation to Seattle's kink scene, including venues, organizations, groups, and calendars.",
};
```

### 1.3 `src/app/venues/page.tsx`
Add metadata export:
```ts
export const metadata: Metadata = {
  title: "Kink Venues in Seattle",
  description:
    "A directory of kink and sex-positive venues in Seattle and the greater Seattle area, including Kink Center, SubSpace, and Gallery Erato.",
};
```

### 1.4 `src/app/venues/[name]/page.tsx`
Add `generateMetadata`:
```ts
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { name } = await props.params;
  const venue = VenueList.find(
    (v) => v.name.toLowerCase().replaceAll(" ", "-") === name,
  );
  if (!venue) return {};
  return {
    title: venue.name,
    description: Array.isArray(venue.description)
      ? venue.description[0]
      : venue.description,
  };
}
```

### 1.5 `src/app/organizations/page.tsx`
Add metadata export:
```ts
export const metadata: Metadata = {
  title: "Kink Organizations in Seattle",
  description:
    "A directory of kink and sex-positive organizations in Seattle, including CSPC, Sanctum Seattle, Kink Center, Magpie Kink, and SubSpace.",
};
```

### 1.6 `src/app/groups/page.tsx`
Add metadata export:
```ts
export const metadata: Metadata = {
  title: "Kink Groups in Seattle",
  description:
    "Seattle kink groups that organize socials, munches, and community events.",
};
```

### 1.7 `src/app/calendars/page.tsx`
Add metadata export:
```ts
export const metadata: Metadata = {
  title: "Seattle Kink Event Calendars",
  description:
    "Event calendars for Seattle kink organizations and venues, including Kink Center, Gallery Erato, and CSPC.",
};
```

---

## Phase 2 — AEO Copy Optimization

Rules applied per AEO style guide:
- Entity-first phrasing
- No pronouns referring to the entity
- Standalone sentences (no "here", "above", "this space")
- Declarative language (no "typically", "generally", "often")
- No marketing framing or filler

### 2.1 `src/app/venues/kinkcenter/index.ts`

**description** (rewrite):
```
"Kink Center is a configurable, accessibility-first community event space in Capitol Hill, Seattle.",
"Kink Center focuses on providing space to kink community groups that otherwise have no dedicated venue.",
"Kink Center accepts rental inquiries and sometimes hosts events directly at the Kink Center venue.",
```

**comments** (rewrite):
```
"The Kink Center venue is ADA accessible throughout, with modern HVAC, air filtration, and monitored CO2 levels.",
"Kink Center is located at 814 E Pike St, Seattle, WA 98122.",
"Kink Center operates under the umbrella of KinkCenter.org.",
```

### 2.2 `src/app/venues/subspace/index.ts`

**description** (rewrite):
```
"SubSpace is a dungeon and studio play space in South Seattle available for private and event rentals.",
"SubSpace is a non-discriminatory, all-inclusive membership organization open to all kinks and orientations.",
"SubSpace hosts approximately 200 events per year.",
```

**comments** (rewrite):
```
"SubSpace hosts routine workshops, socials, and play parties at the SubSpace venue in Tukwila.",
```

### 2.3 `src/app/venues/gallery-erato/index.ts`

**description** (rewrite):
```
"Gallery Erato is an art and education venue operated by Pan Eros Foundation in SoDo, Seattle.",
"Pan Eros Foundation promotes consent education and sexuality across race, ethnicity, gender, orientation, identity, ability, class, and religion.",
```

**comments** (rewrite):
```
"Gallery Erato is the formal venue name for the gallery operated by Pan Eros Foundation.",
"Pan Eros Foundation was previously known as Foundation for Sex Positive Culture (FSPC), which split into Pan Eros Foundation and CSPC.",
```

### 2.4 `src/app/organizations/cspc/index.ts`

**description** (rewrite):
```
"CSPC (Center for Sex Positive Culture) creates spaces to celebrate, develop, and explore sexuality and sensuality among a diverse community.",
"CSPC holds events exclusively at Gallery Erato, operated by Pan Eros Foundation.",
```

**comments** (rewrite):
```
"CSPC operates as a 501(c)(7) nonprofit and requires an active membership for event access.",
"Most CSPC parties include a New Member Orientation (NMO) beforehand, which grants a one-month membership.",
"Attendees can purchase an NMO ticket, complete the orientation, and attend the party immediately after — confirm current schedule on the CSPC website.",
```

### 2.5 `src/app/organizations/sanctum/index.ts`

**description** (rewrite):
```
"Sanctum Seattle organizes inclusive social and educational kink events in the Greater Seattle Area.",
"Sanctum Seattle is dedicated to consistent community gatherings in a risk-aware, consent-forward environment.",
```

**comments** (rewrite):
```
"Sanctum Seattle hosts play parties nearly every weekend and multiple socials throughout each week.",
```

### 2.6 `src/app/organizations/magpie-kink/index.ts`

**description** (rewrite):
```
"Magpie Kink Education is a kink education organization based in Seattle, Washington.",
```

**comments** (rewrite):
```
"Mz. Magpie teaches bondage, negotiation, sex toys, open relationships, rough body play, and trampling.",
"Magpie Kink Education includes additional educators — see the Magpie Kink website for the full roster.",
```

---

## Phase 3 — Structured Data / JSON-LD

### 3.1 Create `src/components/JsonLd.tsx`

A minimal wrapper component that renders a `<script type="application/ld+json">` tag.

```tsx
export const JsonLd = ({ data }: { data: object }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
```

### 3.2 Add WebSite schema to `src/app/layout.tsx`

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SeattleKink.com",
  "url": "https://seattlekink.com",
  "description": "A directory of Seattle kink venues, organizations, groups, and event calendars."
}
```

### 3.3 Add `schema` field to `Organization` type

Extend `src/app/organizations/types.d.ts` to allow each entity to carry its own schema.org object:

```ts
schema?: Record<string, unknown>;
```

### 3.4 Venue JSON-LD schemas

Add `schema` fields to each venue data file using `LocalBusiness` (or `EventVenue` subtype).

**kinkcenter:**
```json
{
  "@context": "https://schema.org",
  "@type": "EventVenue",
  "name": "Kink Center",
  "url": "https://kinkcenter.org/",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "814 E Pike St",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "postalCode": "98122",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://instagram.com/kinkcenter",
    "https://www.threads.com/@kinkcenter",
    "https://bsky.app/profile/kinkcenter.org"
  ]
}
```

**gallery-erato:**
```json
{
  "@context": "https://schema.org",
  "@type": "EventVenue",
  "name": "Gallery Erato",
  "url": "https://www.pan-eros.org/",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "309 1st Ave S",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "postalCode": "98104",
    "addressCountry": "US"
  },
  "sameAs": ["https://www.instagram.com/paneros_events"]
}
```

**subspace:**
```json
{
  "@context": "https://schema.org",
  "@type": "EventVenue",
  "name": "SubSpace",
  "url": "https://subspaceseattle.com/",
  "addressLocality": "Tukwila",
  "addressRegion": "WA",
  "addressCountry": "US"
}
```

### 3.5 Organization JSON-LD schemas

Add `schema` fields to org data files using `Organization` type.

**cspc:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Center for Sex Positive Culture",
  "alternateName": "CSPC",
  "url": "https://thecspc.org/",
  "sameAs": [
    "https://www.instagram.com/the.cspc/",
    "https://www.reddit.com/r/CSPC_Seattle/"
  ]
}
```

**sanctum:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sanctum Seattle",
  "url": "https://www.sanctumseattle.com/",
  "sameAs": [
    "https://www.instagram.com/sanctumseattle/"
  ]
}
```

**magpie:**
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Magpie Kink Education",
  "url": "https://magpiekink.com/"
}
```

### 3.6 Render JSON-LD in `VenueComponent`

Update `src/app/venues/index.tsx` to render `<JsonLd data={schema} />` when a `schema` field is present on the entity.

### 3.7 Expand venue detail page (`src/app/venues/[name]/page.tsx`)

Currently renders only `<p>{venue.name}</p>`. Expand to render the full `VenueComponent` output plus the venue's JSON-LD schema. This enables structured data per-URL for individual venue pages.

### 3.8 FAQ content and FAQPage schema

Add a `faq?: { question: string; answer: string }[]` field to the `Organization` type.

Populate FAQ entries for Kink Center, SubSpace, Gallery Erato, CSPC, and Sanctum Seattle — derived strictly from existing verified data in each entity's data file.

Create a `src/components/Faq.tsx` component that renders the FAQ list visually and emits a `FAQPage` JSON-LD block.

**Example schema shape:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Kink Center venue?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kink Center venue is a configurable, accessibility-first community event space located at 814 E Pike St in Capitol Hill, Seattle."
      }
    }
  ]
}
```

---

## Phase 4 — Validation

- Run `tsc --noEmit` to verify no type errors introduced
- Manually confirm JSON-LD renders in page source for `/`, `/venues`, `/venues/kink-center`, `/organizations`
- Confirm no fabricated content: every FAQ answer must be traceable to an existing field in a data file

---

## Cleanup

Remove this `PLAN.md` after execution is complete and validated.
