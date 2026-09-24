import Link from "next/link";
import { getAllproducts } from "../../products/services/getAllProducts";
import ProductCard from "../../products/components/ProductCard";
import { getTranslations } from "next-intl/server";

export default async function FeaturedProducts() {
  const t = await getTranslations("featuredProducts");
  const productsResponse = await getAllproducts();

  const products = productsResponse.data.slice(0, 8);

  return (
    <section className="bg-surface px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between sm:mb-10">
          <div>
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-accent sm:text-[10px]">
              {t("eyebrow")}
            </p>

            <h2 className="font-serif text-3xl font-semibold tracking-[-0.04em] text-primary sm:text-4xl">
              {t("title")}
            </h2>

            <p className="mt-2 max-w-md text-[11px] leading-5 text-muted sm:text-xs">
              {t("description")}
            </p>
          </div>

          <Link
            href="/shop"
            className="group hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-primary border border-border-light rounded-full bg-surface transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-sm"
          >
            <span>{t("viewAll")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-x-3
            gap-y-8
            sm:grid-cols-3
            sm:gap-x-4
            sm:gap-y-10
            lg:grid-cols-4
            lg:gap-x-5
            lg:gap-y-12
          "
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/shop"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-border
              px-5
              py-2.5
              text-[10px]
              font-semibold
              text-primary
              transition-colors
              hover:border-accent hover:text-accent hover:shadow-sm
            "
          >
            <span>{t("viewAllProducts")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}