"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface WorksWheelItem {
  /** Project name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default undefined */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default undefined */
  action?: string;
  eyebrow?: string;
  heading?: string;
  description?: string;
}

/* Geometry */
const CARD_H = 0.38;
const CARD_MAX_W = 0.34;
const CARD_RATIO = 1.45;
const STEP = 40;
const DRUM = 2.22;
const LENS = 2.7;
const RING_R = 1.14;
const BOW = 1.82;
const TITLE = 0.124;
const INDEX = 0.04;
const CULL = 1.6;
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rad = (deg: number) => (deg * Math.PI) / 180;

const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

type Stage = { w: number; h: number };

export function WorksWheel({
  items,
  label = "Works '26",
  action = "View",
  eyebrow = "The Collection",
  heading = "Turn the wheel",
  description = "Scroll to turn the wheel through each handcrafted piece.",
  className,
  ...props
}: WorksWheelProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const isMobile = w > 0 && w < 768;
    const maxW = isMobile ? 0.74 : CARD_MAX_W;
    const cardHRatio = isMobile ? 0.32 : CARD_H;
    const cardW = Math.min(h * cardHRatio * CARD_RATIO, w * maxW);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * (isMobile ? 1.05 : RING_R);
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      isMobile,
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: isMobile ? cardH * 0.2 : cardH * BOW,
      depth: cardH * LENS,
      title: Math.max(isMobile ? 22 : 16, cardH * TITLE),
      index: cardH * INDEX,
    };
  }, [stage, count]);

  // Turn wheel on page scroll using ScrollTrigger pin and scrub
  useGSAP(
    () => {
      if (!sectionRef.current || count === 0) return;

      const isMobile = window.innerWidth < 768;
      // Distance to scrub through all items smoothly
      const scrollDistance = isMobile
        ? `+=${Math.max(count * 220, 1600)}px`
        : `+=${Math.max(count * 280, 2200)}px`;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: scrollDistance,
        pin: true,
        pinSpacing: true,
        scrub: isMobile ? 0.3 : 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          // self.progress goes from 0.0 (ring closed) to 1.0 (final item)
          const nextTarget = self.progress * (count + 0.5);
          target.current = nextTarget;
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: sectionRef, dependencies: [count] }
  );

  // RAF loop for buttery smooth spring transform rendering
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, count);
    },
    [count],
  );

  return (
    <section
      ref={sectionRef}
      aria-label={label}
      className={cn(
        "relative flex h-screen min-h-[580px] w-full flex-col justify-between overflow-hidden bg-[#f4efe6] select-none text-[#1a1918]",
        className,
      )}
      {...props}
    >
      {/* Pinned Section Header */}
      <div className="relative z-30 mx-auto flex w-full max-w-7xl items-end justify-between px-6 pt-10 md:pt-14 pointer-events-none">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#1a1918]">
            {heading}
          </h2>
        </div>
        {description && (
          <p className="max-w-xs font-sans text-xs sm:text-sm leading-relaxed text-[#665f54] md:block">
            {description}
          </p>
        )}
      </div>

      {/* 3D Wheel Stage */}
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="relative flex-1 w-full outline-none"
        style={{ perspective: `${metrics.depth}px` }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const Tag = (item.href ? "a" : "div") as "a";
            return (
              <React.Fragment key={item.title}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
                  }}
                  onClick={(e) => {
                    if (i !== active) {
                      e.preventDefault();
                      to(i + 1);
                    }
                  }}
                  className="group absolute [backface-visibility:hidden] cursor-pointer"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  <span className="relative block size-full overflow-hidden rounded-lg border border-[#e3dbce] bg-[#f4efe6] shadow-xl transition-shadow duration-500 group-hover:shadow-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {action && item.href ? (
                      <span className="pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1 rounded-full border border-[#e3dbce] bg-[#faf8f5]/90 px-2.5 py-1 text-[0.7rem] font-semibold text-[#1a1918] opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                        <svg
                          viewBox="0 0 12 12"
                          className="size-2.5"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {action}
                      </span>
                    ) : null}
                  </span>
                </Tag>
              </React.Fragment>
            );
          })}
        </div>

        {/* Ring title and front-card title */}
        <div
          ref={labelRef}
          className="pointer-events-none absolute inset-0 grid place-items-center tracking-tight text-[#1a1918]"
          style={{ fontSize: metrics.title }}
        >
          {label}
        </div>
        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-x-4 top-[10%] text-center tracking-tight opacity-0 md:inset-x-auto md:top-1/2 md:left-[8%] md:-translate-y-1/2 md:text-left text-[#1a1918]"
          style={{ fontSize: metrics.title }}
        >
          {items[active]?.title}
        </div>

        {/* Desktop right-side index */}
        <ol
          className="text-[#665f54] absolute top-[7.5%] right-[2.5%] text-right leading-[1.75] hidden md:block"
          style={{ fontSize: metrics.index }}
        >
          {items.map((item, i) => (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => to(i + 1)}
                className={cn(
                  "cursor-pointer transition-colors outline-none",
                  i === active ? "text-[#1a1918] font-bold" : "hover:text-[#1a1918]",
                )}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ol>

        {/* Mobile scroll indicator */}
        <div className="absolute bottom-4 inset-x-0 z-30 flex items-center justify-center pointer-events-none md:hidden">
          <span className="font-display text-xs italic tracking-wider text-[#8c6d23]">
            Piece {active + 1} of {items.length} · Scroll to turn
          </span>
        </div>
      </div>
    </section>
  );
}

export default WorksWheel;
