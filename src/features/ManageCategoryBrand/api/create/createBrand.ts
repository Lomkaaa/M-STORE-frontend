import { api } from "@/shared/config/api";

export const createBrand = async (brandName:string)=> {
  const response = await api.post("/api/brands",{brandName})
  return response;
};