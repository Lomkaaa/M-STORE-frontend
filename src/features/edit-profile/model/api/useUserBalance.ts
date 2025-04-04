import { useQueryClient,useMutation } from "@tanstack/react-query";
import { api } from "@/shared/config/api";


export const useUserBalance = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (amount: number) => {
        
        const { data } = await api.post("/api/users/balance", { balance: amount });
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["user"]}); // Обновляем кеш
      },
    });
    
  };