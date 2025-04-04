import { useMutation } from "@tanstack/react-query";
import { registerUser,loginUser } from "@/features/auth/api/authApi"



export const useRegister = () => {
    return useMutation({
      mutationKey:["register"],
      mutationFn: registerUser, 
    });
  };


export const useLogin = () => {
    return useMutation({
      mutationKey:["login"],
      mutationFn: loginUser, 
    });
  };