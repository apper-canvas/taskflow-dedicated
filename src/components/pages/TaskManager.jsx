import React, { useCallback, useContext, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { AuthContext } from "../../App";
import ApperIcon from "@/components/ApperIcon";
import TaskFilters from "@/components/organisms/TaskFilters";
import TaskForm from "@/components/organisms/TaskForm";
import TaskList from "@/components/organisms/TaskList";
import TaskHeader from "@/components/organisms/TaskHeader";
import Button from "@/components/atoms/Button";
const TaskManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({ Id: "all", name: "All Categories", color: "#6B7280", icon: "Grid3x3" });
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handlePriorityChange = (priority) => {
    setPriorityFilter(priority);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory({ Id: "all", name: "All Categories", color: "#6B7280", icon: "Grid3x3" });
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowCreateForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowCreateForm(true);
  };

  const handleFormSubmit = () => {
    setShowCreateForm(false);
    setEditingTask(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleFormCancel = () => {
    setShowCreateForm(false);
    setEditingTask(null);
  };

  const handleTaskUpdate = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
};

  const { user } = useSelector((state) => state.user);
  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* User info and logout button */}
          <div className="flex items-center justify-between bg-white rounded-xl shadow-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.firstName?.[0] || user?.emailAddress?.[0] || 'U'}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.emailAddress || 'User'}
                </p>
                <p className="text-sm text-gray-500">{user?.emailAddress}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="gap-2"
            >
              <ApperIcon name="LogOut" className="h-4 w-4" />
              Logout
            </Button>
          </div>

          <TaskHeader 
            onCreateTask={handleCreateTask}
            onRefresh={handleRefresh}
            key={refreshTrigger}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <TaskFilters
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                statusFilter={statusFilter}
                onStatusChange={handleStatusChange}
                priorityFilter={priorityFilter}
                onPriorityChange={handlePriorityChange}
                onClearFilters={handleClearFilters}
              />
              
              <div className="bg-white rounded-xl shadow-card min-h-[600px]">
                <TaskList
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  statusFilter={statusFilter}
                  priorityFilter={priorityFilter}
                  onCreateTask={handleCreateTask}
                  onEditTask={handleEditTask}
                  onTaskUpdate={handleTaskUpdate}
                  key={refreshTrigger}
                />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                {showCreateForm && (
                  <TaskForm
                    task={editingTask}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    onTaskUpdate={handleTaskUpdate}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TaskManager;