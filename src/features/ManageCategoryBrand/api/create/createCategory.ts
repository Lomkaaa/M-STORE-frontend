
import { api } from "@/shared/config/api";
export const createCategory = async (categoryName:string)=> {
  const response = await api.post("/api/categories",{categoryName})
  return response.data;
};