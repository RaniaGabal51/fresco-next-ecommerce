import Link from "next/link";
import { useTranslations } from "next-intl";
import { IconArrowRight, IconShoppingBag } from "@tabler/icons-react";

type EmptyCartProps = { type?: "empty" | "error" };

export default function EmptyCart({ type = "empty" }: EmptyCartProps) {
  const t = useTranslations("cart.emptyCart");
  const isError = type === "error";

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-5 py-16 sm:px-8 lg:px-12">
      <div className="w-full max-w-md text-center">
        <div
          className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
            isError ? "bg-red-500/10" : "bg-primary/10"
          }`}
        >
          <IconShoppingBag
            size={38}
            stroke={1.5}
            className={isError ? "text-red-500" : "text-primary"}
          />
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {isError ? t("errorTitle") : t("emptyTitle")}
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          {isError ? t("errorDesc") : t("emptyDesc")}
        </p>

        <Link
          href="/shop"
          className="group mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <span>{t("continueShopping")}</span>
          <IconArrowRight
            size={16}
            stroke={1.7}
            className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </Link>
      </div>
    </main>
  );
}