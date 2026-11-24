import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

type Line = { key: string; product: Product; flavor: string; qty: number };
type Ctx = { lines: Line[]; add: (id: string, flavor: string) => void; setQty: (key: string, q: number) => void; clear: () => void; subtotal: number; count: number };
const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem("fb-cart-v2") || "{}")); } catch { /* vazio */ } }, []);
  const save = (n: Record<string, number>) => { setItems(n); localStorage.setItem("fb-cart-v2", JSON.stringify(n)); };
  const lines = Object.entries(items).flatMap(([key, qty]) => {
    const [id, flavor = ""] = key.split("|");
    const p = PRODUCTS.find((x) => x.id === id);
    return p && qty > 0 ? [{ key, product: p, flavor, qty }] : [];
  });
  const value: Ctx = {
    lines,
    add: (id, flavor) => { const k = `${id}|${flavor}`; save({ ...items, [k]: (items[k] ?? 0) + 1 }); },
    setQty: (key, q) => { const n = { ...items }; if (q <= 0) delete n[key]; else n[key] = q; save(n); },
    clear: () => save({}),
    subtotal: lines.reduce((s, l) => s + l.product.price * l.qty, 0),
    count: lines.reduce((s, l) => s + l.qty, 0),
  };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
export function useCart() { const c = useContext(CartCtx); if (!c) throw new Error("CartProvider ausente"); return c; }
