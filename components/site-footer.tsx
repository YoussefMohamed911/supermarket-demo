import Link from "next/link";
import { categories } from "@/lib/mock-data";
import { MapPin, Phone, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-ink/10 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-extrabold text-primary">Moamen &amp; Bashar</h3>
          <p className="mt-2 text-sm text-ink-muted">
            سوبر ماركت أونلاين — منتجات طازة توصلك لباب البيت.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-ink-muted">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> القاهرة، مصر
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> 19XXX
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> support@moamenbashar.com
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-extrabold text-ink">الأقسام</h4>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-muted">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.slug}`} className="hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-extrabold text-ink">خدمة العملاء</h4>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-muted">
            <li><Link href="#" className="hover:text-primary">الأسئلة الشائعة</Link></li>
            <li><Link href="#" className="hover:text-primary">سياسة الاسترجاع</Link></li>
            <li><Link href="#" className="hover:text-primary">تتبع الأوردر</Link></li>
            <li><Link href="#" className="hover:text-primary">تواصل معانا</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-extrabold text-ink">طرق الدفع</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {["كاش", "فيزا", "ماستركارد", "محفظة إلكترونية"].map((m) => (
              <span
                key={m}
                className="rounded-md border border-ink/10 bg-surface-muted px-2.5 py-1 text-[11px] font-bold text-ink-muted"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 border-t border-ink/5 py-4 text-center text-xs text-ink-muted">
        <span>© {new Date().getFullYear()} Moamen &amp; Bashar Supermarket. كل الحقوق محفوظة.</span>
        <Link href="/admin/products" className="text-primary hover:underline">
          لوحة إدارة المنتجات
        </Link>
      </div>
    </footer>
  );
}
