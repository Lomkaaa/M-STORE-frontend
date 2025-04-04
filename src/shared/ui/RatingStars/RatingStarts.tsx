import { FaStar } from "react-icons/fa";
import styles from "./ratingStars.module.css"; // Создайте отдельный файл стилей для RatingStars



type RatingStarsProps = {
  rating: number;  // Рейтинг для отображения
  onClick?: (rating: number) => void; // Функция для обработки кликов, если она передана (для нового отзыва)
  size:number
};


export const RatingStars = ({ rating, onClick,size }: RatingStarsProps) => {

  return (
    <div className={styles.ratingInput}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={size}
          color={star <= rating ? "gold" : "lightgray"}
          onClick={() => onClick && onClick(star)}  // Если onClick передан, добавляем обработчик клика
        />
      ))}
    </div>
  );
};