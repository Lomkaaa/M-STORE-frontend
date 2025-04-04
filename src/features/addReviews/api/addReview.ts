import { api } from "@/shared/config/api";
import { ReviewRequest, ReviewResponse } from "../model/types";

export const addReview = async ({
  productId,
  content,
  value,
}: ReviewRequest): Promise<ReviewResponse> => {
  const { data } = await api.post(`api/reviews/${productId}`, {
    content,
    value,
  });
  return data;
};
