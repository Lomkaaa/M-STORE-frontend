import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import styles from "./header.module.css";
import { LogoutButton } from "@/shared/ui/LogoutButton/LogoutButton";
import { setSearch } from "@/entities/filters/model/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useBasket } from "@/entities/basket/api/getBasket";
import { BasketItem } from "@/entities/basket/model/types";
import { RootState } from "@/app/providers/store/store"; 

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data: basket = [] } = useBasket();

  const search = useSelector((state: RootState) => state.filters.search); 
  const basketCount = basket.reduce(
    (sum: number, item: BasketItem) => sum + item.value,
    0
  );

  useEffect(() => {
    dispatch(setSearch("")); 
  }, [location.pathname]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src="/logo.jpg" alt="Логотип" className={styles.logoImage} />
      </Link>
      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Поиск..."
          className={styles.search}
          value={search} // controlled value
          onChange={handleSearch}
        />
      </div>
      <nav className={styles.nav}>
        <Link to="/favorites">
          <FaHeart className={styles.icon} />
        </Link>
        <Link to="/basket" className={styles.cartWrapper}>
          <FaShoppingCart className={styles.icon} />
          {basketCount > 0 && (
            <span className={styles.badge}>{basketCount}</span>
          )}
        </Link>
        <Link to="/profile">
          <FaUser className={styles.icon} />
        </Link>
        <LogoutButton />
      </nav>
    </header>
  );
};