"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconArrowRight,
  IconAt,
  IconEye,
  IconEyeOff,
  IconLock,
  IconLeaf2,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { loginSchema, loginValues } from "../../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginAction } from "../../server/login.actions";
import { toast } from "sonner";
import { useRouter } from "@/src/i18n/navigation";
import { setToken } from "../../server/auth.actions";
import { authActions } from "../../slices/auth.slice";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const { setAuthStates } = authActions;

  const dispatch = useDispatch();
  const t = useTranslations("loginForm");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

const handleLogin: SubmitHandler<loginValues> = async (values) => {
  const response = await loginAction(values);

  if (response.success) {
    await setToken(response.data.token);

    dispatch(
      setAuthStates({
        isAuthenticated: true,
        userInfo: {
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,
        },
      }),
    );

    toast.success(response.message);

    router.push("/");
    router.refresh();

    return;
  }

  if (response.fieldErrors) {
    for (const [key, message] of Object.entries(response.fieldErrors)) {
      setError(key as keyof loginValues, {
        message: message?.[0],
      });
    }
  }

  setError("root", {
    message: response.message,
  });
};

  return (
    <section className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
      <div className="mx-auto max-w-lg">
        <div className="mb-10 md:hidden">
          <Link href="/" className="group inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-background transition-transform duration-300 group-hover:rotate-[-8deg]">
              <span className="text-sm">
                <IconLeaf2 size={20} stroke={1.7} />
              </span>
            </div>

            <div className="leading-none">
              <span className="font-serif text-xl font-semibold tracking-[-0.05em] text-primary">
                FRESCO
              </span>

              <p className="mt-1 text-[7px] tracking-[0.22em] text-muted">
                {t("mobileTagline")}
              </p>
            </div>
          </Link>
        </div>
        <div className="mb-8">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            {t("welcomeBack")}
          </p>

          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-primary sm:text-3xl">
            {t("title")}
          </h2>

          <p className="mt-2 text-[12px] leading-5 text-muted">
            {t("subtitle")}
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-[11px] font-medium text-primary"
            >
              {t("emailLabel")}
            </label>

            <div className="relative">
              <IconAt
                size={16}
                stroke={1.7}
                className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="email"
                type="email"
                {...register("email")}
                autoComplete="email"
                placeholder={t("emailPlaceholder")}
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  ps-10
                  pe-4
                  text-[12px]
                  text-foreground
                  outline-none
                  transition-all
                  placeholder:text-subtle
                  focus:border-primary
                  focus:bg-surface
                  focus:ring-2
                  focus:ring-primary/5
                "
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-[10px] leading-4 text-danger">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-[11px] font-medium text-primary"
              >
                {t("passwordLabel")}
              </label>

              <Link
                href="/forgot-password"
                className="text-[10px] font-medium text-accent transition-colors hover:text-accent-hover"
              >
                {t("forgotPassword")}
              </Link>
            </div>

            <div className="relative">
              <IconLock
                size={16}
                stroke={1.7}
                className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder={t("passwordPlaceholder")}
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  ps-10
                  pe-11
                  text-[12px]
                  text-foreground
                  outline-none
                  transition-all
                  placeholder:text-subtle
                  focus:border-primary
                  focus:bg-surface
                  focus:ring-2
                  focus:ring-primary/5
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? t("hidePassword") : t("showPassword")
                }
                className="absolute end-3.5 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-primary"
              >
                {showPassword ? (
                  <IconEye size={16} stroke={1.7} />
                ) : (
                  <IconEyeOff size={16} stroke={1.7} />
                )}
              </button>
            </div>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-[10px] leading-4 text-danger">
              {errors.password.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                className="
                  h-3.5
                  w-3.5
                  cursor-pointer
                  rounded
                  border-border
                  accent-primary
                "
              />

              <span className="text-[10px] text-muted">{t("rememberMe")}</span>
            </label>
          </div>

          {errors.root && (
            <div className="flex items-start gap-2.5 rounded-xl border border-danger/15 bg-danger/5 px-3.5 py-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-danger/10">
                <span className="text-[10px] font-bold text-danger">!</span>
              </div>

              <p className="text-[10px] font-medium leading-5 text-danger">
                {errors.root.message}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent text-[12px] font-semibold tracking-wide text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/15"
          >
            <span>{t("submitButton")}</span>
            <IconArrowRight
              size={16}
              stroke={1.8}
              className="transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            />
          </button>
        </form>
        <div className="my-6 flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-border-light" />

          <span className="text-[9px] uppercase tracking-wider text-subtle">
            {t("newHere")}
          </span>

          <div className="h-px flex-1 bg-border-light" />
        </div>
        <p className="text-center text-[11px] text-muted">
          {t("noAccount")}{" "}
          <Link
            href="/signup"
            className="font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            {t("signUpLink")}
          </Link>
        </p>
      </div>
    </section>
  );
}
