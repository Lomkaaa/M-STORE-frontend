import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearFavorite } from "../api/clearFavorite";

export const useClearFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearFavorite,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
      },
  });
};