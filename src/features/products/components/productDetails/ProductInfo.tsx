"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import {
  IconHeart,
  IconMinus,
  IconPlus,
  IconRotateClockwise,
  IconShare3,
  IconShieldCheck,
  IconShoppingBag,
  IconStarFilled,
  IconTruckDelivery,
} from "@tabler/icons-react";

import { ProductDetails } from "./../../types/productDetails.type";

type ProductInfoProps = {
  productinfo: ProductDetails;
};

export default function ProductInfo({ productinfo }: ProductInfoProps) {
  const t = useTranslations("product");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "details" | "reviews" | "shipping"
  >("details");

  const rating = productinfo.ratingsAverage || 0;
  const reviews = productinfo.reviews || [];
  const ratingCount = productinfo.ratingsQuantity || reviews.length;

  const hasDiscount =
    productinfo.priceAfterDiscount &&
    productinfo.priceAfterDiscount < productinfo.price;

  const currentPrice = productinfo.priceAfterDiscount || productinfo.price;
  const totalPrice = currentPrice * quantity;

  const images = useMemo(() => {
    const allImages = [productinfo.imageCover, ...(productinfo.images || [])];
    return [...new Set(allImages.filter(Boolean))];
  }, [productinfo.imageCover, productinfo.images]);

  const galleryItems = images.map((image) => ({
    original: image,
    thumbnail: image,
    originalAlt: productinfo.title,
    thumbnailAlt: productinfo.title,
  }));

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((review) => review.rating === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(productinfo.quantity || 1, current + 1));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("share.title"),
          text: t("share.text"),
          url: window.location.href,
        });
      } catch (error) {
      }
    } else {
      alert(t("share.unsupported"));
    }
  };

  return (
    <main className="w-full overflow-x-hidden bg-background">
      <section className="w-full px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-[10px] text-muted">
            <Link href="/" className="transition-colors hover:text-accent">
              {t("breadcrumb.home")}
            </Link>
            <span>/</span>
            <Link href="/shop" className="transition-colors hover:text-accent">
              {t("breadcrumb.shop")}
            </Link>

            {productinfo.category?.name && (
              <>
                <span>/</span>
                <Link
                  href={`/categories/${productinfo.category._id}`}
                  className="transition-colors hover:text-accent"
                >
                  {productinfo.category.name}
                </Link>
              </>
            )}

            <span>/</span>
            <span className="max-w-[180px] truncate text-foreground sm:max-w-[220px]">
              {productinfo.title}
            </span>
          </div>

          <div className="w-full overflow-hidden rounded-3xl border border-border-light bg-surface shadow-[0_12px_45px_rgba(25,55,44,0.06)]">
            <div className="grid w-full grid-cols-1 lg:grid-cols-2">
              <div className="w-full min-w-0 overflow-hidden border-b border-border-light p-4 sm:p-8 lg:border-b-0 lg:border-e lg:p-10 xl:p-12">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-primary/8 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-primary">
                    {productinfo.brand?.name || "FRESCO"}
                  </span>

                  {hasDiscount && (
                    <span className="rounded-full bg-accent px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                      {t("labels.sale")}
                    </span>
                  )}
                </div>

                <div className="fresco-gallery w-full min-w-0 overflow-hidden [&_.image-gallery]:w-full [&_.image-gallery-content]:w-full [&_.image-gallery-slide-wrapper]:w-full [&_.image-gallery-swipe]:w-full [&_.image-gallery-slides]:w-full [&_.image-gallery-image]:max-h-[350px] [&_.image-gallery-image]:w-full [&_.image-gallery-image]:object-contain [&_.image-gallery-thumbnails-wrapper]:w-full [&_.image-gallery-thumbnails-wrapper]:overflow-x-auto [&_.image-gallery-thumbnails]:flex [&_.image-gallery-thumbnails]:justify-center [&_.image-gallery-thumbnail]:w-14 [&_.image-gallery-thumbnail-image]:h-12 [&_.image-gallery-thumbnail-image]:object-cover">
                  <ImageGallery
                    items={galleryItems}
                    showPlayButton={false}
                    showFullscreenButton={true}
                    showNav={false}
                    showBullets={false}
                    showThumbnails={true}
                    thumbnailPosition="bottom"
                    lazyLoad={true}
                    slideDuration={350}
                  />
                </div>
              </div>

              <div className="flex w-full min-w-0 flex-col p-4 sm:p-8 lg:p-10 xl:p-12">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  {productinfo.category?.name && (
                    <Link
                      href={`/categories/${productinfo.category._id}`}
                      className="text-[9px] font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-accent-hover"
                    >
                      {productinfo.category.name}
                    </Link>
                  )}

                  {productinfo.brand?.name && (
                    <>
                      <span className="text-border">•</span>
                      <Link
                        href={`/brands/${productinfo.brand._id}`}
                        className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-primary"
                      >
                        {productinfo.brand.name}
                      </Link>
                    </>
                  )}
                </div>

                <h1 className="max-w-xl font-serif text-xl font-semibold leading-[1.2] tracking-[-0.035em] text-primary break-words sm:text-3xl lg:text-[38px]">
                  {productinfo.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <IconStarFilled
                        key={star}
                        size={14}
                        className={
                          star <= Math.round(rating)
                            ? "text-accent"
                            : "text-border"
                        }
                      />
                    ))}
                  </div>

                  <span className="text-[11px] text-muted">
                    {rating.toFixed(1)}
                  </span>
                  <span className="text-border">•</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab("reviews")}
                    className="text-[11px] font-medium text-primary underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    {ratingCount} {t("labels.reviews")}
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="text-xl font-semibold tracking-tight text-primary sm:text-3xl">
                    {currentPrice.toLocaleString()} EGP
                  </span>

                  {hasDiscount && (
                    <>
                      <span className="text-xs text-subtle line-through sm:text-sm">
                        {productinfo.price.toLocaleString()} EGP
                      </span>
                      <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[9px] font-semibold text-accent">
                        {t("labels.save")}{" "}
                        {(
                          productinfo.price - productinfo.priceAfterDiscount
                        ).toLocaleString()}{" "}
                        EGP
                      </span>
                    </>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {productinfo.quantity > 0 ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-[10px] font-semibold text-success">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      {t("labels.inStock")}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-danger/10 px-3 py-1.5 text-[10px] font-semibold text-danger">
                      <span className="h-1.5 w-1.5 rounded-full bg-danger" />
                      {t("labels.outOfStock")}
                    </span>
                  )}

                  <span className="text-[10px] text-muted">
                    {productinfo.sold || 0} {t("labels.sold")}
                  </span>
                </div>

                <div className="mt-6 border-t border-border-light pt-6">
                  <p className="text-xs leading-6 text-muted sm:text-[13px]">
                    {productinfo.description}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {t("labels.quantity")}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="inline-flex h-11 items-center overflow-hidden rounded-xl border border-border bg-background">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="flex h-full w-11 items-center justify-center text-primary transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <IconMinus size={15} />
                      </button>
                      <span className="flex h-full w-12 items-center justify-center border-x border-border text-sm font-semibold text-primary">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={increaseQuantity}
                        disabled={quantity >= productinfo.quantity}
                        className="flex h-full w-11 items-center justify-center text-primary transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <IconPlus size={15} />
                      </button>
                    </div>

                    <div className="text-end">
                      <p className="text-[9px] uppercase tracking-[0.12em] text-muted">
                        {t("labels.total")}
                      </p>
                      <p className="mt-1 text-base font-semibold text-primary sm:text-lg">
                        {totalPrice.toLocaleString()} EGP
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
                  <button
                    type="button"
                    disabled={productinfo.quantity <= 0}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-xs font-semibold text-background shadow-[0_8px_20px_rgba(25,55,44,0.15)] transition-all duration-200 hover:bg-primary-light active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <IconShoppingBag size={17} stroke={1.8} />
                    {t("actions.addToCart")}
                  </button>

                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border px-5 text-xs font-semibold text-primary transition-all duration-200 hover:border-accent hover:text-accent sm:w-auto"
                  >
                    <IconHeart size={17} stroke={1.8} />
                    {t("actions.wishlist")}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="mt-3 flex items-center gap-2 text-[10px] font-medium text-muted transition-colors hover:text-primary"
                >
                  <IconShare3 size={14} stroke={1.7} />
                  {t("actions.share")}
                </button>

                <div className="mt-7 grid grid-cols-1 gap-4 border-t border-border-light pt-6 sm:grid-cols-3">
                  <MiniBenefit
                    icon={<IconTruckDelivery size={17} />}
                    title={t("benefits.fastDelivery.title")}
                    description={t("benefits.fastDelivery.description")}
                  />
                  <MiniBenefit
                    icon={<IconRotateClockwise size={17} />}
                    title={t("benefits.easyReturns.title")}
                    description={t("benefits.easyReturns.description")}
                  />
                  <MiniBenefit
                    icon={<IconShieldCheck size={17} />}
                    title={t("benefits.securePayment.title")}
                    description={t("benefits.securePayment.description")}
                  />
                </div>
              </div>
            </div>
          </div>

          <section className="mt-6 w-full overflow-hidden rounded-3xl border border-border-light bg-surface shadow-[0_8px_30px_rgba(25,55,44,0.04)]">
            <div className="flex overflow-x-auto border-b border-border-light">
              <TabButton
                active={activeTab === "details"}
                onClick={() => setActiveTab("details")}
              >
                {t("tabs.details")}
              </TabButton>
              <TabButton
                active={activeTab === "reviews"}
                onClick={() => setActiveTab("reviews")}
              >
                {t("tabs.reviews")} ({ratingCount})
              </TabButton>
              <TabButton
                active={activeTab === "shipping"}
                onClick={() => setActiveTab("shipping")}
              >
                {t("tabs.shipping")}
              </TabButton>
            </div>

            <div className="p-4 sm:p-8 lg:p-10">
              {activeTab === "details" && (
                <ProductDetailsTab product={productinfo} />
              )}
              {activeTab === "reviews" && (
                <ReviewsTab
                  rating={rating}
                  reviews={reviews}
                  ratingDistribution={ratingDistribution}
                />
              )}
              {activeTab === "shipping" && <ShippingTab />}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function ProductDetailsTab({ product }: { product: ProductDetails }) {
  const t = useTranslations("product");
  const descriptionLines = product.description
    ?.split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <div>
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">
          {t("details.eyebrow")}
        </p>
        <h2 className="font-serif text-xl font-semibold tracking-[-0.03em] text-primary sm:text-2xl">
          {t("details.title")}
        </h2>

        <div className="mt-5 space-y-3">
          {descriptionLines?.map((line, index) => (
            <div
              key={`${line}-${index}`}
              className="flex items-start gap-3 text-xs leading-6 text-muted"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="break-words">{line}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-border-light bg-background p-5">
        <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-accent">
          {t("details.eyebrow")}
        </p>

        <div className="divide-y divide-border-light">
          <DetailRow label={t("details.brand")} value={product.brand?.name || "—"} />
          <DetailRow label={t("details.category")} value={product.category?.name || "—"} />
          <DetailRow
            label={t("details.subcategory")}
            value={product.subcategory?.[0]?.name || "—"}
          />
          <DetailRow label={t("details.available")} value={`${product.quantity} ${t("labels.pieces")}`} />
          <DetailRow label={t("details.sold")} value={`${product.sold || 0} ${t("labels.pieces")}`} />
        </div>
      </div>
    </div>
  );
}

function ReviewsTab({
  rating,
  reviews,
  ratingDistribution,
}: {
  rating: number;
  reviews: ProductDetails["reviews"];
  ratingDistribution: { star: number; count: number; percentage: number }[];
}) {
  const t = useTranslations("product");

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-background px-6 py-7 text-center">
          <span className="font-serif text-5xl font-semibold text-primary">
            {rating.toFixed(1)}
          </span>
          <div className="mt-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <IconStarFilled
                key={star}
                size={14}
                className={
                  star <= Math.round(rating) ? "text-accent" : "text-border"
                }
              />
            ))}
          </div>
          <p className="mt-2 text-[10px] text-muted">
            {t("reviews.basedOn", { count: reviews?.length || 0 })}
          </p>
        </div>
        <div className="flex flex-col justify-center gap-3">
          {ratingDistribution.map((item) => (
            <div key={item.star} className="flex items-center gap-3">
              <span className="w-8 text-[10px] text-muted">{item.star}</span>
              <IconStarFilled size={11} className="shrink-0 text-accent" />
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-muted">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="w-8 text-end text-[10px] text-muted">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-border-light pt-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-accent">
              {t("reviews.eyebrow")}
            </p>
            <h3 className="mt-1 font-serif text-xl font-semibold text-primary">
              {t("reviews.title")}
            </h3>
          </div>
        </div>
        <div className="divide-y divide-border-light">
          {reviews?.length ? (
            reviews.map((review) => (
              <article key={review._id} className="py-6 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-primary">
                      {review.user?.name || t("reviews.customer")}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <IconStarFilled
                          key={star}
                          size={11}
                          className={
                            star <= review.rating
                              ? "text-accent"
                              : "text-border"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] text-subtle">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-3 max-w-3xl text-xs leading-6 text-muted break-words">
                  {review.review}
                </p>
              </article>
            ))
          ) : (
            <p className="py-5 text-xs text-muted">{t("reviews.empty")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ShippingTab() {
  const t = useTranslations("product");

  return (
    <div>
      <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">
        {t("shipping.eyebrow")}
      </p>
      <h2 className="font-serif text-2xl font-semibold tracking-[-0.03em] text-primary">
        {t("shipping.title")}
      </h2>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <ShippingCard
          icon={<IconTruckDelivery size={20} stroke={1.7} />}
          title={t("shipping.shipping.title")}
          items={t.raw("shipping.shipping.items")}
        />
        <ShippingCard
          icon={<IconRotateClockwise size={20} stroke={1.7} />}
          title={t("shipping.returns.title")}
          items={t.raw("shipping.returns.items")}
        />
        <ShippingCard
          icon={<IconShieldCheck size={20} stroke={1.7} />}
          title={t("shipping.secureCheckout.title")}
          items={t.raw("shipping.secureCheckout.items")}
        />
        <ShippingCard
          icon={<IconShare3 size={20} stroke={1.7} />}
          title={t("shipping.help.title")}
          items={t.raw("shipping.help.items")}
        />
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative shrink-0 px-5 py-4 text-[10px] font-semibold transition-colors sm:px-7 sm:text-[11px] ${
        active ? "text-primary" : "text-muted hover:text-primary"
      }`}
    >
      {children}
      {active && (
        <span className="absolute inset-x-5 bottom-0 h-0.5 rounded-full bg-accent sm:inset-x-7" />
      )}
    </button>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-[10px] text-muted">{label}</span>
      <span className="text-end text-[10px] font-semibold text-primary">
        {value}
      </span>
    </div>
  );
}

function MiniBenefit({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-semibold text-primary">{title}</p>
        <p className="mt-0.5 text-[8px] text-muted">{description}</p>
      </div>
    </div>
  );
}

function ShippingCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-border-light bg-background p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-primary">{title}</h3>
      </div>

      <ul className="mt-5 space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-[10px] leading-5 text-muted"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span className="break-words">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}