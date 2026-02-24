import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";

import "./globals.css";

const fontPoppins = Poppins({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Seattle Kink",
  description: "A high-level view of Seattle Kink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontPoppins.variable} font-sans antialiased h-screen flex flex-col gap-2`}
      >
        <header className="w-2xl max-w-full place-self-center flex justify-center py-3">
          <nav>
            <Link href="/">
              <HomeIcon />
            </Link>
            <Link href="/" className="grow w-full text-center">
              <p className="text-2xl">SeattleKink.com</p>
            </Link>
            <Link
              href="https://github.com/kinkcenter-org/seattlekink.com"
              target="_blank"
            >
              <GitHubIcon />
            </Link>
          </nav>
        </header>
        <div className="grow flex flex-col items-center justify-items-center gap-16 font-sans overflow-scroll">
          {children}
        </div>
        <footer className="self-center justify-center text-center pb-1">
          Disclosure: This webpage is owned by Raven Dubh, President of
          KinkCenter.org.{" "}
          <a
            className="border-b border-dotted border-foreground/50 hover:border-solid inline"
            href="https://github.com/kinkcenter-org/seattlekink.com"
            target="_blank"
            rel="noopener"
          >
            Support wanted
          </a>
        </footer>
      </body>
    </html>
  );
}
