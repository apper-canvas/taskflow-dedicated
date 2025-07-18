import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const TaskForm = ({ 
  task = null, 
  onSubmit, 
  onCancel, 
  onTaskUpdate 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    priority: "medium",
    dueDate: ""
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadCategories();
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        categoryId: task.categoryId || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd'T'HH:mm") : ""
      });
    }
  }, [task]);

  const loadCategories = async () => {
    try {
      const categoriesData = await categoryService.getAll();
      setCategories(categoriesData);
    } catch (err) {
      toast.error("Failed to load categories");
      console.error("Error loading categories:", err);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const taskData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        completed: task?.completed || false
      };
      
      let result;
      if (task) {
        result = await taskService.update(task.Id, taskData);
        toast.success("Task updated successfully!");
      } else {
        result = await taskService.create(taskData);
        toast.success("Task created successfully!");
      }
      
      onTaskUpdate && onTaskUpdate();
      onSubmit && onSubmit(result);
      
      if (!task) {
        setFormData({
          title: "",
          description: "",
          categoryId: "",
          priority: "medium",
          dueDate: ""
        });
      }
      
    } catch (err) {
      toast.error(task ? "Failed to update task" : "Failed to create task");
      console.error("Error saving task:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 font-display">
          {task ? "Edit Task" : "Create New Task"}
        </h2>
        {onCancel && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0"
          >
            <ApperIcon name="X" className="h-4 w-4" />
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Task Title"
          error={errors.title}
          required
        >
          <Input
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter task title..."
            className={errors.title ? "border-error-500" : ""}
          />
        </FormField>

        <FormField
          label="Description"
          error={errors.description}
        >
          <Textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter task description..."
            rows={3}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Category"
            error={errors.categoryId}
            required
          >
            <Select
              value={formData.categoryId}
              onChange={(e) => handleChange("categoryId", e.target.value)}
              className={errors.categoryId ? "border-error-500" : ""}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.Id} value={category.Id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField
            label="Priority"
            error={errors.priority}
          >
            <Select
              value={formData.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </Select>
          </FormField>
        </div>

        <FormField
          label="Due Date"
          error={errors.dueDate}
        >
          <Input
            type="datetime-local"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
          />
        </FormField>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="flex-1"
          >
            {loading ? (
              <>
                <ApperIcon name="Loader2" className="h-4 w-4 animate-spin mr-2" />
                {task ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <ApperIcon name={task ? "Save" : "Plus"} className="h-4 w-4 mr-2" />
                {task ? "Update Task" : "Create Task"}
              </>
            )}
          </Button>
          
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;