import Image from "next/image";
import { JsonLd } from "@/src/components/JsonLd";
import galleryErato from "./gallery-erato";
import kinkcenter from "./kinkcenter";
import subspace from "./subspace";
import type { Venue } from "./types";
export const VenueList: Venue[] = [galleryErato, subspace, kinkcenter];

const platformName = (url: string): string => {
  try {
    const host = new URL(url).hostname.replace("www.", "");
    if (host === "x.com" || host === "twitter.com") return "X";
    if (host === "instagram.com") return "Instagram";
    if (host === "facebook.com") return "Facebook";
    if (host === "tiktok.com") return "TikTok";
    if (host === "youtube.com") return "YouTube";
    if (host === "bsky.app") return "Bluesky";
    if (host === "threads.com") return "Threads";
    if (host === "stt.gg") return "Stoat";
    if (host === "fetlife.com") return "FetLife";
    if (host === "discord.gg" || host === "discord.com") return "Discord";
    return host;
  } catch {
    return url;
  }
};

export const VenueComponent = ({
  name,
  description,
  comments,
  image,
  imageClassName,
  website,
  socials,
  address,
  category,
  schema,
}: Venue & { category?: string }) => {
  return (
    <div key={name} className="px-5 py-6 border-b border-dashed border-riso/40">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div className="text-xs tracking-[0.16em] text-riso uppercase">
          {category ?? "Listing"}
        </div>
        {image ? (
          <Image
            src={image}
            alt={name}
            className={`h-8 w-auto max-w-24 object-contain shrink-0 ${imageClassName || ""}`}
          />
        ) : null}
      </div>
      <p className="font-display text-xl text-paper mb-2 leading-tight">
        {name}
      </p>
      <div className="flex flex-col gap-2 mb-1">
        {Array.from([description])
          .flat()
          .map((desc, i) => (
            <p
              key={`${name}-desc-${i}`}
              className="text-[15px] leading-relaxed text-[#e2e2e2]"
            >
              {desc}
            </p>
          ))}
      </div>
      {comments ? (
        <div className="flex flex-col gap-1.5 mt-1.5">
          {Array.from([comments])
            .flat()
            .map((comment, i) => (
              <p
                key={`${name}-comment-${i}`}
                className="text-sm leading-relaxed text-grey-mid"
              >
                {comment}
              </p>
            ))}
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-2.5 mt-3">
        {address ? (
          <span className="text-sm text-grey-mid border border-grey-box px-1.5 py-0.5">
            {address}
          </span>
        ) : null}
        {website ? (
          <a
            href={website}
            target="_blank"
            rel="noopener"
            className="text-sm font-bold text-riso border-b-[1.5px] border-riso"
          >
            {website.replace(/^https?:\/\//, "").replace(/\/$/, "")} &#8599;
          </a>
        ) : null}
        {socials?.map((url) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener"
            className="text-sm text-grey-mid border-b border-grey-box hover:text-paper hover:border-paper"
          >
            {platformName(url)}
          </a>
        ))}
      </div>
      {schema ? <JsonLd data={schema} /> : null}
    </div>
  );
};
