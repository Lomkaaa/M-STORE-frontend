import { api } from "@/shared/config/api";

export const deleteCategory = async (categoryId: string) => {
    const response = await api.delete(`/api/categories/${categoryId}`, {
        data: { categoryId },
    });
    return response
  };