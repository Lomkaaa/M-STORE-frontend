import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearBasket } from "../api/clearBasket";

export const useClearBasket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: clearBasket, 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["basket"] }); // Обновление корзины
        }
    });
};
