import { JSX } from "react";

const makeButton = (props: Partial<JSX.IntrinsicElements["a"]>) => {
  const { children, ...rest } = props;
  return (
    <a
      className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {props.children}
    </a>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center place-items-center text-center">
      <p className="text-4xl">Seattle Kink</p>
      <p>Seattle's kink scene is hard to find and get introduced to.</p>
      <p>
        This page tries to solve that by giving you the high level orientation
      </p>
      <p>Choose your destination:</p>

      <div className="flex gap-4 items-center flex-col sm:flex-row">
        {makeButton({ href: "", children: "Organizations" })}

        {makeButton({ href: "", children: "Venues" })}

        {makeButton({ href: "", children: "Calendars" })}
      </div>
    </main>
  );
}
