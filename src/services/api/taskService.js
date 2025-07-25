export const taskService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "categoryId_c" } }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "DESC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      if (!response.data || response.data.length === 0) {
        return [];
      }
      
      // Map database fields to UI expected format
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c,
        description: task.description_c,
        priority: task.priority_c,
        dueDate: task.dueDate_c,
        completed: task.completed_c,
        createdAt: task.createdAt_c,
        completedAt: task.completedAt_c,
        categoryId: task.categoryId_c?.Id || task.categoryId_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "categoryId_c" } }
        ]
      };
      
      const response = await apperClient.getRecordById('task_c', parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }
      
      const task = response.data;
      return {
        Id: task.Id,
        title: task.title_c,
        description: task.description_c,
        priority: task.priority_c,
        dueDate: task.dueDate_c,
        completed: task.completed_c,
        createdAt: task.createdAt_c,
        completedAt: task.completedAt_c,
        categoryId: task.categoryId_c?.Id || task.categoryId_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Map UI fields to database fields and include only Updateable fields
      const dbTaskData = {
        Name: taskData.title || '',
        title_c: taskData.title || '',
        description_c: taskData.description || '',
        priority_c: taskData.priority || 'medium',
        dueDate_c: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
        completed_c: taskData.completed || false,
        createdAt_c: new Date().toISOString(),
        completedAt_c: taskData.completed ? new Date().toISOString() : null
      };
      
      // Handle categoryId lookup field
      if (taskData.categoryId) {
        dbTaskData.categoryId_c = parseInt(taskData.categoryId);
      }
      
      const params = {
        records: [dbTaskData]
      };
      
      const response = await apperClient.createRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        }
        
        if (successfulRecords.length > 0) {
          const createdTask = successfulRecords[0].data;
          return {
            Id: createdTask.Id,
            title: createdTask.title_c,
            description: createdTask.description_c,
            priority: createdTask.priority_c,
            dueDate: createdTask.dueDate_c,
            completed: createdTask.completed_c,
            createdAt: createdTask.createdAt_c,
            completedAt: createdTask.completedAt_c,
            categoryId: createdTask.categoryId_c?.Id || createdTask.categoryId_c
          };
        }
      }
      
      throw new Error('Failed to create task');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Map UI fields to database fields and include only Updateable fields
      const dbUpdates = {
        Id: parseInt(id)
      };
      
      if (updates.title !== undefined) {
        dbUpdates.Name = updates.title;
        dbUpdates.title_c = updates.title;
      }
      if (updates.description !== undefined) {
        dbUpdates.description_c = updates.description;
      }
      if (updates.priority !== undefined) {
        dbUpdates.priority_c = updates.priority;
      }
      if (updates.dueDate !== undefined) {
        dbUpdates.dueDate_c = updates.dueDate ? new Date(updates.dueDate).toISOString() : null;
      }
      if (updates.completed !== undefined) {
        dbUpdates.completed_c = updates.completed;
        if (updates.completed) {
          dbUpdates.completedAt_c = new Date().toISOString();
        } else {
          dbUpdates.completedAt_c = null;
        }
      }
      if (updates.categoryId !== undefined) {
        dbUpdates.categoryId_c = updates.categoryId ? parseInt(updates.categoryId) : null;
      }
      
      const params = {
        records: [dbUpdates]
      };
      
      const response = await apperClient.updateRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update tasks ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        }
        
        if (successfulUpdates.length > 0) {
          const updatedTask = successfulUpdates[0].data;
          return {
            Id: updatedTask.Id,
            title: updatedTask.title_c,
            description: updatedTask.description_c,
            priority: updatedTask.priority_c,
            dueDate: updatedTask.dueDate_c,
            completed: updatedTask.completed_c,
            createdAt: updatedTask.createdAt_c,
            completedAt: updatedTask.completedAt_c,
            categoryId: updatedTask.categoryId_c?.Id || updatedTask.categoryId_c
          };
        }
      }
      
      throw new Error('Failed to update task');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete tasks ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  async toggleComplete(id) {
    try {
      // First get current task state
      const currentTask = await this.getById(id);
      if (!currentTask) return null;
      
      // Update with toggled completion state
      const updates = {
        completed: !currentTask.completed
      };
      
      return await this.update(id, updates);
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error toggling task completion:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
};