export const categoryService = {
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
          { field: { Name: "color_c" } },
          { field: { Name: "icon_c" } }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      if (!response.data || response.data.length === 0) {
        return [];
      }
      
      // Map database fields to UI expected format
      return response.data.map(category => ({
        Id: category.Id,
        name: category.Name,
        color: category.color_c,
        icon: category.icon_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching categories:", error?.response?.data?.message);
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
          { field: { Name: "color_c" } },
          { field: { Name: "icon_c" } }
        ]
      };
      
      const response = await apperClient.getRecordById('category_c', parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }
      
      const category = response.data;
      return {
        Id: category.Id,
        name: category.Name,
        color: category.color_c,
        icon: category.icon_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching category with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(categoryData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Map UI fields to database fields and include only Updateable fields
      const dbCategoryData = {
        Name: categoryData.name || '',
        color_c: categoryData.color || '#6B7280',
        icon_c: categoryData.icon || 'Folder'
      };
      
      const params = {
        records: [dbCategoryData]
      };
      
      const response = await apperClient.createRecord('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create categories ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        }
        
        if (successfulRecords.length > 0) {
          const createdCategory = successfulRecords[0].data;
          return {
            Id: createdCategory.Id,
            name: createdCategory.Name,
            color: createdCategory.color_c,
            icon: createdCategory.icon_c
          };
        }
      }
      
      throw new Error('Failed to create category');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating category:", error?.response?.data?.message);
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
      
      if (updates.name !== undefined) {
        dbUpdates.Name = updates.name;
      }
      if (updates.color !== undefined) {
        dbUpdates.color_c = updates.color;
      }
      if (updates.icon !== undefined) {
        dbUpdates.icon_c = updates.icon;
      }
      
      const params = {
        records: [dbUpdates]
      };
      
      const response = await apperClient.updateRecord('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update categories ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        }
        
        if (successfulUpdates.length > 0) {
          const updatedCategory = successfulUpdates[0].data;
          return {
            Id: updatedCategory.Id,
            name: updatedCategory.Name,
            color: updatedCategory.color_c,
            icon: updatedCategory.icon_c
          };
        }
      }
      
      throw new Error('Failed to update category');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating category:", error?.response?.data?.message);
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
      
      const response = await apperClient.deleteRecord('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete categories ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};