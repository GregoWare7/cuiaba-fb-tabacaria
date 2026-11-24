export type Product = { id: string; name: string; category: string; price: number; tag?: string };
export const CATEGORIES = ["Todos", "Pods", "Essências", "Sedas", "Acessórios"];
export const PRODUCTS: Product[] = [
  { id: "p1", name: "Pod Descartável Ignite V80", category: "Pods", price: 89.9, tag: "Mais vendido" },
  { id: "p2", name: "Pod Descartável Elf Bar BC10000", category: "Pods", price: 109.9 },
  { id: "p3", name: "Pod Descartável Oxbar 9500", category: "Pods", price: 99.9, tag: "Novo" },
  { id: "p4", name: "Essência Zomo 50g - Menta", category: "Essências", price: 14.9 },
  { id: "p5", name: "Essência Adalya 50g - Love 66", category: "Essências", price: 19.9 },
  { id: "p6", name: "Seda Smoking Brown King Size", category: "Sedas", price: 6.5 },
  { id: "p7", name: "Seda Bem Bolado Pop", category: "Sedas", price: 4.9 },
  { id: "p8", name: "Isqueiro Clipper Recarregável", category: "Acessórios", price: 12.9 },
  { id: "p9", name: "Dichavador Metal 4 Partes", category: "Acessórios", price: 39.9 },
];
