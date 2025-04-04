import { useMutation } from "@tanstack/react-query";
import { registerUser,loginUser } from "@/features/auth/api/authApi"



export const useRegister = () => {
    return useMutation({
      mutationFn: registerUser, 
    });
  };


export const useLogin = () => {
    return useMutation({
      mutationFn: loginUser, 
    });
  };