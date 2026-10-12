"use client";

import React from "react";
import CartHeader from "../components/CartHeader";
import CartItem from "../components/cartItem";
import CartSummary from "../components/CartSummary";
import EmptyCart from "../components/EmptyCart";
import { appState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { IconTrash } from "@tabler/icons-react";
import { clearCart } from "../server/cart.actions";
import { cartActions, cartInitialValues } from "../slices/cart.slice";
import Swal from "sweetalert2";
import { toast } from "sonner";

export default function CartScreen() {
  const t = useTranslations("cart.cartScreen");
  const cartResponse = useSelector((state: appState) => state.cartReducer);

  const dispatch = useDispatch();
  const { setCartInfo } = cartActions;

  if (cartResponse?.status === "fail") {
    return <EmptyCart type="error" />;
  }

  const products = cartResponse?.data?.products || [];

  if (cartResponse?.status === "success" && products.length === 0) {
    return <EmptyCart type="empty" />;
  }

  async function handleClear() {
    const result = await Swal.fire({
      title: t("swal.title"),
      text: t("swal.text", { count: products.length, itemText: products.length === 1 ? t("item") : t("items") }),
      icon: "warning",

      showCancelButton: true,
      confirmButtonText: t("swal.confirmButton"),
      cancelButtonText: t("swal.cancelButton"),

      reverseButtons: true,
      focusCancel: true,

      buttonsStyling: false,

      customClass: {
        popup: "rounded-2xl !bg-surface !px-6 !py-7 shadow-xl",
        title: "!text-xl !font-semibold !text-primary",
        htmlContainer: "!text-sm !leading-6 !text-muted",

        icon: "!border-danger !text-danger",

        actions: "mt-5 !gap-3",

        confirmButton:
          "!rounded-xl !bg-red-500 !px-5 !py-2.5 !text-sm !font-semibold !text-white !shadow-sm transition-all hover:!bg-red-600",

        cancelButton:
          "!rounded-xl !bg-surface-muted !px-5 !py-2.5 !text-sm !font-semibold !text-primary !border !border-border-light transition-all hover:!bg-border",
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await clearCart();

      if (response.status === "fail" || response.status === "error") {
        toast.error(response.message);
        return;
      }

      if (response.status === "success") {
        dispatch(setCartInfo({ ...cartInitialValues, status: "success" }));

        toast.success(response.message);
      }
    } catch (error) {
      toast.error(t("toastError"));
    }
  }

  if (cartResponse?.status === "success") {
    return (
      <>
        <CartHeader />

        <main className="w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16 xl:px-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="space-y-4 lg:col-span-2">
              {products.map((product) => (
                <CartItem key={product._id} productInfo={product} />
              ))}

              <div className="flex items-center justify-between px-1 pt-1">
                <p className="text-[10px] text-muted">
                  {t("youHave")} {products.length}{" "}
                  {products.length === 1 ? t("item") : t("items")} {t("inYourCart")}
                </p>

                <button
                  type="button"
                  onClick={handleClear}
                  className="group flex items-center gap-1.5 text-xs font-semibold text-red-500 transition-colors duration-200 hover:text-red-600"
                >
                  <IconTrash
                    size={14}
                    stroke={1.6}
                    className="transition-transform duration-200 group-hover:scale-105"
                  />

                  <span>{t("removeAll")}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <CartSummary cartInfo={cartResponse} />
            </div>
          </div>
        </main>
      </>
    );
  }

  return null;
}