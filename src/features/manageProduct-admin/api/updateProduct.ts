import { api } from "@/shared/config/api";
import {updateProductRequest } from "../model/types";

export const updateProduct = async (productId: string,formData: FormData): Promise<updateProductRequest> => {
  const response = await api.patch<updateProductRequest>(`/api/products/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};