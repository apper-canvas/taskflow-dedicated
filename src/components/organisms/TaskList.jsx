import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";
import { toast } from "react-toastify";
import TaskCard from "@/components/organisms/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { isToday, isPast, parseISO } from "date-fns";

const TaskList = ({ 
  searchQuery, 
  selectedCategory, 
  statusFilter, 
  priorityFilter,
  onCreateTask,
  onEditTask,
  onTaskUpdate
}) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.Id === taskId ? updatedTask : task
        ));
        onTaskUpdate && onTaskUpdate();
        toast.success(
          updatedTask.completed ? "Task completed! 🎉" : "Task reopened"
        );
      }
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error toggling task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const success = await taskService.delete(taskId);
      if (success) {
        setTasks(prev => prev.filter(task => task.Id !== taskId));
        onTaskUpdate && onTaskUpdate();
        toast.success("Task deleted successfully");
      }
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!task.title.toLowerCase().includes(query) && 
          !task.description.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory && selectedCategory.Id !== "all") {
      if (task.categoryId !== selectedCategory.Id.toString()) {
        return false;
      }
    }

    // Status filter
    if (statusFilter === "active" && task.completed) return false;
    if (statusFilter === "completed" && !task.completed) return false;
    if (statusFilter === "today") {
      if (!task.dueDate || !isToday(parseISO(task.dueDate))) return false;
    }
    if (statusFilter === "overdue") {
      if (!task.dueDate || task.completed || !isPast(parseISO(task.dueDate))) return false;
    }

    // Priority filter
    if (priorityFilter && priorityFilter !== "all") {
      if (task.priority !== priorityFilter) return false;
    }

    return true;
  });

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id.toString() === categoryId);
  };

  if (loading) {
    return <Loading className="p-6" />;
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={loadData}
        className="p-6"
      />
    );
  }

  if (filteredTasks.length === 0) {
    if (tasks.length === 0) {
      return (
        <Empty
          title="No tasks yet"
          description="Get started by creating your first task to stay organized and productive."
          icon="CheckSquare"
          actionLabel="Create Your First Task"
          onAction={onCreateTask}
          className="p-6"
        />
      );
    }
    
    return (
      <Empty
        title="No tasks match your filters"
        description="Try adjusting your search or filters to find the tasks you're looking for."
        icon="Search"
        actionLabel="Create New Task"
        onAction={onCreateTask}
        className="p-6"
      />
    );
  }

  return (
    <div className="space-y-4 p-6">
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <TaskCard
              task={task}
              category={getCategoryById(task.categoryId)}
              onToggleComplete={handleToggleComplete}
              onEdit={onEditTask}
              onDelete={handleDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;