"use client";

import { useState } from "react";
import {
  IconCurrencyDollar,
  IconChevronDown,
  IconCheck,
} from "@tabler/icons-react";

const currencies = [
  { code: "USD", symbol: "$", label: "USD $" },
  { code: "EGP", symbol: "ج.م", label: "EGP ج.م" },
];

export function CurrencyDropdown() {
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  return (
    <div className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setCurrencyDropdown((prev) => !prev)}
        className="flex items-center gap-1.5 text-[11px] font-medium text-muted transition-colors hover:text-primary"
      >
        <IconCurrencyDollar size={14} stroke={1.7} />
        <span>
          {selectedCurrency.code} {selectedCurrency.symbol}
        </span>
        <IconChevronDown
          size={12}
          stroke={1.8}
          className={`transition-transform duration-200 ${
            currencyDropdown ? "rotate-180" : ""
          }`}
        />
      </button>

      {currencyDropdown && (
        <div className="absolute right-0 top-full z-50 mt-3 w-36 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-lg shadow-primary/5">
          {currencies.map((curr) => {
            const isSelected = curr.code === selectedCurrency.code;
            return (
              <button
                key={curr.code}
                type="button"
                onClick={() => {
                  setSelectedCurrency(curr);
                  setCurrencyDropdown(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[11px] font-medium transition-colors ${
                  isSelected
                    ? "bg-primary/5 text-primary"
                    : "text-muted hover:bg-background hover:text-primary"
                }`}
              >
                <span>{curr.label}</span>
                {isSelected && (
                  <span>
                    <IconCheck size={14} stroke={2} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
