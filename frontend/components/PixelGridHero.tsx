"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const GRID_COLS = 24;
const GRID_ROWS = 10;

export default function PixelGridHero() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cells = gridRef.current?.querySelectorAll(".pixel-cell");
    if (!cells) return;

    if (reduced) {
      cells.forEach((c) => c.classList.add("bg-brand/70"));
      return;
    }

    gsap.set(cells, { opacity: 0.06 });
    gsap.to(cells, {
      opacity: 0.9,
      backgroundColor: "#5B5FEF",
      stagger: { each: 0.006, from: "random" },
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-24 md:px-8 md:pt-24">
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 grid opacity-80"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
        }}
        aria-hidden
      >
        {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, i) => (
          <div key={i} className="pixel-cell m-[1px] rounded-[2px] bg-black/10 dark:bg-white/10" />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-brand">
          Branding · Web · SEO · Content · Social · Maintenance
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
          We build brands, pixel by pixel.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base opacity-80 md:text-lg">
          Xeven Pixels is a full-service digital agency helping ambitious
          businesses launch, grow, and convert online — through design,
          strategy, and search-driven content.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/consultancy" className="btn-cta">
            Book a Discovery Call
          </Link>
          <Link href="/case-studies" className="btn-secondary">
            See Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
