import Link from "next/link";
import {
  IconArrowRight,
  IconHome,
  IconLeaf2,
  IconSearch,
} from "@tabler/icons-react";

import "@/src/styles/globals.css";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5" />

          <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
            <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-background shadow-[0_10px_30px_rgba(25,55,44,0.12)]">
              <IconLeaf2 size={25} stroke={1.6} />
            </div>

            <div className="relative">
              <p className="select-none font-serif text-[110px] font-semibold leading-none tracking-[-0.08em] text-primary/8 sm:text-[150px]">
                404
              </p>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-5xl font-semibold tracking-[-0.05em] text-primary sm:text-6xl">
                  404
                </span>
              </div>
            </div>

            <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.28em] text-accent sm:text-[10px]">
              PAGE NOT FOUND / الصفحة غير موجودة
            </p>

            <h1 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.045em] text-primary sm:text-4xl">
              Looks like you took a wrong turn.
            </h1>

            <p className="mx-auto mt-4 max-w-md text-xs leading-6 text-muted sm:text-sm sm:leading-7">
              The page you&apos;re looking for doesn&apos;t exist or may have
              been moved. Let&apos;s get you back to something worth exploring.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(25,55,44,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-[0_12px_25px_rgba(25,55,44,0.16)] sm:w-auto"
              >
                <IconHome size={15} stroke={1.7} />
                <span>Back to Home</span>
                <IconArrowRight
                  size={14}
                  stroke={1.7}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/shop"
                className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 text-xs font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[0_8px_20px_rgba(25,55,44,0.06)] sm:w-auto"
              >
                <IconSearch size={15} stroke={1.7} />
                <span>Explore the Shop</span>
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.16em] text-subtle">
              <span className="h-px w-8 bg-border" />
              <span>Fresh · Curated · Daily</span>
              <span className="h-px w-8 bg-border" />
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
