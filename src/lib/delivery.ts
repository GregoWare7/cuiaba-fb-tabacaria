export type DeliveryOption = {
  id: string;
  type: "pickup" | "delivery";
  label: string;
  description: string;
  fee: number;
  eta: string;
};

export const STORE_ADDRESS = "Cuiabá - MT (endereço a confirmar)";

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: "retirada", type: "pickup", label: "Retirar na loja", description: STORE_ADDRESS, fee: 0, eta: "Pronto em até 30 min" },
  { id: "centro", type: "delivery", label: "Entrega - Centro / Região Central", description: "Centro, Goiabeiras, Popular, Araés, Duque de Caxias", fee: 8, eta: "Até 1 hora" },
  { id: "intermediaria", type: "delivery", label: "Entrega - Bairros intermediários", description: "Jardim das Américas, Boa Esperança, CPA, Coxipó, Morada da Serra", fee: 12, eta: "1 a 2 horas" },
  { id: "distante", type: "delivery", label: "Entrega - Bairros distantes", description: "Pedra 90, Tijucal, Osmar Cabral, Parque Cuiabá e região", fee: 18, eta: "2 a 3 horas" },
];

export const FREE_DELIVERY_FROM = 200;

export function deliveryFee(optionId: string, subtotal: number): number {
  const opt = DELIVERY_OPTIONS.find((o) => o.id === optionId);
  if (!opt) throw new Error("Opção de entrega inválida");
  if (opt.type === "delivery" && subtotal >= FREE_DELIVERY_FROM) return 0;
  return opt.fee;
}

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
