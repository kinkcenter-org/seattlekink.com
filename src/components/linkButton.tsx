import type { FC, JSX } from "react";

const baseClasses =
  "rounded-full border border-solid transition-colors flex items-center justify-center font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-39.5";

const defaultClasses =
  baseClasses +
  " bg-neutral-900 text-white dark:bg-neutral-200 dark:text-black border-transparent hover:opacity-80";

const invertClasses =
  baseClasses +
  " bg-neutral-900 dark:bg-neutral-200 text-background hover:opacity-80";

type LinkButtonProps = JSX.IntrinsicElements["a"] & { invert?: boolean };

const LinkButton: FC<LinkButtonProps> = (props) => {
  const { children, invert, ...rest } = props;
  return (
    <a
      className={invert ? invertClasses : defaultClasses}
      target={props.href?.startsWith("/") ? "_self" : "_blank"}
      rel="noopener"
      {...rest}
    >
      {children}
    </a>
  );
};

export default LinkButton;
