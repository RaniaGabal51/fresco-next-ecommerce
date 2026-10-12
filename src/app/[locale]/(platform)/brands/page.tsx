
import { getAllBrands } from "@/src/features/brands/server/brands.actions";
import BrandsScreen from "@/src/features/brands/screens/BrandsScreen";
import type { Brand } from "@/src/features/brands/types/brands.types";

export default async function BrandsPage() {
  let brands: Brand[] = [];
  let error = false;

  try {
    brands = await getAllBrands();
  } catch {
    error = true;
  }

  return <BrandsScreen brands={brands} error={error} />;
}