import { Link } from "@tanstack/react-router";
import { ShoppingBag, X, Minus, Plus, Crown } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

const NAV = [
  { to: "/", label: "House" },
  { to: "/shop", label: "Armoury" },
  { to: "/about", label: "Heritage" },
  { to: "/contact", label: "Visit" },
] as const;

export function SiteHeader() {
  const { count, setOpen } = useCart();
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <Crown className="size-5 text-gold" strokeWidth={1.4} />
          <span className="font-display text-2xl tracking-wide">
            Willow <span className="italic text-gold">&amp;</span> Crown
          </span>
        </Link>
        <nav className="hidden gap-10 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground transition hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button onClick={() => setOpen(true)} className="relative flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.3em] hover:text-gold" aria-label="Open bag">
          <ShoppingBag className="size-5" strokeWidth={1.4} />
          <span className="hidden sm:inline">Bag</span>
          {count > 0 && (
            <span className="absolute -right-3 -top-2 grid size-5 place-items-center rounded-full bg-gold text-[0.6rem] font-bold tracking-normal text-primary-foreground">
              {count}
            </span>
          )}
        </button>
      </div>
      <nav className="flex justify-center gap-6 border-t py-2 md:hidden">
        {NAV.map((n) => (
          <Link key={n.to} to={n.to} className="text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground" activeProps={{ className: "text-gold" }} activeOptions={{ exact: true }}>
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function CartDrawer() {
  const { open, setOpen, lines, total, setQty, remove } = useCart();
  return (
    <div className={`fixed inset-0 z-50 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-pitch/70 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
      <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l bg-card transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b p-6">
          <h3 className="text-3xl">Your Bag</h3>
          <button onClick={() => setOpen(false)} aria-label="Close bag"><X className="size-5" /></button>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          {lines.length === 0 && <p className="font-display text-xl italic text-muted-foreground">The bag awaits its first piece.</p>}
          {lines.map((l) => (
            <div key={l.id} className="flex gap-4">
              <img src={l.product.image} alt={l.product.name} className="h-24 w-20 object-cover" loading="lazy" />
              <div className="flex-1">
                <p className="font-display text-xl">{l.product.name}</p>
                <p className="text-xs text-muted-foreground">{formatPrice(l.product.price)}</p>
                <div className="mt-2 flex items-center gap-3">
                  <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="Less"><Minus className="size-3.5" /></button>
                  <span className="text-sm">{l.qty}</span>
                  <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="More"><Plus className="size-3.5" /></button>
                  <button onClick={() => remove(l.id)} className="ml-auto text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground hover:text-gold">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4 border-t p-6">
          <div className="flex justify-between font-display text-2xl"><span>Total</span><span className="text-gold">{formatPrice(total)}</span></div>
          <button className="btn-royal w-full justify-center" disabled={!lines.length}>Proceed to Checkout</button>
        </div>
      </aside>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e3dbce] bg-[#f4efe6]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-4xl text-[#1a1918]">Willow <span className="italic text-[#8c6d23]">&amp;</span> Crown</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#665f54]">Cricket equipment for those who treat the game as an inheritance. Hand-picked, hand-finished, since 1987.</p>
        </div>
        <div className="space-y-2 text-sm text-[#665f54]">
          <p className="eyebrow mb-3">The House</p>
          <Link to="/shop" className="block transition-colors hover:text-[#8c6d23]">Armoury</Link>
          <Link to="/about" className="block transition-colors hover:text-[#8c6d23]">Heritage</Link>
          <Link to="/contact" className="block transition-colors hover:text-[#8c6d23]">Visit the Shop</Link>
        </div>
        <div className="space-y-2 text-sm text-[#665f54]">
          <p className="eyebrow mb-3">Hours</p>
          <p>Mon – Sat · 10am – 9pm</p>
          <p>Sunday · by appointment</p>
        </div>
      </div>
      <div className="rule-gold" />
      <p className="py-6 text-center text-[0.65rem] uppercase tracking-[0.3em] text-[#665f54]">© {new Date().getFullYear()} Willow &amp; Crown · Est. 1987</p>
    </footer>
  );
}
