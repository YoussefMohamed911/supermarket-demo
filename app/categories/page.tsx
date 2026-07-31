import Link from "next/link";
import * as Icons from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { categories } from "@/lib/mock-data";

export default function CategoriesPage() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-extrabold text-ink">كل الأقسام</h1>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((category) => {
            const Icon =
              (Icons as unknown as Record<string, Icons.LucideIcon>)[category.icon] ??
              Icons.ShoppingBasket;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-ink/10 bg-surface p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${category.color}14`, color: category.color }}
                >
                  <Icon className="h-8 w-8" strokeWidth={2} />
                </span>
                <span className="text-sm font-extrabold text-ink">{category.name}</span>
                <span className="text-xs text-ink-muted">
                  {category.subcategories.length} قسم فرعي
                </span>
              </Link>
            );
          })}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
