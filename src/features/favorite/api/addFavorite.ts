import { api } from "@/shared/config/api";


export const addFavorite = async (productId :string) => {
    const response = await api.patch(`/api/favorites/${productId}`)
    return response
}