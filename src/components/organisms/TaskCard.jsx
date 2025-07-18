import React, { useState } from "react";
import { motion } from "framer-motion";
import { format, isToday, isPast, parseISO } from "date-fns";
import { cn } from "@/utils/cn";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import CategoryChip from "@/components/molecules/CategoryChip";
import PriorityIndicator from "@/components/molecules/PriorityIndicator";
import ApperIcon from "@/components/ApperIcon";

const TaskCard = ({ 
  task, 
  category, 
  onToggleComplete, 
  onEdit, 
  onDelete 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    
    const date = parseISO(dueDate);
    if (isToday(date)) return "Today";
    return format(date, "MMM d, yyyy");
  };

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null;
    
    const date = parseISO(dueDate);
    if (task.completed) return "completed";
    if (isPast(date) && !isToday(date)) return "overdue";
    if (isToday(date)) return "today";
    return "upcoming";
  };

  const dueDateStatus = getDueDateStatus(task.dueDate);
  const formattedDueDate = formatDueDate(task.dueDate);

  const dueDateColors = {
    overdue: "text-error-500 bg-error-50",
    today: "text-warning-600 bg-warning-50",
    upcoming: "text-gray-600 bg-gray-50",
    completed: "text-success-600 bg-success-50"
  };

  return (
    <motion.div
      layout
      className={cn(
        "bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 border border-transparent hover:border-primary-200",
        task.completed && "opacity-75"
      )}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <Checkbox
              checked={task.completed}
              onChange={() => onToggleComplete(task.Id)}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className={cn(
                  "font-semibold text-gray-900 font-display",
                  task.completed && "line-through text-gray-500"
                )}>
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className={cn(
                    "mt-1 text-sm text-gray-600 font-body",
                    task.completed && "line-through text-gray-400",
                    !isExpanded && "truncate"
                  )}>
                    {task.description}
                  </p>
                )}
                
                {task.description && task.description.length > 100 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs text-primary-500 hover:text-primary-600 mt-1 font-medium"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="h-8 w-8 p-0"
                >
                  <ApperIcon name="Edit" className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.Id)}
                  className="h-8 w-8 p-0 text-error-500 hover:text-error-600 hover:bg-error-50"
                >
                  <ApperIcon name="Trash2" className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-3">
                {category && (
                  <CategoryChip 
                    category={category} 
                    className="pointer-events-none"
                  />
                )}
                
                <PriorityIndicator priority={task.priority} />
              </div>
              
              {formattedDueDate && (
                <div className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                  dueDateColors[dueDateStatus]
                )}>
                  <ApperIcon name="Calendar" className="h-3 w-3" />
                  {formattedDueDate}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;