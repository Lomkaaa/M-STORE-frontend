import React, { useState } from "react";
import { useUpdateUser } from "@/features/edit-profile/model/api/useUpdateUser";
import { User } from "@/entities/user/types";
import { useQueryClient } from "@tanstack/react-query";
import { FaEye, FaEyeSlash, FaTrash, FaUpload } from "react-icons/fa";
import styles from "./EditProfileModal.module.css";
import { BASE_URL } from "@/shared/config/api";

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  user,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const avatarUrl = BASE_URL + user.avatarUrl;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    avatarUrl ? avatarUrl : null
  );

  const { mutate} = useUpdateUser();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordToggle = () => {
    setPasswordVisible((prev) => !prev); // Переключаем видимость пароля
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
      }
    }
  };
  const handleRemoveAvatar = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Создаем объект FormData
    const formDataToSend = new FormData();

    // Добавляем данные из формы в FormData
    formDataToSend.append("name", formData.name || "");
    formDataToSend.append("password", formData.password || "");
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    if (selectedFile) {
      formDataToSend.append("file", selectedFile); // Добавляем файл
    }
    formDataToSend.append("id", String(user.id)); // Добавляем ID пользователя
    // Отправляем данные на сервер
    mutate(formDataToSend, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        onClose();
      },
      onError: (error: any) => {
        // Пример обработки ошибки
        if (error?.response?.data?.message) {
          setErrorMessage(error.response.data.message); // Устанавливаем ошибку в состояние
        }
      },
    });
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Редактировать профиль</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.avatarContainer}>
            {preview ? (
              <div className={styles.avatarPreview}>
                <img
                  src={preview}
                  alt="Avatar Preview"
                  className={styles.avatar}
                />
                <button
                  type="button"
                  className={styles.removeAvatar}
                  onClick={handleRemoveAvatar}
                >
                  <FaTrash />
                </button>
              </div>
            ) : (
              <div className={styles.uploadPlaceholder}>
                <FaUpload size={40} color="#bbb" />
              </div>
            )}
            <label className={styles.customFileButton}>
              Выбрать фото
              <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handleFileChange}
              />
              
            </label>
          </div>
          <div>
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <div className={styles.passwordWrapper}>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password || ""}
                onChange={handleInputChange}
              />
              <div
                role="button"
                className={styles.passwordToggle}
                onClick={handlePasswordToggle}
                aria-pressed={passwordVisible}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="phone">Телефон</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
            />
          </div>
          
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Сохранить
            </button>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
            >
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
