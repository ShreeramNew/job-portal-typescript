"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

type CategoryCardProps = {
  imageLink: string;
  category: string;
  SearchKeywords: string;
  span: string; // Now accepts a string like "md:col-span-7"
  delay: number;
};

export default function CategoryCard({
  imageLink,
  category,
  span,
  delay,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.6 }}
      className={`relative group overflow-hidden rounded-3xl border border-white/5 bg-[#111] h-full ${span}`}
    >
      {/* Optimized Image with Hover Zoom */}
      <Image
        alt={category}
        src={imageLink}
        fill
        className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700 ease-out"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* Content Container */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
        <div className="flex justify-end">
          <div className="w-10 h-10 rounded-full border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
            <FiArrowUpRight className="text-white text-xl" />
          </div>
        </div>

        <div>
          <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">
            {category}
          </h3>
          <div className="h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 mt-2" />
        </div>
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-3xl transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}
