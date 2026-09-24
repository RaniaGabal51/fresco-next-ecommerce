import { getAllCategories } from "../../categories/services/getAllCategories";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function HomeCategories() {
  const t = await getTranslations("homeCategories");
  const categoriesResponse = await getAllCategories();

  return (
    <section className="bg-background px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
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
            href="/categories"
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

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-y-6">
          {categoriesResponse.data.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-surface-muted border-2 border-border-light shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-accent group-hover:shadow-[0_10px_25px_rgba(25,55,44,0.08)]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 25vw, (max-width: 1024px) 15vw, 10vw"
                />
                <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/10" />
              </div>
              <div className="mt-3 px-1">
                <h3 className="text-xs font-medium text-primary transition-colors duration-300 group-hover:text-accent sm:text-sm line-clamp-1">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}