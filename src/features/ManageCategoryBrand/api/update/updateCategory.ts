import { api } from "@/shared/config/api";

export const updateCategory = async (categoryId: string,categoryName:string) => {
    const response = await api.put(`/api/categories/${categoryId}`, {
        categoryId, 
        categoryName
    });
    return response.data
  };