import { api } from "@/shared/config/api";
import { Review } from "../model/types";

export const reviewsByProduct = async (productId:string):Promise<Review[]> => {
  const {data} = await api.get<Review[]>(`api/reviews/${productId}`)
    return data
}
