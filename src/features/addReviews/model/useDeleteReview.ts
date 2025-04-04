import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../api/deleteReview";

export const useDeleteReview = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: deleteReview,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["reviews", variables.productId] });
      },
    });
  };