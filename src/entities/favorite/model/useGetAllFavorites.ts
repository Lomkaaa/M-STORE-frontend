import { useInfiniteQuery} from "@tanstack/react-query";
import { getAllFavorites } from "../api/getAllFavorites"; 

export const useGetAllFavorites = () => {
  return useInfiniteQuery({
    queryKey: ["favorites"],
    queryFn: ({ pageParam = 1 }) => getAllFavorites(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1, // начальный параметр страницы
  });
};