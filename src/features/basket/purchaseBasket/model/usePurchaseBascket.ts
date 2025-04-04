import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseBasket } from "../api/purchaseBascket";

export const usePurchaseBasket = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: purchaseBasket,
    onSuccess: () => {
      setInterval(()=>{
        queryClient.invalidateQueries({ queryKey: ["basket"] });
      },2000)
        
      },
      onError: (error: any) => {
        // Ошибка приходит из запроса, теперь используем error.message
        if (error.response && error.response.data) {
          console.error("Ошибка сервера:", error.response.data.message);
        } else {
          console.error("Неизвестная ошибка:", error.message);
        }
      },
  })
}








