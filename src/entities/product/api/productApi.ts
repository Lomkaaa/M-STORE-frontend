import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/config/api";
import { UseProductsParams } from "../model/types";
import { ProductsResponse } from "../model/types";

// Используем useQuery для получения продуктов с фильтрами
export const useProducts = ({
  page,
  limit,
  minPrice,
  maxPrice,
  minRating,
  maxRating,
  sortBy,
  sort,
  categorySort,
  brandSort,
  search,
  discountOnly,
}: UseProductsParams) => {
  return useQuery<ProductsResponse>({
    queryKey: [
      "products",
      page,
      limit,
      minPrice,
      maxPrice,
      minRating,
      maxRating,
      sortBy,
      sort,
      categorySort,
      brandSort,
      search,
      discountOnly,
    ],
    queryFn: async () => {
      try {
        const { data } = await api.get<ProductsResponse>("/api/products", {
          params: {
            page,
            limit,
            minPrice,
            maxPrice,
            minRating,
            maxRating,
            sortBy,
            sort,
            categorySort,
            brandSort,
            search,
            discountOnly,
          },
        });

        return data;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
  });
};
