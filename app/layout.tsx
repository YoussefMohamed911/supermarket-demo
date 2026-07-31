import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { CartProvider } from "@/lib/cart-context";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Moamen & Bashar | سوبر ماركت أونلاين",
  description: "Moamen & Bashar سوبر ماركت — منتجات طازة توصلك لباب البيت في دقايق.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="pb-16 font-cairo antialiased md:pb-0">
        <CartProvider>
          {children}
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
