import { api } from "@/shared/config/api";


type LoginCredentials = {
  email: string;
  password: string;
}

type AuthResponse = {
  token: string;
}

 export type RegisterCredentials = {
  password: string;
  email: string;
}



export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post("/api/login", credentials);
    return data;
  };
  
  

export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const { data } = await api.post("/api/register", credentials);
    return data;
  };
  