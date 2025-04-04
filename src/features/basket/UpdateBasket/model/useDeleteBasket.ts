import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteToBasket } from "../api/deleteToBasket";

export const useDeleteBasket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteToBasket, 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["basket"] }); // Обновление корзины
        }
    });
};
