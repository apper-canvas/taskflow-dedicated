import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const CategoryChip = ({ 
  category, 
  selected = false, 
  onClick,
  className,
  ...props 
}) => {
  return (
    <button
      onClick={() => onClick && onClick(category)}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border-2 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
        selected 
          ? "text-white shadow-lg border-transparent" 
          : "bg-surface-50 border-surface-300 text-gray-700 hover:border-surface-400",
        className
      )}
      style={{
        backgroundColor: selected ? category.color : undefined,
        borderColor: selected ? category.color : undefined,
        focusRingColor: category.color
      }}
      {...props}
    >
      <ApperIcon name={category.icon} className="h-4 w-4" />
      {category.name}
    </button>
  );
};

export default CategoryChip;