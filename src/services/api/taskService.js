import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

export const taskService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...tasks];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const task = tasks.find(task => task.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newTask = {
      ...taskData,
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) return null;
    
    const updatedTask = { ...tasks[index], ...updates };
    if (updates.completed && !tasks[index].completed) {
      updatedTask.completedAt = new Date().toISOString();
    } else if (!updates.completed && tasks[index].completed) {
      updatedTask.completedAt = null;
    }
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) return false;
    
    tasks.splice(index, 1);
    return true;
  },

  async toggleComplete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) return null;
    
    const task = tasks[index];
    const updatedTask = {
      ...task,
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : null
    };
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  }
};