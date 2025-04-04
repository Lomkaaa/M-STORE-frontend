import { User } from "@/entities/user/types";


export type Review = {
    id: string;
    productId: string;
    userId: string;
    value: number;
    content: string;
    createdAt: string;
    user: User
  };