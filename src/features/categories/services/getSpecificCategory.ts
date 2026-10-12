
import { apiClient } from "@/src/services/apiClient";
import type { Category } from "../types/categories.types";

type CategoryResponse = {
  data: Category;
};

export async function getSpecificCategory(
  id: string
): Promise<Category> {
  const { data } = await apiClient.get<CategoryResponse>(
    `/categories/${id}`
  );

  return data.data;
}
