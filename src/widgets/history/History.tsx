import { useEffect } from "react";
import { useGetHistory } from "@/entities/history/model/useGetHistory";
import { Error } from "@/shared/ui/Error/Error";
import { LoadingSpinner } from "@/shared/ui/Spinner/Spinner";
import styles from "./history.module.css";
import { BackButton } from "@/shared/ui/BackButton/BackButton";
import { BASE_URL } from "@/shared/config/api";
import { ProductHistory } from "@/entities/history/model/types";
import { formatDate } from "@/shared/utils/formanData/formatData";

export function History() {

  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetHistory();

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      const lastPage = data?.pages[data.pages.length - 1];
      if (lastPage && lastPage.histories.length === 0) {
        return;
      }
      fetchNextPage();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const bottom = scrollTop + clientHeight >= scrollHeight - 100;
      if (bottom) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetchingNextPage, hasNextPage]);

  if (isError || data?.pages.every((page) => page.histories.length === 0)) {
    return <Error text="История покупок пуста" />;
  }

  // Логирование состояния загрузки
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <BackButton />
      <div className={styles.historyContainer}>
      <h2>История покупок</h2>
        {data?.pages.flatMap((page) =>
          page.histories.map((order: ProductHistory) => (
            <li key={order.id} className={styles.orderItem}>
              <p className={styles.orderId}>Заказ №{order.id}</p>
              <div className={styles.orderData}>{formatDate(order.createdAt)}</div>
              <ul>
                {order.products.map((item) => (
                  <li
                    key={`${order.id}-${item.product.id}`}
                    className={styles.historyItem}
                  >
                    <img
                      src={item.product.imageUrl?.startsWith('http') ? item.product.imageUrl:  BASE_URL + item.product.imageUrl}
                      alt={item.product.name}
                      className={styles.productImage}
                    />
                    <div>
                      <p>
                        {item.product.name} - {item.value} шт.
                      </p>
                      <p>{item.value} шт. {(item.product.price * (1 - item.product.discount / 100)).toFixed(2)} ₽</p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))
        )}
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
}
