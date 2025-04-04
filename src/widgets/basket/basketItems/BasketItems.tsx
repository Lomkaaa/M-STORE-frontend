import React from "react";
import { BasketItem as BasketItemType } from "@/entities/basket/model/types";
import styles from "./BasketItems.module.css";
import { BASE_URL } from "@/shared/config/api";
import { useDeleteBasket, useAddBasket } from "@/features/basket/UpdateBasket/index";
import { useNavigate } from "react-router-dom";

interface BasketItemProps {
  item: BasketItemType;
}

const BasketItem: React.FC<BasketItemProps> = ({ item }) => {
  const imageUrl = item.product.imageUrl?.startsWith("http") ? item.product.imageUrl : BASE_URL + item.product.imageUrl
  const { mutate: deleteItem } = useDeleteBasket();
  const { mutate: addToBasket } = useAddBasket();
  const navigate = useNavigate();

  // Проверка на наличие товара
  const isOutOfStock = item.product.value === 0;

  const handleDeleteItem = () => {
    deleteItem(item.product.id);
  };

  const handleDeleteAllItem = () => {
    for (let i = 0; i < item.value; i++) {
      deleteItem(item.product.id);
    }
  };

  const handleAddToBasket = () => {
    if (!isOutOfStock) {
      addToBasket({ productId: item.product.id, value: item.value + 1 });
    }
  };

  const hasDiscount = item.product.discount && item.product.discount > 0;
  const discountedPrice = hasDiscount
    ? (item.product.price * (1 - item.product.discount / 100)).toFixed(2)
    : item.product.price.toFixed(2);

  return (
    <div className={styles.basketItem}>
      <div className={`${styles.basketItem__imageContainer} ${isOutOfStock ? styles.basketItem__outOfStock : ""}`}>
        <img
          src={imageUrl}
          alt={item.product.name}
          className={styles.basketItem__image}
          onClick={() => navigate(`/products/${item.productId}`)}
        />
        {isOutOfStock && <div className={styles.basketItem__outOfStockRibbon}>Товар закончился</div>}
      </div>

      <div className={styles.basketItem__details}>
        <h3 className={styles.basketItem__productName}>{item.product.name}</h3>
        <p className={styles.basketItem__description}>{item.product.description}</p>
        <div className={styles.basketItem__priceContainer}>
          {hasDiscount && !isOutOfStock ? (
            <span className={styles.basketItem__oldPrice}>
              {item.product.price.toFixed(2)} ₽
            </span>
          ) : null}
          <span
            className={isOutOfStock ? styles.basketItem__outOfStockPrice : hasDiscount ? styles.basketItem__newPrice : styles.basketItem__normalPrice}
          >
            {isOutOfStock ? "Нет в наличии" : `${discountedPrice} ₽`}
          </span>
        </div>

        {!isOutOfStock && (
          <div className={styles.basketItem__actions}>
            <button onClick={handleDeleteItem}>-</button>
            <span>{item.value}</span>
            <button onClick={handleAddToBasket}>+</button>
          </div>
        )}

        <button onClick={handleDeleteAllItem} className={styles.basketItem__remove}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default BasketItem;