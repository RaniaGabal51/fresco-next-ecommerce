import Link from "next/link";
import Image from "next/image";
import {
  IconEye,
  IconHeart,
  IconPlus,
  IconStarFilled,
} from "@tabler/icons-react";
import { Product } from "../types/products.types";

export default function ProductCard({ product }: { product: Product }) {
  const rating = product.ratingsAverage || 0;
  const ratingCount = product.ratingsQuantity || 0;
  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;

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
            aria-label="Add to wishlist"
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
              hover:border-accent
              hover:bg-accent
              hover:text-white
            "
          >
            <IconHeart size={16} stroke={1.7} />
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
          >
            <IconPlus size={17} stroke={2} />
          </button>
        </div>
      </div>
    </article>
  );
}
