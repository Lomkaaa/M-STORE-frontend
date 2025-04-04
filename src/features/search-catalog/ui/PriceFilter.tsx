import styles from "../searchCatalog.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/providers/store";
import { setMinPrice, setMaxPrice } from "@/entities/filters/model/filterSlice";
import { useLimits } from "@/entities/filters/api/useLimits";
import { useState, useEffect } from "react";

export const PriceFilter = () => {
  const dispatch = useDispatch();
  const { data: limits, isLoading, error } = useLimits();

  // Получаем значения из Redux
  const minPriceRedux = useSelector((state: RootState) => state.filters.minPrice);
  const maxPriceRedux = useSelector((state: RootState) => state.filters.maxPrice);

  // Локальное состояние для плавного обновления
  const [minPrice, setMinPriceLocal] = useState(minPriceRedux);
  const [maxPrice, setMaxPriceLocal] = useState(maxPriceRedux);

  // Обновление глобального состояния с задержкой (без lodash)
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setMinPrice(minPrice));
      dispatch(setMaxPrice(maxPrice));
    }, 500);

    return () => clearTimeout(timeout);
  }, [minPrice, maxPrice, dispatch]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : 0;
    setMinPriceLocal(value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : 0;
    setMaxPriceLocal(value);
  };

  // Показываем сообщение о загрузке или ошибке, если лимиты еще не загружены
  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки данных о лимитах</div>;

  return (
    <div className={styles.menuSection}>
      <span>Цена:</span>
      <div className={styles.priceInputs}>
        от
        <input
          type="number"
          name="minPrice"
          min={limits?.minPrice ?? 0}
          max={maxPrice}
          value={minPrice || ""} // Оставляем пустое поле, если minPrice == 0
          onChange={handleMinPriceChange}
          className={styles.priceInput}
          placeholder={limits?.minPrice ?? "0"} // Плейсхолдер для минимальной цены
        />
        до
        <input
          type="number"
          name="maxPrice"
          min={minPrice}
          max={limits?.maxPrice ?? 100000000}
          value={maxPrice || ""} // Оставляем пустое поле, если maxPrice == 0
          onChange={handleMaxPriceChange}
          className={styles.priceInput}
          placeholder={limits?.maxPrice ?? "10000"} // Плейсхолдер для максимальной цены
        />
      </div>
    </div>
  );
};