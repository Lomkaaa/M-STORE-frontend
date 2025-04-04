import { useQuery} from "@tanstack/react-query";
import { api } from "@/shared/config/api";
import { User } from "../types";

export const useCurrentUser = () => {
    return useQuery<User>({
      queryKey: ["user"],
      queryFn: async () => {
        const { data } = await api.get("/api/current");
        return data;
      },
    });
  };
  