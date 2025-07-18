import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, ...props }) => {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shimmer" />
        <div className="h-10 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shimmer" />
      </div>
      
      {/* Search bar skeleton */}
      <div className="h-10 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shimmer" />
      
      {/* Filter chips skeleton */}
      <div className="flex gap-2 flex-wrap">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="h-8 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shimmer" 
          />
        ))}
      </div>
      
      {/* Task cards skeleton */}
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-card space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="h-6 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer" />
                <div className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer" />
                <div className="h-4 w-2/3 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer" />
              </div>
              <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer ml-4" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shimmer" />
                <div className="h-4 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer" />
              </div>
              <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;