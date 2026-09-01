"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroCarousel } from "@/components/hero-carousel";
import { TrustBar } from "@/components/trust-bar";
import { CategoryCard } from "@/components/category-card";
import { ProductCard } from "@/components/product-card";
import { categories } from "@/lib/mock-data";
import { useAllProducts } from "@/lib/use-products";

export default function HomePage() {
  const allProducts = useAllProducts();
  const offers = allProducts.filter((p) => p.hasOffer);
  // Deterministic "best sellers" stand-in: every 4th product, 10 items.
const bestSellers = allProducts.filter((p) => p.isBestSeller);
  return (
    <>
      <SiteHeader />

      <main>
        <HeroCarousel />
        <TrustBar />

        {/* Categories */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <h2 className="mb-4 text-lg font-extrabold text-ink">تسوق حسب القسم</h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-8">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Offers rail */}
        {offers.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 py-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-ink">عروض النهاردة</h2>
              <span className="text-xs font-bold text-primary">شوف كل العروض ←</span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {offers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Best sellers / empty state */}
        {allProducts.length > 0 ? (
          <section className="bg-surface-alt">
            <div className="mx-auto max-w-6xl px-4 py-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-ink">الأكثر مبيعًا</h2>
                <span className="text-xs font-bold text-primary">شوف الكل ←</span>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {bestSellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-6xl px-4 py-16 text-center">
            <p className="text-sm font-bold text-ink-muted">
              لسه مفيش منتجات مضافة على المتجر.
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              أضف منتجاتك الأول من{" "}
              <a href="/admin/products" className="font-bold text-primary hover:underline">
                لوحة إدارة المنتجات
              </a>
              .
            </p>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
