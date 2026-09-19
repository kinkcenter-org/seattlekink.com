"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/venues", label: "VENUES" },
  { href: "/organizations", label: "ORGS" },
  { href: "/groups", label: "GROUPS" },
  { href: "/calendars", label: "CAL" },
];

const isActive = (pathname: string, href: string) => pathname.startsWith(href);

export const TopBar = () => {
  const pathname = usePathname();
  return (
    <header className="border-b-4 border-riso relative">
      <div className="max-w-2xl mx-auto px-5 pt-6 pb-4">
        <Link href="/" className="block">
          <h1
            data-text="SEATTLE KINK"
            className="misreg font-display text-[34px] sm:text-[42px] leading-[0.92] tracking-tight text-paper"
          >
            SEATTLE
            <br />
            KINK
          </h1>
        </Link>
        <div className="mt-2 text-xs tracking-[0.2em] text-riso">
          seattlekink.com
        </div>
        <nav aria-label="Primary" className="mt-4 -mx-1 flex flex-wrap gap-1">
          {navItems.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-2.5 py-1.5 text-sm tracking-widest border ${
                  active
                    ? "bg-riso text-ink border-riso font-bold"
                    : "border-grey-box text-grey-mid hover:text-paper hover:border-paper"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
