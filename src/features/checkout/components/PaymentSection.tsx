
"use client";

import React from "react";
import {
  IconWallet,
  IconCreditCard,
  IconShieldCheck,
  IconCheck,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export type PaymentMethod = "cash" | "online";

interface PaymentSectionProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
}

export default function PaymentSection({
  paymentMethod,
  setPaymentMethod,
}: PaymentSectionProps) {
  const t = useTranslations("checkout.paymentSection");

  return (
    <section className="overflow-hidden rounded-2xl border border-border-light bg-surface shadow-sm">
      <div className="border-b border-border-light px-5 py-5 sm:px-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
            <IconWallet size={20} stroke={1.5} />
          </div>

          <div>
            <h2 className="font-serif text-lg font-semibold text-primary">
              {t("title")}
            </h2>
            <p className="mt-1 text-xs text-muted">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-5 sm:p-6">
        <button
          type="button"
          onClick={() => setPaymentMethod("cash")}
          className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
            paymentMethod === "cash"
              ? "border-primary bg-primary/[0.03]"
              : "border-border-light hover:border-primary/20 hover:bg-background"
          }`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              paymentMethod === "cash"
                ? "bg-primary text-background shadow-sm"
                : "bg-surface-muted text-muted"
            }`}
          >
            <IconWallet size={20} stroke={1.5} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-semibold text-primary">
              {t("cashTitle")}
            </h3>
            <p className="mt-1 text-[10px] leading-5 text-muted">
              {t("cashDesc")}
            </p>
          </div>

          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
              paymentMethod === "cash"
                ? "border-primary bg-primary text-background"
                : "border-border"
            }`}
          >
            {paymentMethod === "cash" && (
              <IconCheck size={12} stroke={3} />
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod("online")}
          className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
            paymentMethod === "online"
              ? "border-primary bg-primary/[0.03]"
              : "border-border-light hover:border-primary/20 hover:bg-background"
          }`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              paymentMethod === "online"
                ? "bg-primary text-background shadow-sm"
                : "bg-surface-muted text-muted"
            }`}
          >
            <IconCreditCard size={20} stroke={1.5} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-semibold text-primary">
              {t("onlineTitle")}
            </h3>

            <p className="mt-1 text-[10px] leading-5 text-muted">
              {t("onlineDesc")}
            </p>

            <div className="mt-2.5 flex items-center gap-2">
              <span className="rounded border border-border-light bg-background px-1.5 py-0.5 text-[9px] font-semibold text-muted">
                VISA
              </span>
              <span className="rounded border border-border-light bg-background px-1.5 py-0.5 text-[9px] font-semibold text-muted">
                MC
              </span>
              <span className="rounded border border-border-light bg-background px-1.5 py-0.5 text-[9px] font-semibold text-muted">
                AMEX
              </span>
            </div>
          </div>

          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
              paymentMethod === "online"
                ? "border-primary bg-primary text-background"
                : "border-border"
            }`}
          >
            {paymentMethod === "online" && (
              <IconCheck size={12} stroke={3} />
            )}
          </div>
        </button>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-success/20 bg-success/5 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
            <IconShieldCheck size={18} stroke={1.7} />
          </div>

          <div>
            <p className="text-xs font-semibold text-success">
              {t("secureTitle")}
            </p>
            <p className="mt-0.5 text-[10px] leading-5 text-muted">
              {t("secureDesc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
