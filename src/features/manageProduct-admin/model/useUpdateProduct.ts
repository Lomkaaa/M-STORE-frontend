import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../api/updateProduct";

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["product"],
      mutationFn: ({ productId, formData }: { productId: string, formData: FormData }) => updateProduct(productId, formData),
      onError: (error: any) => {
        console.error("Ошибка обновления товара:", error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    });
  };