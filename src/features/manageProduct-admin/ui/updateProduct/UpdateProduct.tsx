import { useState } from "react";
import styles from "./updateProduct.module.css";
import { useProducts } from "@/entities/product/api/productApi";
import { LoadingSpinner } from "@/shared/ui/Spinner/Spinner";
import { Error } from "@/shared/ui/Error/Error";
import { BASE_URL } from "@/shared/config/api";
import { AdminProductsNavbar } from "../../../../widgets/adminProductsNavbar/AdminProductsNavbar";
import { EditProductModal } from "../editProductModal/EditProductModal";

export const UpdateProduct = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const { data, isLoading, isError } = useProducts({
    search,
    page: 1,
    limit: 10,
    sort: "ASC",
    sortBy: "name",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleEditProduct = (productId: string) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const filteredProducts = data?.products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
 console.log(data)
  return (
    <>
      <AdminProductsNavbar />
      <div className={styles.container}>
        <h2>Обновить товар</h2>
        <input
          value={search}
          type="text"
          placeholder="Поиск по названию..."
          onChange={handleSearch}
          className={styles.searchInput}
        />
        {isLoading && <LoadingSpinner />}
        {isError && !isLoading && <Error text="Товары не найдены" />}
        <div className={styles.productList}>
          {filteredProducts?.length ? (
            filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <img
                  src={product.imageMainUrl.startsWith("http")? product.imageMainUrl : BASE_URL + product.imageMainUrl}
                  alt={product.name}
                  className={styles.productImage}
                />
                <h3>{product.name}</h3>
                <button className={styles.buttonUpdate} onClick={() => handleEditProduct(product.id)}>
                  Редактировать товар
                </button>
              </div>
            ))
          ) : (
            <p>Товары не найдены</p>
          )}
        </div>
      </div>
      {isModalOpen && selectedProductId && (
        <EditProductModal
          productId={selectedProductId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};