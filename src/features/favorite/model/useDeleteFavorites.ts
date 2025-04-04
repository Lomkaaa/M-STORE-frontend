import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletefavorite } from "../api/deleteFavorite";

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletefavorite,
    onSuccess: (_, productId) => {
      // Инвалидируем данные для списка избранных товаров
      queryClient.invalidateQueries({ queryKey: ["favorites"] });

      // Можно также инвалировать конкретный продукт
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
  });
};