import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../api/create/createCategory";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};