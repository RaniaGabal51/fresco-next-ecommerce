import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  IconArrowRight,
  IconChevronRight,
  IconFileDescription,
  IconInfoCircle,
  IconHelpCircle,
} from "@tabler/icons-react";

export default function TermsPage() {
  const t = useTranslations("termsOfService");

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

            <span className="font-semibold text-accent">{t("breadcrumb.current")}</span>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-xs">
              <IconFileDescription size={22} stroke={1.6} />
            </div>

            <div className="max-w-2xl">
              <h1 className="font-serif text-2xl font-semibold tracking-[-0.03em] text-primary sm:text-3xl">
                {t("header.title")}
              </h1>
              <p className="mt-0.5 text-[11px] text-muted">
                {t("header.subtitle")}{" "}
                <span className="text-subtle">{t("header.updated")}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
        <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-4 lg:sticky lg:top-8">
            <div className="rounded-2xl border border-border-light bg-surface p-5 shadow-xs sm:p-6">
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <IconInfoCircle size={18} stroke={1.7} />
                </div>
                <div>
                  <h2 className="text-xs font-semibold text-primary">
                    {t("intro.title")}
                  </h2>
                  <p className="mt-2 text-[11px] leading-6 text-muted">
                    {t("intro.desc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border-light bg-surface p-5 shadow-xs sm:p-6">
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <IconHelpCircle size={18} stroke={1.7} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-primary">
                    Need additional help?
                  </h3>
                  <p className="mt-1.5 text-[11px] leading-5 text-muted">
                    If you have any questions regarding our terms, feel free to reach out to our support team.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition-colors hover:underline"
                  >
                    <span>Contact Support</span>
                    <IconArrowRight size={13} stroke={1.8} className="rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-8">
            <article className="overflow-hidden rounded-2xl border border-border-light bg-surface shadow-xs">
              <div className="divide-y divide-border-light">
                <TermsSection number="01" title={t("sections.sec1.title")}>
                  <p>{t("sections.sec1.p1")}</p>
                </TermsSection>

                <TermsSection number="02" title={t("sections.sec2.title")}>
                  <p>{t("sections.sec2.p1")}</p>
                  <p>{t("sections.sec2.p2")}</p>
                </TermsSection>

                <TermsSection number="03" title={t("sections.sec3.title")}>
                  <p>{t("sections.sec3.p1")}</p>
                  <p>{t("sections.sec3.p2")}</p>
                </TermsSection>

                <TermsSection number="04" title={t("sections.sec4.title")}>
                  <p>{t("sections.sec4.p1")}</p>
                  <p>{t("sections.sec4.p2")}</p>
                </TermsSection>

                <TermsSection number="05" title={t("sections.sec5.title")}>
                  <p>{t("sections.sec5.p1")}</p>
                  <p>{t("sections.sec5.p2")}</p>
                </TermsSection>

                <TermsSection number="06" title={t("sections.sec6.title")}>
                  <p>{t("sections.sec6.p1")}</p>
                </TermsSection>

                <TermsSection number="07" title={t("sections.sec7.title")}>
                  <p>{t("sections.sec7.p1")}</p>
                  <p>{t("sections.sec7.p2")}</p>
                </TermsSection>

                <TermsSection number="08" title={t("sections.sec8.title")}>
                  <p>{t("sections.sec8.p1")}</p>
                </TermsSection>

                <TermsSection number="09" title={t("sections.sec9.title")}>
                  <p>{t("sections.sec9.p1")}</p>

                  <Link
                    href="/contact"
                    className="group mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-accent"
                  >
                    <span>{t("sections.sec9.linkText")}</span>
                    <IconArrowRight
                      size={14}
                      stroke={1.6}
                      className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    />
                  </Link>
                </TermsSection>
              </div>
            </article>

            <div className="pt-2 text-center lg:text-start">
              <p className="text-[9px] uppercase tracking-[0.18em] text-subtle">
                {t("footerText")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function TermsSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-semibold text-accent">
          {number}
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-lg font-semibold tracking-[-0.03em] text-primary sm:text-xl">
            {title}
          </h2>

          <div className="mt-3 space-y-3 text-xs leading-7 text-muted sm:text-sm">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}