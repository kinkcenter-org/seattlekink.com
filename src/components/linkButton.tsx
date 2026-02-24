import type { FC, JSX } from "react";

const LinkButton: FC<JSX.IntrinsicElements["a"]> = (props) => {
  const { children, ...rest } = props;
  return (
    <a
      className="rounded-full border border-solid border-black/8 dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-39.5"
      target={props.href?.startsWith("/") ? "_self" : "_blank"}
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
};

export default LinkButton;
