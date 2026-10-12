import {
  IconHome,
  IconInfoCircle,
  IconMapPin,
  IconNotes,
  IconPhone,
} from "@tabler/icons-react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { shippingAddressValues } from "../schemas/checkout.schema";
import { useTranslations } from "next-intl";

interface ShippingSectionProps {
  register: UseFormRegister<shippingAddressValues>;
  errors: FieldErrors<shippingAddressValues>;
}

export default function ShippingSection({
  register,
  errors,
}: ShippingSectionProps) {
  const t = useTranslations("checkout.shippingSection");

  const inputClass =
    "h-11 w-full rounded-xl border border-border-light bg-background px-4 text-xs text-primary outline-none transition-all placeholder:text-subtle focus:border-primary focus:ring-4 focus:ring-primary/5";

  const iconClass = "absolute start-4 top-1/2 -translate-y-1/2 text-subtle";

  return (
    <section className="overflow-hidden rounded-2xl border border-border-light bg-surface shadow-sm">
      <div className="border-b border-border-light px-5 py-5 sm:px-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
            <IconHome size={20} stroke={1.5} />
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

      <div className="space-y-5 p-5 sm:p-6">
        <div className="flex gap-3 rounded-xl border border-primary/10 bg-primary/[0.03] p-4">
          <IconInfoCircle size={18} className="mt-0.5 shrink-0 text-primary" />

          <div>
            <p className="text-xs font-semibold text-primary">
              {t("infoTitle")}
            </p>
            <p className="mt-1 text-[11px] leading-5 text-muted">
              {t("infoDesc")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="city"
              className="mb-2 block text-[10px] font-semibold text-primary"
            >
              {t("cityLabel")} <span className="text-accent">*</span>
            </label>

            <div className="relative">
              <IconMapPin size={17} stroke={1.5} className={iconClass} />

              <input
                id="city"
                autoComplete="address-level2"
                type="text"
                placeholder={t("cityPlaceholder")}
                {...register("city")}
                aria-invalid={!!errors.city}
                className={`${inputClass} ps-11`}
              />
            </div>

            {errors.city && (
              <p role="alert" className="mt-1.5 text-[10px] text-danger">
                {errors.city.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-[10px] font-semibold text-primary"
            >
              {t("phoneLabel")} <span className="text-accent">*</span>
            </label>

            <div className="relative">
              <IconPhone size={17} stroke={1.5} className={iconClass} />

              <input
                id="phone"
                autoComplete="tel"
                type="tel"
                placeholder={t("phonePlaceholder")}
                {...register("phone")}
                aria-invalid={!!errors.phone}
                className={`${inputClass} ps-11`}
              />
            </div>

            {errors.phone && (
              <p role="alert" className="mt-1.5 text-[10px] text-danger">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="details"
            className="mb-2 block text-[10px] font-semibold text-primary"
          >
            {t("addressLabel")} <span className="text-accent">*</span>
          </label>

          <div className="relative">
            <IconMapPin
              size={17}
              stroke={1.5}
              className="absolute start-4 top-3.5 text-subtle"
            />

            <textarea
              id="details"
              rows={3}
              autoComplete="street-address"
              placeholder={t("addressPlaceholder")}
              {...register("details")}
              aria-invalid={!!errors.details}
              className="w-full resize-none rounded-xl border border-border-light bg-background py-3 ps-11 pe-4 text-xs text-primary outline-none transition-all placeholder:text-subtle focus:border-primary focus:ring-4 focus:ring-primary/5"
            />
          </div>

          {errors.details && (
            <p role="alert" className="mt-1.5 text-[10px] text-danger">
              {errors.details.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="notes"
            className="mb-2 block text-[10px] font-semibold text-primary"
          >
            {t("notesLabel")}{" "}
            <span className="font-normal text-subtle">{t("notesOptional")}</span>
          </label>

          <div className="relative">
            <IconNotes
              size={17}
              stroke={1.5}
              className="absolute start-4 top-3.5 text-subtle"
            />

            <textarea
              id="notes"
              name="notes"
              rows={2}
              placeholder={t("notesPlaceholder")}
              className="w-full resize-none rounded-xl border border-border-light bg-background py-3 ps-11 pe-4 text-xs text-primary outline-none transition-all placeholder:text-subtle focus:border-primary focus:ring-4 focus:ring-primary/5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}