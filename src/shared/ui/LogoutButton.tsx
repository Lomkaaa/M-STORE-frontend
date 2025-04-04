import { useDispatch } from "react-redux";
import { logout } from "@/entities/auth/model/authSlice";

export const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <button onClick={handleLogout}>Выйти</button>;
};

