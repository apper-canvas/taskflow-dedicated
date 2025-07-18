import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className, 
  checked,
  onChange,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange && onChange(!checked)}
      className={cn(
        "inline-flex h-5 w-5 items-center justify-center rounded border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        checked 
          ? "bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500 text-white shadow-lg" 
          : "border-surface-300 bg-surface-50 hover:border-primary-300",
        className
      )}
      {...props}
    >
      {checked && (
        <ApperIcon 
          name="Check" 
          className="h-3 w-3 animate-bounce-in" 
        />
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;