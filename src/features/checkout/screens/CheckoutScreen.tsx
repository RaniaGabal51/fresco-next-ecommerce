"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  IconArrowLeft,
  IconArrowRight,
  IconChevronRight,
  IconReceipt,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import { appState } from "@/src/store/store";
import {
  checkoutSchema,
  type shippingAddressValues,
} from "../schemas/checkout.schema";
import { createCashOrder, createOnlineOrder } from "../server/checkout.actions";

import CheckoutProgress from "../components/CheckoutProgress";
import ShippingSection from "../components/ShippingSection";
import PaymentSection, {
  type PaymentMethod,
} from "../components/PaymentSection";
import TrustCard from "../components/TrustCard";
import OrderSummary from "../components/OrderSummary";

export default function CheckoutScreen() {
  const router = useRouter();
  const t = useTranslations("checkout.screen");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartId = useSelector((state: appState) => state.cartReducer.cartId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<shippingAddressValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<shippingAddressValues> = async (values) => {
    if (isSubmitting) return;

    if (!cartId) {
      toast.error(t("toastCartError"));
      return;
    }

    setIsSubmitting(true);

    try {
      const response =
        paymentMethod === "cash"
          ? await createCashOrder({
              cartId,
              shippingAddress: values,
            })
          : await createOnlineOrder({
              cartId,
              shippingAddress: values,
              url: window.location.origin,
            });

      if (response?.status !== "success") {
        toast.error(
          response?.message ||
            t("toastOrderError"),
        );
        return;
      }

      if (paymentMethod === "online") {
        const paymentUrl = response?.session?.url;

        if (!paymentUrl) {
          toast.error(t("toastPaymentLinkError"));
          return;
        }

        window.location.assign(paymentUrl);
        return;
      }

      toast.success(t("toastSuccess"));
      router.push("/orders");
    } catch (error) {
      toast.error(t("toastGenericError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border-light bg-surface py-8 sm:py-10">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-medium text-muted">
            <Link href="/" className="transition-colors hover:text-accent">
              {t("home")}
            </Link>

            <IconChevronRight
              size={12}
              stroke={1.5}
              className="text-subtle rtl:rotate-180"
            />

            <span className="font-semibold text-accent">{t("title")}</span>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-xs">
                <IconReceipt size={22} stroke={1.6} />
              </div>

              <div>
                <h1 className="font-serif text-2xl font-semibold tracking-[-0.03em] text-primary sm:text-3xl">
                  {t("title")}
                </h1>

                <p className="mt-0.5 text-[11px] text-muted sm:text-xs">
                  {t("subtitle")}
                </p>
              </div>
            </div>

            <Link
              href="/cart"
              className="group inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-primary shadow-sm transition-all hover:border-accent hover:text-accent"
            >
              <IconArrowLeft
                size={15}
                stroke={1.6}
                className="transition-transform group-hover:-translate-x-0.5 rtl:rotate-180"
              />
              {t("backToCart")}
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-8 sm:py-12 lg:px-12 xl:px-16">
        <section className="mb-8">
          <CheckoutProgress />
        </section>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <ShippingSection register={register} errors={errors} />

              <PaymentSection
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-xs font-semibold text-white shadow-md shadow-accent/20 transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>
                  {isSubmitting
                    ? t("processing")
                    : paymentMethod === "cash"
                      ? t("placeOrder")
                      : t("continueToPayment")}
                </span>

                {!isSubmitting && (
                  <IconArrowRight
                    size={15}
                    stroke={1.7}
                    className="rtl:rotate-180"
                  />
                )}
              </button>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-6">
              <OrderSummary />
              <TrustCard />
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}