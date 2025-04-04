import { useGetAllFavorites } from "@/entities/favorite/model/useGetAllFavorites";
import { Error } from "@/shared/ui/Error/Error";
import { LoadingSpinner } from "@/shared/ui/Spinner/Spinner";
import { BASE_URL } from "@/shared/config/api";
import { FaTrashAlt } from "react-icons/fa";
import { useDeleteFavorite } from "@/features/favorite/model/useDeleteFavorites";
import styles from "./favoritesList.module.css";
import { Favorite } from "@/entities/favorite/model/types";
import { useClearFavorite } from "../model/useClearFavorite";
import { BackButton } from "@/shared/ui/BackButton/BackButton";
import { useNavigate } from "react-router-dom";

export function FavoritesList() {
  const { data, isError, isLoading,fetchNextPage,hasNextPage } = useGetAllFavorites();
  const deleteFavorite = useDeleteFavorite();
  const clearFavorite = useClearFavorite();
  const navigate = useNavigate();
  const products = data?.pages.flatMap(page => page.existingFavorite) || [];

  const handleDeleteAll = () => {
    clearFavorite.mutateAsync();
  };

  const handleDeleteProduct = (productId: string) => {
    deleteFavorite.mutateAsync(productId);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError || !products || products.length === 0)
    return <Error text="Избранных товаров нет" />;

  return (
    <>
      <BackButton />
      <div className={styles.favoritesContainer}>
        <h2>Избранные товары</h2>

        <button className={styles.deleteAllBtn} onClick={handleDeleteAll}>
          Удалить все
        </button>

        {products.map((favorite: Favorite) => {
          const { product } = favorite;
          const hasDiscount = product.discount && product.discount > 0;
          const discountedPrice = hasDiscount
            ? (product.price * (1 - product.discount / 100)).toFixed(2)
            : product.price.toFixed(2);

          return (
            <div key={product.id} className={styles.productCard} >
              <div className={styles.productInfo} onClick={() => navigate(`/products/${product.id}`)}>
                <img src={product.imageUrl?.startsWith("http")?product.imageUrl:BASE_URL + product.imageUrl} alt={product.name} width={100} />
                <div className={styles.productDetails}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className={styles.priceContainer}>
                    {hasDiscount && <span className={styles.oldPrice}>{product.price.toFixed(2)} ₽</span>}
                    <span className={hasDiscount ? styles.newPrice : styles.normalPrice}>
                      {discountedPrice} ₽
                    </span>
                  </div>
                </div>
              </div>
              <button className={styles.deleteBtn} onClick={() => handleDeleteProduct(product.id)}>
                <FaTrashAlt size={20} />
              </button>
            </div>
          );
        })}
        {hasNextPage && (
          <button className={styles.loadMoreBtn} onClick={() => fetchNextPage()}>
            Загрузить еще
          </button>
        )}
      </div>
    </>
  );
}