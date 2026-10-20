import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();
  return (
    <article className="group">
      <div className="frame-corners relative aspect-[3/4] overflow-hidden rounded-sm border border-[#e3dbce] bg-[#f4efe6] transition-shadow duration-500 hover:shadow-lg hover:shadow-[#8c6d23]/5">
        <img
          src={product.image}
          alt={product.name}
          width={768}
          height={1024}
          loading="lazy"
          className="size-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 z-10 rounded-sm border border-[#e3dbce]/70 bg-[#faf8f5]/95 px-2 py-0.5 font-display text-xs italic tracking-wider text-[#8c6d23] shadow-sm backdrop-blur-sm">
          No. {String(index + 1).padStart(2, "0")}
        </span>
        <button
          onClick={() => add(product.id)}
          className="btn-royal absolute inset-x-5 bottom-5 z-10 translate-y-3 justify-center opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100"
        >
          Add to Bag
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{product.category}</p>
          <h3 className="mt-1 font-display text-2xl font-medium tracking-tight text-[#1a1918] transition-colors group-hover:text-[#8c6d23]">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs text-[#665f54] leading-relaxed">{product.note}</p>
        </div>
        <p className="font-display text-2xl font-normal tracking-tight text-[#1a1918]">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}
