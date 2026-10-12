"use client";

import Link from "next/link";
import { useState } from "react";
import { IconHeart, IconArrowRight, IconChevronRight } from "@tabler/icons-react";
import type { Product } from "@/src/features/products/types/products.types";
import ProductCard from "@/src/features/products/components/ProductCard";
import { useTranslations } from "next-intl";

export default function WishlistScreen({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const t = useTranslations("wishlistScreen");

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border-light bg-surface py-8 sm:py-10">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-medium text-muted">
            <Link href="/" className="transition-colors hover:text-accent">
              {t("header.home") || "الرئيسية"}
            </Link>

            <IconChevronRight
              size={12}
              stroke={1.5}
              className="text-subtle rtl:rotate-180"
            />

            <span className="font-semibold text-accent">
              {t("header.title")}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-xs">
                <IconHeart size={22} stroke={1.6} />
              </div>

              <div>
                <h1 className="font-serif text-2xl font-semibold tracking-[-0.03em] text-primary sm:text-3xl">
                  {t("header.title")}
                </h1>
                <p className="mt-0.5 text-[11px] text-muted sm:text-xs">
                  {t("header.description")}
                </p>
              </div>
            </div>

            <span className="rounded-full border border-border-light bg-background px-4 py-2 text-xs font-semibold text-primary shadow-xs">
              {products.length}{" "}
              {products.length === 1
                ? t("header.itemSingular")
                : t("header.itemPlural")}
            </span>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                initialIsWishlisted
                onWishlistChange={(productId, isWishlisted) => {
                  if (!isWishlisted) {
                    setProducts((current) =>
                      current.filter((item) => item._id !== productId)
                    );
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-border-light bg-surface px-6 py-12 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <IconHeart size={30} stroke={1.4} />
            </div>

            <h2 className="font-serif text-xl font-semibold text-primary">
              {t("empty.title")}
            </h2>

            <p className="mt-2 max-w-sm text-xs leading-6 text-muted">
              {t("empty.description")}
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-xs font-semibold text-white shadow-md shadow-accent/20 transition-all hover:bg-accent-hover"
            >
              {t("empty.button")}
              <IconArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}