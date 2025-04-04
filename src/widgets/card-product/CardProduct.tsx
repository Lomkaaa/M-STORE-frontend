import { BASE_URL } from "@/shared/config/api";
import React from "react";
import { Product } from "@/entities/product/model/types";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import { ToggleFavorite } from "@/features/favorite/ui/toggleFavorite/ToggleFavorite";
import { RatingStars } from "@/shared/ui/RatingStars/RatingStarts";
import { formatPrice } from "@/shared/utils/formatPrice/formatPrice"; 

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.imageMainUrl || product.imageUrl;
  const navigate = useNavigate();
  const id = product.id;
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? formatPrice(product.price * (1 - product.discount / 100)) 
    : formatPrice(product.price);
  
  const isOutOfStock = product.value === 0;

  return (
    <div className={styles.productCard} onClick={() => navigate(`/products/${product.id}`)}>
      <div className={styles.productImageContainer}>
      <img src={imageUrl?.startsWith('http') ? imageUrl : BASE_URL + imageUrl} alt={product.name} className={styles.productImage} />
        
        
        {isOutOfStock && (
          <div className={styles.outOfStockBadge}>Товар закончился</div>
        )}
        
        <div onClick={(e) => e.stopPropagation()} className={styles.favoriteContainer}>
          <ToggleFavorite productId={id} />
        </div>
        {hasDiscount ? (
          <div className={styles.discountBadge}>-{product.discount}%</div>
        ) : null}
      </div>
      <div className={styles.productRating}>
        <RatingStars rating={product.rating} size={20} />
      </div>
      <div className={styles.productDetails}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productBrand}>
          {product.brand} • {product.category}
        </p>
        <div className={styles.priceContainer}>
          {hasDiscount ? (
            <span className={styles.oldPrice}>
              {formatPrice(product.price)} 
            </span>
          ) : null}
          <span className={hasDiscount ? styles.newPrice : styles.regularPrice}>
            {discountedPrice} 
          </span>
        </div>
      </div>
    </div>
  );
};