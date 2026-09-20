import Link from "next/link";
import { IconSparkles, IconLeaf2, IconCheck } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export default function LoginHero() {
  const t = useTranslations("loginHero");

  return (
    <section className="relative hidden overflow-hidden bg-primary px-7 py-10 text-background sm:px-10 sm:py-12 lg:flex lg:px-12 lg:py-14 md:flex">
      <div className="absolute -end-20 -top-20 h-52 w-52 rounded-full border border-background/10" />
      <div className="absolute -bottom-28 -start-20 h-64 w-64 rounded-full border border-background/10" />
      <div className="relative flex h-full flex-col">
        <Link href="/" className="group inline-flex w-fit items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-primary transition-transform duration-300 group-hover:rotate-[-8deg]">
            <IconLeaf2 size={19} stroke={1.7} />
          </div>

          <div className="leading-none">
            <span className="text-[25px] font-semibold tracking-[-0.05em]">
              FRESCO
            </span>

            <span className="mt-1 block text-[8px] tracking-[0.22em] text-sage">
              {t("tagline")}
            </span>
          </div>
        </Link>
        <div className="mt-14 max-w-md lg:mt-20">
          <h1 className="max-w-sm text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
            {t("headingLine1")} <br /> {t("headingLine2")}
          </h1>

          <p className="mt-5 max-w-sm text-[13px] leading-6 text-sage">
            {t("description")}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
              <IconSparkles size={18} stroke={1.6} className="text-sage" />

              <p className="mt-3 text-[11px] font-medium text-background">
                {t("card1Title")}
              </p>

              <p className="mt-1 text-[9px] leading-4 text-background/40">
                {t("card1Desc")}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
              <IconLeaf2 size={18} stroke={1.6} className="text-sage" />

              <p className="mt-3 text-[11px] font-medium text-background">
                {t("card2Title")}
              </p>

              <p className="mt-1 text-[9px] leading-4 text-background/40">
                {t("card2Desc")}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-auto hidden pt-14 lg:block">
          <div className="border-t border-background/10 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/10">
                <IconCheck size={15} stroke={2} className="text-sage" />
              </div>

              <div>
                <p className="text-[11px] font-medium">{t("badgeTitle")}</p>

                <p className="mt-0.5 text-[10px] text-sage">{t("badgeDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
