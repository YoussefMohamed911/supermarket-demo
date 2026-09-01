"use client";
import { useEffect, useState } from "react";
import { products as staticProducts, findMainCategory, type Product } from "@/lib/mock-data";
import { getCustomProducts, subscribeToProductUpdates } from "@/lib/product-store";

export function useAllProducts(): Product[] {
  const [custom, setCustom] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;
    const refresh = () => {
      getCustomProducts().then((products) => {
        if (active) setCustom(products);
      });
    };
    refresh();
    const unsubscribe = subscribeToProductUpdates(refresh);
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return [...staticProducts, ...custom];
}

export function useProductById(id: string): Product | undefined {
  return useAllProducts().find((p) => p.id === id);
}

export function useProductsBySubcategory(slug: string): Product[] {
  return useAllProducts().filter((p) => p.categorySlug === slug);
}

export function useProductsByMainCategory(mainSlug: string): Product[] {
  const all = useAllProducts();
  const main = findMainCategory(mainSlug);
  if (!main) return [];
  const subSlugs = new Set(main.subcategories.map((s) => s.slug));
  return all.filter((p) => subSlugs.has(p.categorySlug));
}
