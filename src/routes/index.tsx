import { createFileRoute, Link } from "@tanstack/react-router";
import TigerTearReveal from "@/components/ui/tiger-tear-reveal";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import cricketDrive from "@/assets/cricket-drive.jpg";
import { WorkPageHero } from "@/components/ui/work-page-hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Willow & Crown — Royal Cricket Outfitters" },
      { name: "description", content: "Grade 1 willow bats, hand-stitched balls, ash stumps and leather kit bags from a cricket house established in 1987." },
      { property: "og:title", content: "Willow & Crown — Royal Cricket Outfitters" },
      { property: "og:description", content: "Grade 1 willow bats, hand-stitched balls, ash stumps and leather kit bags." },
    ],
  }),
  component: Index,
});

const WHEEL: WorksWheelItem[] = PRODUCTS.filter((p, i, a) => a.findIndex((q) => q.image === p.image) === i).map((p) => ({
  title: p.name,
  image: p.image,
  href: "/shop",
}));

const PILLARS = [
  {
    n: "I",
    t: "Chosen by hand",
    tag: "Selection Ratio · 1 in 9",
    d: "Every cleft of willow is inspected for grain straightness, moisture density, and acoustic resonance on our grading bench. Fewer than one in nine clefts earn our royal crest.",
    specs: ["Straight Grain Alignment", "Acoustic Ring Test", "Zero Synthetic Bleach"],
  },
  {
    n: "II",
    t: "Knocked-in & Oiled",
    tag: "Preparation · Match Ready",
    d: "Bats leave our yard hand-rubbed with raw cold-pressed linseed oil and compacted under calibrated steel rollers, prepared to face the new ball on day one without bruising.",
    specs: ["Cold-Pressed Linseed", "Calibrated Roller Compaction", "Seam-Proof Edges"],
  },
  {
    n: "III",
    t: "For life & game",
    tag: "Lifetime Stewardship",
    d: "Annual oiling, re-grips, and handle re-binding for as long as you play the game. A Willow & Crown blade is built to endure, maturing in stroke and sound across generations.",
    specs: ["Complimentary Annual Service", "Handle Re-Centering", "Generational Guarantee"],
  },
];

