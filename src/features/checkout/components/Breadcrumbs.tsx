import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export default function Breadcrumbs() {
  const t = useTranslations("checkout.breadcrumbs");

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex items-center gap-2 text-[10px] font-medium text-muted"
    >
      <Link href="/" className="transition-colors hover:text-accent">
        {t("home")}
      </Link>

      <IconChevronRight
        size={12}
        stroke={1.5}
        className="text-subtle rtl:rotate-180"
      />

      <Link href="/cart" className="transition-colors hover:text-accent">
        {t("cart")}
      </Link>

      <IconChevronRight
        size={12}
        stroke={1.5}
        className="text-subtle rtl:rotate-180"
      />

      <span aria-current="page" className="text-primary">
        {t("checkout")}
      </span>
    </nav>
  );
}