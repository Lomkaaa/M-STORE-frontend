import React from "react";
import BasketList from "../basketList/BasketList";
import BasketSidebar from "../basketSidebar/BasketSidebar";
import styles from "./basket.module.css";
import { BackButton } from "@/shared/ui/BackButton/BackButton";
import ScrollToTopButton from "@/shared/ui/ScrollToTopButton/ScrollToTopButton";

const Basket: React.FC = () => {
  return (
    <div className={styles.basketContainer}>
      <div className={styles.home}>
        <BackButton />
      </div>

      <div className={styles.content}>
        <BasketList />
        <BasketSidebar />
      </div>
      <ScrollToTopButton/>
    </div>
  );
};

export default Basket;
