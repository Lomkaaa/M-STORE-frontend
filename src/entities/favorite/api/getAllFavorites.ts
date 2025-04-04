import { api } from "@/shared/config/api";
import { FavoriteResponse } from "../model/types";

export const getAllFavorites = async (page: number = 1, limit: number = 10): Promise<FavoriteResponse> => {
  const { data } = await api.get<FavoriteResponse>("api/favorites", {
    params: { page, limit }, 
  });
  return data;
};