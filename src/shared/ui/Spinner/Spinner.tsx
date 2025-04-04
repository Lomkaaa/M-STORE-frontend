import { ClipLoader } from "react-spinners"; // Импортируем спиннер
import styles from "./spinner.module.css"

export function LoadingSpinner() {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinnerContent}>
        <ClipLoader size={80} color="#ff6f61" />
        <span>Загрузка...</span>
      </div>
    </div>
  );
}