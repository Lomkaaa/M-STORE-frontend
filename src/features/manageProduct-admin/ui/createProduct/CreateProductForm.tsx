import React, { useState, useRef } from "react";
import { createProductRequest } from "../../model/types";
import { useCreateProduct } from "../../model/useCreateProduct";
import styles from "./createProductForm.module.css";
import { AdminProductsNavbar } from "../../../../widgets/adminProductsNavbar/AdminProductsNavbar";

export const AddProductForm = () => {
  const [product, setProduct] = useState<createProductRequest>({
    name: "",
    description: "",
    price: 0,
    category: "",
    brand: "",
    value: 0,
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null); // 👈 Реф на input[type="file"]

  const { mutate, isPending } = useCreateProduct();

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

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", String(product.price));
    formData.append("category", product.category);
    formData.append("brand", product.brand);
    formData.append("value", String(product.value));

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    mutate(formData, {
      onError: (error: any) => {
        if (error?.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        }
      },
      onSuccess: () => {
        setSuccessMessage("Товар успешно добавлен!");

        setProduct({
          name: "",
          description: "",
          price: 0,
          category: "",
          brand: "",
          value: 0,
        });
        setSelectedFiles([]);
        setPreviewUrls([]);
        fileInputRef.current && (fileInputRef.current.value = ""); // 👈 Сброс input[type="file"]
      },
    });
  };

  return (
    <>
      <AdminProductsNavbar />
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.formTitle}>Добавить новый продукт</h2>

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
            ref={fileInputRef} // 👈 ref подключён
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

        <button
          type="submit"
          disabled={isPending}
          className={styles.submitButton}
        >
          {isPending ? "Добавление..." : "Добавить продукт"}
        </button>
      </form>
    </>
  );
};