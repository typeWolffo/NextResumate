import { forwardRef, type InputHTMLAttributes, useState } from "react";
import { motion, type MotionProps } from "framer-motion";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

type MotionCheckboxProps = Omit<
  CheckboxProps,
  "onAnimationStart" | "onAnimationComplete" | "onUpdate"
> &
  MotionProps;

const Checkbox = forwardRef<HTMLInputElement, MotionCheckboxProps>(
  ({ label, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div className="flex items-center gap-2">
        <motion.input
          className="select-none rounded text-brand-primary checked:border-transparent checked:bg-brand-primary-500 focus:outline-0 focus:ring-0 checked:focus:bg-brand-primary-500"
          ref={ref}
          type="checkbox"
          animate={isHovered ? { scale: 1.1 } : undefined}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.5 }}
          id={props.name}
          {...props}
        />
        {label && (
          <label
            className="select-none"
            htmlFor={props.name}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
