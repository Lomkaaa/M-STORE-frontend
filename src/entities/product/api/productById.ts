import { api } from "@/shared/config/api";
import { useQuery } from "@tanstack/react-query";
import { ProductDetailsResponse } from "../model/types";

export const useProductById = (productId: string| undefined) => {
    return useQuery<ProductDetailsResponse>({
        queryKey: ["product",productId],
        queryFn : async () => {
       try {
         const {data} = await api.get<ProductDetailsResponse>(`/api/products/${productId}`)
         return data
        } catch (error: any) {
            console.error("API Error:", error);
            throw new Error(error?.response?.data?.message || "Неизвестная ошибка");
          }
        }
        
    })
}