import { api } from '@/shared/config/api';

export  const clearBasket = async () => {
    const response = await api.delete(`api/basket`);
    return response.data; 
  };