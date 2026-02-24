"use client";

import { type FC, useEffect, useRef, useState } from "react";

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
    if (host === "fetlife.com") return "FetLife";
    if (host === "discord.gg" || host === "discord.com") return "Discord";
    return host;
  } catch {
    return url;
  }
};

const buttonClasses =
  "rounded-full border border-solid transition-colors flex items-center justify-center font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-39.5 bg-neutral-900 text-white dark:bg-neutral-200 dark:text-black border-transparent hover:opacity-80";

const SocialsButton: FC<{ socials: string[] }> = ({ socials }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  if (socials.length === 1) {
    return (
      <a
        className={buttonClasses}
        href={socials[0]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {platformName(socials[0])}
      </a>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className={buttonClasses + " cursor-pointer"}
        onClick={() => setOpen(!open)}
      >
        Socials
      </button>
      {open ? (
        <div className="absolute bottom-full mb-2 left-0 rounded-lg border border-gray-300 bg-neutral-200 dark:bg-neutral-900 shadow-lg py-1 min-w-40 z-10">
          {socials.map((url) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm hover:bg-neutral-300 dark:hover:bg-neutral-800 transition-colors"
            >
              {platformName(url)}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SocialsButton;
