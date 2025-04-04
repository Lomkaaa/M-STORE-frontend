import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/getOrders";
import { Order} from "./types";


export const useGetOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn:getOrders
  });
};