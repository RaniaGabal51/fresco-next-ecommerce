import { apiClient } from "@/src/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { ProductsResponse } from "../types/products.types";

export async function getAllproducts(): Promise<ProductsResponse> {
  const options: AxiosRequestConfig = {
    url: "/products",
    method: "GET",
  };

  const { data } = await apiClient.request(options);

  return data;
}
