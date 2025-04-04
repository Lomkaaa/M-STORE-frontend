import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectCartCount } from "../model/selectors";
import styles from "./header.module.css";

export const Header = () => {
  // const cartCount = useSelector(selectCartCount);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
      <img src="logo.jpg" alt="Логотип"className={styles.logoImage} />
      </Link>
      <input type="text" placeholder="Поиск..." className={styles.search} />
      <nav className={styles.nav}>
        <Link to="/favorites">❤️ Избранное</Link>
        <Link to="/cart">🛒 Корзина ({})</Link>
        <Link to="/profile">👤 Профиль</Link>
      </nav>
    </header>
  );
};