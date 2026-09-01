"use client";
import type { Product } from "@/lib/mock-data";
import { supabaseRest } from "@/lib/supabase";

const UPDATE_EVENT = "mb-products-updated";

type QuickProductRow = {
  id: string;
  name: string;
  category_slug: string;
  price: number;
  compare_at_price: number | null;
  unit: string;
  description: string | null;
  image: string | null;
  emoji: string | null;
  is_best_seller: boolean;
};

function rowToProduct(row: QuickProductRow): Product & { isBestSeller?: boolean } {
  return {
    id: row.id,
    name: row.name,
    categorySlug: row.category_slug,
    price: row.price,
    compareAtPrice: row.compare_at_price ?? undefined,
    unit: row.unit,
    description: row.description ?? "",
    image: row.image ?? undefined,
    emoji: row.emoji ?? "🛒",
    isBestSeller: row.is_best_seller,
  };
}

export async function getCustomProducts(): Promise<Product[]> {
  try {
    const rows = (await supabaseRest("quick_products?select=*&order=created_at.desc")) as QuickProductRow[];
    return rows.map(rowToProduct);
  } catch {
    return [];
  }
}

export async function addCustomProduct(product: Product & { isBestSeller?: boolean }) {
  await supabaseRest("quick_products", {
    method: "POST",
    body: JSON.stringify({
      id: product.id,
      name: product.name,
      category_slug: product.categorySlug,
      price: product.price,
      compare_at_price: product.compareAtPrice ?? null,
      unit: product.unit,
      description: product.description ?? null,
      image: product.image ?? null,
      emoji: product.emoji ?? "🛒",
      is_best_seller: product.isBestSeller ?? false,
    }),
  });
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export async function updateCustomProduct(id: string, updates: Partial<Product & { isBestSeller?: boolean }>) {
  const body: Record<string, unknown> = {};
  if (updates.name !== undefined) body.name = updates.name;
  if (updates.categorySlug !== undefined) body.category_slug = updates.categorySlug;
  if (updates.price !== undefined) body.price = updates.price;
  if (updates.compareAtPrice !== undefined) body.compare_at_price = updates.compareAtPrice;
  if (updates.unit !== undefined) body.unit = updates.unit;
  if (updates.description !== undefined) body.description = updates.description;
  if (updates.image !== undefined) body.image = updates.image;
  if (updates.isBestSeller !== undefined) body.is_best_seller = updates.isBestSeller;

  await supabaseRest(`quick_products?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export async function deleteCustomProduct(id: string) {
  await supabaseRest(`quick_products?id=eq.${id}`, { method: "DELETE" });
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export async function clearAllCustomProducts() {
  await supabaseRest(`quick_products?id=neq.__none__`, { method: "DELETE" });
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function subscribeToProductUpdates(callback: () => void) {
  window.addEventListener(UPDATE_EVENT, callback);
  return () => window.removeEventListener(UPDATE_EVENT, callback);
}

export function newProductId() {
  return `c_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}
