import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../api/createProduct";
import { createProductResponse } from "./types";

export const useCreateProduct = () => {
  return useMutation<createProductResponse, Error, FormData>({
    mutationKey: ["product"],
    mutationFn: createProduct,
  });
};