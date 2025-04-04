import { api } from "@/shared/config/api";


export const clearFavorite = async () => {
    const response = await api.delete("api/favorites")
    return response
}
