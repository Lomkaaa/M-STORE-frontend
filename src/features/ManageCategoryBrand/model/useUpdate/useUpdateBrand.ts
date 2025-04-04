
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBrand } from "../../api";

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ brandId, brandName }: { brandId: string; brandName: string }) => 
      updateBrand(brandId, brandName),
      
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};