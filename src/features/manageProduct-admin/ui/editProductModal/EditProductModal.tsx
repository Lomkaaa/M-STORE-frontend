import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./editProductModal.module.css";
import { useUpdateProduct } from "../../model/useUpdateProduct";
import { updateProductRequest } from "../../model/types";
import { useProductById } from "@/entities/product/api/productById";

type EditProductModalProps = {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
};

export const EditProductModal: React.FC<EditProductModalProps> = ({
  productId,
  isOpen,
  onClose,
}) => {
  const { data: productData } = useProductById(productId);

  const [product, setProduct] = useState<updateProductRequest>({
    name: "",
    description: "",
    price: 0,
    category: "",
    brand: "",
    value: 0,
    discount: 0,
    productId: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { mutate, isPending } = useUpdateProduct();

  useEffect(() => {
    if (productData) {
      setProduct({
        name: productData.name ?? "",
        description: productData.description ?? "",
        price: productData.price ?? 0,
        category: productData.category ?? "",
        brand: productData.brand ?? "",
        discount: productData.discount ?? 0,
        productId: productData.id ?? "",
      });
    }
  }, [productData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      if (files.length + selectedFiles.length > 3) {
        setErrorMessage("Можно загрузить не больше 3 фотографий.");
        return;
      }

      setErrorMessage(null);
      setSelectedFiles((prev) => [...prev, ...files]);
      setPreviewUrls((prev) => [
        ...prev,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.productId) {
      setErrorMessage("Ошибка: ID товара отсутствует.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name || "");
    formData.append("description", product.description || "");
    formData.append("price", String(product.price));
    formData.append("category", product.category || "");
    formData.append("brand", product.brand || "");
    formData.append("discount", String(product.discount));

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    mutate({ productId, formData }, {
      onError: (error: any) => {
        if (error?.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        }
      },
      onSuccess: () => {
        setSuccessMessage("Товар успешно обновлен!");
        setSelectedFiles([]);
        setPreviewUrls([]);
        onClose(); // Закрываем окно после успешного обновления
      },
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className={styles.modalBackdrop}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
      >
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

        <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.formTitle}>Редактировать продукт</h2>

        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Название:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Описание:</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Цена:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Категория:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Бренд:</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Количество:</label>
          <input
            type="number"
            name="value"
            value={product.value}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Скидка:</label>
          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Изображения (до 3 фото):</label>

          <label htmlFor="fileInput" className={styles.customFileInput}>
            Выберите файлы
          </label>
          <input
            type="file"
            id="fileInput"
            name="files"
            multiple
            onChange={handleFileChange}
            className={styles.fileInput}
            hidden
          />
        </div>
        <div className={styles.imagePreviewContainer}>
          {previewUrls.map((url, index) => (
            <div key={index} className={styles.imagePreview}>
              <img
                src={url}
                alt={`preview ${index}`}
                className={styles.previewImage}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className={styles.removeButton}
              >
                X
              </button>
            </div>
          ))}
        </div>


          <button type="submit" disabled={isPending} className={styles.submitButton}>
            {isPending ? "Обновление..." : "Обновить продукт"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};