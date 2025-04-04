import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../searchCatalog.module.css";
import { useCategories } from "@/entities/category/api/useCategory";
import { setCategorySort } from "@/entities/filters/model/filterSlice";

export const CategoryMenu = () => {
  const dispatch = useDispatch();
  const { data: categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    dispatch(setCategorySort(categoryName));
  };

  return (
    <div className={styles.menuSection}>
      <span>Категория:</span>
      <div className={styles.items}>
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.name)}
            className={`${styles.menuItem} ${selectedCategory === category.name ? styles.selected : ''}`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};