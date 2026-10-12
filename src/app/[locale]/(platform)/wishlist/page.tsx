import { getWishlist } from "@/src/features/wishlist/server/wishlist.actions";
import WishlistScreen from "@/src/features/wishlist/screens/WishlistScreen";
import type { Product } from "@/src/features/products/types/products.types";

export default async function WishlistPage() {
  const response = await getWishlist();

  const products: Product[] =
    response.status === "success" && Array.isArray(response.data)
      ? response.data
      : [];

  return <WishlistScreen initialProducts={products} />;
}