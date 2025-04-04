import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode";
import { RootState } from "@/app/providers/store/store";
import { setUserId, logout } from "@/entities/auth/model/authSlice";

interface DecodedToken {
  userId: string;
  exp: number;
}

export const useAuthStatus = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 2000 < Date.now()) {
          dispatch(logout());
        } else {
          dispatch(setUserId(decoded.userId));
        }
      } catch (error) {
        console.error("Ошибка декодирования:", error);
        dispatch(logout());
      }
    }
  }, [token, dispatch]);

  return { token, userId, isAuthenticated: !!token };
};