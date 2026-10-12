import Link from "next/link";
import type { Brand } from "../types/brands.types";
import BrandCard from "../components/BrandCard";
import { IconChevronRight, IconBuildingStore } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

interface BrandsScreenProps {
  brands: Brand[];
  error?: boolean;
}

export default function BrandsScreen({
  brands,
  error = false,
}: BrandsScreenProps) {
  const t = useTranslations("brands");

  return (
    <main className="bg-background">
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

            <span className="font-semibold text-accent">{t("brandsBreadcrumb")}</span>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-xs">
              <IconBuildingStore size={22} stroke={1.6} />
            </div>

            <div>
              <h1 className="font-serif text-2xl font-semibold tracking-[-0.03em] text-primary sm:text-3xl">
                {t("title")}
              </h1>
              <p className="mt-0.5 text-[11px] text-muted">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">
              {t("collectionLabel")}
            </p>

            <h2 className="mt-2 font-serif text-xl font-semibold tracking-[-0.03em] text-primary sm:text-2xl">
              {t("collectionTitle")}
            </h2>
          </div>

          <p className="max-w-md text-xs leading-5 text-muted">
            {t("collectionDesc")}
            <span className="ms-2 font-medium text-primary">
              ({brands.length} {t("available")})
            </span>
          </p>
        </div>

        {error ? (
          <div className="rounded-2xl border border-border-light bg-surface px-6 py-16 text-center shadow-xs">
            <h3 className="font-serif text-lg font-semibold text-primary">
              {t("errorTitle")}
            </h3>

            <p className="mt-2 text-xs text-muted">
              {t("errorDesc")}
            </p>
          </div>
        ) : brands.length === 0 ? (
          <div className="rounded-2xl border border-border-light bg-surface px-6 py-16 text-center shadow-xs">
            <h3 className="font-serif text-lg font-semibold text-primary">
              {t("emptyTitle")}
            </h3>

            <p className="mt-2 text-xs text-muted">
              {t("emptyDesc")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {brands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}