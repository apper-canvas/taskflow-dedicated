import categoriesData from "@/services/mockData/categories.json";

let categories = [...categoriesData];

export const categoryService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...categories];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 150));
    const category = categories.find(cat => cat.Id === parseInt(id));
    return category ? { ...category } : null;
  },

  async create(categoryData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newCategory = {
      ...categoryData,
      Id: Math.max(...categories.map(c => c.Id), 0) + 1
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) return null;
    
    const updatedCategory = { ...categories[index], ...updates };
    categories[index] = updatedCategory;
    return { ...updatedCategory };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) return false;
    
    categories.splice(index, 1);
    return true;
  }
};