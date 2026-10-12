import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  IconArrowRight,
  IconChevronRight,
  IconLock,
  IconShieldCheck,
} from "@tabler/icons-react";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacyPolicy");

  return (
    <main className="bg-background">
      <section className="border-b border-border-light bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              <IconShieldCheck size={22} stroke={1.6} />
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

      <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-6 rounded-2xl border border-border-light bg-surface p-5">
              <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">
                {t("sidebar.title")}
              </p>

              <nav className="space-y-1">
                <a
                  href="#information"
                  className="block rounded-lg px-3 py-2 text-[10px] font-medium text-muted transition-colors hover:bg-background hover:text-primary"
                >
                  {t("sidebar.nav1")}
                </a>

                <a
                  href="#usage"
                  className="block rounded-lg px-3 py-2 text-[10px] font-medium text-muted transition-colors hover:bg-background hover:text-primary"
                >
                  {t("sidebar.nav2")}
                </a>

                <a
                  href="#security"
                  className="block rounded-lg px-3 py-2 text-[10px] font-medium text-muted transition-colors hover:bg-background hover:text-primary"
                >
                  {t("sidebar.nav3")}
                </a>

                <a
                  href="#cookies"
                  className="block rounded-lg px-3 py-2 text-[10px] font-medium text-muted transition-colors hover:bg-background hover:text-primary"
                >
                  {t("sidebar.nav4")}
                </a>

                <a
                  href="#rights"
                  className="block rounded-lg px-3 py-2 text-[10px] font-medium text-muted transition-colors hover:bg-background hover:text-primary"
                >
                  {t("sidebar.nav5")}
                </a>

                <a
                  href="#contact"
                  className="block rounded-lg px-3 py-2 text-[10px] font-medium text-muted transition-colors hover:bg-background hover:text-primary"
                >
                  {t("sidebar.nav6")}
                </a>
              </nav>
            </div>
          </aside>

          <article className="max-w-3xl">
            <div className="space-y-12">
              <section id="information">
                <SectionTitle number="01" title={t("sections.sec1.title")} />
                <p className="mt-4 text-xs leading-7 text-muted sm:text-sm">
                  {t("sections.sec1.p1")}
                </p>
                <p className="mt-4 text-xs leading-7 text-muted sm:text-sm">
                  {t("sections.sec1.p2")}
                </p>
              </section>

              <section id="usage">
                <SectionTitle number="02" title={t("sections.sec2.title")} />
                <p className="mt-4 text-xs leading-7 text-muted sm:text-sm">
                  {t("sections.sec2.p1")}
                </p>

                <div className="mt-5 rounded-xl border border-border-light bg-surface p-5">
                  <ul className="space-y-3 text-xs leading-6 text-muted">
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {t("sections.sec2.list1")}
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {t("sections.sec2.list2")}
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {t("sections.sec2.list3")}
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {t("sections.sec2.list4")}
                    </li>
                  </ul>
                </div>
              </section>

              <section id="security">
                <SectionTitle number="03" title={t("sections.sec3.title")} />
                <p className="mt-4 text-xs leading-7 text-muted sm:text-sm">
                  {t("sections.sec3.p1")}
                </p>

                <div className="mt-5 flex gap-4 rounded-2xl border border-success/15 bg-success/5 p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                    <IconLock size={17} stroke={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-primary">
                      {t("sections.sec3.boxTitle")}
                    </h3>
                    <p className="mt-1 text-[10px] leading-5 text-muted">
                      {t("sections.sec3.boxDesc")}
                    </p>
                  </div>
                </div>
              </section>

              <section id="cookies">
                <SectionTitle number="04" title={t("sections.sec4.title")} />
                <p className="mt-4 text-xs leading-7 text-muted sm:text-sm">
                  {t("sections.sec4.p1")}
                </p>
              </section>

              <section id="rights">
                <SectionTitle number="05" title={t("sections.sec5.title")} />
                <p className="mt-4 text-xs leading-7 text-muted sm:text-sm">
                  {t("sections.sec5.p1")}
                </p>
              </section>

              <section id="contact">
                <SectionTitle number="06" title={t("sections.sec6.title")} />
                <p className="mt-4 text-xs leading-7 text-muted sm:text-sm">
                  {t("sections.sec6.p1")}
                </p>

                <Link
                  href="/contact"
                  className="group mt-5 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-accent"
                >
                  <span>{t("sections.sec6.linkText")}</span>
                  <IconArrowRight
                    size={14}
                    stroke={1.6}
                    className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  />
                </Link>
              </section>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-border-light pb-4">
      <span className="pt-1 text-[9px] font-semibold tracking-[0.15em] text-accent">
        {number}
      </span>
      <h2 className="font-serif text-xl font-semibold tracking-[-0.03em] text-primary sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}