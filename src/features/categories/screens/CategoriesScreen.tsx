import Link from "next/link";
import type { Category } from "../types/categories.types";
import CategoryCard from "../components/CategoryCard";
import { IconChevronRight, IconCategory } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

type CategoriesScreenProps = {
  categories: Category[];
  error?: boolean;
};

export default function CategoriesScreen({
  categories,
  error = false,
}: CategoriesScreenProps) {
  const t = useTranslations("Category");

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border-light bg-surface py-8 sm:py-10">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-medium text-muted">
            <Link href="/" className="transition-colors hover:text-accent">
              {t("home")}
            </Link>

            <IconChevronRight
              size={12}
              stroke={1.5}
              className="text-subtle rtl:rotate-180"
            />

            <span className="font-semibold text-accent">{t("title")}</span>
          </div>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-xs">
                <IconCategory size={22} stroke={1.6} />
              </div>

              <div className="max-w-2xl">
                <h1 className="font-serif text-2xl font-semibold tracking-[-0.03em] text-primary sm:text-3xl">
                  {t("title")}
                </h1>

                <p className="mt-0.5 text-[11px] text-muted sm:text-xs">
                  {t("subtitle")}
                </p>
              </div>
            </div>

            {!error && categories.length > 0 && (
              <p className="shrink-0 text-xs tracking-wide text-muted">
                <span className="font-semibold text-primary">
                  {categories.length.toString().padStart(2, "0")}
                </span>{" "}
                {t("collections")}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
        {error ? (
          <div
            role="alert"
            className="rounded-2xl border border-border-light bg-surface px-6 py-14 text-center shadow-xs"
          >
            <h2 className="font-serif text-xl font-semibold text-primary">
              {t("errorTitle")}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-muted">
              {t("errorDesc")}
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-2xl border border-border-light bg-surface px-6 py-14 text-center shadow-xs">
            <h2 className="font-serif text-xl font-semibold text-primary">
              {t("emptyTitle")}
            </h2>
            <p className="mt-2 text-xs text-muted">
              {t("emptyDesc")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:gap-7">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                category={category}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}