import { useState } from "react";
import { useDeleteProduct } from "../../model/useDeleteProduct"; // Запросы API
import styles from "./deleteProduct.module.css";
import { useProducts } from "@/entities/product/api/productApi";
import { LoadingSpinner } from "@/shared/ui/Spinner/Spinner";
import { Error } from "@/shared/ui/Error/Error";
import { BASE_URL } from "@/shared/config/api";
import { AdminProductsNavbar } from "../../../../widgets/adminProductsNavbar/AdminProductsNavbar";

export const DeleteProduct = () => {
  const { mutate: deleteProduct } = useDeleteProduct();
  const [search, setSearch] = useState(""); // Локальное состояние для поиска

  const { data, isLoading, isError } = useProducts({
    search, // Передаем поисковую строку
    page: 1, // Указываем номер страницы
    limit: 10, // Указываем лимит товаров на страницу
    sort: "ASC",
    sortBy: "name",
  });

  // Обработчик для обновления поискового запроса
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // Обновляем значение поиска
  };

  // Фильтрация товаров по названию
  const filteredProducts = data?.products.filter(
    (product) => product.name.toLowerCase().includes(search.toLowerCase()) // Фильтруем товары по имени
  );

  return (
    <>
      <AdminProductsNavbar/>
      <div className={styles.container}>
        <h2>Удаление товаров</h2>
        <input
          value={search}
          type="text"
          placeholder="Поиск по названию..."
          onChange={handleSearch}
          className={styles.searchInput}
        />
        {isLoading && <LoadingSpinner />}
        {isError && !isLoading && <Error text="Товары не найдены" />}
        <div className={styles.productList}>
          {filteredProducts?.length ? (
            filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <img
                  src={product.imageMainUrl.startsWith("http")? product.imageMainUrl : BASE_URL + product.imageMainUrl}
                  alt={product.name}
                  className={styles.productImage}
                />
                <h3>{product.name}</h3>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className={styles.deleteButton}
                >
                  Удалить
                </button>
              </div>
            ))
          ) : (
            <p>Товары не найдены</p>
          )}
        </div>
      </div>
    </>
  );
};
