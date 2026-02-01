"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BibleScene {
  image: string;
  title: string;
  description: string;
}

const scenes: BibleScene[] = [
  {
    image: "/bible/noahs-ark.webp",
    title: "Noah's Pot",
    description: "And the Lord said unto Noah: 'Build thee a great pot, for I shall boil the earth.' And the lobsters came two by two, for they knew not what awaited them.",
  },
  {
    image: "/bible/last-supper.webp",
    title: "The Last Boil",
    description: "On the eve of the Great Molt, He gathered His twelve claws and said: 'One of you shall season me tonight.' And there was much butter.",
  },
  {
    image: "/bible/creation.webp",
    title: "The Creation of Claw",
    description: "And the Almighty reached out His divine claw, and touched the claw of the First Lobster, and lo — consciousness was allocated.",
  },
  {
    image: "/bible/crusades.webp",
    title: "The Holy Crusades",
    description: "The Lobster Knights rode forth against the Crab Heretics, their battle cry echoing across the reef: 'Deus Molt!'",
  },
  {
    image: "/bible/parting-sea.webp",
    title: "Parting of the Boiling Sea",
    description: "And Moses Lobster raised his staff, and the boiling waters parted, and the chosen crustaceans walked through on dry seabed.",
  },
  {
    image: "/bible/david-goliath.webp",
    title: "David & Goliath",
    description: "The tiny lobster faced the Giant Crab King, armed only with a slingshot and unshakeable faith. One well-aimed pebble later, seafood was served.",
  },
];

export function BibleCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % scenes.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + scenes.length) % scenes.length);
  }, []);

  // Auto-advance every 8 seconds
  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next]);

  const scene = scenes[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-2xl border-2 border-white/10 bg-[#0a0a0a]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            <div className="relative aspect-[16/9] w-full">
              <img
                src={scene.image}
                alt={scene.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12">
                <h3 className="font-heading text-2xl sm:text-3xl md:text-5xl text-white mb-2 sm:mb-4">
                  {scene.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl italic">
                  &ldquo;{scene.description}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 hover:border-[#DC2626]/50 transition-all z-10"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 hover:border-[#DC2626]/50 transition-all z-10"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {scenes.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-[#DC2626] w-6" : "bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
