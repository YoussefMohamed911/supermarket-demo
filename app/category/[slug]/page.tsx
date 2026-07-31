"use client";

import { useMemo, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { findMainCategory, findSubcategory } from "@/lib/mock-data";
import { useProductsByMainCategory } from "@/lib/use-products";

type SortKey = "default" | "price-asc" | "price-desc" | "name";

const ALL_TAB = "all";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [sort, setSort] = useState<SortKey>("default");

  const mainDirect = findMainCategory(params.slug);
  const subMatch = findSubcategory(params.slug);
  const main = mainDirect ?? subMatch?.main;

  if (!main) notFound();

  // The active tab is derived straight from the URL: visiting the main
  // category slug shows "All", visiting a subcategory slug pre-selects it.
  const activeTab = mainDirect ? ALL_TAB : subMatch!.sub.slug;

  const productsInMain = useProductsByMainCategory(main.slug);

  const products = useMemo(() => {
    const list =
      activeTab === ALL_TAB
        ? [...productsInMain]
        : productsInMain.filter((p) => p.categorySlug === activeTab);

    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name, "ar"));
      default:
        return list;
    }
  }, [productsInMain, activeTab, sort]);

  function goToTab(tabSlug: string) {
    router.push(`/category/${tabSlug === ALL_TAB ? main!.slug : tabSlug}`);
  }

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-2 text-xs text-ink-muted">
          <span>الرئيسية</span> <span className="mx-1">/</span>{" "}
          <span
            className={activeTab === ALL_TAB ? "font-bold text-ink" : "hover:text-primary"}
            onClick={() => activeTab !== ALL_TAB && goToTab(ALL_TAB)}
            role={activeTab !== ALL_TAB ? "button" : undefined}
          >
            {main.name}
          </span>
          {activeTab !== ALL_TAB && (
            <>
              {" "}<span className="mx-1">/</span>{" "}
              <span className="font-bold text-ink">{subMatch!.sub.name}</span>
            </>
          )}
        </nav>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-ink">
              {activeTab === ALL_TAB ? main.name : subMatch!.sub.name}
            </h1>
            <span className="text-xs text-ink-muted">{products.length} منتج</span>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <span className="text-ink-muted">ترتيب حسب</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-md border border-ink/15 bg-surface px-3 py-1.5 text-sm font-bold text-ink outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="default">الأنسب</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
              <option value="name">الاسم أبجديًا</option>
            </select>
          </label>
        </div>

        {/* Subcategory tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <button
            type="button"
            onClick={() => goToTab(ALL_TAB)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
              activeTab === ALL_TAB
                ? "bg-primary text-primary-foreground"
                : "bg-surface-muted text-ink-muted hover:bg-ink/10"
            }`}
          >
            الكل
          </button>
          {main.subcategories.map((sub) => (
            <button
              key={sub.slug}
              type="button"
              onClick={() => goToTab(sub.slug)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
                activeTab === sub.slug
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-muted text-ink-muted hover:bg-ink/10"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {products.length === 0 ? (
          <p className="rounded-lg border border-dashed border-ink/15 bg-surface-muted p-8 text-center text-sm text-ink-muted">
            لسه مفيش منتجات في القسم ده.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
