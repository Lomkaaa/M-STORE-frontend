import { useParams } from "react-router-dom";
import { useProductById } from "@/entities/product/api/productById";
import styles from "./productDetails.module.css";
import { LoadingSpinner } from "@/shared/ui/Spinner/Spinner";
import { Error } from "@/shared/ui/Error/Error";
import { BASE_URL } from "@/shared/config/api";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { BackButton } from "@/shared/ui/BackButton/BackButton";
import { ToggleFavorite } from "@/features/favorite/ui/toggleFavorite/ToggleFavorite";
import { ReviewPanel } from "../review-panel/reviewPanel";

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useProductById(id!);
  const [mainImage, setMainImage] = useState<string | undefined>();
  const [allImages, setAllImages] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const main = data.imageMainUrl.startsWith("http")
        ? data.imageMainUrl
        : BASE_URL + data.imageMainUrl;

      const others = data.imageOtherUrl.map((img) =>
        img.startsWith("http") ? img : BASE_URL + img
      );

      const combined = others.includes(main) ? others : [main, ...others];

      setMainImage(main);
      setAllImages(combined);
    }
  }, [data]);

  const handleImageClick = (imageUrl: string) => {
    setMainImage(imageUrl);
  };

  const hasDiscount = data?.discount && data.discount > 0;
  const discountedPrice = hasDiscount
    ? (data.price * (1 - data.discount / 100)).toFixed(2)
    : data?.price.toFixed(2);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} size={20} color={i + 1 <= rating ? "gold" : "lightgray"} />
    ));
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error text="Товар отсутствует" />;
  if (!id) return null;

  return (
    <div>
      <BackButton />
      <div className={styles.productContainer}>
        <div className={styles.productImage}>
          {mainImage && <img src={mainImage} alt={data?.name} />}
          <ToggleFavorite productId={id} />

          <div className={styles.additionalImages}>
            {allImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Изображение ${index + 1}`}
                onClick={() => handleImageClick(img)}
              />
            ))}
          </div>
        </div>

        <div className={styles.productDetails}>
          <h2 className={styles.name}>{data?.name}</h2>
          <p>{data?.description}</p>
          <div className={styles.priceContainer}>
            {hasDiscount && (
              <span className={styles.oldPrice}>
                {data?.price.toFixed(2)} ₽
              </span>
            )}
            <span className={hasDiscount ? styles.newPrice : styles.regularPrice}>
              {parseFloat(discountedPrice ?? "")} ₽
            </span>
          </div>
          <p>
            Рейтинг: {renderStars(Math.round(data?.rating || 0))} (
            {data?.rating?.toFixed(1)})
          </p>
          <p>Бренд: {data?.brand}</p>
          <p>Категория: {data?.category}</p>
          <p>Отзывы: {data?.reviewsCount}</p>
        </div>
      </div>
      <ReviewPanel productId={id} />
    </div>
  );
};
