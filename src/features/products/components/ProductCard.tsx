"use client";

import Link from "next/link";
import Image from "next/image";
import {
  IconEye,
  IconHeart,
  IconPlus,
  IconStarFilled,
} from "@tabler/icons-react";
import { Product } from "../types/products.types";
import { addProductToCart } from "../../cart/server/cart.actions";
import { toast } from "sonner";
import { cartActions } from "../../cart/slices/cart.slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { IconHeartFilled } from "@tabler/icons-react";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/src/features/wishlist/server/wishlist.actions";

type ProductCardProps = {
  product: Product;
  initialIsWishlisted?: boolean;
  onWishlistChange?: (productId: string, isWishlisted: boolean) => void;
};

export default function ProductCard({
  product,
  initialIsWishlisted = false,
  onWishlistChange,
}: ProductCardProps) {
  const rating = product.ratingsAverage || 0;
  const ratingCount = product.ratingsQuantity || 0;
  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;

  const { setCartInfo } = cartActions;

  const dispatch = useDispatch();

  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  async function handleWishlistToggle() {
    if (isWishlistLoading) return;

    setIsWishlistLoading(true);

    try {
      const response = isWishlisted
        ? await removeProductFromWishlist(product._id)
        : await addProductToWishlist(product._id);

      if (response.status !== "success") {
        toast.error(response.message ?? "Could not update wishlist.");
        return;
      }

      const nextIsWishlisted = !isWishlisted;

      setIsWishlisted(nextIsWishlisted);

      onWishlistChange?.(product._id, nextIsWishlisted);

      toast.success(
        isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      );
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsWishlistLoading(false);
    }
  }

  async function handleAddToCart() {
    const response = await addProductToCart(product._id);
    if (response.status === "fail" || response.status === "error") {
      toast.error(response.message);
      return;
    }
    if (response.status === "success") {
      dispatch(setCartInfo(response));
      toast.success(response.message);
    }
  }

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-border-light
        bg-surface
        shadow-[0_8px_30px_rgba(25,55,44,0.06)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-border
        hover:shadow-[0_16px_40px_rgba(25,55,44,0.10)]
      "
    >
      <div className="relative">
        <Link
          href={`/products/${product._id}`}
          className="block overflow-hidden"
        >
          <div
            className="
              flex
              aspect-[4/4.3]
              items-center
              justify-center
              px-5
              py-6
              sm:px-6
              sm:py-7
            "
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </Link>
        {hasDiscount && (
          <span
            className="
              absolute
              start-3
              top-3
              rounded-full
              bg-accent
              px-2.5
              py-1
              text-[9px]
              font-semibold
              uppercase
              tracking-wide
              text-white
            "
          >
            Sale
          </span>
        )}
        <div
          className="
            absolute
            end-3
            top-3
            flex
            flex-col
            gap-2
            opacity-100
            transition-all
            duration-300
            sm:translate-x-2
            sm:opacity-0
            sm:group-hover:translate-x-0
            sm:group-hover:opacity-100
          "
        >
          <button
            type="button"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            aria-pressed={isWishlisted}
            disabled={isWishlistLoading}
            onClick={handleWishlistToggle}
            className={`
    flex h-9 w-9 items-center justify-center rounded-full
    border border-border-light bg-surface
    shadow-[0_4px_12px_rgba(25,55,44,0.08)]
    transition-all duration-200
    hover:border-accent hover:bg-accent hover:text-white
    disabled:cursor-not-allowed disabled:opacity-60
    ${isWishlisted ? "border-accent bg-accent text-white" : "text-primary"}
  `}
          >
            {isWishlisted ? (
              <IconHeartFilled size={16} />
            ) : (
              <IconHeart size={16} stroke={1.7} />
            )}
          </button>

          <Link
            href={`/products/${product._id}`}
            aria-label="View product"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-border-light
              bg-surface
              text-primary
              shadow-[0_4px_12px_rgba(25,55,44,0.08)]
              transition-all
              duration-200
              hover:border-primary
              hover:bg-primary
              hover:text-background
            "
          >
            <IconEye size={16} stroke={1.7} />
          </Link>
        </div>
      </div>
      <div className="border-t border-border-light px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        {product.category?.name && (
          <p
            className="
              mb-1.5
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-muted
            "
          >
            {product.category.name}
          </p>
        )}
        <Link href={`/products/${product._id}`}>
          <h3
            className="
              line-clamp-2
              min-h-[38px]
              text-xs
              font-semibold
              leading-[1.6]
              text-primary
              transition-colors
              duration-200
              group-hover:text-accent
              sm:text-[13px]
            "
          >
            {product.title}
          </h3>
        </Link>
        <div className="mt-2.5 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <IconStarFilled
                key={star}
                size={11}
                className={
                  star <= Math.round(rating) ? "text-accent" : "text-border"
                }
              />
            ))}
          </div>

          <span className="text-[9px] text-muted">
            {rating.toFixed(1)} ({ratingCount})
          </span>
        </div>
        <div className="mt-3.5 flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-sm font-semibold text-primary sm:text-base">
              {hasDiscount
                ? `${product.priceAfterDiscount} EGP`
                : `${product.price} EGP`}
            </span>

            {hasDiscount && (
              <span className="text-[10px] text-subtle line-through">
                {product.price} EGP
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label="Add to cart"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-primary
              text-background
              shadow-sm
              transition-all
              duration-200
              hover:scale-105
              hover:bg-primary-light
            "
            onClick={handleAddToCart}
          >
            <IconPlus size={17} stroke={2} />
          </button>
        </div>
      </div>
    </article>
  );
}
