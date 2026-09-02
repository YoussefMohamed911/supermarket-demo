"use client";
import { useEffect, useState } from "react";
import { products as staticProducts, findMainCategory, type Product } from "@/lib/mock-data";
import { getCustomProducts, subscribeToProductUpdates } from "@/lib/product-store";

function useAllProductsState(): { products: Product[]; loading: boolean } {
  const [custom, setCustom] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const refresh = () => {
      getCustomProducts().then((products) => {
        if (active) {
          setCustom(products);
          setLoading(false);
        }
      });
    };
    refresh();
    const unsubscribe = subscribeToProductUpdates(refresh);
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return { products: [...staticProducts, ...custom], loading };
}

export function useAllProducts(): Product[] {
  return useAllProductsState().products;
}

export function useProductById(id: string): { product: Product | undefined; loading: boolean } {
  const { products, loading } = useAllProductsState();
  return { product: products.find((p) => p.id === id), loading };
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
