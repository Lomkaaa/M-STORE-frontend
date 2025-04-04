import { NavLink } from "react-router-dom";
import styles from "./adminProductsNavbar.module.css";
import { BackButton } from "@/shared/ui/BackButton/BackButton";

export const AdminProductsNavbar = () => {
  return (
    <>
     <BackButton/>
      <nav className={styles.navbar}>
        <NavLink
          to="/admin/products/app"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Добавить товар
        </NavLink>
        <NavLink
          to="/admin/products/delete"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Удалить товар
        </NavLink>
        <NavLink
          to="/admin/products/update"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Обновить товар
        </NavLink>
        <NavLink
          to="/admin/products/category"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
        бренд/категория
        </NavLink>
      </nav>
    </>
  );
};
