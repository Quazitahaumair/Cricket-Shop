import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "The Armoury — Sunrise Sports" },
      { name: "description", content: "Shop cricket bats, balls, stumps, kit bags and protective gear from Sunrise Sports." },
      { property: "og:title", content: "The Armoury — Sunrise Sports" },
      { property: "og:description", content: "Shop cricket bats, balls, stumps, kit bags and protective gear from Sunrise Sports." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState<Category | "All">("All");
  const list = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 pt-40">
      <p className="eyebrow">The Armoury</p>
      <h1 className="mt-3 text-6xl md:text-8xl">Every piece, <em className="text-gold-foil">on the rack</em></h1>
      <div className="mt-12 flex flex-wrap gap-3 border-y py-5">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 text-[0.65rem] uppercase tracking-[0.28em] transition ${cat === c ? "bg-gold text-primary-foreground" : "text-muted-foreground hover:text-gold"}`}
          >
            {c}
          </button>
        ))}
        <span className="ml-auto self-center font-display text-lg italic text-muted-foreground">{list.length} pieces</span>
      </div>
      <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}
