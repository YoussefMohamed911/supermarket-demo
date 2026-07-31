"use client";

import type { Product } from "@/lib/mock-data";

// v2: bumped so any product added under the old key (from before the fresh
// start / new category structure) is simply ignored, not migrated.
const STORAGE_KEY = "mb_custom_products_v2";
const OLD_STORAGE_KEYS = ["mb_custom_products"];
const UPDATE_EVENT = "mb-products-updated";

export function getCustomProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

function saveCustomProducts(products: Product[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function addCustomProduct(product: Product) {
  const current = getCustomProducts();
  saveCustomProducts([...current, product]);
}

export function updateCustomProduct(id: string, updates: Partial<Product>) {
  const current = getCustomProducts();
  saveCustomProducts(current.map((p) => (p.id === id ? { ...p, ...updates } : p)));
}

export function deleteCustomProduct(id: string) {
  const current = getCustomProducts();
  saveCustomProducts(current.filter((p) => p.id !== id));
}

/** Wipes every manually-added product from this browser (used for a full
 *  reset). Also clears any leftover data under older storage key names. */
export function clearAllCustomProducts() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  for (const key of OLD_STORAGE_KEYS) window.localStorage.removeItem(key);
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function subscribeToProductUpdates(callback: () => void) {
  window.addEventListener(UPDATE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(UPDATE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function newProductId() {
  return `c_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}
