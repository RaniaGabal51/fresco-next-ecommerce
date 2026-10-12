import { getSpecificCategory } from "@/src/features/categories/services/getSpecificCategory";
import { getAllproducts } from "@/src/features/products/services/getAllProducts";
import CategoryProductsScreen from "@/src/features/categories/screens/CategoryProductsScreen";
import type { Category } from "@/src/features/categories/types/categories.types";
import type { Product } from "@/src/features/products/types/products.types";

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let category: Category | null = null;
  let products: Product[] = [];
  let error = false;

  try {
    const [categoryData, productsResponse] = await Promise.all([
      getSpecificCategory(id),
      getAllproducts(undefined, id),
    ]);

    category = categoryData;
    products = productsResponse.data ?? [];
  } catch (err) {
    error = true;
  }

  return (
    <CategoryProductsScreen
      category={category}
      products={products}
      error={error}
    />
  );
}
