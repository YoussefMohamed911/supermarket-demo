"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addToCart: (productId: string, qty?: number) => void;
  setQuantity: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getQuantity: (productId: string) => number;
  totalCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "mb_cart_v1";

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart());

  // Persist on every change (skips the noise of a dedicated init effect —
  // reading happens once via the lazy useState initializer above).
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage may be unavailable (e.g. private mode) — cart still
      // works for the session, it just won't survive a refresh.
    }
  }, [items]);

  const addToCart = useCallback((productId: string, qty: number = 1) => {
    setItems((current) => {
      const existing = current.find((i) => i.productId === productId);
      if (existing) {
        return current.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...current, { productId, quantity: qty }];
    });
  }, []);

  const setQuantity = useCallback((productId: string, qty: number) => {
    setItems((current) => {
      if (qty <= 0) return current.filter((i) => i.productId !== productId);
      const existing = current.find((i) => i.productId === productId);
      if (existing) {
        return current.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i));
      }
      return [...current, { productId, quantity: qty }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((current) => current.filter((i) => i.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getQuantity = useCallback(
    (productId: string) => items.find((i) => i.productId === productId)?.quantity ?? 0,
    [items]
  );

  const totalCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value = useMemo(
    () => ({ items, addToCart, setQuantity, removeFromCart, clearCart, getQuantity, totalCount }),
    [items, addToCart, setQuantity, removeFromCart, clearCart, getQuantity, totalCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
