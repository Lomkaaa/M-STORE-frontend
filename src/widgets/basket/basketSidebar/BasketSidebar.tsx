import React from "react";
import styles from "./BasketSidebar.module.css";
import { useBasket } from "@/entities/basket/api/getBasket";
import { BasketItem } from "@/entities/basket/model/types";
import { formatPrice } from "@/shared/utils/formatPrice/formatPrice";
import { useClearBasket } from "@/features/basket/UpdateBasket/index";
import { usePurchaseBasket } from "@/features/basket/purchaseBasket/model/usePurchaseBascket"; // Импортируем хук

const BasketSidebar: React.FC = () => {
  const { data } = useBasket();
  const { mutate: clearBasket } = useClearBasket();
  const { mutate: purchaseBasket, isPending, isError, isSuccess, error } = usePurchaseBasket();

  const handleClearBasket = () => {
    clearBasket();
  };

  const handlePurchase = () => {
    
    if (data) {
      purchaseBasket(data);
    }
  };

  const products = data || [];

  const totalPrice = products.reduce((sum: number, item: BasketItem) => {
    const productPrice = item.product.discount
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price;
    return sum + productPrice * item.value;
  }, 0);

  return (
    <>
      {products.length === 0 ? null : (
        <div className={styles.sidebar}>
          <p className={styles.price}>{formatPrice(totalPrice)}</p>
          
          <button
            onClick={handlePurchase}
            className={styles.orderButton}
            disabled={isPending}
          >
            {isPending ? "Оформление..." : "Оформить заказ"}
          </button>

          {isError && <p className={styles.error}>{error.response.data.message}</p>}
          {isSuccess && <p className={styles.success}>Заказ оформлен успешно!</p>}

          <button onClick={handleClearBasket} className={styles.clearButton}>
            Очистить корзину
          </button>
        </div>
      )}
    </>
  );
};

export default BasketSidebar;