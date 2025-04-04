import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/config/api";

export const useLimits = () => {
    return useQuery({
        queryKey: ["limits"],
        queryFn: async () => {
            const {data} = await api.get("/api/limits");
            return data
        }
    })
}