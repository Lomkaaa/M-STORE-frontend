import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addToBasket } from "../api/addBasket";

export const useAddBasket = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["basket"],
        mutationFn: addToBasket,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["basket"] }); // Обновление корзины
        }
    })
}






