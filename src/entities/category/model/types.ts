import { Product } from "@/entities/product/model/types";

export type Category = {
    id: string;
    name:string;
    products: Product[]
    
}