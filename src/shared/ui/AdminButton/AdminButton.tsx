import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/entities/user/api/api"; 
import { FaCogs } from "react-icons/fa"
import styles from "./adminButton.module.css";

export const AdminButton: React.FC = () => {
  const navigate = useNavigate();
  const { data: user, isLoading  } = useCurrentUser(); 
  
  if (isLoading) {
    return null;
  }

  if (user?.role !== "ADMIN") {
    return null; 
  }

  return (
    <div className={styles.adminBox}><button className={styles.adminButton} onClick={() => navigate("/admin")}>
     <FaCogs className={styles.iconAdmin} /> Админ панель
    </button></div>
    
  );
};