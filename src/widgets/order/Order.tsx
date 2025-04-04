import { useGetOrders } from "@/entities/order/model/useGetOrders";
import { Error } from "@/shared/ui/Error/Error";
import { LoadingSpinner } from "@/shared/ui/Spinner/Spinner";
import styles from "./order.module.css";
import { BASE_URL } from "@/shared/config/api";

const statusColors: Record<string, string> = {
  PENDING: "orange",
  PAID: "blue",
  SHIPPED: "purple",
  DELIVERED: "green",
  CANCELLED: "red",
};
const statusTranslations: Record<string, string> = {
    PENDING: "В ожидании",
    PAID: "Оплачено",
    SHIPPED: "Отправлено",
    DELIVERED: "Доставлено",
    CANCELLED: "Отменено",
  };
  

export function Order() {
  const { data: orders, isError, isLoading } = useGetOrders();

  if (isError) return <Error text="Ошибка загрузки заказов" />;
  if (isLoading) return <LoadingSpinner />;
  if (!orders?.length) return <Error text="У вас еще нет заказов" />;

  return (
    <div className={styles.ordersContainer}>
      <h2>Мои заказы</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className={styles.orderItem}>
            <div className={styles.orderHeader}>
              <p>Заказ №{order.id}</p>
              <span
                className={styles.orderStatus}
                style={{ color: statusColors[order.status] }}
              >
                {statusTranslations[order.status]}
              </span>
            </div>
            <ul className={styles.productList}>
              {order.products.map((item) => (
                <li key={item.productId} className={styles.productItem}>
                  <img
                    src={item.product.imageUrl?.startsWith('http') ? item.product.imageUrl:  BASE_URL + item.product.imageUrl}
                    alt={item.product.name}
                    className={styles.productImage}
                  />
                  <div>
                    <p>{item.product.name}</p>
                    <p>{item.value} шт. {(item.product.price * (1 - item.product.discount / 100)).toFixed(2)} ₽</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className={styles.totalPrice}>Итого: {order.total} ₽</p>
          </li>
        ))}
      </ul>
    </div>
  );
}