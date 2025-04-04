import { api } from "@/shared/config/api";
import { createProductResponse } from "../model/types";

export const createProduct = async (formData: FormData): Promise<createProductResponse> => {
  const response = await api.post<createProductResponse>("/api/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};