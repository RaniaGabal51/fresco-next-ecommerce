import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  IconArrowRight,
  IconCheck,
  IconLock,
  IconShieldCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";

import CheckoutButton from "./CheckoutButton";
import { CartValuesType } from "../slices/cart.slice";

const freeShipping = 500;
const shippingCost = 50; 

export default function CartSummary({ cartInfo }: { cartInfo: CartValuesType }) {
  const t = useTranslations("cart.summary");

  const { numOfCartItems, data } = cartInfo;
  const { totalCartPrice } = data;

  const subtotal = totalCartPrice || 0;

  const remainingForFreeShipping = Math.max(
    freeShipping - subtotal,
    0,
  );

  const shippingProgress = Math.min(
    (subtotal / freeShipping) * 100,
    100,
  );

  const isFreeShipping = subtotal >= freeShipping;
  
  const finalTotal = isFreeShipping ? subtotal : subtotal + shippingCost;

  return (
    <aside className="sticky top-6 overflow-hidden rounded-2xl border border-border-light bg-surface shadow-[0_10px_40px_rgba(25,55,44,0.05)]">
      <div className="relative overflow-hidden bg-linear-to-br from-primary via-primary/95 to-accent/80 px-5 py-6 sm:px-6">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

        <div className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-accent/20 blur-2xl" />

        <div className="relative">
          <div className="mb-1 flex items-center justify-between gap-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/60">
              {t("badge")}
            </p>

            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-medium text-white/80">
              {numOfCartItems} {numOfCartItems === 1 ? t("item") : t("items")}
            </span>
          </div>

          <h2 className="font-serif text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
            {t("title")}
          </h2>

          <p className="mt-1.5 text-[11px] leading-5 text-white/65">
            {t("subtitle")}
          </p>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <div
          className={`
            mb-6 rounded-xl border p-3.5
            ${
              isFreeShipping
                ? "border-success/15 bg-success/5"
                : "border-border-light bg-surface-muted/60"
            }
          `}
        >
          <div className="flex items-start gap-2.5">
            <span
              className={`
                flex h-7 w-7 shrink-0 items-center justify-center rounded-md
                ${
                  isFreeShipping
                    ? "bg-success/10 text-success"
                    : "bg-accent/10 text-accent"
                }
              `}
            >
              {isFreeShipping ? (
                <IconCheck size={15} stroke={2} />
              ) : (
                <IconTruckDelivery size={15} stroke={1.7} />
              )}
            </span>

            <div className="min-w-0 flex-1">
              {isFreeShipping ? (
                <p className="text-[11px] font-semibold text-success">
                  {t("freeShippingUnlocked")}
                </p>
              ) : (
                <p className="text-[11px] font-medium leading-5 text-primary">
                  {t("addMoreForFreeShippingBefore")}{" "}
                  <span className="font-bold text-accent">
                    {remainingForFreeShipping.toLocaleString()} EGP
                  </span>{" "}
                  {t("addMoreForFreeShippingAfter")}
                </p>
              )}

              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-border">
                <div
                  className={`
                    h-full rounded-full transition-all duration-500
                    ${
                      isFreeShipping
                        ? "bg-success"
                        : "bg-linear-to-r from-accent to-accent-hover"
                    }
                  `}
                  style={{
                    width: `${shippingProgress}%`,
                  }}
                />
              </div>

              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[8px] text-muted">
                  {subtotal.toLocaleString()} EGP
                </span>

                <span className="text-[8px] font-medium text-muted">
                  {freeShipping.toLocaleString()} EGP
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">{t("subtotal")}</span>

            <span className="text-sm font-medium text-primary">
              {subtotal.toLocaleString()}{" "}
              <span className="text-[10px] text-muted">EGP</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">{t("shipping")}</span>

            {isFreeShipping ? (
              <span className="text-[10px] font-semibold text-success">
                {t("free")}
              </span>
            ) : (
              <span className="text-sm font-medium text-primary">
                {shippingCost.toLocaleString()}{" "}
                <span className="text-[10px] text-muted">EGP</span>
              </span>
            )}
          </div>

          <div className="h-px bg-linear-to-r from-transparent via-primary/10 to-transparent" />

          <div className="flex items-end justify-between pt-1">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted">
                {t("estimatedTotal")}
              </p>

              <p className="mt-1 text-[10px] text-muted">
                {isFreeShipping
                  ? t("freeShippingApplied")
                  : t("shippingFeeAdded")}
              </p>
            </div>

            <p className="text-2xl font-semibold tracking-[-0.04em] text-primary">
              {finalTotal.toLocaleString()}
              <span className="ms-1 text-xs font-medium text-muted">EGP</span>
            </p>
          </div>
        </div>

        <CheckoutButton />

        <div className="mt-6 border-t border-primary/5 pt-5">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <IconShieldCheck size={15} stroke={1.5} />
              </span>

              <div>
                <p className="text-[10px] font-semibold text-primary">
                  {t("features.secure.title")}
                </p>

                <p className="mt-0.5 text-[9px] text-muted">
                  {t("features.secure.desc")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <IconTruckDelivery size={15} stroke={1.5} />
              </span>

              <div>
                <p className="text-[10px] font-semibold text-primary">
                  {t("features.flexible.title")}
                </p>

                <p className="mt-0.5 text-[9px] text-muted">
                  {t("features.flexible.desc")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <IconLock size={14} stroke={1.5} />
              </span>

              <div>
                <p className="text-[10px] font-semibold text-primary">
                  {t("features.safe.title")}
                </p>

                <p className="mt-0.5 text-[9px] text-muted">
                  {t("features.safe.desc")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/shop"
          className="group mt-5 flex items-center justify-center gap-2 border-t border-primary/5 pt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
        >
          <span>{t("continueShopping")}</span>

          <IconArrowRight
            size={13}
            stroke={1.5}
            className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </Link>
      </div>
    </aside>
  );
}