import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks found",
  description = "Get started by creating your first task to stay organized and productive.",
  icon = "CheckSquare",
  actionLabel = "Create Task",
  onAction,
  className,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center space-y-6",
        className
      )}
      {...props}
    >
      <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-premium">
        <ApperIcon name={icon} className="h-10 w-10 text-white" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 font-display">{title}</h3>
        <p className="text-gray-600 max-w-md font-body">{description}</p>
      </div>
      
      {onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
          size="lg"
          className="gap-2 shadow-premium"
        >
          <ApperIcon name="Plus" className="h-5 w-5" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;