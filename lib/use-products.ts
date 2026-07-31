"use client";

import { useEffect, useState } from "react";
import { products as staticProducts, findMainCategory, type Product } from "@/lib/mock-data";
import { getCustomProducts, subscribeToProductUpdates } from "@/lib/product-store";

export function useAllProducts(): Product[] {
  const [all, setAll] = useState<Product[]>(() => [
    ...staticProducts,
    ...getCustomProducts(),
  ]);

  useEffect(() => {
    const refresh = () => setAll([...staticProducts, ...getCustomProducts()]);
    return subscribeToProductUpdates(refresh);
  }, []);

  return all;
}

export function useProductById(id: string): Product | undefined {
  return useAllProducts().find((p) => p.id === id);
}

/** Products whose categorySlug matches this exact subcategory. */
export function useProductsBySubcategory(slug: string): Product[] {
  return useAllProducts().filter((p) => p.categorySlug === slug);
}

/** All products across every subcategory under a given main category. */
export function useProductsByMainCategory(mainSlug: string): Product[] {
  const all = useAllProducts();
  const main = findMainCategory(mainSlug);
  if (!main) return [];
  const subSlugs = new Set(main.subcategories.map((s) => s.slug));
  return all.filter((p) => subSlugs.has(p.categorySlug));
}
