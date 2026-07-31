"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { useAllProducts } from "@/lib/use-products";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") ?? "").trim();

  const allProducts = useAllProducts();
  const results = q ? allProducts.filter((p) => p.name.includes(q)) : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-1 text-2xl font-extrabold text-ink">
        نتائج البحث عن "{q}"
      </h1>
      <span className="text-xs text-ink-muted">{results.length} منتج</span>

      <div className="mt-6">
        {results.length === 0 ? (
          <p className="rounded-lg border border-dashed border-ink/15 bg-surface-muted p-8 text-center text-sm text-ink-muted">
            مفيش منتجات مطابقة.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={null}>
        <SearchResults />
      </Suspense>
      <SiteFooter />
    </>
  );
}
