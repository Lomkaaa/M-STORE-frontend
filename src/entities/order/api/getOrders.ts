import { api } from "@/shared/config/api";


export const getOrders = async () => {
 const response = await api.get("api/orders");
 return response.data
}