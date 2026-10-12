"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { IconArrowRight, IconReceipt } from "@tabler/icons-react";
import { appState } from "@/src/store/store";
import { useTranslations } from "next-intl";

export default function OrderSummary() {
  const t = useTranslations("checkout.orderSummary");

  const { numOfCartItems, data } = useSelector(
    (state: appState) => state.cartReducer,
  );
  const totalPrice = data?.totalCartPrice ?? 0;
  const formattedPrice = new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 2,
  }).format(totalPrice);

  return (
    <section className="overflow-hidden rounded-2xl border border-border-light bg-surface shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border-light px-5 py-4">
        <div>
          <h2 className="font-serif text-lg font-semibold text-primary">
            {t("title")}
          </h2>
          <p className="mt-1 text-xs text-muted">
            {numOfCartItems} {numOfCartItems === 1 ? t("itemSingular") : t("itemPlural")} {t("inYourCart")}
          </p>
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <IconReceipt size={20} stroke={1.6} />
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted">{t("subtotal")}</span>
          <span className="font-medium text-foreground">{formattedPrice}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted">{t("shipping")}</span>
          <span className="text-xs text-muted">{t("shippingCalculated")}</span>
        </div>
        <div className="border-t border-dashed border-border pt-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary">{t("cartTotal")}</p>
              <p className="mt-1 text-[11px] text-muted">
                {t("cartTotalDesc")}
              </p>
            </div>
            <span className="text-lg font-semibold tracking-tight text-primary">
              {formattedPrice}
            </span>
          </div>
        </div>
        <Link
          href="/cart"
          className="group flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-xs font-semibold text-primary transition-all hover:border-accent hover:text-accent"
        >
          {t("reviewCart")}
          <IconArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180"
          />
        </Link>
        <div className="flex items-start gap-2 rounded-xl bg-primary/5 p-3">
          <span className="mt-0.5 text-success">✓</span>
          <p className="text-[11px] leading-5 text-muted">
            {t("note")}
          </p>
        </div>
      </div>
    </section>
  );
}