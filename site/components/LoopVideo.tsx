"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted ambient loop. Shows the poster only under reduced motion, plays only while on
 * screen, and pauses when the tab is hidden.
 */
export function LoopVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !document.hidden) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    const onVis = () => (document.hidden ? v.pause() : v.play().catch(() => {}));
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  if (still) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt={label} />;
  }
  return (
    <video ref={ref} muted loop playsInline preload="metadata" poster={poster} aria-label={label}>
      <source src={src} type="video/webm" />
    </video>
  );
}
