import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { taskService } from "@/services/api/taskService";
import Button from "@/components/atoms/Button";
import ProgressRing from "@/components/molecules/ProgressRing";
import ApperIcon from "@/components/ApperIcon";
import { isToday, parseISO } from "date-fns";

const TaskHeader = ({ onCreateTask, onRefresh }) => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    todayTasks: 0,
    overdueCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const tasks = await taskService.getAll();
      
      const completed = tasks.filter(task => task.completed).length;
      const todayTasks = tasks.filter(task => 
        task.dueDate && isToday(parseISO(task.dueDate))
      ).length;
      const overdueCount = tasks.filter(task => 
        task.dueDate && !task.completed && 
        new Date(task.dueDate) < new Date() && 
        !isToday(parseISO(task.dueDate))
      ).length;
      
      setStats({
        total: tasks.length,
        completed,
        todayTasks,
        overdueCount
      });
    } catch (err) {
      console.error("Error loading stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const completionPercentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white shadow-premium"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold font-display mb-2">
            Welcome to TaskFlow
          </h1>
          <p className="text-white/80 font-body">
            Stay organized and boost your productivity
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onRefresh && onRefresh();
              loadStats();
            }}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ApperIcon name="RefreshCw" className="h-4 w-4" />
          </Button>
          
          <Button
            variant="accent"
            onClick={onCreateTask}
            className="gap-2 shadow-lg"
          >
            <ApperIcon name="Plus" className="h-5 w-5" />
            New Task
          </Button>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-body">Total Tasks</p>
              <p className="text-2xl font-bold font-display">{stats.total}</p>
            </div>
            <ApperIcon name="List" className="h-8 w-8 text-white/60" />
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-body">Completed</p>
              <p className="text-2xl font-bold font-display">{stats.completed}</p>
            </div>
            <ApperIcon name="CheckCircle" className="h-8 w-8 text-white/60" />
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-body">Due Today</p>
              <p className="text-2xl font-bold font-display">{stats.todayTasks}</p>
            </div>
            <ApperIcon name="Calendar" className="h-8 w-8 text-white/60" />
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-body">Progress</p>
              <div className="flex items-center gap-3 mt-1">
                <ProgressRing 
                  progress={completionPercentage} 
                  size={40} 
                  strokeWidth={3}
                />
                <span className="text-lg font-semibold font-display">
                  {Math.round(completionPercentage)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskHeader;