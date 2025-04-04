import { useQuery } from "@tanstack/react-query";
import { reviewsByProduct } from "../api/getReviewsByProduct";

export const useReviewsByProduct = (productId:string) => {
  return useQuery({
    queryKey: ["reviews",productId],
    queryFn: () => reviewsByProduct(productId),
    enabled: !!productId,
  });
};
