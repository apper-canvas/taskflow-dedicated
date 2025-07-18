import React from "react";
import { cn } from "@/utils/cn";

const PriorityIndicator = ({ 
  priority, 
  className,
  ...props 
}) => {
  const priorityConfig = {
    high: { color: "bg-priority-high", label: "High" },
    medium: { color: "bg-priority-medium", label: "Medium" },
    low: { color: "bg-priority-low", label: "Low" }
  };

  const config = priorityConfig[priority];

  return (
    <div 
      className={cn(
        "flex items-center gap-2",
        className
      )}
      {...props}
    >
      <div className={cn("h-3 w-1 rounded-full", config.color)} />
      <span className="text-sm font-medium text-gray-600">{config.label}</span>
    </div>
  );
};

export default PriorityIndicator;