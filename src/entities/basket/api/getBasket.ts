import { api } from "@/shared/config/api";
import { useQuery } from "@tanstack/react-query";

export const useBasket = () => {
    return useQuery({
        queryKey: ["basket"],
        queryFn: async () => {
            const {data} = await api.get("/api/basket/")
            return data
        }
    })
}