import cx from "classnames";
import React from "react";

type TextareaPropsBase = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type TextareaProps =
  | (TextareaPropsBase & {
      label: string;
      name: string;
    })
  | (TextareaPropsBase & {
      label?: never;
      name: string;
    });

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
        <textarea ref={ref} className={classes} {...props} />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
