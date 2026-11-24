import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bike, Store, Plus } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
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
  const { add } = useCart();
  const list = cat === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
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
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {list.map((p) => (
          <article key={p.id} className="glow-border flex flex-col rounded-xl bg-card p-4 transition">
            <div className="mb-3 grid aspect-square place-items-center rounded-lg bg-accent">
              <span className="font-display text-4xl text-primary text-glow">{p.category}</span>
            </div>
            {p.tag && <span className="mb-1 w-fit rounded bg-primary/20 px-2 py-0.5 text-xs text-primary-glow">{p.tag}</span>}
            <h2 className="flex-1 text-sm font-semibold md:text-base">{p.name}</h2>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="font-bold">{brl(p.price)}</span>
              <Button size="icon" aria-label={`Adicionar ${p.name}`} onClick={() => { add(p.id); toast.success("Adicionado ao carrinho"); }}><Plus /></Button>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 text-center"><Button asChild size="lg"><Link to="/checkout">Ver carrinho</Link></Button></div>
      <p className="mt-10 text-center text-xs text-muted-foreground">Venda proibida para menores de 18 anos.</p>
    </main>
  );
}
