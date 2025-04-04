import { api } from "@/shared/config/api";

export const updateBrand = async (brandId: string, brandName: string) => {
    const response = await api.put(`/api/brands/${brandId}`, {
        brandId, 
        brandName
    });

    return response.data
};