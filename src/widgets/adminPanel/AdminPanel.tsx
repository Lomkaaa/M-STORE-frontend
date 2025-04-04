import { Link } from "react-router-dom";
import { FaBox, FaUsers, FaShoppingCart } from "react-icons/fa";
import styles from "./adminPanel.module.css";
import { BackButton } from "@/shared/ui/BackButton/BackButton";
export const AdminPanel = () => {
 
  return (
    <>
      <BackButton />
      <div className={styles.adminPanel}>
        <h1>Админ-панель</h1>
        <nav>
          <ul>
            <li>
              <Link to="/admin/products/app">
                <FaBox size={20} /> Управление товарами
              </Link>
            </li>
            <div className={styles.content}></div>
            <li>
              <Link to="/admin/products/app">
                <FaUsers size={20} /> Управление пользователями (скоро)
              </Link>
            </li>
            <li>
              <Link to="/admin/products/app">
                <FaShoppingCart size={20} /> Управление статусом заказа (скоро)
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
