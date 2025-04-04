import { Product } from "@/entities/product/model/types";

export type BasketItem = {
    id: string;
    value: number;
    userId: string;
    productId: string;
    product: Product;
  }