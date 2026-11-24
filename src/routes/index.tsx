import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bike, Store, Plus } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { CATEGORIES, PRODUCTS, flavorsFor, type Product } from "@/lib/products";
import { brl, FREE_DELIVERY_FROM } from "@/lib/delivery";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FB Tabacaria Cuiabá | Pods descartáveis" },
      { name: "description", content: "Pods descartáveis Ignite, Elfbar, Life Pod e mais em Cuiabá-MT. Entrega local rápida." },
      { property: "og:title", content: "FB Tabacaria Cuiabá" },
      { property: "og:description", content: "Entrega local em Cuiabá." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [cat, setCat] = useState("Todos");
  const groups = cat === "Todos" ? CATEGORIES.slice(1) : [cat];
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      <section className="flex flex-col items-center gap-6 py-10 text-center md:flex-row md:text-left">
        <img src={logo.url} alt="Logo FB Tabacaria" className="h-40 w-40 rounded-full shadow-glow md:h-56 md:w-56" />
        <div className="space-y-4">
          <h1 className="font-display text-5xl leading-none tracking-wide text-glow md:text-7xl">A sua tabacaria em Cuiabá</h1>
          <p className="text-muted-foreground">Entrega rápida na cidade. Entrega grátis acima de {brl(FREE_DELIVERY_FROM)}.</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm md:justify-start">
            <span className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5"><Bike className="h-4 w-4 text-primary" /> Entrega em até 1h</span>
            <span className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5"><Store className="h-4 w-4 text-primary" /> (65) 99803-8731</span>
          </div>
        </div>
      </section>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition ${c === cat ? "border-primary bg-primary text-primary-foreground shadow-glow" : "border-border text-muted-foreground"}`}>{c}</button>
        ))}
      </div>
      {groups.map((g) => (
        <section key={g} className="mb-10">
          <h2 className="mb-4 font-display text-4xl tracking-wide text-glow">{g}</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {PRODUCTS.filter((p) => p.category === g).map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>
      ))}
      <div className="mt-10 text-center"><Button asChild size="lg"><Link to="/checkout">Ver carrinho</Link></Button></div>
      <p className="mt-10 text-center text-xs text-muted-foreground">Venda proibida para menores de 18 anos.</p>
    </main>
  );
}

function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const flavors = flavorsFor(p);
  const [flavor, setFlavor] = useState(flavors[0] ?? "");
  return (
    <article className="glow-border flex flex-col rounded-xl bg-card p-4 transition">
      <div className="mb-3 grid aspect-square place-items-center rounded-lg bg-accent">
        <span className="text-center font-display text-3xl text-primary text-glow">{p.category}</span>
      </div>
      <h3 className="flex-1 text-sm font-semibold md:text-base">{p.name}</h3>
      <label className="mt-2 text-xs text-muted-foreground">Sabor
        <select value={flavor} onChange={(e) => setFlavor(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm text-foreground">
          {flavors.map((f) => <option key={f}>{f}</option>)}
        </select>
      </label>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="font-bold">{brl(p.price)}</span>
        <Button size="icon" aria-label={`Adicionar ${p.name}`} onClick={() => { add(p.id, flavor); toast.success(`${p.name} (${flavor}) adicionado`); }}><Plus /></Button>
      </div>
    </article>
  );
}
