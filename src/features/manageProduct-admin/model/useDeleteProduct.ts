import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/deleteProduct";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};