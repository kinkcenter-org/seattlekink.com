import type { Metadata, Viewport } from "next";
import { Archivo_Black, Space_Mono } from "next/font/google";
import Link from "next/link";
import { JsonLd } from "@/src/components/JsonLd";
import { TopBar } from "@/src/components/TopBar";

import "./globals.css";

const fontDisplay = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

const fontMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: {
    default: "SeattleKink.com",
    template: "%s | SeattleKink.com",
  },
  description:
    "SeattleKink.com is a directory of Seattle kink venues, organizations, groups, and event calendars.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f0f0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "SeattleKink.com",
            url: "https://seattlekink.com",
            description:
              "A directory of Seattle kink venues, organizations, groups, and event calendars.",
          }}
        />
      </head>
      <body
        className={`${fontDisplay.variable} ${fontMono.variable} antialiased min-h-screen flex flex-col bg-ink text-paper`}
      >
        <TopBar />
        <div className="flex-1 flex flex-col w-full max-w-2xl mx-auto">
          {children}
        </div>
        <footer className="border-t border-grey-line px-5 py-4 text-sm leading-relaxed text-grey-dim">
          <div className="max-w-2xl mx-auto">
            Disclosure: This webpage is owned by Raven Dubh, President of
            KinkCenter.org.{" "}
            <Link
              className="underline decoration-dotted underline-offset-2 hover:text-paper"
              href="https://github.com/kinkcenter-org/seattlekink.com"
              target="_blank"
              rel="noopener"
            >
              Support wanted
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
