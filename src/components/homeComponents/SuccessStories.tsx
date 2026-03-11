"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";

export default function SuccessStories() {
  const stories = [
    {
      id: 0,
      name: "Amy Johnson",
      role: "Marketing Lead @ BrightMedia",
      imageURL:
        "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=600&q=75",
      story:
        "The intuitive interface made job hunting easy. I found my dream role in weeks.",
    },
    {
      id: 1,
      name: "Mark Peterson",
      role: "Senior Dev @ TechWave",
      imageURL:
        "https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&w=600&q=75",
      story:
        "Tailored recommendations helped me find a prestigious company that aligned with my goals.",
    },
    {
      id: 2,
      name: "Sarah Lee",
      role: "Product Manager @ InnovateX",
      imageURL:
        "https://images.unsplash.com/flagged/photo-1553642618-de0381320ff3?auto=format&fit=crop&w=600&q=75",
      story:
        "Transitioning to a new industry was seamless. I am now thriving in a role I love.",
    },
  ];

  const [index, setIndex] = useState(0);
  const active = stories[index];

  return (
    <section className="w-full bg-[#08080a] py-24 flex justify-center items-center">
      <div className="max-w-5xl w-full px-6 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* 1. COMPACT IMAGE CARD */}
        <div className="relative flex-shrink-0">
          <div className="relative w-[280px] h-[380px] md:w-[320px] md:h-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.imageURL}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={active.imageURL}
                  alt={active.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 280px, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 2. ELEGANT CONTENT AREA */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-6 block">
                Success Story
              </span>

              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-10">
                "{active.story}"
              </h2>

              <div className="space-y-1">
                <p className="text-white font-bold text-xl">{active.name}</p>
                <p className="text-gray-500 text-sm font-medium tracking-wide">
                  {active.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 3. MINIMAL NAVIGATION */}
          <div className="flex items-center gap-6 mt-12">
            <button
              onClick={() =>
                setIndex((p) => (p === 0 ? stories.length - 1 : p - 1))
              }
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <HiOutlineArrowLeft size={20} />
            </button>

            <div className="h-[1px] w-12 bg-white/10" />

            <button
              onClick={() =>
                setIndex((p) => (p === stories.length - 1 ? 0 : p + 1))
              }
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <HiOutlineArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
