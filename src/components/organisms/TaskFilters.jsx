import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { categoryService } from "@/services/api/categoryService";
import SearchBar from "@/components/molecules/SearchBar";
import CategoryChip from "@/components/molecules/CategoryChip";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const TaskFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  onClearFilters
}) => {
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesData = await categoryService.getAll();
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const statusOptions = [
    { value: "all", label: "All Tasks", icon: "List" },
    { value: "active", label: "Active", icon: "Circle" },
    { value: "completed", label: "Completed", icon: "CheckCircle" },
    { value: "today", label: "Due Today", icon: "Calendar" },
    { value: "overdue", label: "Overdue", icon: "AlertCircle" }
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" }
  ];

  const hasActiveFilters = selectedCategory?.Id !== "all" || 
                          statusFilter !== "all" || 
                          priorityFilter !== "all" || 
                          searchQuery;

  return (
    <div className="bg-white rounded-xl shadow-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search tasks..."
          className="flex-1 max-w-md"
        />
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <ApperIcon name="Filter" className="h-4 w-4" />
            Filters
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="gap-2"
            >
              <ApperIcon name="X" className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: showFilters ? "auto" : 0, opacity: showFilters ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="space-y-4 pt-4 border-t border-surface-200">
          {/* Status Filter */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Status</h4>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(option => (
                <Button
                  key={option.value}
                  variant={statusFilter === option.value ? "primary" : "outline"}
                  size="sm"
                  onClick={() => onStatusChange(option.value)}
                  className="gap-2"
                >
                  <ApperIcon name={option.icon} className="h-4 w-4" />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Category</h4>
            <div className="flex flex-wrap gap-2">
              <CategoryChip
                category={{ Id: "all", name: "All Categories", color: "#6B7280", icon: "Grid3x3" }}
                selected={selectedCategory?.Id === "all"}
                onClick={() => onCategoryChange({ Id: "all", name: "All Categories", color: "#6B7280", icon: "Grid3x3" })}
              />
              {categories.map(category => (
                <CategoryChip
                  key={category.Id}
                  category={category}
                  selected={selectedCategory?.Id === category.Id}
                  onClick={() => onCategoryChange(category)}
                />
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Priority</h4>
            <Select
              value={priorityFilter}
              onChange={(e) => onPriorityChange(e.target.value)}
              className="max-w-xs"
            >
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskFilters;