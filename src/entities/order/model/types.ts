
  export type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export type Product = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    discount:number
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  value: number;
  price: number; 
  
};

export type Order = {
  id: string;
  userId: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  products: OrderItem[];
};
