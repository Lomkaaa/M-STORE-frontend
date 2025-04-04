import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrand } from "../../api/create/createBrand";

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};