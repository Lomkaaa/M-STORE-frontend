import { useNavigate } from "react-router-dom";
import styles from "./backButton.module.css";

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return <button className={styles.backButton} onClick={() => navigate(-1)}>Назад</button>;
};
