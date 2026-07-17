"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useEffect, useReducer, useRef, useCallback } from "react";
import type { HomeHeroSlide } from "@/data/home-hero-slides";

const INTERVAL_MS = 8000;

type State = { current: number; paused: boolean };
type Action =
  | { type: "next"; total: number }
  | { type: "goto"; index: number }
  | { type: "pause" }
  | { type: "resume" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "next":
      return { ...state, current: (state.current + 1) % action.total };
    case "goto":
      return { ...state, current: action.index };
    case "pause":
      return { ...state, paused: true };
    case "resume":
      return { ...state, paused: false };
  }
}

export default function HomeHero({ slides }: { slides: HomeHeroSlide[] }) {
  const [{ current, paused }, dispatch] = useReducer(reducer, {
    current: 0,
    paused: false,
  });

  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const advance = useCallback(() => {
    if (!prefersReducedMotion.current) {
      dispatch({ type: "next", total: slides.length });
    }
  }, [slides.length]);

  useEffect(() => {
    if (paused || prefersReducedMotion.current) return;

    const tick = () => {
      if (document.visibilityState === "visible") advance();
    };

    const id = setInterval(tick, INTERVAL_MS);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") clearInterval(id);
    });

    return () => clearInterval(id);
  }, [paused, advance]);

  if (!slides.length) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured models"
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => dispatch({ type: "pause" })}
      onMouseLeave={() => dispatch({ type: "resume" })}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.href}
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${slides.length}: ${slide.modelName}`}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Link
            href={slide.href}
            tabIndex={i === current ? 0 : -1}
            className="block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-pop focus-visible:ring-offset-2"
          >
            {/* Full-bleed image */}
            <Image
              src={slide.image}
              alt={`${slide.modelName} — ${slide.moodLine}`}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />

            {/* Gradient scrim */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent"
            />

            {/* Text overlay — lower third */}
            <div className="absolute inset-x-0 bottom-20 px-8 md:px-16 lg:px-24">
              <p className="text-caption font-semibold uppercase tracking-[0.18em] text-ink-text-muted">
                {slide.modelName}
              </p>
              <p className="mt-2 max-w-2xl text-headline font-semibold leading-tight text-balance text-ink-text sm:text-display">
                {slide.moodLine}
              </p>
            </div>
          </Link>
        </div>
      ))}

      {/* Dot controls */}
      <div
        role="tablist"
        aria-label="Slides"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.href}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}: ${slide.modelName}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch({ type: "goto", index: i });
            }}
            className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pop ${
              i === current
                ? "w-6 bg-white"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
