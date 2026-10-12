import type { Category } from "../types/categories.types";
import type { Product } from "@/src/features/products/types/products.types";
import ProductCard from "@/src/features/products/components/ProductCard";
import Link from "next/link";
import { IconArrowLeft, IconPackageOff } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

type CategoryProductsScreenProps = {
  category: Category | null;
  products: Product[];
  error?: boolean;
};

export default function CategoryProductsScreen({
  category,
  products,
  error = false,
}: CategoryProductsScreenProps) {
  const t = useTranslations("categoryProductsScreen");

  if (error || !category) {
    return (
      <main className="min-h-[60vh] bg-background w-full px-6 py-20 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border-light bg-surface p-8 text-center shadow-sm">
          <h1 className="font-serif text-2xl font-semibold text-primary">
            {t("errorLoadTitle")}
          </h1>
          <p className="mt-3 text-xs leading-5 text-muted">
            {t("errorLoadDesc")}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border-light bg-surface py-8 sm:py-10">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent sm:text-xs">
            {t("breadcrumb")}
          </p>

          <h1 className="font-serif text-3xl font-semibold tracking-[-0.03em] text-primary sm:text-4xl">
            {category.name}
          </h1>

          <p className="mt-2 max-w-xl text-xs leading-6 text-muted sm:text-sm">
            {t("explorePrefix")} {category.name.toLowerCase()} {t("exploreSuffix")}
          </p>

          <p className="mt-4 text-xs text-muted">
            <span className="font-semibold text-primary">
              {products.length}
            </span>{" "}
            {products.length === 1 ? t("productSingular") : t("productPlural")}
          </p>
        </div>
      </section>

      <section className="w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
        {products.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-3xl border border-border-light bg-surface px-6 py-16 text-center shadow-[0_8px_30px_rgba(25,55,44,0.04)] sm:py-20">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <IconPackageOff size={32} stroke={1.5} />
            </div>

            <h3 className="font-serif text-xl font-semibold text-primary sm:text-2xl">
              {t("noProductsTitle")}
            </h3>

            <p className="mt-2.5 text-xs leading-6 text-muted sm:text-sm">
              {t("noProductsDesc")}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-background shadow-[0_8px_20px_rgba(25,55,44,0.15)] transition-all hover:bg-primary-light"
              >
                <IconArrowLeft
                  size={15}
                  stroke={1.7}
                  className="transition-transform group-hover:-translate-x-0.5 rtl:rotate-180"
                />
                {t("exploreShop")}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}