import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../searchCatalog.module.css";
import { useBrands } from "@/entities/brand/api/useBrands"; 
import { setBrandSort } from "@/entities/filters/model/filterSlice";

export const BrandMenu = () => {
  const { data: brands } = useBrands();
  const dispatch = useDispatch();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null); // Состояние для выбранного бренда

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName); // Обновляем выбранный бренд
    dispatch(setBrandSort(brandName)); // Диспатчим в Redux
  };

  return (
    <div className={styles.menuSection}>
      <span>Бренд:</span>
      <div className={styles.items}>
        {brands?.map((brand) => (
          <button
            key={brand.id}
            onClick={() => handleBrandSelect(brand.name)}
            className={`${styles.menuItem} ${selectedBrand === brand.name ? styles.selected : ''}`} // Подсвечиваем выбранный элемент
          >
            {brand.name}
          </button>
        ))}
      </div>
    </div>
  );
};