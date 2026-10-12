
import { apiClient } from "@/src/services/apiClient";
import type { AxiosRequestConfig } from "axios";
import type { ProductsResponse } from "../types/products.types";

export async function getAllproducts(
  brandId?: string,
  categoryId?: string
): Promise<ProductsResponse> {
  const params: Record<string, string> = {};

  if (brandId) {
    params.brand = brandId;
  }

  if (categoryId) {
    params["category[in]"] = categoryId;
  }

  const options: AxiosRequestConfig = {
    url: "/products",
    method: "GET",
    params,
  };

  const { data } = await apiClient.request(options);

  return data;
}
