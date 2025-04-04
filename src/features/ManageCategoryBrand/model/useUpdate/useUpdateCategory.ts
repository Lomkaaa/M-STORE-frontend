import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../../api";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({categoryId,categoryName}: {categoryId:string;categoryName:string})=> updateCategory(categoryId,categoryName),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};