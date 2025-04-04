export type Product = {
  id: string;
  name: string;
  price: number;
  discount: number;
  rating: number;
  brand: string;
  category: string;
  description: string;
  imageMainUrl: string;
  imageUrl? :string,
  imageOtherUrl: string[];
  favoriteByUser: boolean;
  rateByUser: boolean;
  userRate?: number;
  reviewsCount?: number;
  value:number;
  reviews: Review[];
};
export type ProductsResponse = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  products: Product[];
}

export type Review = {
  userId: string;
  value: number;
  comment: string;
};

export type UseProductsParams = {
  minPrice?: number;  
  maxPrice?: number; 
  minRating?: number;  
  maxRating?: number;  
  categorySort?: string;  
  brandSort?: string;
  discountOnly?: boolean;
  search: string; 
  sortBy: 'name' | 'price' | 'rating' | 'reviewsCount' | 'createdAt';
  sort: "ASC" | "DESC";  
  page: number;  
  limit: number;  
};

export type ProductDetailsResponse  = {
  id: string;
  name: string;
  price: number;
  discount: number;
  rating: number;
  brand: string;
  category: string;
  description: string;
  imageMainUrl: string;
  imageOtherUrl: string[];
  favoriteByUser: boolean;
  rateByUser: boolean;
  userRate: number;
  reviewsCount: number;
  reviews: Review[];
}
