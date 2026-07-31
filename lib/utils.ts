import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEGP(amount: number) {
  return new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Deterministic mock rating (3.8–5.0) + review count, derived from product id
 *  so the same product always shows the same rating without storing it. */
export function getMockRating(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  const rating = 3.8 + (hash % 13) / 10; // 3.8 .. 5.0
  const reviews = 12 + (hash % 240); // 12 .. 251
  return { rating: Math.round(rating * 10) / 10, reviews };
}

export function discountPercent(price: number, compareAtPrice?: number) {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
