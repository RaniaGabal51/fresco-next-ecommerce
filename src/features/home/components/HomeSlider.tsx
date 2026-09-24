"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import {
  IconArrowBackUp,
  IconHeadset,
  IconShieldCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

export default function HomeSlider() {
  const t = useTranslations("homeSlider");

  const slides = [
    {
      id: 1,
      eyebrow: t("slide1.eyebrow"),
      title: t("slide1.title"),
      description: t("slide1.description"),
      button: t("slide1.button"),
      href: "/shop",
      image: "/images/home/hero-1.jfif",
      imageAlt: t("slide1.imageAlt"),
    },
    {
      id: 2,
      eyebrow: t("slide2.eyebrow"),
      title: t("slide2.title"),
      description: t("slide2.description"),
      button: t("slide2.button"),
      href: "/shop",
      image: "/images/home/Hero-2.jpg",
      imageAlt: t("slide2.imageAlt"),
    },
    {
      id: 3,
      eyebrow: t("slide3.eyebrow"),
      title: t("slide3.title"),
      description: t("slide3.description"),
      button: t("slide3.button"),
      href: "/shop",
      image: "/images/home/hero-3.jfif",
      imageAlt: t("slide3.imageAlt"),
    },
  ];

  const features = [
    {
      id: "shipping",
      icon: IconTruckDelivery,
      title: t("features.shipping.title"),
      description: t("features.shipping.description"),
    },
    {
      id: "payment",
      icon: IconShieldCheck,
      title: t("features.payment.title"),
      description: t("features.payment.description"),
    },
    {
      id: "returns",
      icon: IconArrowBackUp,
      title: t("features.returns.title"),
      description: t("features.returns.description"),
    },
    {
      id: "support",
      icon: IconHeadset,
      title: t("features.support.title"),
      description: t("features.support.description"),
    },
  ];

  return (
    <section className="w-full bg-surface">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop
        className="home-hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[calc(100svh-245px)] max-h-[550px] min-h-[420px] overflow-hidden bg-surface">
              <div className="relative z-10 flex h-full w-full max-w-[650px] flex-col justify-center px-6 py-6 sm:px-10 lg:px-16 xl:px-24">
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-accent sm:text-[10px]">
                  {slide.eyebrow}
                </p>

                <h1 className="whitespace-pre-line font-serif text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-primary sm:text-4xl lg:text-5xl xl:text-[60px]">
                  {slide.title}
                </h1>
                <p className="mt-3 max-w-[380px] text-[11px] leading-5 text-muted sm:text-xs lg:text-sm lg:leading-6">
                  {slide.description}
                </p>
                <div className="mt-5">
                  <Link
                    href={slide.href}
                    className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-accent-hover"
                  >
                    {slide.button}
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 end-0 w-[48%] sm:w-[51%] lg:w-[55%] xl:w-[58%]">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  priority={slide.id === 1}
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/35 to-transparent rtl:bg-gradient-to-l" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="bg-surface py-3 sm:py-4">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="group flex h-full items-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md sm:gap-4 sm:px-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white sm:h-10 sm:w-10">
                    <Icon size={19} stroke={1.7} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-semibold tracking-tight text-primary sm:text-[13px]">
                      {feature.title}
                    </h3>
                    <p className="mt-0.5 text-[10px] leading-4 text-muted sm:text-[11px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
