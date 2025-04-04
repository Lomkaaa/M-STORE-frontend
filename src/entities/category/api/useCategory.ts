import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/config/api";
import { Category } from "../model/types";

export const useCategories = () => {
    return useQuery <Category[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const {data} = await api.get("/api/categories");
            return data
        }
    })
}