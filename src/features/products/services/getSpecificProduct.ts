import { apiClient } from "@/src/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { ProductDetailsResponse } from "../types/productDetails.type";

export async function getSpecificProduct(id:string): Promise<ProductDetailsResponse> {
  const options: AxiosRequestConfig = {
    url: `/products/${id}`,
    method: "GET",
  };

  const { data } = await apiClient.request(options);

  return data;
}
