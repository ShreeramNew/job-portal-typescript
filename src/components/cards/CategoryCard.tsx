"use client";
import useSearchText from "@/helpers/SearchText";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

type CategoryCardProps = {
  imageLink: string;
  category: string;
  SearchKeywords: string;
  span: string; // Accepts responsive classes like "md:col-span-6"
  delay: number;
};

export default function CategoryCard({
  imageLink,
  category,
  SearchKeywords,
  span,
  delay,
}: CategoryCardProps) {
  const SearchText = useSearchText();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.5 }}
      onClick={() => SearchText(SearchKeywords)}
      className={`relative group overflow-hidden rounded-3xl border border-white/5 bg-[#111] h-full ${span} cursor-pointer transition-all duration-500 hover:border-blue-500/30`}
    >
      {/* Background Image */}
      <Image
        alt={category}
        src={imageLink}
        fill
        className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Floating UI Elements */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
        <div className="flex justify-end">
          <div className="w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-blue-600 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <FiArrowUpRight size={24} />
          </div>
        </div>

        <div>
          <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight leading-tight">
            {category}
          </h3>
          <div className="h-1 w-0 bg-blue-500 group-hover:w-full transition-all duration-500 mt-3 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}
