import { createSlice, PayloadAction } from "@reduxjs/toolkit";



  type AuthState = {
  token: string | null;
  userId: string| null
  isAuth: boolean;
}

const initialState: AuthState = {
  token:localStorage.getItem("token") || null,
  userId:null,
  isAuth:false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string}>
    ) => {
      state.token = action.payload.token;
      state.isAuth = true;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem("token");
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    }
  },
});

export const {login,logout,setUserId} = authSlice.actions
export default authSlice.reducer
