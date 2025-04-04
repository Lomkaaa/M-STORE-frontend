import { api } from '@/shared/config/api';

export  const deleteToBasket = async (productId:string) => {
    const response = await api.delete(`api/basket/${productId}`);
    return response.data; 
  };