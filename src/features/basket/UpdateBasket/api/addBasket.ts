import { api } from '@/shared/config/api';

export  const addToBasket = async ({ productId, value }: { productId: string; value: number }) => {
    const response = await api.patch(`api/basket/${productId}`, { productId, value });
    return response.data; 
  };