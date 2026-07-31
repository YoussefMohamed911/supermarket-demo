"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const tabs = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/categories", label: "الأقسام", icon: LayoutGrid },
  { href: "/profile", label: "حسابي", icon: User },
  { href: "/cart", label: "السلة", icon: ShoppingCart },
];

export function BottomNav() {
  const pathname = usePathname();
  const { totalCount } = useCart();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-surface shadow-[0_-2px_10px_rgba(0,0,0,0.06)] md:hidden">
      <div className="flex items-center justify-around">
        {tabs.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-bold transition-colors ${
                isActive ? "text-primary" : "text-ink-muted"
              }`}
            >
              <span className="relative">
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                {href === "/cart" && totalCount > 0 && (
                  <span className="absolute -top-1.5 -end-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-extrabold text-accent-foreground">
                    {totalCount}
                  </span>
                )}
              </span>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
