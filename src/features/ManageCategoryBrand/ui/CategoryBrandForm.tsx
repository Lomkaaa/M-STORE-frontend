import { useState } from "react";
import { FaEdit, FaPlus, FaTag, FaTrash } from "react-icons/fa"; // Иконки из react-icons
import styles from "./categoriesBrandsForm.module.css";
import { useCreateCategory,useCreateBrand,useDeleteCategory,useDeleteBrand,useUpdateBrand,useUpdateCategory} from "@/features/ManageCategoryBrand/model/index";
import { useCategories } from "@/entities/category/api/useCategory";
import { useBrands } from "@/entities/brand/api/useBrands";
import { AdminProductsNavbar } from "@/widgets/adminProductsNavbar/AdminProductsNavbar";

export const CategoriesBrandsForm = () => {
  const [error, setError] = useState("");
  const handleError = (err: any) => setError(err.response?.data?.message || "Ошибка сервера");
  const handleMutation = (mutationFn: any, data: any) => {
    mutationFn(data, {
      onError: handleError,
      onSuccess: () => setError(""),
    });
  };

  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [editData, setEditData] = useState({ id: "", name: "", type: "" });

  const { mutate: createCategory} = useCreateCategory();
  const { mutate: createBrand } = useCreateBrand();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: deleteBrand } = useDeleteBrand();

  const { mutate: updateBrand } = useUpdateBrand()
  const { mutate: updateCategory } = useUpdateCategory()

  const { data: categories = [] } = useCategories();
  const { data: brands = [] } = useBrands();

  const handleAddCategory = () => {
    if (categoryName.trim()) {
     handleMutation(createCategory, categoryName);
      setCategoryName("");
    }
  };

  const handleAddBrand = () => {
    if (brandName.trim()) {
      handleMutation(createBrand, brandName);
      setBrandName("");
      
    }
  };

  const handleEdit = (id: string, name: string, type: "brand" | "category") => {
    setEditData({ id, name, type });
  };

  const handleSaveEdit = () => {
    if (editData.name.trim()) {
      const mutationFn = editData.type === "brand" ? updateBrand : updateCategory;
      const data = editData.type === "brand" 
        ? { brandId: editData.id, brandName: editData.name } 
        : { categoryId: editData.id, categoryName: editData.name };
      
      handleMutation(mutationFn, data);
      setEditData({ id: "", name: "", type: "" });
    }
  };

  return (
    <>
      <AdminProductsNavbar />
      <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>}
        <h2 className={styles.title}>Управление брендами и категориями</h2>

        <div className={styles.formGroup}>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              className={styles.inputField}
              type="text"
              placeholder="Категория"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <FaTag className={styles.inputIcon} />
          </div>
          <button
            className={styles.addButton}
            onClick={handleAddCategory}
          >
            <FaPlus /> Добавить
          </button>
        </div>

        <ul className={styles.list}>
          {categories.map((category) => (
            <li key={category.id} className={styles.listItem}>
              {category.name}{" "}
              <div className={styles.actions}>
                <FaEdit className={styles.editIcon} onClick={() => handleEdit(category.id, category.name, "category")} />
                <FaTrash className={styles.deleteIcon} onClick={() => deleteCategory(category.id)} />
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.formGroup}>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              className={styles.inputField}
              type="text"
              placeholder="Бренд"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
            <FaTag className={styles.inputIcon} />
          </div>
          <button
            className={styles.addButton}
            onClick={handleAddBrand}
          >
            <FaPlus /> Добавить
          </button>
        </div>

        <ul className={styles.list}>
          {brands.map((brand) => (
            <li key={brand.id} className={styles.listItem}>
              {brand.name}{" "}
              <div className={styles.actions}>
                <FaEdit className={styles.editIcon} onClick={() => handleEdit(brand.id, brand.name, "brand")} />
                <FaTrash className={styles.deleteIcon} onClick={() => deleteBrand(brand.id)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {editData.id && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Редактировать {editData.type === "brand" ? "бренд" : "категорию"}</h3>
              <input
                className={styles.inputField}
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
              <div className={styles.modalActions}>
                <button className={styles.saveButton} onClick={handleSaveEdit}>Сохранить</button>
                <button className={styles.cancelButton} onClick={() => setEditData({ id: "", name: "", type: "" })}>
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
};