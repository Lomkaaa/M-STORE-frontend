import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite } from "../api/addFavorite";

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addFavorite,
    onSuccess: (_,productId) => {
      queryClient.invalidateQueries({ queryKey: ["product",productId] }),
      queryClient.invalidateQueries({queryKey:["favorites"]})
    },
  });
};
