import { useInfiniteQuery } from "@tanstack/react-query";
import { getHistory } from "../api/getHistory";

export const useGetHistory = () => {
  return useInfiniteQuery(
    {
      queryKey: ["history"],
      queryFn: ({ pageParam = null }) => getHistory(pageParam),
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
      initialPageParam: null,
    }
  );
};