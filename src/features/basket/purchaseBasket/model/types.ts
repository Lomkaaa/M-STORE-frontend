export type OrderResponse = {
    message: string;
    order: {
      id: string;
      total: number;
      status: string;
    };
  }