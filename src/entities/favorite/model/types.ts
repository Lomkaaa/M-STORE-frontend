import { Product } from "@/entities/product/model/types";


export type Favorite = {
    id: string;   
    userId: string;   
    product: Product; 
  };
  export type FavoriteResponse = {
    message: string;
    existingFavorite: Favorite[];
    nextPage: number | null; 
    totalPages: number;
}