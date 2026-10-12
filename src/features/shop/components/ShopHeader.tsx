import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { IconChevronRight, IconShoppingBag } from "@tabler/icons-react";

export default async function ShopHeader() {
  const t = await getTranslations("shop");

  return (
    <main>
      <section className="border-b border-border-light bg-surface py-8 sm:py-10">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-medium text-muted">
            <Link
              href="/"
              className="transition-colors hover:text-accent"
            >
              {t("breadcrumb.home")}
            </Link>

            <IconChevronRight
              size={12}
              stroke={1.5}
              className="text-subtle rtl:rotate-180"
            />

            <span className="font-semibold text-accent">
              {t("breadcrumb.shop")}
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-xs">
              <IconShoppingBag size={22} stroke={1.6} />
            </div>

            <div className="max-w-2xl">
              <h1 className="font-serif text-2xl font-semibold tracking-[-0.03em] text-primary sm:text-3xl">
                {t("title")}
              </h1>

              <p className="mt-0.5 text-[11px] text-muted sm:text-xs">
                {t("description")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}