import React from "react";
import { ProductCard } from "@/widgets/card-product/CardProduct";
import { useProducts } from "@/entities/product/api/productApi";
import { RootState } from "@/app/providers/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductList.module.css";
import { LoadingSpinner } from "@/shared/ui/Spinner/Spinner";
import { useAddBasket, useDeleteBasket } from "../../features/basket/UpdateBasket/index";
import { Error } from "@/shared/ui/Error/Error";
import { useBasket } from "@/entities/basket/api/getBasket";
import { BasketItem } from "@/entities/basket/model/types";
import { setPage } from "@/entities/filters/model/filterSlice";
import ScrollToTopButton from "@/shared/ui/ScrollToTopButton/ScrollToTopButton";

export const ProductList: React.FC = () => {
  const dispatch = useDispatch();

  const {
    page,
    limit,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
    sortBy,
    sort,
    categorySort,
    brandSort,
    search,
    discountOnly,
  } = useSelector((state: RootState) => state.filters);

  const { data, isLoading, isError } = useProducts({
    page,
    limit,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
    sortBy,
    sort,
    categorySort,
    brandSort,
    search,
    discountOnly,
  });
  const { data: basket } = useBasket();
  const { mutate: addToBasket } = useAddBasket();
  const { mutate: addToDelete } = useDeleteBasket();

  const handleDeleteBasket = (productId: string) => {
    addToDelete(productId);
  };
  const handleAddToBasket = (productId: string) => {
    addToBasket({ productId, value: 1 });
  };

  const handlePrevPage = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

  const handleNextPage = () => {
    if (data?.totalPages && page < data.totalPages) dispatch(setPage(page + 1));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error text="Товары не найдены :(" />;
  }

  return (
    <div>
      <div className={styles.list}>
        {data?.products.map((product) => {
          const basketItem = basket?.find(
            (item: BasketItem) => item.product.id === product.id
          );
          const quantity = basketItem ? basketItem.value : 0;

          return (
            <div key={product.id} className={styles.product}>
              <ProductCard product={product} />

              <div className={styles.actions}>
                {quantity === 0 ? (
                  <button
                    className={styles.addButton}
                    onClick={() => handleAddToBasket(product.id)}
                  >
                    Добавить в корзину
                  </button>
                ) : (
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.buttonList}
                      onClick={() => handleDeleteBasket(product.id)}
                      disabled={quantity === 0}
                    >
                      −
                    </button>
                    <span className={styles.quantity}>{quantity}</span>
                    <button
                      className={styles.buttonList}
                      onClick={() => handleAddToBasket(product.id)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={page === 1}>
          ← Назад
        </button>
        <span>
          Страница {page} из {data?.totalPages || 1}
        </span>
        <button onClick={handleNextPage} disabled={page >= (data?.totalPages || 1)}>
          Вперёд →
        </button>
      </div>
      <ScrollToTopButton/>
    </div>
  );
};
