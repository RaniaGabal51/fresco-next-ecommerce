
import { getAllCategories } from "@/src/features/categories/services/getAllCategories";
import CategoriesScreen from "@/src/features/categories/screens/CategoriesScreen";
import type { Category } from "@/src/features/categories/types/categories.types";

export default async function CategoriesPage() {
  let categories: Category[] = [];
  let error = false;

  try {
    const response = await getAllCategories();
    categories = response.data ?? [];
  } catch (err) {
    error = true;
  }

  return (
    <CategoriesScreen
      categories={categories}
      error={error}
    />
  );
}
