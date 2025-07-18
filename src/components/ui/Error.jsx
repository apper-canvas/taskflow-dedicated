import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong. Please try again.",
  onRetry,
  className,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center space-y-4",
        className
      )}
      {...props}
    >
      <div className="w-16 h-16 bg-gradient-to-r from-error-500 to-error-600 rounded-full flex items-center justify-center shadow-lg">
        <ApperIcon name="AlertCircle" className="h-8 w-8 text-white" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Oops! Something went wrong</h3>
        <p className="text-gray-600 max-w-md">{message}</p>
      </div>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="primary"
          className="gap-2"
        >
          <ApperIcon name="RefreshCw" className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;