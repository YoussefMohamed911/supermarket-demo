"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Plus, ImagePlus, X } from "lucide-react";
import { categories, findSubcategory } from "@/lib/mock-data";
import { useAllProducts } from "@/lib/use-products";
import {
  addCustomProduct,
  clearAllCustomProducts,
  deleteCustomProduct,
  getCustomProducts,
  newProductId,
} from "@/lib/product-store";
import { formatEGP } from "@/lib/utils";

const emptyForm = {
  name: "",
  categorySlug: categories[0].subcategories[0].slug,
  price: "",
  compareAtPrice: "",
  unit: "",
  description: "",
  image: "",
  isBestSeller: false,
};

export default function AdminProductsPage() {
  const allProducts = useAllProducts();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [customIds, setCustomIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    getCustomProducts().then((products) => {
      setCustomIds(new Set(products.map((p) => p.id)));
    });
  }, [allProducts]);

  function handleChange(field: keyof typeof form, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    setImageError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("الملف ده مش صورة، اختار صورة تانية.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setImageError("الصورة كبيرة أوي (أكبر من 4 ميجا). اختار صورة أصغر.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, image: reader.result as string }));
    };
    reader.onerror = () => {
      setImageError("حصلت مشكلة في تحميل الصورة، حاول تاني.");
    };
    reader.readAsDataURL(file);
  }

  function clearImage() {
    setForm((f) => ({ ...f, image: "" }));
    setImageError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.price || !form.unit.trim()) {
      setError("لازم تملى الاسم والسعر والوحدة على الأقل.");
      return;
    }

    const price = Number(form.price);
    const compareAtPrice = form.compareAtPrice ? Number(form.compareAtPrice) : undefined;

    if (Number.isNaN(price) || price < 0) {
      setError("السعر لازم يكون رقم صحيح.");
      return;
    }

    setSubmitting(true);
    try {
      await addCustomProduct({
        id: newProductId(),
        name: form.name.trim(),
        categorySlug: form.categorySlug,
        price,
        compareAtPrice,
        unit: form.unit.trim(),
        description: form.description.trim() || "منتج من Moamen & Bashar.",
        image: form.image || undefined,
        emoji: "🛒",
        isBestSeller: form.isBestSeller,
      });
      setForm(emptyForm);
    } catch {
      setError("حصلت مشكلة في حفظ المنتج، حاول تاني.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">إدارة المنتجات</h1>
          <p className="mt-1 text-sm text-ink-muted">
            ضيف منتجاتكم الحقيقية من هنا من غير ما تلمس أي كود.
          </p>
        </div>
        <Link href="/" className="text-sm font-bold text-primary hover:underline">
          رجوع للمتجر
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-10 grid gap-4 rounded-xl border border-ink/10 bg-surface p-5 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-bold text-ink">اسم المنتج *</label>
          <input
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full rounded-md border border-ink/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="مثال: جبنة تركي بيضاء"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold text-ink">القسم الفرعي</label>
          <select
            value={form.categorySlug}
            onChange={(e) => handleChange("categorySlug", e.target.value)}
            className="w-full rounded-md border border-ink/15 bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          >
            {categories.map((main) => (
              <optgroup key={main.slug} label={main.name}>
                {main.subcategories.map((sub) => (
                  <option key={sub.slug} value={sub.slug}>{sub.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold text-ink">الوحدة *</label>
          <input
            value={form.unit}
            onChange={(e) => handleChange("unit", e.target.value)}
            className="w-full rounded-md border border-ink/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="مثال: الكيلو / العلبة / القطعة"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold text-ink">السعر (جنيه) *</label>
          <input
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className="w-full rounded-md border border-ink/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="45"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold text-ink">السعر قبل الخصم (اختياري)</label>
          <input
            type="number"
            step="0.01"
            value={form.compareAtPrice}
            onChange={(e) => handleChange("compareAtPrice", e.target.value)}
            className="w-full rounded-md border border-ink/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="55"
          />
        </div>

        <div className="sm:col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="isBestSeller"
            checked={form.isBestSeller}
            onChange={(e) => handleChange("isBestSeller", e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="isBestSeller" className="text-sm font-bold text-ink">
            منتج مميز (يظهر في قسم "الأكثر مبيعًا")
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-bold text-ink">صورة المنتج (اختياري)</label>

          {form.image ? (
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-ink/10 bg-surface-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.image} alt="معاينة المنتج" className="h-full w-full object-cover" />
              </div>
              <button
                type="button"
                onClick={clearImage}
                className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-bold text-ink-muted transition-colors hover:border-red-300 hover:text-red-600"
              >
                <X className="h-3.5 w-3.5" />
                شيل الصورة
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 py-8 text-primary transition-colors hover:bg-primary/10">
              <ImagePlus className="h-8 w-8" />
              <span className="text-sm font-extrabold">اختر صورة من جهازك</span>
              <span className="text-[11px] font-normal text-ink-muted">اضغط هنا وهيفتح لك معرض الصور</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>
          )}

          {imageError && <p className="mt-2 text-xs font-bold text-red-600">{imageError}</p>}
          {!form.image && !imageError && (
            <p className="mt-1 text-[11px] text-ink-muted">
              لو مش هتختار صورة، هيظهر بدالها أيقونة مؤقتة للمنتج.
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-bold text-ink">وصف قصير</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={2}
            className="w-full rounded-md border border-ink/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="سطر واحد بيوصف المنتج"
          />
        </div>

        {error && <p className="sm:col-span-2 text-sm font-bold text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-extrabold text-primary-foreground transition-colors hover:bg-primary-dark disabled:opacity-60 sm:col-span-2"
        >
          <Plus className="h-4 w-4" />
          {submitting ? "بيتم الحفظ..." : "إضافة المنتج"}
        </button>
      </form>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-extrabold text-ink">
          كل المنتجات ({allProducts.length})
        </h2>
        {allProducts.length > 0 && (
          <button
            type="button"
            onClick={async () => {
              if (confirm("متأكد إنك عايز تمسح كل المنتجات المضافة يدويًا؟")) {
                await clearAllCustomProducts();
              }
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-ink-muted transition-colors hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
            امسح كل المنتجات
          </button>
        )}
      </div>
      <div className="overflow-hidden rounded-xl border border-ink/10">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted text-ink-muted">
            <tr>
              <th className="p-3"></th>
              <th className="p-3 text-start">الاسم</th>
              <th className="p-3 text-start">القسم</th>
              <th className="p-3 text-start">السعر</th>
              <th className="p-3 text-start">المصدر</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {allProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-sm text-ink-muted">
                  لسه مفيش منتجات مضافة. استخدم الفورم فوق عشان تضيف أول منتج.
                </td>
              </tr>
            )}
            {allProducts.map((p) => {
              const isCustom = customIds.has(p.id);
              const match = findSubcategory(p.categorySlug);
              return (
                <tr key={p.id} className="border-t border-ink/5">
                  <td className="p-3">
                    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-md bg-surface-muted text-lg">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span aria-hidden>{p.emoji}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 font-bold text-ink">{p.name}</td>
                  <td className="p-3 text-ink-muted">
                    {match ? `${match.main.name} / ${match.sub.name}` : p.categorySlug}
                  </td>
                  <td className="p-3 text-ink-muted">{formatEGP(p.price)}</td>
                  <td className="p-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        isCustom ? "bg-primary/10 text-primary" : "bg-ink/5 text-ink-muted"
                      }`}
                    >
                      {isCustom ? "مضاف يدويًا" : "بيانات أولية"}
                    </span>
                  </td>
                  <td className="p-3 text-end">
                    {isCustom && (
                      <button
                        type="button"
                        aria-label="حذف المنتج"
                        onClick={() => deleteCustomProduct(p.id)}
                        className="text-ink-muted transition-colors hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-ink-muted">
        المنتجات وصورها دلوقتي متخزنة في قاعدة بيانات حقيقية (Supabase) — متزامنة لكل زوار الموقع.
      </p>
    </main>
  );
}
