
"use server";

import { apiClient } from "@/src/services/apiClient";
import type {
  Brand,
  BrandsResponse,
  BrandResponse,
} from "../types/brands.types";

export async function getAllBrands(
  keyword?: string
): Promise<Brand[]> {
  try {
    const { data } = await apiClient.get<BrandsResponse>(
      "/brands",
      {
        params: {
          limit: 100,
          ...(keyword?.trim()
            ? { keyword: keyword.trim() }
            : {}),
        },
      }
    );

    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    throw new Error("Failed to load brands");
  }
}

export async function getBrandById(
  id: string
): Promise<Brand | null> {
  try {
    const { data } = await apiClient.get<BrandResponse>(
      `/brands/${id}`
    );

    return data.data ?? null;
  } catch (error) {
    return null;
  }
}