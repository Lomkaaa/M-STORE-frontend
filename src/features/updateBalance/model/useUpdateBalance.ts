import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBalance } from "../api/updateBalance";

export const useUpdateBalance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBalance,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); 
    },
  });
};