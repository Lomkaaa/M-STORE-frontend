import { BasketItem } from "@/entities/basket/model/types"
import { api } from "@/shared/config/api"
import { OrderResponse } from "../model/types";

export const  purchaseBasket = async (items:BasketItem[]): Promise<OrderResponse>  => {

    const response = await api.post("api/orders", {
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.value
        })),
      });
   return response.data
}