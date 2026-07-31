import Link from "next/link";
import * as Icons from "lucide-react";
import type { Category } from "@/lib/mock-data";

export function CategoryCard({ category }: { category: Category }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[category.icon] ?? Icons.ShoppingBasket;

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col items-center gap-2 rounded-lg border border-ink/10 bg-surface p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-105"
        style={{ backgroundColor: `${category.color}1A`, color: category.color }}
      >
        <Icon className="h-6 w-6" strokeWidth={2} />
      </span>
      <span className="text-xs font-bold text-ink">{category.name}</span>
    </Link>
  );
}
