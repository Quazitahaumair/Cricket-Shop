"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------------------
// Types & Defaults
// ---------------------------------------------------------------------------
export interface TimezoneClock {
  tz: string;
  label: string;
}

export interface WorkPageHeroProps {
  /**
   * Optional image source URL or imported asset.
   * If provided, displays this image inside the zooming box.
   */
  imageSrc?: string;
  /**
   * Video source URL. Supports direct video files (.mp4, .webm, cdn streams)
   * or iframe embeds (Cloudinary player, Vimeo, YouTube).
   */
  videoSrc?: string;
  /** Video poster / thumbnail image URL */
  poster?: string;
  /** Explicitly set video rendering mode, or auto-detect based on URL */
  videoType?: "auto" | "video" | "iframe";
  /** Top overlay word (default: "creating") */
  topWord?: string;
  /** Right side overlay word (default: "your") */
  rightWord?: string;
  /** Bottom overlay word (default: "story") */
  bottomWord?: string;
  /** Accent color for highlighted text and clock timestamps (default: "#f97316") */
  accentColor?: string;
  /** Secondary text color (default: "#000000") */
  textColor?: string;
  /** Background color of the hero viewport (default: "#fafafa") */
  backgroundColor?: string;
  /** Whether to display the live world timezone clocks */
  showClocks?: boolean;
  /** Array of timezones and city labels to display in the live clocks */
  clocks?: TimezoneClock[];
  /** GSAP ScrollTrigger end scroll distance (default: "+=150%") */
  scrollDistance?: string;
  /** Additional container CSS classes */
  className?: string;
}

const DEFAULT_VIDEO_URL =
  "https://res.cloudinary.com/dsuwzuaxp/video/upload/video1_horxtt.mp4";

const DEFAULT_CLOCKS: TimezoneClock[] = [
  { tz: "Europe/London", label: "LORD'S (GMT)" },
  { tz: "Asia/Kolkata", label: "MUMBAI (IST)" },
  { tz: "Australia/Sydney", label: "SYDNEY (AEST)" },
];

// ---------------------------------------------------------------------------
// Helper – Live World Timezone Clock Hook
// ---------------------------------------------------------------------------
function useLiveTime() {
  const [time, setTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (tz: string) => {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: tz,
        hour12: false,
      }).format(time);
    } catch {
      return "--:--:--";
    }
  };

  return { formatTime };
}

// ---------------------------------------------------------------------------
// Component – WorkPageHero / ScrollExpandHero
// ---------------------------------------------------------------------------
export const WorkPageHero: React.FC<WorkPageHeroProps> = ({
  imageSrc,
  videoSrc = DEFAULT_VIDEO_URL,
  poster,
  videoType = "auto",
  topWord = "CRAFTING",
  rightWord = "THE",
  bottomWord = "legacy",
  accentColor = "#8c6d23",
  textColor = "#1a1918",
  backgroundColor = "#faf8f5",
  showClocks = true,
  clocks = DEFAULT_CLOCKS,
  scrollDistance = "+=150%",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const { formatTime } = useLiveTime();

  // Determine if source is an iframe embed or direct HTML5 video
  const isDirectVideo =
    videoType === "video" ||
    (videoType === "auto" &&
      !videoSrc.includes("player.cloudinary.com") &&
      !videoSrc.includes("youtube.com") &&
      !videoSrc.includes("vimeo.com") &&
      /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(videoSrc));

  useGSAP(
    () => {
      if (!containerRef.current || !videoWrapperRef.current || !textGroupRef.current) {
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: scrollDistance,
          scrub: true,
          pin: true,
        },
      });

      tl.to(
        videoWrapperRef.current,
        {
          top: "0%",
          left: "0%",
          bottom: "0%",
          right: "0%",
          borderRadius: "0rem",
          ease: "none",
        },
        0
      ).to(
        textGroupRef.current,
        {
          opacity: 0,
          scale: 1.15,
          filter: "blur(12px)",
          ease: "none",
        },
        0
      );
    },
    { scope: containerRef, dependencies: [scrollDistance] }
  );

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ background: backgroundColor }}
    >
      <section
        ref={containerRef}
        className="relative h-screen min-h-[520px] w-full overflow-hidden select-none"
      >
        {/* ── Animated Kinetic Typography Overlay ── */}
        <div
          ref={textGroupRef}
          className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between"
          style={{ willChange: "transform, opacity, filter" }}
        >
          {/* Top Word */}
          <div className="absolute top-[2%] inset-x-0 flex justify-center">
            <span
              className="font-black tracking-tighter leading-none select-none text-center"
              style={{
                color: accentColor,
                fontSize: "clamp(3.5rem, 11vw, 11rem)",
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {topWord}
            </span>
          </div>

          {/* Right Word */}
          <div className="absolute right-[3%] top-[38%] flex items-center">
            <span
              className="font-black tracking-tighter leading-none select-none"
              style={{
                color: textColor,
                fontSize: "clamp(3.5rem, 11vw, 11rem)",
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {rightWord}
            </span>
          </div>

          {/* Bottom Word (Serif / Editorial) */}
          <div className="absolute bottom-[2%] inset-x-0 flex justify-center">
            <span
              className="font-normal italic leading-none select-none text-center"
              style={{
                color: accentColor,
                fontSize: "clamp(4rem, 14vw, 13rem)",
                fontFamily: "Cormorant Garamond, Georgia, 'Times New Roman', serif",
              }}
            >
              {bottomWord}
            </span>
          </div>

          {/* ── World Clocks Column ── */}
          {showClocks && clocks.length > 0 && (
            <div
              className="absolute left-[clamp(1.25rem,4vw,5rem)] top-1/2 -translate-y-1/2 flex flex-col gap-3 font-mono text-[clamp(9px,1.1vw,12px)] uppercase tracking-[0.15em] opacity-90"
              style={{ color: accentColor }}
            >
              {clocks.map(({ tz, label }) => (
                <div
                  key={tz}
                  className="flex items-center gap-[clamp(0.5rem,1.2vw,1.5rem)] font-medium"
                >
                  <span className="tabular-nums font-semibold">{formatTime(tz)}</span>
                  <span style={{ color: textColor }}>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Center Expanding Media Pill ── */}
        <div
          ref={videoWrapperRef}
          className="absolute z-20 overflow-hidden shadow-2xl transition-[border-radius]"
          style={{
            top: "18%",
            bottom: "18%",
            left: "22%",
            right: "18%",
            borderRadius: "0.75rem",
            willChange: "top, left, right, bottom, border-radius",
          }}
        >
          {imageSrc ? (
            <div className="relative w-full h-full bg-[#1a1918]">
              <img
                src={imageSrc}
                alt="Willow & Crown Royal Cover Drive"
                className="w-full h-full object-cover select-none"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1918]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#c9a44c] animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/95 drop-shadow">
                    Lord's Ground · London · Est. 1987
                  </span>
                </div>
                <span className="font-display text-sm italic tracking-wide text-white/85 hidden sm:inline-block drop-shadow">
                  Handcrafted Grade 1 English Willow
                </span>
              </div>
            </div>
          ) : isDirectVideo ? (
            <video
              src={videoSrc}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <iframe
              src={videoSrc}
              title="Hero reel video"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-none block"
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default WorkPageHero;
