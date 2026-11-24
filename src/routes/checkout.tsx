import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import { brl, deliveryFee, DELIVERY_OPTIONS, FREE_DELIVERY_FROM } from "@/lib/delivery";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Carrinho e entrega | FB Tabacaria" },
      { name: "description", content: "Escolha entrega local em Cuiabá ou retirada na loja e veja prazos e custos." },
      { property: "og:title", content: "Carrinho e entrega | FB Tabacaria" },
      { property: "og:description", content: "Entrega local em Cuiabá ou retirada na loja." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { lines, setQty, subtotal, clear } = useCart();
  const [opt, setOpt] = useState("retirada");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const selected = DELIVERY_OPTIONS.find((o) => o.id === opt)!;
  const fee = deliveryFee(opt, subtotal);
  const total = subtotal + fee;

  if (lines.length === 0)
    return (
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-5xl text-glow">Carrinho vazio</h1>
        <Button asChild className="mt-6"><Link to="/">Ver produtos</Link></Button>
      </main>
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Pedido recebido, ${name}! ${selected.type === "pickup" ? "Retire na loja" : "Entrega"}: ${selected.eta}.`);
    clear();
  };

  return (
    <main className="mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-[1fr_360px]">
      <form id="checkout" onSubmit={submit} className="space-y-6">
        <h1 className="font-display text-5xl text-glow">Finalizar pedido</h1>
        <section className="space-y-3 rounded-xl border border-border bg-card p-4">
          {lines.map((l) => (
            <div key={l.product.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="min-w-0"><p className="truncate text-sm font-semibold">{l.product.name}</p><p className="text-xs text-muted-foreground">{brl(l.product.price)}</p></div>
              <div className="flex items-center gap-2">
                <Button type="button" size="icon" variant="outline" aria-label="Diminuir" onClick={() => setQty(l.product.id, l.qty - 1)}><Minus /></Button>
                <span className="w-6 text-center">{l.qty}</span>
                <Button type="button" size="icon" variant="outline" aria-label="Aumentar" onClick={() => setQty(l.product.id, l.qty + 1)}><Plus /></Button>
              </div>
            </div>
          ))}
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-3xl">Como quer receber?</h2>
          {DELIVERY_OPTIONS.map((o) => {
            const f = deliveryFee(o.id, subtotal);
            return (
              <label key={o.id} className={`flex cursor-pointer gap-3 rounded-xl border bg-card p-4 transition ${opt === o.id ? "border-primary shadow-glow" : "border-border"}`}>
                <input type="radio" name="entrega" value={o.id} checked={opt === o.id} onChange={() => setOpt(o.id)} className="mt-1 accent-primary" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap justify-between gap-2"><span className="font-semibold">{o.label}</span><span className="font-bold text-primary-glow">{f === 0 ? "Grátis" : brl(f)}</span></div>
                  <p className="text-xs text-muted-foreground">{o.description}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs"><Clock className="h-3 w-3 text-primary" />{o.eta}</p>
                </div>
              </label>
            );
          })}
          <p className="text-xs text-muted-foreground">Entrega grátis em Cuiabá para pedidos a partir de {brl(FREE_DELIVERY_FROM)}.</p>
        </section>
        <section className="space-y-3">
          <Input required placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
          {selected.type === "delivery" && <Input required placeholder="Endereço completo (rua, número, bairro)" value={address} onChange={(e) => setAddress(e.target.value)} />}
        </section>
      </form>
      <aside className="h-fit space-y-3 rounded-xl border border-primary bg-card p-5 shadow-glow md:sticky md:top-24">
        <h2 className="font-display text-3xl">Resumo</h2>
        <Row k="Subtotal" v={brl(subtotal)} />
        <Row k={selected.type === "pickup" ? "Retirada" : "Entrega"} v={fee === 0 ? "Grátis" : brl(fee)} />
        <Row k="Prazo" v={selected.eta} />
        <div className="border-t border-border pt-3"><Row k="Total" v={brl(total)} bold /></div>
        <Button form="checkout" type="submit" size="lg" className="w-full">Confirmar pedido</Button>
        <p className="text-center text-xs text-muted-foreground">Pagamento combinado na entrega ou retirada.</p>
      </aside>
    </main>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return <div className={`flex justify-between gap-3 text-sm ${bold ? "text-lg font-bold" : ""}`}><span className="text-muted-foreground">{k}</span><span>{v}</span></div>;
}
