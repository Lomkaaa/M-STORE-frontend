export type ReviewRequest = {
    productId:string;
    value: number;
    content: string
}

export type ReviewResponse = {
    id: string;
    productId: string;
    userId: string;
    value: number;
    content: string;
    createdAt: string;
 };

 export type DeleteReviewRequest = {
    reviewId: string;
    productId: string;
  };