function Index() {
  return (
    <>
      <div className="pt-16">
        <TigerTearReveal
          word="ROAR"
          tagline="PLAY LIKE ROYALTY · EST. 1987"
          ink="#7d1a22"
          paper="#f1e9d6"
          taglineColor="#1f3a2c"
          eyeColor="#e6b04a"
          height="calc(100svh - 4rem)"
        />
      </div>

      {/* Marquee - Color transition begins here into warm beige & white */}
      <div className="overflow-hidden border-y border-[#e3dbce] bg-[#f4efe6] py-5">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap font-display text-2xl italic tracking-wide text-[#1a1918] md:text-3xl">
          {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((c, i) => (
            <span key={i} className="flex items-center gap-12">
              {c}
              <span className="text-base text-[#8c6d23]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Intro - The House of Willow */}
      <section className="border-b border-[#e3dbce] bg-[#faf8f5]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-12 md:gap-14 md:py-32">
          <div className="md:col-span-3">
            <p className="eyebrow flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-[#8c6d23]" />
              The House of Willow
            </p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-4xl font-normal leading-[1.12] tracking-tight text-[#1a1918] sm:text-5xl md:text-6xl lg:text-7xl">
              Equipment for cricketers who{" "}
              <em className="font-serif italic font-normal text-[#8c6d23]">walk out</em>{" "}
              to bat, rather than simply{" "}
              <em className="font-serif italic font-normal text-[#8c6d23]">turn up</em>.
            </h2>
            <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-[#665f54] md:text-lg">
              Hand-carved clefts from our private timber reserves, pressed for authentic championship balance. For thirty-nine seasons, wielded by test captains and county openers who demand nothing less than perfection.
            </p>
          </div>
        </div>
      </section>

      {/* The Wheel - Scroll-Driven Collection Showcase */}
      <div className="border-b border-[#e3dbce]">
        <WorksWheel
          items={WHEEL}
          eyebrow="The Collection"
          heading="Turn the wheel"
          description="Scroll to turn the wheel through each handcrafted piece."
          label="Armoury '26"
          action="Shop"
          className="font-display text-[#1a1918]"
        />
      </div>

      {/* Featured Products - White Gallery */}
      <section className="border-b border-[#e3dbce] bg-[#ffffff] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Most Requested</p>
              <h2 className="mt-2 font-display text-4xl font-normal tracking-tight text-[#1a1918] md:text-5xl">
                From the rack
              </h2>
            </div>
            <Link to="/shop" className="btn-ghost-royal">
              The full armoury
            </Link>
          </div>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.slice(0, 6).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Kinetic Typography & Scroll-Expand Reel Showcase */}
      <section className="border-b border-[#e3dbce] bg-[#faf8f5]">
        <WorkPageHero
          imageSrc={cricketDrive}
          videoSrc="https://res.cloudinary.com/dsuwzuaxp/video/upload/video1_horxtt.mp4"
          topWord="CRAFTING"
          rightWord="THE"
          bottomWord="legacy"
          accentColor="#8c6d23"
          textColor="#1a1918"
          backgroundColor="#faf8f5"
          showClocks={true}
          clocks={[
            { tz: "Europe/London", label: "LORD'S (GMT)" },
            { tz: "Asia/Kolkata", label: "MUMBAI (IST)" },
            { tz: "Australia/Sydney", label: "SYDNEY (AEST)" },
          ]}
          scrollDistance="+=150%"
        />
      </section>

      {/* Our Ways - The Workshop Creed (Box-Free Editorial Spread) */}
      <section className="relative overflow-hidden border-b border-[#e3dbce] bg-[#f4efe6] py-28 md:py-36">
        {/* Subtle Archival Watermark */}
        <div className="pointer-events-none absolute -bottom-8 right-6 font-display text-[15vw] font-bold leading-none text-[#e8ded0]/50 select-none">
          1987
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Top Editorial Header */}
          <div className="grid gap-8 border-b border-[#e3dbce] pb-14 md:grid-cols-12 md:gap-12 md:pb-20">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#8c6d23]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8c6d23]" />
                The Workshop Creed
              </div>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#1a1918]">
                Three promises, <br />
                <em className="font-serif italic font-normal text-[#8c6d23]">kept since 1987.</em>
              </h2>
            </div>
            <div className="flex flex-col justify-end md:col-span-7">
              <p className="max-w-xl font-sans text-base sm:text-lg leading-relaxed text-[#665f54]">
                We do not mass-produce, automate, or outsource. Every blade, ball, and seam that leaves our London yard passes through the hands of makers who treat cricket as an inheritance.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-[0.2em] text-[#8c6d23]">
                <span>London Yard</span>
                <span>✦</span>
                <span>Pure Grade 1 Willow</span>
                <span>✦</span>
                <span>Est. 1987</span>
              </div>
            </div>
          </div>

          {/* Open Editorial Rows (No Boxes / No Cards) */}
          <div className="divide-y divide-[#e3dbce]">
            {PILLARS.map((p, idx) => (
              <div
                key={p.n}
                className="group relative grid gap-6 py-12 transition-colors duration-300 md:grid-cols-12 md:gap-10 md:py-16 hover:bg-[#ede3d2]/25"
              >
                {/* Roman Numeral & Index */}
                <div className="flex items-baseline gap-4 md:col-span-3">
                  <span className="font-display text-5xl sm:text-6xl md:text-7xl font-light italic text-[#8c6d23] transition-transform duration-300 group-hover:translate-x-2">
                    {p.n}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#665f54]">
                    / 0{idx + 1}
                  </span>
                </div>

                {/* Main Promise Title & Statement */}
                <div className="md:col-span-4">
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#1a1918] transition-colors group-hover:text-[#8c6d23]">
                    {p.t}
                  </h3>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8c6d23]">
                    {p.tag}
                  </div>
                </div>

                {/* Craftsmanship Narrative & Technical Specs */}
                <div className="flex flex-col justify-between md:col-span-5">
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-[#665f54]">
                    {p.d}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.specs.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full border border-[#ded5c6] bg-[#faf8f5]/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#1a1918]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Master Craftsman Quote Signoff */}
          <div className="border-t border-[#e3dbce] pt-14 text-center md:pt-20">
            <blockquote className="mx-auto max-w-3xl font-display text-2xl sm:text-3xl italic font-light leading-relaxed text-[#1a1918]">
              “If a bat does not sing when the mallet strikes the sweet spot, it never sees the rack. That was our rule on morning one. It is our rule today.”
            </blockquote>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.28em] text-[#8c6d23]">
              — Senior Craftsman · Yard No. 4, London
            </p>
          </div>
        </div>
      </section>

      {/* CTA - By Appointment */}
      <section className="bg-[#faf8f5] px-6 py-28 text-center md:py-36">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">By Appointment</p>
          <h2 className="mt-4 font-display text-4xl font-normal leading-[1.14] tracking-tight text-[#1a1918] sm:text-5xl md:text-6xl">
            Pick up a bat.{" "}
            <em className="font-serif italic font-normal text-[#8c6d23]">Feel the difference.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm leading-relaxed text-[#665f54] sm:text-base">
            Private consultations, custom cleft selection, and bespoke weight balancing at our workshop.
          </p>
          <div className="mt-10">
            <Link to="/contact" className="btn-royal">
              Visit the Shop
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
