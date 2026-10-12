"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LanguageDropdown } from "./LanguageSwitcher";

import {
  IconChevronDown,
  IconHeart,
  IconHeadphones,
  IconLeaf2,
  IconMenu2,
  IconSearch,
  IconShoppingBag,
  IconUser,
  IconX,
} from "@tabler/icons-react";

import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { appState } from "@/src/store/store";
import { authActions } from "@/src/features/auth/slices/auth.slice";
import { deleteToken } from "@/src/features/auth/server/auth.actions";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/src/features/categories/services/getAllCategories";
import type { Category } from "@/src/features/categories/types/categories.types";

const navLinks = [
  {
    key: "home",
    href: "/",
  },
  {
    key: "shop",
    href: "/shop",
  },
  {
    key: "categories",
    href: "/categories",
    dropdown: true,
  },
  {
    key: "brands",
    href: "/brands",
  },
];

export default function Navbar() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getAllCategories();
        setCategories(response.data ?? []);
      } catch (error) {
      }
    }

    fetchCategories();
  }, []);

  const { userInfo, isAuthenticated } = useSelector(
    (state: appState) => state.authReducer,
  );

  const { numOfCartItems } = useSelector(
    (state: appState) => state.cartReducer,
  );
  const t = useTranslations("navbar");
  const pathName = usePathname();

  const { logout } = authActions;
  const dispatch = useDispatch();

  const router = useRouter();

  return (
    <header className="w-full border-b border-border bg-surface">
      <div className="border-b border-border-light bg-background">
        <div className="flex h-8 w-full items-center justify-between px-6 sm:h-9 sm:px-10 lg:px-16 xl:px-24">
          <div className="flex min-w-0 items-center gap-3 text-[9px] text-muted sm:gap-5 sm:text-[11px]">
            <span className="flex shrink-0 items-center gap-1.5">
              <span className="text-accent">✦</span>
              <span>{t("topBanner.shipping")}</span>
            </span>

            <span className="hidden shrink-0 items-center gap-1.5 sm:flex">
              <span className="text-primary">✦</span>
              <span>{t("topBanner.arrivals")}</span>
            </span>
          </div>

          <div className="ms-3 flex shrink-0 items-center gap-3 text-[9px] text-muted sm:gap-4 sm:text-[11px]">
            <LanguageDropdown />
            <Link
              href="/contact"
              className="hidden items-center gap-1.5 transition-colors hover:text-primary md:flex"
            >
              <IconHeadphones size={14} stroke={1.7} />
              <span>{t("help")}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-surface">
        <div className="flex h-16 w-full items-center gap-2 px-6 sm:h-[72px] sm:gap-4 sm:px-10 lg:gap-5 lg:px-16 xl:px-24">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t("ariaLabels.openMenu")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-muted md:hidden"
          >
            {isMobileMenuOpen ? (
              <IconX size={21} stroke={1.7} />
            ) : (
              <IconMenu2 size={21} stroke={1.7} />
            )}
          </button>
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2 sm:gap-2.5"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-background transition-transform duration-300 group-hover:rotate-[-8deg] sm:h-9 sm:w-9">
              <IconLeaf2
                size={16}
                stroke={1.7}
                className="sm:h-[18px] sm:w-[18px]"
              />
            </div>

            <div className="leading-none">
              <span className="font-serif text-[20px] font-semibold tracking-[-0.05em] text-primary sm:text-[24px]">
                FRESCO
              </span>
              <span className="mt-1 hidden text-[8px] tracking-[0.22em] text-muted sm:block">
                {t("brandSubtitle")}
              </span>
            </div>
          </Link>
          <div className="relative ms-2 hidden w-full max-w-[280px] lg:block xl:max-w-[320px]">
            <IconSearch
              size={17}
              stroke={1.7}
              className="absolute start-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              placeholder={t("searchPlaceholder")}
              className="h-10 w-full rounded-full border border-border bg-background ps-11 pe-4 text-xs text-foreground outline-none transition-all placeholder:text-subtle focus:border-primary focus:bg-surface"
            />
          </div>

          <div className="ms-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              aria-label={t("ariaLabels.search")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-muted sm:h-10 sm:w-10 lg:hidden"
            >
              <IconSearch size={19} stroke={1.7} />
            </button>

            <Link
              href="/wishlist"
              aria-label={t("ariaLabels.wishlist")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-muted sm:h-10 sm:w-10"
            >
              <IconHeart size={19} stroke={1.7} className="sm:h-5 sm:w-5" />
            </Link>

            <Link
              href="/cart"
              aria-label={t("ariaLabels.shoppingBag")}
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-muted sm:h-10 sm:w-10"
            >
              <IconShoppingBag
                size={19}
                stroke={1.7}
                className="sm:h-5 sm:w-5"
              />
              <span className="absolute end-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[8px] font-semibold leading-none text-white sm:h-[17px] sm:min-w-[17px] sm:text-[9px]">
                {numOfCartItems}
              </span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/account"
                  className="ms-0.5 hidden shrink-0 items-center gap-2 rounded-full border border-border px-3 py-2 text-[11px] font-medium text-primary transition-all hover:border-primary hover:bg-primary hover:text-background sm:flex sm:px-3.5"
                >
                  <IconUser size={16} stroke={1.7} />
                  <span>{userInfo?.name || t("buttons.account")}</span>
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    dispatch(logout());
                    await deleteToken();
                    router.push("/login");
                  }}
                  className="ms-0.5 hidden shrink-0 rounded-full bg-accent px-3.5 py-2.5 text-[11px] font-semibold tracking-wide text-white transition-colors hover:bg-accent-hover sm:block sm:px-4"
                >
                  {t("accountMenu.logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="ms-0.5 hidden shrink-0 items-center gap-2 rounded-full border border-border px-3 py-2 text-[11px] font-medium text-primary transition-all hover:border-primary hover:bg-primary hover:text-background sm:flex sm:px-3.5"
                >
                  <IconUser size={16} stroke={1.7} />
                  <span>{t("buttons.signIn")}</span>
                </Link>
                <Link
                  href="/signup"
                  className="ms-0.5 hidden shrink-0 rounded-full bg-accent px-3.5 py-2.5 text-[11px] font-semibold tracking-wide text-white transition-colors hover:bg-accent-hover sm:block sm:px-4"
                >
                  {t("buttons.signUp")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-border-light bg-surface px-6 py-4 md:hidden">
          <div className="mb-4">
            <div className="relative w-full">
              <IconSearch
                size={17}
                stroke={1.7}
                className="absolute start-4 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                placeholder={t("searchPlaceholder")}
                className="h-10 w-full rounded-full border border-border bg-background ps-11 pe-4 text-xs text-foreground outline-none transition-all placeholder:text-subtle focus:border-primary focus:bg-surface"
              />
            </div>
          </div>

          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <div key={link.key} className="flex flex-col space-y-2">
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs font-semibold text-primary"
                    >
                      {t(`links.${link.key}`)}
                    </Link>
                    <div className="ms-3 flex flex-col space-y-2 border-s border-border-light ps-3">
                      <Link
                        href="/categories"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[11px] font-medium text-muted hover:text-primary"
                      >
                        {t("categoriesDropdown.all")}
                      </Link>
                      {categories.map((category) => (
                        <Link
                          key={category._id}
                          href={`/categories/${category._id}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-[11px] font-medium text-muted hover:text-primary"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs font-semibold text-primary"
                >
                  {t(`links.${link.key}`)}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 flex flex-col gap-2.5 border-t border-border-light pt-4">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-medium text-muted"
            >
              <IconHeadphones size={16} stroke={1.7} />
              <span>{t("help")}</span>
            </Link>

            {!isAuthenticated ? (
              <div className="mt-2 flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 rounded-full border border-border py-2 text-center text-xs font-medium text-primary"
                >
                  {t("buttons.signIn")}
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 rounded-full bg-accent py-2 text-center text-xs font-semibold text-white"
                >
                  {t("buttons.signUp")}
                </Link>
              </div>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full border border-border py-2 text-center text-xs font-medium text-primary"
                >
                  {userInfo?.name || t("buttons.account")}
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    setIsMobileMenuOpen(false);
                    dispatch(logout());
                    await deleteToken();
                    router.push("/login");
                  }}
                  className="rounded-full bg-accent py-2 text-center text-xs font-semibold text-white"
                >
                  {t("accountMenu.logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <nav className="hidden border-t border-border-light bg-surface md:block">
        <div className="flex h-11 w-full items-center px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="flex h-full items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathName === link.href ||
                (link.href !== "/" && pathName.startsWith(`${link.href}/`));

              if (link.dropdown) {
                return (
                  <div
                    key={link.key}
                    className="relative flex h-full items-center"
                    onMouseEnter={() => setIsCategoriesOpen(true)}
                    onMouseLeave={() => setIsCategoriesOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                      className={`group relative flex h-full shrink-0 items-center gap-1 text-[11px] font-medium tracking-wide transition-colors ${
                        isActive || isCategoriesOpen
                          ? "text-primary"
                          : "text-muted hover:text-primary"
                      }`}
                    >
                      {t(`links.${link.key}`)}
                      <IconChevronDown
                        size={13}
                        stroke={1.7}
                        className={`transition-transform ${
                          isCategoriesOpen ? "rotate-180" : ""
                        }`}
                      />
                      <span
                        className={`absolute bottom-0 start-0 h-[2px] bg-accent transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </button>

                    {isCategoriesOpen && (
                      <div className="absolute top-full start-0 z-50 mt-0 w-52 rounded-xl border border-border bg-surface p-2 shadow-lg">
                        <Link
                          href="/categories"
                          onClick={() => setIsCategoriesOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-[11px] font-semibold text-primary transition-colors hover:bg-surface-muted hover:text-accent"
                        >
                          {t("categoriesDropdown.all")}
                        </Link>

                        <div className="my-1 border-t border-border-light" />

                        {categories.length > 0 ? (
                          categories.map((category) => (
                            <Link
                              key={category._id}
                              href={`/categories/${category._id}`}
                              onClick={() => setIsCategoriesOpen(false)}
                              className="block rounded-lg px-3 py-2.5 text-[11px] font-medium text-muted transition-colors hover:bg-surface-muted hover:text-primary"
                            >
                              {category.name}
                            </Link>
                          ))
                        ) : (
                          <p className="px-3 py-2 text-[11px] text-muted">
                            {t("categoriesDropdown.loading")}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`group relative flex h-full shrink-0 items-center gap-1 text-[11px] font-medium tracking-wide transition-colors ${
                    isActive ? "text-primary" : "text-muted hover:text-primary"
                  }`}
                >
                  {t(`links.${link.key}`)}
                  <span
                    className={`absolute bottom-0 start-0 h-[2px] bg-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="ms-auto hidden shrink-0 items-center gap-2 text-[10px] text-muted lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            <span>{t("freshnessGuaranteed")}</span>
          </div>
        </div>
      </nav>
    </header>
  );
}