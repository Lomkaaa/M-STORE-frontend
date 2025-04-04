import React from "react";
import BasketItems from "../basketItems/BasketItems";
import { useBasket } from "@/entities/basket/api/getBasket";
import styles from "./BasketList.module.css";
import { Error } from "@/shared/ui/Error/Error";
import { LoadingSpinner } from "@/shared/ui/Spinner/Spinner";
import { BasketItem } from "@/entities/basket/model/types";

const BasketList: React.FC = () => {
  const { data, isLoading, isError } = useBasket();

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data?.length) return <Error text="Пустая корзина" />;

  return (
    <div className={styles.basketList}>
      {data.map((item:BasketItem) => (
        <BasketItems key={item.id} item={item} />
      ))}
    </div>
  );
};

export default BasketList;