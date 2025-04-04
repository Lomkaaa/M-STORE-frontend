import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "./toggleFavorite.module.css";
import { useAddFavorite } from "../../model/useAddFavorite";
import { useDeleteFavorite } from "../../model/useDeleteFavorites";
import { useProductById } from "@/entities/product/api/productById";
interface ToggleFavoriteProps {
  productId: string;
}

export function ToggleFavorite({ productId}: ToggleFavoriteProps) {
   
    
  const { data } = useProductById(productId);
  const addFavorite = useAddFavorite();
  const deleteFavorite = useDeleteFavorite();
  const isFavorite = data?.favoriteByUser ?? false;

  const toggleFavorite = async () => {
    if (isFavorite) {
      await deleteFavorite.mutateAsync(productId);
    } else {
      await addFavorite.mutateAsync(productId);
    }
  };

  return (
    <div className={styles.favoriteIcon} onClick={toggleFavorite}>
      {isFavorite ? (
        <FaHeart color="red" size={24} />
      ) : (
        <FaRegHeart size={24} />
      )}
    </div>
  );
}