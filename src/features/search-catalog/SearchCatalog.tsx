import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import styles from "./searchCatalog.module.css";

import { CategoryMenu } from "./ui/CategoryMenu";
import { BrandMenu } from "./ui/BrandMenu";
import { PriceFilter } from "./ui/PriceFilter";
import { RootState } from "@/app/providers/store";
import {
  setSortBy,
  setSortOrder,
  setDiscountOnly,
} from "@/entities/filters/model/filterSlice";
import { useDispatch, useSelector } from "react-redux";

export function SearchCatalog() {
  const dispatch = useDispatch();
  const { sortBy, sort, discountOnly } = useSelector(
    (state: RootState) => state.filters
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setSortBy(
        event.target.value as
          | "name"
          | "price"
          | "rating"
          | "reviewsCount"
          | "createdAt"
      )
    );
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setSortOrder(event.target.value as "ASC" | "DESC"));
  };

  const handleDiscountOnlyChange = (value: boolean) => {
    dispatch(setDiscountOnly(value));
  };

  return (
    <>
      <div
        ref={navbarRef}
        className={styles.menuButton}
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen((prev) => !prev);
        }}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />} Каталог
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.menuDropdown}
            onClick={(e) => e.stopPropagation()}
          >
            <BrandMenu />
            <CategoryMenu />
            <PriceFilter />
            <div className={styles.discountWrapper}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={discountOnly}
                  onChange={(e) => handleDiscountOnlyChange(e.target.checked)}
                  className={styles.checkboxInput}
                />
                Только со скидкой
                <span className={styles.checkboxCustom}></span>
              </label>
            </div>

            <div className={styles.sortOptions}>
              <label className={styles.sortLabel}>
                Сортировать по:
                <select
                  value={sortBy}
                  onChange={handleSortByChange}
                  className={styles.sortSelect}
                >
                  <option value="price">Цена</option>

                  <option value="name">Название</option>

                  <option value="createdAt">Дата добавления</option>
                </select>
              </label>

              <label className={styles.sortLabel}>
                Порядок:
                <select
                  value={sort}
                  onChange={handleSortOrderChange}
                  className={styles.sortSelect}
                >
                  <option value="ASC">По возрастанию</option>
                  <option value="DESC">По убыванию</option>
                </select>
              </label>
            </div>

            {/* Кнопка Применить фильтры */}
            <div className={styles.applyButtonWrapper}>
              <button
                className={styles.applyButton}
                onClick={() => setMenuOpen(false)}
              >
                Применить
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
