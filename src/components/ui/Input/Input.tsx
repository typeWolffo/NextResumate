import React from "react";
import cx from "classnames";

type InputPropsBase = React.InputHTMLAttributes<HTMLInputElement>;

type InputProps =
  | (InputPropsBase & {
      label: string;
      name: string;
    })
  | (InputPropsBase & {
      label?: never;
      name: string;
    });

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => {
    const classes = cx(
      "rounded-md border-0 bg-neutral-100 text-neutral-700 focus:ring-brand-primary-500 focus:ring-offset-0 focus:ring-offset-transparent",
      className
    );

    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={props.name} className="text-sm text-neutral-700">
            {label}
          </label>
        )}
        <input ref={ref} className={classes} {...props} />
      </div>
    );
  }
);

Input.displayName = "Input";
