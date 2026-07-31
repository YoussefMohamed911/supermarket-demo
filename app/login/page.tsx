"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { mockLogin } from "@/lib/auth-store";

type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mockLogin();
    router.push("/profile");
  }

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-sm px-4 py-12">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            {mode === "login" ? <LogIn className="h-7 w-7" /> : <UserPlus className="h-7 w-7" />}
          </span>
          <h1 className="mt-3 text-xl font-extrabold text-ink">
            {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs font-bold text-ink">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-ink/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-ink">كلمة المرور</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border border-ink/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-primary py-3 text-sm font-extrabold text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            {mode === "login" ? "تسجيل الدخول" : "إنشاء الحساب"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-ink-muted">
          {mode === "login" ? (
            <>
              لسه معملتش حساب؟{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="font-bold text-primary hover:underline"
              >
                سجل دلوقتي
              </button>
            </>
          ) : (
            <>
              عندك حساب بالفعل؟{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-bold text-primary hover:underline"
              >
                تسجيل الدخول
              </button>
            </>
          )}
        </p>

        <p className="mt-6 text-center text-[11px] text-ink-muted">
          ده شكل مبدئي، هيتفعل تسجيل دخول حقيقي وآمن قريبًا.
        </p>
      </main>

      <SiteFooter />
    </>
  );
}
