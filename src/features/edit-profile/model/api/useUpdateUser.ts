import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "@/shared/config/api";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.put(`/api/users/${formData.get("id")}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); 
    },
  });
};