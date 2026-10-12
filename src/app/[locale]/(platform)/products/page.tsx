import ProductCard from "@/src/features/products/components/ProductCard";
import { getAllproducts } from "@/src/features/products/services/getAllProducts";
import Link from "next/link";
import { IconPackageOff, IconArrowLeft } from "@tabler/icons-react";

interface ProductsPageProps {
  searchParams: Promise<{ brand?: string }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const brandId = resolvedSearchParams.brand;

  const response = await getAllproducts(brandId);
  const products = response?.data || [];

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <h1 className="mb-8 font-serif text-2xl font-semibold text-primary sm:text-3xl">
          {brandId ? "Brand Products" : "All Products"}
        </h1>

        {products.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-3xl border border-border-light bg-surface px-6 py-16 text-center shadow-[0_8px_30px_rgba(25,55,44,0.04)] sm:py-20">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <IconPackageOff size={32} stroke={1.5} />
            </div>

            <h3 className="font-serif text-xl font-semibold text-primary sm:text-2xl">
              No Products Found
            </h3>

            <p className="mt-2.5 text-xs leading-6 text-muted sm:text-sm">
              We couldn&apos;t find any products matching this brand right now.
              Please check back later or explore our full collection.
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
                Explore Shop
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
