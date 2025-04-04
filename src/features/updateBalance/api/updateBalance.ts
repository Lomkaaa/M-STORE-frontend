import { api } from "@/shared/config/api";

export const updateBalance = async (balance: number) => {
  const response = await api.post("/api/balance", { balance });
  return response.data;
}