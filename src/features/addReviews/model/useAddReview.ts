import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview } from "../api/addReview"; 

export const useAddReview = () => {
  const queryClient = useQueryClient();

return useMutation({
    mutationFn: addReview,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.productId] });
    },
  });
};