
import { Link } from "@/src/i18n/navigation";
import type { Brand } from "../types/brands.types";

interface BrandCardProps {
  brand: Brand;
}

export default function BrandCard({
  brand,
}: BrandCardProps) {
  return (
    <Link
      href={`/products?brand=${brand._id}`}
      className="group flex h-full flex-col items-center rounded-2xl
        border border-gray-100 bg-white p-5 text-center
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:border-primary/30
        hover:shadow-lg sm:p-6"
      aria-label={`Explore ${brand.name} products`}
    >
      <div
        className="flex aspect-square w-full max-w-44
          items-center justify-center overflow-hidden
          rounded-xl bg-[#F8F8F4] p-5
          transition-colors duration-300
          group-hover:bg-[#F1F4E9]"
      >
        <img
          src={brand.image}
          alt={`${brand.name} logo`}
          loading="lazy"
          className="h-full w-full object-contain
            transition-transform duration-300
            group-hover:scale-105"
        />
      </div>

      <h2
        className="mt-5 line-clamp-2 min-h-12
          text-base font-semibold text-gray-800
          transition-colors group-hover:text-primary"
      >
        {brand.name}
      </h2>

      <span
        className="mt-2 text-xs font-medium
          tracking-wide text-gray-400
          transition-colors group-hover:text-primary"
      >
        EXPLORE BRAND
      </span>
    </Link>
  );
}