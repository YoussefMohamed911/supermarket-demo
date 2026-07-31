"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Search, ShoppingCart, ChevronDown, User as UserIcon } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAllProducts } from "@/lib/use-products";
import { useMockUser } from "@/lib/use-mock-user";
import { formatEGP } from "@/lib/utils";

const branches = ["فرع مدينة نصر", "فرع المعادي", "فرع الشيخ زايد"];

export function SiteHeader() {
  const { totalCount } = useCart();
  const allProducts = useAllProducts();
  const router = useRouter();
  const user = useMockUser();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim();
  const results = trimmed
    ? allProducts.filter((p) => p.name.includes(trimmed)).slice(0, 6)
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToSearch() {
    if (!trimmed) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-surface/95 backdrop-blur">
      {/* Top bar: branch selector */}
      <div className="hidden border-b border-ink/5 bg-surface-muted py-1.5 text-xs text-ink-muted md:block">
        <div className="mx-auto flex max-w-6xl items-center gap-1 px-4">
          <MapPin className="h-3.5 w-3.5" />
          <span>بتوصل لـ:</span>
          <button className="flex items-center gap-0.5 font-bold text-primary">
            {branches[0]}
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="shrink-0" aria-label="Moamen & Bashar — الرئيسية">
          <Image
            src="/logo.png"
            alt="Moamen & Bashar Supermarket"
            width={220}
            height={219}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <div ref={wrapperRef} className="relative flex-1">
          <button
            type="button"
            onClick={goToSearch}
            aria-label="بحث"
            className="absolute start-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-primary"
          >
            <Search className="h-4 w-4" />
          </button>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => trimmed && setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") goToSearch();
            }}
            placeholder="دور على منتج..."
            className="w-full rounded-full border border-ink/10 bg-surface-muted py-2 ps-9 pe-4 text-sm outline-none ring-primary/30 placeholder:text-ink-muted focus:ring-2"
          />

          {/* Live search dropdown */}
          {open && trimmed && (
            <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-ink/10 bg-surface shadow-lg">
              {results.length === 0 ? (
                <p className="p-4 text-center text-sm text-ink-muted">مفيش منتجات مطابقة</p>
              ) : (
                <>
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 border-b border-ink/5 px-4 py-2.5 last:border-b-0 hover:bg-surface-muted"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-surface-muted text-lg">
                        {product.emoji}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-bold text-ink">
                        {product.name}
                      </span>
                      <span className="shrink-0 text-sm font-extrabold text-primary">
                        {formatEGP(product.price)}
                      </span>
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={goToSearch}
                    className="w-full border-t border-ink/5 py-2.5 text-center text-xs font-bold text-primary hover:bg-surface-muted"
                  >
                    شوف كل النتائج
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <Link
          href={user ? "/profile" : "/login"}
          aria-label="حسابي"
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary-dark md:flex"
        >
          <UserIcon className="h-5 w-5" />
        </Link>

        <Link
          href="/cart"
          aria-label="السلة"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary-dark"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalCount > 0 && (
            <span className="absolute -top-1 -end-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
              {totalCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
