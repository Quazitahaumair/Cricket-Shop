import * as React from "react";
import { PRODUCTS, type Product } from "./products";

type Line = { id: string; qty: number };
interface CartCtx {
  lines: (Line & { product: Product })[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
}

const Ctx = React.createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = React.useState<Line[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const s = localStorage.getItem("wc-cart");
      if (s) setRaw(JSON.parse(s));
    } catch {}
  }, []);
  React.useEffect(() => {
    localStorage.setItem("wc-cart", JSON.stringify(raw));
  }, [raw]);

  const lines = raw
    .map((l) => ({ ...l, product: PRODUCTS.find((p) => p.id === l.id)! }))
    .filter((l) => l.product);

  const value: CartCtx = {
    lines,
    count: lines.reduce((a, l) => a + l.qty, 0),
    total: lines.reduce((a, l) => a + l.qty * l.product.price, 0),
    open,
    setOpen,
    add: (id) => {
      setRaw((r) => (r.some((l) => l.id === id) ? r.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...r, { id, qty: 1 }]));
      setOpen(true);
    },
    remove: (id) => setRaw((r) => r.filter((l) => l.id !== id)),
    setQty: (id, qty) => setRaw((r) => (qty <= 0 ? r.filter((l) => l.id !== id) : r.map((l) => (l.id === id ? { ...l, qty } : l)))),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
