import { useState } from "react";
import { useCurrentUser } from "@/entities/user/api/api";
import { motion } from "framer-motion";
import ProfileAvatar from "../../shared/ui/ProfileAvatar/ProfileAvatar";
import { EditProfileModal } from "@/features/edit-profile/index";
import styles from "./profileCard.module.css";
import { BackButton } from "@/shared/ui/BackButton/BackButton";
import { AdminButton } from "@/shared/ui/AdminButton/AdminButton";
import { ProfileBalance } from "@/features/updateBalance/ui/ProfileBalance";
import { Link } from "react-router-dom";




const ProfileCard: React.FC = () => {
  const { data: user, isLoading } = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <p>Загрузка...</p>;
  if (!user) return <p>Нет данных о пользователе</p>;

  return (
    <>
    <AdminButton/>
    <BackButton/>
      <motion.div
        className={styles.cardWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.card}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              <ProfileAvatar avatar={user.avatarUrl} />
            </div>

            <button
              className={styles.uploadButton}
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </button>
          </div>

          <div className={styles.info}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Имя:</span>
              <span className={styles.infoValue}>{user.name}</span>
              <span></span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Email:</span>
              <span className={styles.infoValue}>{user.email}</span>
              <span></span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Телефон:</span>
              <span className={styles.infoValue}>{user.phone}</span>
              <span></span>
            </div>
          </div>

          <div className={styles.balanceSection}>
          <ProfileBalance currentBalance={user.balance} />
          </div>
        </div>

       
        <div className={styles.orderStatusContainer}>
          <div className={styles.orderStatusWrapper}>
            <Link to="/orders" className={styles.historyButton}>
             статус заказа
             </Link>
            <Link to="/history" className={styles.historyButton}>
             История покупок
            </Link>
          </div>
        </div>
      </motion.div>

      {isEditing && (
        <EditProfileModal user={user} onClose={() => setIsEditing(false)} />
      )}
    </>
  );
};

export default ProfileCard;
