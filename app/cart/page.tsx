"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductImage } from "@/components/product-image";
import { useCart } from "@/lib/cart-context";
import { useAllProducts } from "@/lib/use-products";
import { formatEGP } from "@/lib/utils";

export default function CartPage() {
  const { items, setQuantity, removeFromCart } = useCart();
  const allProducts = useAllProducts();

  type CartLine = { quantity: number; product: (typeof allProducts)[number] };

  const lines: CartLine[] = [];
  for (const item of items) {
    const product = allProducts.find((p) => p.id === item.productId);
    if (product) lines.push({ quantity: item.quantity, product });
  }

  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  if (lines.length === 0) {
    return (
      <>
        <SiteHeader />

        <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShoppingCart className="h-8 w-8" />
          </span>
          <h1 className="mt-4 text-xl font-extrabold text-ink">السلة فاضية دلوقتي</h1>
          <p className="mt-2 text-sm text-ink-muted">
            ضيف منتجات من المتجر وهتلاقيها هنا.
          </p>
          <Link
            href="/"
            className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-extrabold text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            رجوع للتسوق
          </Link>
        </main>

        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-extrabold text-ink">سلتي ({lines.length})</h1>

        <div className="flex flex-col gap-3">
          {lines.map(({ quantity, product }) => (
            <div
              key={product.id}
              className="flex items-center gap-3 rounded-xl border border-ink/10 bg-surface p-3"
            >
              <Link
                href={`/product/${product.id}`}
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-muted text-3xl"
              >
                <ProductImage
                  product={product}
                  className="object-cover"
                  emojiClassName="flex h-full w-full items-center justify-center"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/product/${product.id}`}
                  className="line-clamp-1 text-sm font-bold text-ink hover:text-primary"
                >
                  {product.name}
                </Link>
                <span className="text-xs text-ink-muted">{product.unit}</span>
                <div className="mt-1 text-sm font-extrabold text-primary">
                  {formatEGP(product.price * quantity)}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3 rounded-full border border-ink/15 px-2 py-1.5">
                <button
                  type="button"
                  aria-label="تقليل الكمية"
                  onClick={() => setQuantity(product.id, quantity - 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-muted"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-5 text-center text-sm font-extrabold text-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="زيادة الكمية"
                  onClick={() => setQuantity(product.id, quantity + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-muted"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                aria-label="حذف المنتج من السلة"
                onClick={() => removeFromCart(product.id)}
                className="shrink-0 text-ink-muted transition-colors hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 rounded-xl border border-ink/10 bg-surface p-5">
          <div className="flex items-center justify-between text-sm text-ink-muted">
            <span>الإجمالي</span>
            <span className="text-lg font-extrabold text-primary">{formatEGP(total)}</span>
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-extrabold text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            استكمال الطلب
          </button>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
