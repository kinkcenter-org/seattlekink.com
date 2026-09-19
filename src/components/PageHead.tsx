import type { ReactNode } from "react";

export const PageHead = ({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) => (
  <div className="px-5 pt-6 pb-5 border-b-4 border-riso">
    <div className="text-xs tracking-[0.25em] text-riso uppercase mb-1">
      {label}
    </div>
    <h2 className="font-display text-[26px] leading-none text-paper mb-3">
      {title}
    </h2>
    {children ? (
      <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-[#e2e2e2]">
        {children}
      </div>
    ) : null}
  </div>
);
