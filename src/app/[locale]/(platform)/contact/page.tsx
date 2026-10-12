"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  IconArrowRight,
  IconChevronRight,
  IconClock,
  IconHeadset,
  IconMail,
  IconMapPin,
  IconMessageCircle,
  IconPhone,
  IconSend,
} from "@tabler/icons-react";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <main className="bg-background">
      <section className="border-b border-border-light bg-surface py-8 sm:py-10">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-medium text-muted">
            <Link href="/" className="transition-colors hover:text-accent">
              {t("breadcrumb.home")}
            </Link>

            <IconChevronRight
              size={12}
              stroke={1.5}
              className="text-subtle rtl:rotate-180"
            />

            <span className="font-semibold text-accent">
              {t("breadcrumb.current")}
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-xs">
              <IconHeadset size={22} stroke={1.6} />
            </div>

            <div className="max-w-2xl">
              <h1 className="font-serif text-2xl font-semibold tracking-[-0.03em] text-primary sm:text-3xl">
                {t("header.title")}
              </h1>

              <p className="mt-0.5 text-[11px] text-muted sm:text-xs">
                {t("header.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-12 bg-background sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="flex flex-col gap-3.5 sm:gap-4">
            <div className="mb-2">
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-accent">
                {t("details.eyebrow")}
              </p>

              <h2 className="font-serif text-2xl font-semibold tracking-[-0.035em] text-primary sm:text-3xl">
                {t("details.title")}
              </h2>

              <p className="mt-2 max-w-md text-[11px] leading-5 text-muted sm:text-xs">
                {t("details.desc")}
              </p>
            </div>

            <ContactInfoCard
              icon={<IconPhone size={18} stroke={1.5} />}
              title={t("info.phone.title")}
              description={t("info.phone.desc")}
              value="+1 (800) 123-4567"
              href="tel:+18001234567"
            />

            <ContactInfoCard
              icon={<IconMail size={18} stroke={1.5} />}
              title={t("info.email.title")}
              description={t("info.email.desc")}
              value="support@fresco.com"
              href="mailto:support@fresco.com"
            />

            <ContactInfoCard
              icon={<IconMapPin size={18} stroke={1.5} />}
              title={t("info.office.title")}
              description={t("info.office.desc")}
              value={
                <>
                  123 Commerce Street
                  <br />
                  New York, NY 10001
                </>
              }
            />

            <div className="group rounded-2xl border border-border-light bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-[0_12px_35px_rgba(25,55,44,0.05)]">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <IconClock size={18} stroke={1.5} />
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-primary">
                    {t("info.hours.title")}
                  </h3>

                  <div className="mt-2 space-y-1 text-[10px] leading-5 text-muted">
                    <p>
                      <span className="font-medium text-primary">
                        {t("info.hours.monFri")}
                      </span>{" "}
                      8am – 6pm
                    </p>

                    <p>
                      <span className="font-medium text-primary">
                        {t("info.hours.sat")}
                      </span>{" "}
                      9am – 4pm
                    </p>

                    <p>
                      <span className="font-medium text-primary">
                        {t("info.hours.sun")}
                      </span>{" "}
                      {t("info.hours.closed")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border-light bg-surface p-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">
                {t("social.eyebrow")}
              </p>

              <h3 className="mt-2 text-sm font-semibold text-primary">
                {t("social.title")}
              </h3>

              <div className="mt-4 flex gap-2.5">
                <SocialButton label="Instagram" />
                <SocialButton label="Facebook" />
                <SocialButton label="LinkedIn" />
                <SocialButton label="X" />
              </div>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-3xl border border-border-light bg-surface shadow-[0_12px_45px_rgba(25,55,44,0.05)]">
              <div className="relative overflow-hidden bg-linear-to-br from-primary via-primary/95 to-accent/80 px-5 py-6 sm:px-6">
                <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                      <IconMessageCircle size={19} stroke={1.5} />
                    </span>

                    <h2 className="font-serif text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                      {t("form.title")}
                    </h2>
                  </div>

                  <p className="mt-2.5 max-w-md text-[11px] leading-5 text-white/60 sm:text-xs">
                    {t("form.desc")}
                  </p>
                </div>
              </div>

              <form className="space-y-5 p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    id="name"
                    label={t("form.nameLabel")}
                    placeholder={t("form.namePlaceholder")}
                    type="text"
                  />

                  <FormField
                    id="email"
                    label={t("form.emailLabel")}
                    placeholder={t("form.emailPlaceholder")}
                    type="email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-[10px] font-semibold text-primary"
                  >
                    {t("form.subjectLabel")}
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    defaultValue=""
                    required
                    className="h-11 w-full rounded-xl border border-border-light bg-background px-3.5 text-xs text-primary outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/5"
                  >
                    <option value="" disabled>
                      {t("form.subjectDefault")}
                    </option>

                    <option value="general">
                      {t("form.subjects.general")}
                    </option>
                    <option value="order">{t("form.subjects.order")}</option>
                    <option value="shipping">
                      {t("form.subjects.shipping")}
                    </option>
                    <option value="returns">
                      {t("form.subjects.returns")}
                    </option>
                    <option value="product">
                      {t("form.subjects.product")}
                    </option>
                    <option value="feedback">
                      {t("form.subjects.feedback")}
                    </option>
                    <option value="other">{t("form.subjects.other")}</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[10px] font-semibold text-primary"
                  >
                    {t("form.messageLabel")}
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder={t("form.messagePlaceholder")}
                    className="w-full resize-none rounded-xl border border-border-light bg-background px-3.5 py-3 text-xs text-primary outline-none transition-all duration-200 placeholder:text-subtle focus:border-primary focus:ring-4 focus:ring-primary/5"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-xs font-semibold text-white shadow-[0_8px_20px_rgba(25,55,44,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-[0_12px_25px_rgba(25,55,44,0.16)]"
                >
                  <span>{t("form.submit")}</span>

                  <IconSend
                    size={15}
                    stroke={1.7}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>

                <p className="text-center text-[9px] leading-5 text-subtle">
                  {t("form.disclaimer")}{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-medium text-primary transition-colors hover:text-accent"
                  >
                    {t("form.privacy")}
                  </Link>
                  .
                </p>
              </form>
            </div>

            <div className="mt-5 rounded-2xl border border-accent/10 bg-accent/5 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white shadow-sm">
                  <IconHeadset size={18} stroke={1.5} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-xs font-semibold text-primary">
                    {t("helpCard.title")}
                  </h3>

                  <p className="mt-1.5 text-[10px] leading-5 text-muted sm:text-[11px]">
                    {t("helpCard.desc")}
                  </p>

                  <Link
                    href="/help"
                    className="group mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-primary transition-colors hover:text-accent"
                  >
                    {t("helpCard.link")}

                    <IconArrowRight
                      size={12}
                      stroke={1.7}
                      className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border-light bg-surface">
        <div className="w-full px-6 py-12 text-center sm:px-10 lg:px-16 xl:px-24">
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-accent">
            {t("cta.eyebrow")}
          </p>

          <h2 className="mt-2 font-serif text-2xl font-semibold tracking-[-0.035em] text-primary sm:text-3xl">
            {t("cta.title")}
          </h2>

          <p className="mx-auto mt-2 max-w-md text-[11px] leading-5 text-muted">
            {t("cta.desc")}
          </p>

          <Link
            href="/shop"
            className="group mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-[10px] font-semibold text-primary transition-all duration-300 hover:border-accent hover:text-accent"
          >
            {t("cta.button")}

            <IconArrowRight
              size={13}
              stroke={1.6}
              className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}

function ContactInfoCard({
  icon,
  title,
  description,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: React.ReactNode;
  href?: string;
}) {
  const content = (
    <div className="group flex gap-4 rounded-2xl border border-border-light bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-[0_12px_35px_rgba(25,55,44,0.05)]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="text-xs font-semibold text-primary">{title}</h3>

        <p className="mt-1 text-[10px] text-muted">{description}</p>

        <div className="mt-2 text-xs font-medium text-primary">{value}</div>
      </div>
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}

function FormField({
  id,
  label,
  placeholder,
  type,
}: {
  id: string;
  label: string;
  placeholder: string;
  type: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[10px] font-semibold text-primary"
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required
        className="h-11 w-full rounded-xl border border-border-light bg-background px-3.5 text-xs text-primary outline-none transition-all duration-200 placeholder:text-subtle focus:border-primary focus:ring-4 focus:ring-primary/5"
      />
    </div>
  );
}

function SocialButton({ label }: { label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light bg-background text-[9px] font-semibold text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white"
    >
      {label === "Instagram"
        ? "IG"
        : label === "Facebook"
          ? "FB"
          : label === "LinkedIn"
            ? "IN"
            : "X"}
    </a>
  );
}
