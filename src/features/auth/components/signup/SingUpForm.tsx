"use client";
import { SubmitHandler } from "react-hook-form";
import Link from "next/link";
import {
  IconArrowRight,
  IconMail,
  IconLock,
  IconPhone,
  IconUser,
  IconEye,
  IconEyeOff,
  IconLeaf2,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, signupValues } from "../../schemas/signup.schema";
import { signupAction } from "../../server/signup.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function SingUpForm() {
  const router = useRouter();
  const t = useTranslations("signupForm");

  const { register, handleSubmit, formState, setError, watch } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const password = watch("password", "");

  const handleSingUp: SubmitHandler<signupValues> = async function (values) {
    const response = await signupAction(values);

    if (response.success === true) {
      toast.success(response.message);
      router.push("/login");
    }

    if (response.success === false) {
      if (response.fieldErrors) {
        for (const [key, message] of Object.entries(response.fieldErrors)) {
          setError(key as keyof signupValues, { message: message[0] });
        }
      }

      setError("root", { message: response.message });
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) {
      return {
        label: t("strength.enterPassword"),
        level: 0,
        color: "bg-border",
        textColor: "text-subtle",
      };
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      return {
        label: t("strength.weak"),
        level: 1,
        color: "bg-danger",
        textColor: "text-danger",
      };
    }

    if (score <= 3) {
      return {
        label: t("strength.medium"),
        level: 2,
        color: "bg-accent",
        textColor: "text-accent",
      };
    }

    return {
      label: t("strength.strong"),
      level: 4,
      color: "bg-success",
      textColor: "text-success",
    };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <section className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
      <div className="mx-auto max-w-lg">
        <div className="mb-10 md:hidden">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-background">
              <span className="text-sm">
                <IconLeaf2 size={20} stroke={1.7} />
              </span>
            </div>

            <div className="leading-none">
              <span className="font-serif text-xl font-semibold tracking-[-0.05em] text-primary">
                FRESCO
              </span>

              <p className="mt-1 text-[7px] tracking-[0.22em] text-muted">
                FRESH. CURATED. DAILY.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            {t("getStarted")}
          </p>

          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-primary sm:text-3xl">
            {t("title")}
          </h2>

          <p className="mt-2 text-[12px] leading-5 text-muted">
            {t("description")}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(handleSingUp)}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-[11px] font-medium text-primary"
              >
                {t("labels.name")}
              </label>

              <div className="relative">
                <IconUser
                  size={16}
                  stroke={1.7}
                  className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder={t("placeholders.name")}
                  className={`h-11 w-full rounded-xl border bg-background ps-10 pe-4 text-[12px] text-foreground outline-none transition-all placeholder:text-subtle focus:bg-surface focus:ring-2 ${
                    formState.errors.name
                      ? "border-danger focus:border-danger focus:ring-danger/5"
                      : "border-border focus:border-primary focus:ring-primary/5"
                  }`}
                />
              </div>

              {formState.errors.name && (
                <p className="mt-1.5 text-[10px] leading-4 text-danger">
                  {formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-[11px] font-medium text-primary"
              >
                {t("labels.phone")}
              </label>

              <div className="relative">
                <IconPhone
                  size={16}
                  stroke={1.7}
                  className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder={t("placeholders.phone")}
                  className={`h-11 w-full rounded-xl border bg-background ps-10 pe-4 text-[12px] text-foreground outline-none transition-all placeholder:text-subtle focus:bg-surface focus:ring-2 ${
                    formState.errors.phone
                      ? "border-danger focus:border-danger focus:ring-danger/5"
                      : "border-border focus:border-primary focus:ring-primary/5"
                  }`}
                />
              </div>

              {formState.errors.phone && (
                <p className="mt-1.5 text-[10px] leading-4 text-danger">
                  {formState.errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-[11px] font-medium text-primary"
            >
              {t("labels.email")}
            </label>

            <div className="relative">
              <IconMail
                size={16}
                stroke={1.7}
                className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder={t("placeholders.email")}
                className="h-11 w-full rounded-xl border border-border bg-background ps-10 pe-4 text-[12px] text-foreground outline-none transition-all placeholder:text-subtle focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/5"
              />
            </div>
            {formState.errors.email && (
              <p className="mt-1.5 text-[10px] leading-4 text-danger">
                {formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[11px] font-medium text-primary"
              >
                {t("labels.password")}
              </label>

              <div className="relative">
                <IconLock
                  size={16}
                  stroke={1.7}
                  className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder={t("placeholders.password")}
                  className={`h-11 w-full rounded-xl border bg-background ps-10 pe-11 text-[12px] text-foreground outline-none transition-all placeholder:text-subtle focus:bg-surface focus:ring-2 ${
                    formState.errors.password
                      ? "border-danger focus:border-danger focus:ring-danger/5"
                      : "border-border focus:border-primary focus:ring-primary/5"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute end-3.5 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-primary"
                >
                  {showPassword ? (
                    <IconEye size={16} stroke={1.7} />
                  ) : (
                    <IconEyeOff size={16} stroke={1.7} />
                  )}
                </button>
              </div>

              {password && (
                <div className="mt-2.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((segment) => (
                      <span
                        key={segment}
                        className={`h-1 flex-1 rounded-full ${
                          segment <= passwordStrength.level
                            ? passwordStrength.color
                            : "bg-border"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="mt-1.5 flex items-center justify-between">
                    <span
                      className={`text-[9px] font-medium ${passwordStrength.textColor}`}
                    >
                      {passwordStrength.label}
                    </span>

                    <span className="text-[9px] text-subtle">
                      {t("strength.hint")}
                    </span>
                  </div>
                </div>
              )}

              {formState.errors.password && (
                <p className="mt-1.5 text-[10px] leading-4 text-danger">
                  {formState.errors.password.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="rePassword"
                className="mb-2 block text-[11px] font-medium text-primary"
              >
                {t("labels.rePassword")}
              </label>

              <div className="relative">
                <IconLock
                  size={16}
                  stroke={1.7}
                  className="absolute start-3.5 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="rePassword"
                  type={showRePassword ? "text" : "password"}
                  {...register("rePassword")}
                  placeholder={t("placeholders.rePassword")}
                  className={`h-11 w-full rounded-xl border bg-background ps-10 pe-11 text-[12px] text-foreground outline-none transition-all placeholder:text-subtle focus:bg-surface focus:ring-2 ${
                    formState.errors.rePassword
                      ? "border-danger focus:border-danger focus:ring-danger/5"
                      : "border-border focus:border-primary focus:ring-primary/5"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowRePassword((prev) => !prev)}
                  aria-label={
                    showRePassword ? "Hide password" : "Show password"
                  }
                  className="absolute end-3.5 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-primary"
                >
                  {showRePassword ? (
                    <IconEye size={16} stroke={1.7} />
                  ) : (
                    <IconEyeOff size={16} stroke={1.7} />
                  )}
                </button>
              </div>

              {formState.errors.rePassword && (
                <p className="mt-1.5 text-[10px] leading-4 text-danger">
                  {formState.errors.rePassword.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 pt-1">
            <input
              id="terms"
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-border accent-primary"
            />

            <label
              htmlFor="terms"
              className="cursor-pointer text-[10px] leading-5 text-muted"
            >
              {t("terms.agree")}{" "}
              <Link
                href="/terms"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                {t("terms.termsLink")}
              </Link>{" "}
              {t("terms.and")}{" "}
              <Link
                href="/privacy"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                {t("terms.privacyLink")}
              </Link>
              .
            </label>
          </div>

          {formState.errors.root && (
            <div className="flex items-start gap-2.5 rounded-xl border border-danger/15 bg-danger/5 px-3.5 py-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-danger/10">
                <span className="text-[10px] font-bold text-danger">!</span>
              </div>

              <p className="text-[10px] font-medium leading-5 text-danger">
                {formState.errors.root.message}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent text-[12px] font-semibold tracking-wide text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/15"
          >
            {t("buttons.submit")}
            <IconArrowRight
              size={16}
              stroke={1.8}
              className="transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            />
          </button>

          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-border-light" />

            <span className="text-[9px] uppercase tracking-wider text-subtle">
              {t("footer.member")}
            </span>

            <div className="h-px flex-1 bg-border-light" />
          </div>

          <p className="text-center text-[11px] text-muted">
            {t("footer.hasAccount")}{" "}
            <Link
              href="/login"
              className="font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              {t("footer.signIn")}
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
