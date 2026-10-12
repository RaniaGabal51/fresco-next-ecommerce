
import Image from "next/image";
import { Link } from "@/src/i18n/navigation";
import type { Category } from "../types/categories.types";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({
  category,
}: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category._id}`}
      aria-label={`Explore ${category.name}`}
      className="group block h-full"
    >
      <article className="h-full overflow-hidden rounded-2xl border border-border-light bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_14px_35px_rgba(25,55,44,0.09)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent opacity-70" />

          <span className="absolute bottom-3 end-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/90 text-primary shadow-sm transition-all duration-300 group-hover:bg-primary group-hover:text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 rtl:rotate-180"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <h2 className="truncate font-serif text-base font-semibold text-primary transition-colors group-hover:text-accent sm:text-lg">
              {category.name}
            </h2>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted sm:text-[11px]">
              Explore collection
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
