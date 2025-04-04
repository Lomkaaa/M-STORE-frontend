import { api } from "@/shared/config/api";

export const deleteBrand = async (brandId: string) => {
    const response = await api.delete(`/api/brands/${brandId}`, {
        data: { brandId },
    });
    return response
  };