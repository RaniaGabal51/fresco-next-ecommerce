"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  IconArrowRight,
  IconLock,
  IconUser,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";

import { appState } from "@/src/store/store";

export default function CheckoutButton() {
  const t = useTranslations("cart.checkoutButton");

  const { isAuthenticated } = useSelector(
    (state: appState) => state.authReducer,
  );

  if (isAuthenticated) {
    return (
      <div className="mt-6">
        <Link
          href="/checkout"
          className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-accent to-accent-hover text-xs font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(0,0,0,0.16)]"
        >
          <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/15 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <IconLock
            size={15}
            stroke={1.8}
            className="relative"
          />

          <span className="relative">
            {t("proceed")}
          </span>

          <IconArrowRight
            size={15}
            stroke={1.8}
            className="relative transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </Link>

        <p className="mt-3 text-center text-[10px] text-muted">
          {t("proceedSubtitle")}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <Link
        href="/login"
        className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-primary to-primary/90 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(0,0,0,0.16)]"
      >
        <span className="absolute inset-0 bg-linear-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <IconUser
          size={15}
          stroke={1.7}
          className="relative"
        />

        <span className="relative">
          {t("loginToCheckout")}
        </span>

        <IconArrowRight
          size={15}
          stroke={1.7}
          className="relative transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
        />
      </Link>

      <p className="mt-3 text-center text-[10px] text-muted">
        {t("noAccount")}{" "}
        <Link
          href="/signup"
          className="font-medium text-accent transition-colors hover:text-primary"
        >
          {t("createOne")}
        </Link>
      </p>
    </div>
  );
}