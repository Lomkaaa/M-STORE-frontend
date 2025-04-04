import { LoadingSpinner } from "@/shared/ui/Spinner/Spinner";
import styles from "./reviewPanel.module.css";
import { useAddReview } from "@/features/addReviews/model/useAddReview";
import { useReviewsByProduct } from "@/entities/reviews/model/useReviewsByProduct";
import { useState } from "react";
import { RatingStars } from "@/shared/ui/RatingStars/RatingStarts";
import { BASE_URL } from "@/shared/config/api";

type ProductIdProps = {
  productId: string;
};

export const ReviewPanel = ({ productId }: ProductIdProps) => {
  const { data: reviews, isLoading: isLoadingReviews } = useReviewsByProduct(
    productId!
  );
  const addReview = useAddReview();

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [page, setPage] = useState(1);
  const REVIEWS_PER_PAGE = 3;
  const visibleReviews = reviews?.slice(0, page * REVIEWS_PER_PAGE) || []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && content.trim()) {
      await addReview.mutateAsync({
        productId: productId!,
        value: rating,
        content,
      });
      setRating(0);
      setContent("");
    }
  };

  return (
    <div className={styles.reviewsSection}>
      <h2>Отзывы</h2>
      {isLoadingReviews ? (
        <LoadingSpinner />
      ) : (
        <>
          <ul>
            {visibleReviews?.map((review) => (
              <li key={review.id} className={styles.reviewItem}>
                <div className={styles.reviewHeader}>
                  <img
                    src={review.user.avatarUrl?.startsWith("http") ?review.user.avatarUrl: BASE_URL + review.user.avatarUrl}
                    alt={review.user.name}
                    className={styles.avatar}
                  />
                  <div className={styles.reviewText}>
                    <p>
                      <strong>{review.user.name}</strong>
                    </p>
                    <RatingStars size={10} rating={review.value} />
                    <p>{review.content}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {reviews && reviews.length > visibleReviews.length && (
            <button className={styles.showMoreBtn} onClick={() => setPage(page + 1)}>
              Показать больше
            </button>
          )}

          {page > 1 && (
            <button className={styles.showMoreBtn} onClick={() => setPage(1)}>
              Скрыть
            </button>
          )}
        </>
      )}

      <h3>Добавить отзыв</h3>
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <RatingStars size={24} rating={rating} onClick={setRating} />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Оставьте ваш отзыв..."
          required
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};