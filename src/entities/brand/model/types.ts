import { Product } from "@/entities/product/model/types";

export type Brand = {
    id: string;
    name: string;
    products: Product[];
}