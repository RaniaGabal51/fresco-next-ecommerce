import { IconCheck } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export default function CheckoutProgress() {
  const t = useTranslations("checkout.progress");

  return (
    <div
      aria-label="Checkout progress"
      className="mt-6 flex max-w-xl items-center"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-background">
          <IconCheck size={16} stroke={2.5} />
        </div>
        <span className="hidden text-xs font-semibold text-primary sm:block">
          {t("cart")}
        </span>
      </div>

      <div className="mx-3 h-px flex-1 bg-primary/30 sm:mx-5" />

      <div className="flex items-center gap-2">
        <div
          aria-current="step"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white"
        >
          <span className="text-xs font-bold">2</span>
        </div>
        <span className="hidden text-xs font-semibold text-primary sm:block">
          {t("checkout")}
        </span>
      </div>

      <div className="mx-3 h-px flex-1 bg-border-light sm:mx-5" />

      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-subtle">
          <span className="text-xs font-semibold">3</span>
        </div>
        <span className="hidden text-xs font-medium text-muted sm:block">
          {t("complete")}
        </span>
      </div>
    </div>
  );
}