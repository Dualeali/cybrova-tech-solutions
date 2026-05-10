"use client";

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const TubesCursor = ({
  title = "Tubes",
  subtitle = "Cursor",
  caption = "WebGPU / WebGL",
  initialColors = ["#f967fb", "#53bc28", "#6958d5"],
  lightColors = ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
  lightIntensity = 200,
  titleSize = "text-[80px]",
  subtitleSize = "text-[60px]",
  captionSize = "text-base",
  enableRandomizeOnClick = true,
  className = "",
}) => {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    let removeClick = null;
    let destroyed = false;

    (async () => {
      const mod = await import(
        /* webpackIgnore: true */
        "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
      );
      const TubesCursorCtor = mod.default ?? mod;

      if (!canvasRef.current || destroyed) return;

      const app = TubesCursorCtor(canvasRef.current, {
        tubes: {
          colors: initialColors,
          lights: {
            intensity: lightIntensity,
            colors: lightColors,
          },
        },
      });

      appRef.current = app;

      if (enableRandomizeOnClick) {
        const handler = () => {
          const colors = randomColors(initialColors.length);
          const lights = randomColors(lightColors.length);
          app.tubes.setColors(colors);
          app.tubes.setLightsColors(lights);
        };
        // Add click listener to the wrapper instead of body to prevent side effects
        const container = canvasRef.current.parentElement;
        if (container) {
          container.addEventListener("click", handler);
          removeClick = () => container.removeEventListener("click", handler);
        }
      }
    })();

    return () => {
      destroyed = true;
      if (removeClick) removeClick();
      try {
        appRef.current?.dispose?.();
        appRef.current = null;
      } catch {
        // ignore
      }
    };
  }, [initialColors, lightColors, lightIntensity, enableRandomizeOnClick]);

  return (
    <div className={`relative h-[80vh] w-full overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10 ${className}`}>
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full cursor-pointer" />

      {/* Hero text */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 select-none pointer-events-none p-6 text-center bg-black/30 backdrop-blur-[2px]">
        <h1
          className={`m-0 p-0 text-white font-extrabold uppercase leading-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.8)] tracking-tighter ${titleSize}`}
        >
          {title}
        </h1>
        <h2
          className={`m-0 p-0 text-white font-semibold uppercase leading-tight drop-shadow-[0_0_20px_rgba(0,0,0,0.9)] tracking-wide ${subtitleSize}`}
        >
          {subtitle}
        </h2>
        <p
          className={`m-0 p-0 text-gray-200 leading-relaxed drop-shadow-[0_0_15px_rgba(0,0,0,0.9)] max-w-3xl mx-auto mt-6 font-medium ${captionSize}`}
        >
          {caption}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-6 pointer-events-auto">
           <a href="#why-choose-us" className="px-8 py-4 rounded-full bg-lime-400 text-black font-extrabold hover:bg-lime-300 hover:scale-105 transition-all shadow-[0_0_25px_rgba(163,230,53,0.5)] inline-block">
              Get Started Now
           </a>
           <Link to="/services" className="px-8 py-4 rounded-full border-2 border-white/40 text-white font-bold hover:bg-white/20 hover:border-white transition-all backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)] inline-block">
              Explore Our Services
           </Link>
        </div>
      </div>
    </div>
  );
};

function randomColors(count) {
  return new Array(count).fill(0).map(
    () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
  );
}

export { TubesCursor };
