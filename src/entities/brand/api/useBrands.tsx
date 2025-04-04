import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/config/api";
import { Brand } from "../model/types";

export const useBrands = () => {
    return useQuery <Brand[]>({
        queryKey: ["brands"],
        queryFn: async () => {
            const {data} = await api.get("/api/brands")
            return data
        }
    })
}
