"use client";

import Link from "next/link";
import { LogIn, LogOut, Package, Settings, ChevronLeft, User } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useMockUser } from "@/lib/use-mock-user";
import { mockLogout } from "@/lib/auth-store";

export default function ProfilePage() {
  const user = useMockUser();

  const links = [
    { href: null, label: "طلباتي", icon: Package },
    { href: "/admin/products", label: "لوحة إدارة المنتجات", icon: Settings },
  ];

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-extrabold text-ink">حسابي</h1>

        {/* Account status card */}
        {user ? (
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-ink/10 bg-surface p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="text-xs text-ink-muted">أهلاً بيك،</p>
              <p className="text-base font-extrabold text-ink">{user.name}</p>
            </div>
            <button
              type="button"
              onClick={() => mockLogout()}
              className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-bold text-ink-muted transition-colors hover:border-red-300 hover:text-red-600"
            >
              <LogOut className="h-3.5 w-3.5" />
              تسجيل خروج
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="mb-4 flex items-center gap-3 rounded-xl border border-ink/10 bg-surface p-5 transition-colors hover:bg-surface-muted"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <LogIn className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-extrabold text-ink">تسجيل الدخول</p>
              <p className="text-xs text-ink-muted">سجّل دخولك عشان تتابع طلباتك</p>
            </div>
            <ChevronLeft className="h-4 w-4 text-ink-muted" />
          </Link>
        )}

        <div className="overflow-hidden rounded-xl border border-ink/10 bg-surface">
          {links.map(({ href, label, icon: Icon }, i) => {
            const content = (
              <>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1 text-sm font-bold text-ink">{label}</span>
                {href ? (
                  <ChevronLeft className="h-4 w-4 text-ink-muted" />
                ) : (
                  <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-bold text-ink-muted">
                    قريبًا
                  </span>
                )}
              </>
            );

            const rowClass = `flex items-center gap-3 px-5 py-4 ${
              i > 0 ? "border-t border-ink/5" : ""
            }`;

            return href ? (
              <Link key={label} href={href} className={`${rowClass} transition-colors hover:bg-surface-muted`}>
                {content}
              </Link>
            ) : (
              <div key={label} className={`${rowClass} opacity-60`}>
                {content}
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-ink-muted">
          صفحة مبدئية — هنربطها بنظام تسجيل دخول وحسابات حقيقي قريبًا.
        </p>
      </main>

      <SiteFooter />
    </>
  );
}
