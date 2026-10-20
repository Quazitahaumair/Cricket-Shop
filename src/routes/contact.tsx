import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Visit the Shop — Sunrise Sports" },
      { name: "description", content: "Find our cricket shop, book a bat fitting, or send us a message." },
      { property: "og:title", content: "Visit the Shop — Sunrise Sports" },
      { property: "og:description", content: "Find our cricket shop, book a bat fitting, or send us a message." },
    ],
  }),
  component: Contact,
});

const field = "w-full border-b bg-transparent py-3 outline-none placeholder:text-muted-foreground focus:border-gold";

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-28 pt-40 md:grid-cols-2">
      <div>
        <p className="eyebrow">Visit</p>
        <h1 className="mt-3 text-6xl md:text-7xl">Come and <em className="text-gold-foil">hold the willow</em></h1>
        <div className="mt-12 space-y-6 text-muted-foreground">
          <p className="flex gap-4"><MapPin className="size-5 text-gold" strokeWidth={1.4} /> 12 Pavilion Road, Near Stadium Gate, Mumbai</p>
          <p className="flex gap-4"><Phone className="size-5 text-gold" strokeWidth={1.4} /> +91 98765 43210</p>
          <p className="flex gap-4"><Mail className="size-5 text-gold" strokeWidth={1.4} /> hello@sunrisesports.in</p>
        </div>
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="frame-corners space-y-8 border bg-card p-10"
      >
        {sent ? (
          <p className="py-20 text-center font-display text-3xl italic text-gold">Thank you — we'll be in touch shortly.</p>
        ) : (
          <>
            <h2 className="text-3xl">Book a bat fitting</h2>
            <input required placeholder="Your name" className={field} />
            <input required type="tel" placeholder="Phone" className={field} />
            <textarea rows={4} placeholder="What are you looking for?" className={field} />
            <button className="btn-royal">Send Request</button>
          </>
        )}
      </form>
    </section>
  );
}
