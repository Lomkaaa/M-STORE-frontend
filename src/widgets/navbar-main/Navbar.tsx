
import { useCurrentUser } from "@/entities/user/api/api";
import { formatPrice } from "@/shared/utils/formatPrice/formatPrice";
import styles from "./Navbar.module.css";


import { SearchCatalog } from "@/features/search-catalog/SearchCatalog";

export const Navbar = () => {
const { data: user} = useCurrentUser();

const balance = user?.balance ? formatPrice(user.balance) : undefined;
  return (
    <nav className={styles.navbar}>
      <SearchCatalog/>
     <h3>Баланс: {balance || user?.balance + " ₽"}</h3>
    </nav>
  );
};


