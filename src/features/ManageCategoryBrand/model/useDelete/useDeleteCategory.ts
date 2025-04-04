import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../api/delete/deleteCategory";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};