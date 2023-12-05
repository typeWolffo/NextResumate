import { cva, type VariantProps } from "class-variance-authority";
import { ButtonOrLink, type ButtonOrLinkProps } from "./ButtonOrLink";
import { useState, useCallback, type MouseEvent } from "react";

const buttonStyles = cva(
  "flex items-center justify-center px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-white dark:focus:ring-offset-black focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80",
  {
    variants: {
      intent: {
        primary: "bg-brand-primary text-white",
        secondary:
          "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 focus:ring-gray-500",
        danger: "bg-red-500 text-white focus:ring-red-500",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);

export interface Props
  extends ButtonOrLinkProps,
    VariantProps<typeof buttonStyles> {
  onClick?: (e: MouseEvent) => void | Promise<void>;
  loadingText?: string;
}

export function Button({
  intent,
  fullWidth,
  onClick,
  className,
  loadingText = "Loading...",
  ...props
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (onClick) {
        const result = onClick(e);
        if (result instanceof Promise) {
          setLoading(true);
          result
            .catch((error) => setError(error))
            .finally(() => {
              setLoading(false);
            });
        }
      }
    },
    [onClick],
  );

  if (error) {
    throw error;
  }

  return (
    <ButtonOrLink
      className={buttonStyles({ intent, fullWidth, className })}
      onClick={handleClick}
      {...props}
    >
      {loading ? loadingText : props.children}
    </ButtonOrLink>
  );
}
