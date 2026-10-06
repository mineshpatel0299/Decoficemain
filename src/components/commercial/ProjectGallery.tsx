"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type GalleryProject = {
  title: string;
  location: string;
  images: string[];
};

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true" className={dir === "right" ? "rotate-180" : ""}>
      <path d="m20 6-10 10 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const navButton =
  "absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-emerald-600 hover:bg-emerald-600 focus:outline-none focus-visible:border-emerald-600 sm:size-[52px]";

// Full-screen lightbox for a project's photos. Mount it only while open: it locks scroll, traps Escape/arrow keys and restores focus on unmount.
export default function ProjectGallery({ project, onClose }: { project: GalleryProject; onClose: () => void }) {
  const { images, title, location } = project;
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeStart = useRef<number | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Home") setIndex(0);
      else if (e.key === "End") setIndex(images.length - 1);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [go, images.length, onClose]);

  // Keep the active thumbnail in view
  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photo gallery`}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <header className="flex shrink-0 items-start justify-between gap-4 px-5 pt-5 sm:px-8 sm:pt-6">
        <div className="font-opensans text-[#eaeaea]">
          <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
          <p className="text-sm text-white/70 sm:text-base">{location}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-opensans text-sm text-white/80 tabular-nums" aria-live="polite">
            {index + 1} / {images.length}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex size-10 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-[18px]">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Stage: every photo stays mounted and cross-fades, so switching is instant and nothing flashes */}
      <div
        className="relative mx-auto mt-4 min-h-0 w-full max-w-[1400px] flex-1 px-4 touch-pan-y sm:px-16"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onPointerDown={(e) => {
          swipeStart.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipeStart.current === null) return;
          const dx = e.clientX - swipeStart.current;
          swipeStart.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        <div className="relative size-full">
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${title}, photo ${i + 1} of ${images.length}`}
              fill
              sizes="(min-width: 1400px) 1400px, 100vw"
              priority={i === 0}
              draggable={false}
              aria-hidden={i !== index}
              className={`object-contain transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${navButton} left-2 sm:left-4`}>
              <ArrowIcon dir="left" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${navButton} right-2 sm:right-4`}>
              <ArrowIcon dir="right" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="shrink-0 px-4 pt-4 pb-5 sm:pb-6">
          <ul
            role="tablist"
            aria-label="Choose a photo"
            className="mx-auto flex w-fit max-w-full gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((src, i) => (
              <li key={src} className="shrink-0">
                <button
                  ref={(el) => {
                    thumbRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show photo ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`relative block h-14 w-20 overflow-hidden rounded-md border-2 transition-all focus:outline-none focus-visible:border-white sm:h-16 sm:w-24 ${
                    i === index ? "border-emerald-600 opacity-100" : "border-transparent opacity-55 hover:opacity-90"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="96px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>,
    document.body
  );
}
