import React from "react";
import { ProductList} from "@/widgets/list-product/ProductList"; // Список товаров

import styles from "./home.module.css";
import { Navbar } from "@/widgets/navbar-main/Navbar";

const Home: React.FC = () => {
  return (
    <>
    <Navbar/>
      <div className={styles.homeContainer}>
        <div className={styles.productListContainer}>
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default Home;
