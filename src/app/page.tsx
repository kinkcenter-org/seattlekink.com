import type { Metadata } from "next";
import Link from "next/link";
import HalftoneOverlay from "@/src/components/HalftoneOverlay";

export const metadata: Metadata = {
  title: "Seattle Kink — Venues, Organizations & Events",
  description:
    "SeattleKink.com provides a high-level orientation to Seattle's kink scene, including venues, organizations, groups, and calendars.",
};

const links = [
  { href: "/venues", label: "VENUES" },
  { href: "/organizations", label: "ORGANIZATIONS" },
  { href: "/groups", label: "GROUPS" },
  { href: "/calendars", label: "CALENDARS" },
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col relative px-5 py-8">
      <HalftoneOverlay />
      <div className="relative flex flex-col gap-4">
        <p className="font-display text-2xl leading-tight text-paper">
          Seattle Kink
        </p>
        <p className="text-[15px] leading-relaxed text-[#e2e2e2]">
          Seattle&apos;s kink scene is hard to find and get introduced to.
        </p>
        <p className="text-[15px] leading-relaxed text-[#e2e2e2]">
          This page tries to solve that by giving you the high level
          orientation.
        </p>
        <p className="text-[15px] leading-relaxed text-[#e2e2e2]">
          This website will also provide some history and helpful tips that are
          nuanced wisdom about certain orgs and venues.
        </p>
        <p className="text-xs tracking-[0.16em] text-riso uppercase mt-4">
          Get started:
        </p>
        <div className="flex flex-col gap-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between border border-grey-box px-4 py-3 text-sm font-bold tracking-[0.08em] text-paper hover:border-riso hover:text-riso transition-colors"
            >
              {label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
