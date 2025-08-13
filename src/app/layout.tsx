import type { Metadata } from "next";
import { Poppins } from "next/font/google";
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
        className={`${fontPoppins.variable} font-sans antialiased min-h-screen flex flex-col gap-2`}
      >
        <header className="w-2xl max-w-full place-self-center flex justify-center py-3 text-background bg-foreground">
          <p>Under construction!</p>
        </header>
        <div className="flex-grow grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-sans">
          {children}
        </div>
        <footer className="flex flex-col gap-[24px] flex-wrap items-center justify-center pb-5">
          Submit your recommendations:
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 border-2 border-foreground py-2 px-10"
            href="https://github.com/kinkcenter-org/seattlekink.com/discussions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </footer>
      </body>
    </html>
  );
}
