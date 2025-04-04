import { api } from "@/shared/config/api";

export const deletefavorite = async (productId: string) => {
  const response = await api.delete(`/api/favorites/${productId}`);
  return response;
};
