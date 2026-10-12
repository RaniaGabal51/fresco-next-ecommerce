"use client";

import Image from "next/image";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import { IconHeart, IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { CartProductItem } from "../types/cart.types";
import {
  deleteProductFromCart,
  updateProductQuantity,
} from "../server/cart.actions";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { cartActions } from "../slices/cart.slice";

export default function CartItem({
  productInfo,
}: {
  productInfo: CartProductItem;
}) {
  const t = useTranslations("cart.cartItem");

  const { count, price, product } = productInfo;

  const { id, brand, category, imageCover, quantity, title } = product;

  const totalPrice = price * count;

  const handleUpdate = async (newCount: number) => {
    if (newCount < 1) return;

    try {
      const response = await updateProductQuantity(product._id, newCount);
       if (response.status === "success") {
        dispatch(setCartInfo(response));

      }
    } catch {}
  };


  const { setCartInfo } = cartActions;

  const dispatch = useDispatch();

  async function handleRemove() {
    const result = await Swal.fire({
      title: t("swal.title"),
      text: t("swal.text"),
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
        icon: "!border-accent !text-accent",

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
      const response = await deleteProductFromCart(product._id);

      if (response.status === "fail" || response.status === "error") {
        toast.error(response.message);
        return;
      }

      if (response.status === "success") {
        dispatch(setCartInfo(response));

        toast.success(response.message);
      }
    } catch (error) {
      toast.error(t("toastError"));
    }
  }

 

  return (
    <article
      className="
        group relative overflow-hidden rounded-2xl
        border border-border-light
        bg-surface
        p-4
        shadow-[0_8px_30px_rgba(25,55,44,0.04)]
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-border
        hover:shadow-[0_14px_40px_rgba(25,55,44,0.07)]
        sm:p-5
      "
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />

      <div className="flex gap-4 sm:gap-5">
        <div
          className="
            relative h-28 w-28 shrink-0
            overflow-hidden rounded-xl
            border border-border-light
            bg-surface-muted
            sm:h-32 sm:w-32
          "
        >
          <Image
            src={imageCover}
            alt={title}
            fill
            sizes="(max-width: 640px) 112px, 128px"
            className="
              object-contain p-3
              transition-transform duration-500
              group-hover:scale-105
            "
          />

          <button
            type="button"
            aria-label="Add to wishlist"
            className="
              absolute end-2 top-2
              flex h-7 w-7 items-center justify-center
              rounded-full
              border border-white/80
              bg-white/90
              text-muted
              shadow-sm
              backdrop-blur-sm
              transition-all duration-200
              hover:text-accent
            "
          >
            <IconHeart size={13} stroke={1.5} />
          </button>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div>
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              {category?.name && (
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {category.name}
                </p>
              )}

              {brand?.name && (
                <>
                  <span className="text-[9px] text-border">•</span>

                  <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted">
                    {brand.name}
                  </p>
                </>
              )}
            </div>

            <h3
              className="
                line-clamp-2
                text-sm font-semibold
                tracking-[-0.02em]
                text-primary
                sm:text-base
              "
            >
              {title}
            </h3>

            <p className="mt-1.5 text-[10px] text-muted sm:text-[11px]">
              {quantity > 0
                ? `${quantity} ${t("itemsAvailable")}`
                : t("outOfStock")}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4 sm:mt-auto sm:pt-5">
            <div>
              <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.15em] text-muted">
                {t("quantity")} 
              </p>

              <div
                className="
                  flex h-9 items-center
                  rounded-lg
                  border border-border-light
                  bg-background
                  px-1
                "
              >
                <button
                  type="button"
                  onClick={() => {
                    handleUpdate(count - 1);
                  }}
                  disabled={count <= 1}
                  aria-label="Decrease quantity"
                  className="
                    flex h-7 w-7 items-center justify-center
                    rounded-md
                    text-muted
                    transition-colors
                    hover:bg-surface
                    hover:text-primary
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <IconMinus size={12} stroke={1.7} />
                </button>

                <span className="w-8 text-center text-xs font-semibold text-primary">
                  {count}
                </span>

                <button
                  type="button"
                 onClick={() => {
                    handleUpdate(count + 1);
                  }}
                  disabled={count >= quantity}
                  aria-label="Increase quantity"
                  className="
                    flex h-7 w-7 items-center justify-center
                    rounded-md
                    bg-primary
                    text-background
                    shadow-sm
                    transition-all
                    hover:bg-accent
                    disabled:cursor-not-allowed
                    disabled:bg-muted
                  "
                >
                  <IconPlus size={12} stroke={1.7} />
                </button>
              </div>
            </div>
            <div className="ms-auto text-end">
              <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.15em] text-muted">
                {t("total")}
              </p>

              <p className="text-lg font-semibold tracking-[-0.02em] text-primary">
                {totalPrice.toLocaleString()}
                <span className="ms-1 text-[10px] font-medium text-muted">
                  EGP
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove item"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-lg
                border border-danger/15
                bg-danger/5
                text-danger
                transition-all duration-200
                hover:border-danger/30
                hover:bg-danger
                hover:text-white
              "
            >
              <IconTrash size={14} stroke={1.5} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="
          mt-4 flex items-center justify-between
          border-t border-border-light
          pt-3
        "
      >
        <span className="text-[10px] text-muted">{t("pricePerItem")}</span>

        <span className="text-[10px] font-semibold text-primary">
          {price.toLocaleString()} EGP
        </span>
      </div>
    </article>
  );
}
