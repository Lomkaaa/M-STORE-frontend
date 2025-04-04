import { useDispatch } from "react-redux";
import { logout } from "@/entities/auth/model/authSlice";
import { IoIosExit } from "react-icons/io";
import styles from "./logoutButton.module.css"
export const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <button onClick={handleLogout} className={styles.logoutButton}>{<IoIosExit />}</button>;
};

