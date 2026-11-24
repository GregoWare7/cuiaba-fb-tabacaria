import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src={logo.url} alt="FB Tabacaria" className="h-11 w-11 shrink-0 rounded-full shadow-glow" />
          <span className="truncate font-display text-2xl tracking-wide text-glow">FB Tabacaria</span>
        </Link>
        <Link to="/checkout" className="relative rounded-full border border-border p-2.5 hover:shadow-glow" aria-label="Carrinho">
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-xs text-primary-foreground">{count}</span>}
        </Link>
      </div>
    </header>
  );
}
