import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

type Line = { product: Product; qty: number };
type Ctx = { lines: Line[]; add: (id: string) => void; setQty: (id: string, q: number) => void; clear: () => void; subtotal: number; count: number };
const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem("fb-cart") || "{}")); } catch { /* vazio */ } }, []);
  const save = (n: Record<string, number>) => { setItems(n); localStorage.setItem("fb-cart", JSON.stringify(n)); };
  const lines = Object.entries(items).flatMap(([id, qty]) => { const p = PRODUCTS.find((x) => x.id === id); return p && qty > 0 ? [{ product: p, qty }] : []; });
  const value: Ctx = {
    lines,
    add: (id) => save({ ...items, [id]: (items[id] ?? 0) + 1 }),
    setQty: (id, q) => { const n = { ...items }; if (q <= 0) delete n[id]; else n[id] = q; save(n); },
    clear: () => save({}),
    subtotal: lines.reduce((s, l) => s + l.product.price * l.qty, 0),
    count: lines.reduce((s, l) => s + l.qty, 0),
  };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
export function useCart() { const c = useContext(CartCtx); if (!c) throw new Error("CartProvider ausente"); return c; }
