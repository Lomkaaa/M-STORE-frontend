

export type ProductHistory = {
    id: string;
    products: {
      product: {
        id: string;
        name: string;
        price: number;
        imageUrl: string
        discount:number
      };
      value: number;
    }[];
    createdAt: string;
  };

 export type HistoryResponse = {
    histories: ProductHistory[];
    nextCursor: number | null;
  }
  


