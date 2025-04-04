import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBrand } from "../../api/delete/deleteBrand";

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};