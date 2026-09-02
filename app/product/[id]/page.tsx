"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Check, ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { formatEGP, getMockRating, discountPercent } from "@/lib/utils";
import { findSubcategory } from "@/lib/mock-data";
import { useProductById } from "@/lib/use-products";
import { useCart } from "@/lib/cart-context";
import { ProductImage } from "@/components/product-image";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const { product, loading } = useProductById(params.id);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    if (loading) {
      return (
        <>
          <SiteHeader />
          <main className="mx-auto max-w-4xl px-4 py-16 text-center text-ink-muted">
            جاري تحميل المنتج...
          </main>
          <SiteFooter />
        </>
      );
    }
    notFound();
  }

  function handleAddToCart() {
    addToCart(product!.id, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  const categoryMatch = findSubcategory(product.categorySlug);
  const main = categoryMatch?.main;
  const sub = categoryMatch?.sub;
  const { rating, reviews } = getMockRating(product.id);
  const pct = discountPercent(product.price, product.compareAtPrice);

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1 text-xs text-ink-muted">
          <Link href="/" className="hover:text-primary">الرئيسية</Link>
          <span className="mx-1">/</span>
          {main && (
            <>
              <Link href={`/category/${main.slug}`} className="hover:text-primary">
                {main.name}
              </Link>
              <span className="mx-1">/</span>
            </>
          )}
          {sub && (
            <>
              <Link href={`/category/${sub.slug}`} className="hover:text-primary">
                {sub.name}
              </Link>
              <span className="mx-1">/</span>
            </>
          )}
          <span className="font-bold text-ink">{product.name}</span>
        </nav>

        {/* Back button */}
        <Link
          href={sub ? `/category/${sub.slug}` : main ? `/category/${main.slug}` : "/"}
          className="mb-6 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          رجوع للقسم
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Image */}
          <div
            className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg text-[10rem]"
            style={{ backgroundColor: `${main?.color ?? "#2C5389"}12` }}
          >
            <ProductImage product={product} className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            {pct && (
              <span className="absolute top-4 start-4 rounded-md bg-accent px-2 py-1 text-sm font-extrabold text-accent-foreground shadow-sm">
                خصم {pct}%
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold text-ink md:text-3xl">{product.name}</h1>
            <span className="mt-1 text-sm text-ink-muted">{product.unit}</span>

            <div className="mt-2 flex items-center gap-1.5 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-bold text-ink">{rating}</span>
              <span className="text-ink-muted">({reviews} تقييم)</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {product.description}
            </p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-primary">
                {formatEGP(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-ink-muted line-through">
                  {formatEGP(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Quantity counter */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm font-bold text-ink">الكمية</span>
              <div className="flex items-center gap-4 rounded-full border border-ink/15 px-2 py-1.5">
                <button
                  type="button"
                  aria-label="تقليل الكمية"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-muted disabled:opacity-30"
                  disabled={qty <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center text-sm font-extrabold text-ink">{qty}</span>
                <button
                  type="button"
                  aria-label="زيادة الكمية"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-muted"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-extrabold text-primary-foreground transition-all active:scale-[0.98] md:w-auto md:px-10 ${
                justAdded ? "bg-primary-dark" : "bg-primary hover:bg-primary-dark"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="h-5 w-5" />
                  اتضاف للسلة
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  أضف للسلة — {formatEGP(product.price * qty)}
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
