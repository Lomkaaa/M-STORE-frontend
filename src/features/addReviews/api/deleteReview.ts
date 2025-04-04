import { api } from "@/shared/config/api";
import { DeleteReviewRequest } from "../model/types";

export const deleteReview = async ({ reviewId }: DeleteReviewRequest): Promise<{ message: string }> => {
    const { data } = await api.delete<{ message: string }>(`api/reviews/${reviewId}`);
    return data;
  };