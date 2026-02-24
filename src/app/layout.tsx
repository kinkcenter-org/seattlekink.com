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
              <p className="text-2xl">SeattleKink.com</p>
            </Link>
          </nav>
        </header>
        <div className="flex-grow flex flex-col items-center justify-items-center gap-16 font-sans overflow-y-auto">
          {children}
        </div>
        <footer className="self-center justify-center text-center pb-5">
          Disclosure: This webpage is owned by Raven Dubh, President of
          KinkCenter.org. All are welcome to make suggestions on{" "}
          <a
            className="border-b border-dotted border-foreground/50 hover:border-solid inline"
            href="https://github.com/kinkcenter-org/seattlekink.com/discussions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          , and Pull Requests to make changes are very welcomed. You can also{" "}
          <a
            className="border-b border-dotted border-foreground/50 hover:border-solid inline"
            href="https://fetlife.com/conversations/new?with=1678688&source=profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            message @tehraven on FetLife
          </a>{" "}
          if you want to
        </footer>
      </body>
    </html>
  );
}
