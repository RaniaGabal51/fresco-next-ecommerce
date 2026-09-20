"use client";

import { useState } from "react";
import { IconLanguage, IconChevronDown, IconCheck } from "@tabler/icons-react";

import { usePathname, useRouter } from "@/src/i18n/navigation";
import { useLocale } from "next-intl";

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

export function LanguageDropdown() {
  const [langDropdown, setLangDropdown] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function switchLang(requestLocale) {
    router.replace(pathname, {
      locale: requestLocale,
    });
  }

  return (
    <div className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setLangDropdown((prev) => !prev)}
        className="flex items-center gap-1.5 text-[11px] font-medium text-muted transition-colors hover:text-primary"
      >
        <IconLanguage size={14} stroke={1.7} />

        <span>{locale.toUpperCase()}</span>

        <IconChevronDown
          size={12}
          stroke={1.8}
          className={`transition-transform duration-200 ${
            langDropdown ? "rotate-180" : ""
          }`}
        />
      </button>

      {langDropdown && (
        <div className="absolute right-0 top-full z-50 mt-3 w-32 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-lg shadow-primary/5">
          {languages.map((lang) => {
            const isSelected = lang.code === locale;

            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  switchLang(lang.code);
                  setLangDropdown(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[11px] font-medium transition-colors ${
                  isSelected
                    ? "bg-primary/5 text-primary"
                    : "text-muted hover:bg-background hover:text-primary"
                }`}
              >
                <span>{lang.label}</span>

                {isSelected && <IconCheck size={14} stroke={2} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
