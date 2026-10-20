import { createFileRoute } from "@tanstack/react-router";
import workshop from "@/assets/workshop.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Heritage — Sunrise Sports" },
      { name: "description", content: "The story of Sunrise Sports cricket shop founded in 1987." },
      { property: "og:title", content: "Heritage — Sunrise Sports" },
      { property: "og:description", content: "The story of Sunrise Sports cricket shop founded in 1987." },
    ],
  }),
  component: About,
});

const YEARS = [
  { y: "1987", t: "A single counter of bats, and a promise to grade every one by hand." },
  { y: "2002", t: "Our own workshop opens — knocking-in, repairs and re-handling under one roof." },
  { y: "2015", t: "Club and academy kits for over forty teams across the region." },
  { y: "Today", t: "Still family-run. Still picking every cleft ourselves." },
];

function About() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-40 text-center">
        <p className="eyebrow">Heritage</p>
        <h1 className="mt-4 text-6xl leading-[1.02] md:text-8xl">Made for the game, <em className="text-gold-foil">kept by family</em></h1>
      </section>
      <img src={workshop} alt="Our workshop" width={1280} height={880} className="mx-auto max-h-[70vh] w-full max-w-7xl object-cover px-6" />
      <section className="mx-auto max-w-4xl px-6 py-28">
        {YEARS.map((r) => (
          <div key={r.y} className="grid gap-4 border-t py-10 md:grid-cols-4">
            <p className="font-display text-5xl italic text-gold">{r.y}</p>
            <p className="font-display text-2xl leading-snug md:col-span-3">{r.t}</p>
          </div>
        ))}
      </section>
    </>
  );
}
