"use client";

import Link from "next/link";
import { Minus, Plus, Star } from "lucide-react";
import { formatEGP, getMockRating, discountPercent } from "@/lib/utils";
import { getMainCategoryForSlug } from "@/lib/mock-data";
import { ProductImage } from "@/components/product-image";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/mock-data";

export function ProductCard({ product }: { product: Product }) {
  const { getQuantity, addToCart, setQuantity } = useCart();
  const qty = getQuantity(product.id);
  const { rating, reviews } = getMockRating(product.id);
  const pct = discountPercent(product.price, product.compareAtPrice);
  const category = getMainCategoryForSlug(product.categorySlug);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-ink/10 bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
      <Link href={`/product/${product.id}`} className="flex flex-1 flex-col">
        {/* Image area with soft colored backdrop */}
        <div
          className="relative flex aspect-square items-center justify-center overflow-hidden text-6xl"
          style={{ backgroundColor: `${category?.color ?? "#2C5389"}12` }}
        >
          <ProductImage
            product={product}
            className="object-cover transition-transform duration-200 group-hover:scale-110"
            emojiClassName="transition-transform duration-200 group-hover:scale-110"
          />

          <div className="absolute top-2.5 start-2.5 flex flex-col gap-1">
            {pct && (
              <span className="rounded-md bg-accent px-1.5 py-0.5 text-[11px] font-extrabold text-accent-foreground shadow-sm">
                خصم {pct}%
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-tight text-ink">
            {product.name}
          </h3>
          <span className="text-xs text-ink-muted">{product.unit}</span>

          <div className="flex items-center gap-1 text-xs text-ink-muted">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="font-bold text-ink">{rating}</span>
            <span>({reviews})</span>
          </div>

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-base font-extrabold text-primary">
              {formatEGP(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-ink-muted line-through">
                {formatEGP(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Inline add-to-cart: button becomes a stepper once tapped */}
      <div className="px-4 pb-4">
        {qty === 0 ? (
          <button
            type="button"
            onClick={() => addToCart(product.id, 1)}
            className="w-full rounded-full border-2 border-primary py-2 text-sm font-extrabold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            أضف للسلة
          </button>
        ) : (
          <div className="flex items-center justify-between rounded-full bg-primary px-1 py-1">
            <button
              type="button"
              aria-label="تقليل الكمية"
              onClick={() => setQuantity(product.id, qty - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-extrabold text-primary-foreground">{qty}</span>
            <button
              type="button"
              aria-label="زيادة الكمية"
              onClick={() => setQuantity(product.id, qty + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
