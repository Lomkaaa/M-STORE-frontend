import { Product } from "@/entities/product/model/types";

export type createProductRequest = {
    name: string;
    price: number;
    brand: string;
    category: string;
    description: string;
    value: number;
}
export type updateProductRequest = {
    productId: string;
    name?: string;
    price?: number;
    brand?: string;
    category?: string;
    description?: string;
    value?: number;
    discount?: number;
}

export type createProductResponse = {
    product:Product;
}