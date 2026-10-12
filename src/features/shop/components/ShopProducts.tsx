import { getAllproducts } from "../../products/services/getAllProducts";
import ProductCard from "../../products/components/ProductCard";
import { getTranslations } from "next-intl/server";

export default async function ShopProducts() {
  const t = await getTranslations("shop");

  const productsResponse = await getAllproducts();
  const products = productsResponse.data;

  return (
    <section className="w-full px-5 pt-10 pb-16 sm:px-8 sm:pt-12 sm:pb-20 lg:px-12 lg:pt-16 xl:px-16">
      <div className="w-full">
        {products.length > 0 ? (
          <div
            className="
              grid
              grid-cols-1
              gap-x-3
              gap-y-8
              sm:grid-cols-2
              sm:gap-x-4
              sm:gap-y-10
              md:grid-cols-3
              lg:grid-cols-4
              lg:gap-x-5
              lg:gap-y-12
            "
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-border-light bg-surface">
            <div className="text-center">
              <h3 className="font-serif text-xl font-semibold text-primary">
                {t("empty.title")}
              </h3>

              <p className="mt-2 text-xs text-muted">
                {t("empty.description")}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}