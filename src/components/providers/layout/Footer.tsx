'use client'
import Link from "next/link";
import {
  IconChevronRight,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandPinterest,
  IconBrandTwitter,
  IconLeaf2,
  IconMail,
  IconPhone,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/src/features/categories/services/getAllCategories";
import type { Category } from "@/src/features/categories/types/categories.types";

export default function Footer() {
  const t = useTranslations("footer");

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getAllCategories();
        setCategories(response.data?.slice(0, 5) ?? []);
      } catch (error) {
      }
    }

    fetchCategories();
  }, []);

  const quickLinks = [
    { label: t("quickLinks.about"), href: "/about" },
    { label: t("quickLinks.shop"), href: "/shop" },
    { label: t("quickLinks.brands"), href: "/brands" },
    { label: t("quickLinks.contact"), href: "/contact" },
  ];

  const customerLinks = [
    { label: t("customer.account"), href: "/account" },
    { label: t("customer.orders"), href: "/orders" },
    { label: t("customer.wishlist"), href: "/wishlist" },
    { label: t("customer.returns"), href: "/returns" },
    { label: t("customer.help"), href: "/contact" },
  ];

  return (
    <footer className="border-t border-border bg-primary text-background">
      <div className="w-full pb-10 pt-12 px-6 sm:px-10 sm:pt-14 lg:px-16 lg:pt-16 xl:px-24">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="group mb-6 inline-flex items-center gap-2.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-primary transition-transform duration-300 group-hover:rotate-[-8deg]">
                <IconLeaf2 size={19} stroke={1.7} />
              </div>

              <div className="leading-none">
                <span className="text-[25px] font-semibold tracking-[-0.05em] text-background">
                  FRESCO
                </span>

                <span className="mt-1 block text-[8px] tracking-[0.22em] text-sage">
                  {t("tagline")}
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-[13px] leading-6 text-sage">
              {t("description")}
            </p>

            <div className="mt-6 space-y-3">
              <Link
                href="/contact"
                className="group flex items-center gap-3 text-[11px] text-sage transition-colors hover:text-background"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background/10">
                  <IconMail size={15} stroke={1.7} />
                </span>

                <span>{t("contact.email")}</span>
              </Link>

              <Link
                href="tel:+1234567890"
                className="group flex items-center gap-3 text-[11px] text-sage transition-colors hover:text-background"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background/10">
                  <IconPhone size={15} stroke={1.7} />
                </span>

                <span>{t("contact.phone")}</span>
              </Link>
            </div>

            <div className="mt-7 flex items-center gap-2.5">
              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-background/15 text-sage transition-all hover:border-accent hover:bg-accent hover:text-white"
              >
                <IconBrandFacebook size={16} stroke={1.7} />
              </Link>

              <Link
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-background/15 text-sage transition-all hover:border-accent hover:bg-accent hover:text-white"
              >
                <IconBrandInstagram size={16} stroke={1.7} />
              </Link>

              <Link
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-background/15 text-sage transition-all hover:border-accent hover:bg-accent hover:text-white"
              >
                <IconBrandTwitter size={16} stroke={1.7} />
              </Link>

              <Link
                href="#"
                aria-label="Pinterest"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-background/15 text-sage transition-all hover:border-accent hover:bg-accent hover:text-white"
              >
                <IconBrandPinterest size={16} stroke={1.7} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-background">
              {t("categories.title")}
            </h3>

            <ul className="space-y-3.5">
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/categories/${category._id}`}
                    className="group flex items-center gap-1.5 text-[12px] text-sage transition-colors hover:text-background"
                  >
                    <IconChevronRight
                      size={12}
                      stroke={1.8}
                      className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                    />

                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-background">
              {t("quickLinks.title")}
            </h3>

            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-[12px] text-sage transition-colors hover:text-background"
                  >
                    <IconChevronRight
                      size={12}
                      stroke={1.8}
                      className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                    />

                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-background">
              {t("customer.title")}
            </h3>

            <ul className="space-y-3.5">
              {customerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-[12px] text-sage transition-colors hover:text-background"
                  >
                    <IconChevronRight
                      size={12}
                      stroke={1.8}
                      className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                    />

                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-background">
              {t("newsletter.title")}
            </h3>

            <p className="mb-4 text-[11px] leading-5 text-sage">
              {t("newsletter.description")}
            </p>

            <form className="relative">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="h-10 w-full rounded-full border border-background/15 bg-background/10 ps-4 pe-11 text-[11px] text-background outline-none transition-colors placeholder:text-sage focus:border-accent"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute end-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-hover rtl:rotate-90"
              >
                <IconArrowUpRight size={15} stroke={1.8} />
              </button>
            </form>

            <p className="mt-3 text-[9px] leading-4 text-subtle">
              {t("newsletter.disclaimer")}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="w-full flex flex-col gap-4 px-6 py-5 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-16 xl:px-24">
          <p className="text-center text-[10px] text-sage md:text-start">
            © {new Date().getFullYear()} FRESCO. {t("bottom.rights")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <Link
              href="/privacy"
              className="text-[10px] text-sage transition-colors hover:text-background"
            >
              {t("bottom.privacy")}
            </Link>

            <span className="h-3 w-px bg-background/15" />

            <Link
              href="/terms"
              className="text-[10px] text-sage transition-colors hover:text-background"
            >
              {t("bottom.terms")}
            </Link>

            <span className="h-3 w-px bg-background/15" />

            <Link
              href="/shipping"
              className="text-[10px] text-sage transition-colors hover:text-background"
            >
              {t("bottom.shipping")}
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[9px] uppercase tracking-wider text-subtle">
              {t("bottom.secure")}
            </span>

            <span className="rounded border border-background/10 px-2 py-1 text-[9px] font-semibold text-sage">
              VISA
            </span>

            <span className="rounded border border-background/10 px-2 py-1 text-[9px] font-semibold text-sage">
              MC
            </span>

            <span className="rounded border border-background/10 px-2 py-1 text-[9px] font-semibold text-sage">
              AMEX
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}