import { api } from "@/shared/config/api";

export const deleteProduct = async (productId: string) => {
  const response = await api.delete(`/api/products/${productId}`);
  return response;
};