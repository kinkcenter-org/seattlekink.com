export const JsonLd = ({ data }: { data: object }) => (
  <script
    type="application/ld+json"
    // biome-ignore lint/security/noDangerouslySetInnerHtml: Needed
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
