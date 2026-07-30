"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type LightboxState = { images: string[]; index: number; alt: string };

type LightboxContextValue = {
  openAt: (images: string[], index: number, alt: string) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within PhotoLightboxProvider");
  return ctx;
}

export default function PhotoLightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LightboxState | null>(null);

  const openAt = useCallback((images: string[], index: number, alt: string) => {
    setState({ images, index, alt });
  }, []);
  const close = useCallback(() => setState(null), []);
  const next = useCallback(
    () => setState((s) => (s ? { ...s, index: (s.index + 1) % s.images.length } : s)),
    []
  );
  const prev = useCallback(
    () => setState((s) => (s ? { ...s, index: (s.index - 1 + s.images.length) % s.images.length } : s)),
    []
  );

  useEffect(() => {
    if (!state) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [state, close, next, prev]);

  return (
    <LightboxContext.Provider value={{ openAt }}>
      {children}
      {state && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={state.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/20"
          >
            &times;
          </button>

          {state.images.length > 1 && (
            <span className="absolute left-4 top-5 text-body-sm text-white/70">
              {state.index + 1} / {state.images.length}
            </span>
          )}

          {state.images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 sm:left-4"
            >
              &#8249;
            </button>
          )}

          <div
            className="relative h-[80vh] w-[90vw] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={state.images[state.index]}
              alt={`${state.alt} — photo ${state.index + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {state.images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 sm:right-4"
            >
              &#8250;
            </button>
          )}
        </div>
      )}
    </LightboxContext.Provider>
  );
}
