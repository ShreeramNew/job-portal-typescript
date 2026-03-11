"use client";
import CategoryCard from "../cards/CategoryCard";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

export default function Categories() {
  const categories = [
    {
      imageLink:
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop",
      category: "Sales & Marketing",
      SearchKeywords: "marketing",
      span: "md:col-span-5",
      delay: 0.1,
    },
    {
      imageLink:
        "https://plus.unsplash.com/premium_photo-1679923813998-6603ee2466c5?q=80&w=1200&auto=format&fit=crop",
      category: "Finance & Accounts",
      SearchKeywords: "finance",
      span: "md:col-span-7",
      delay: 0.2,
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1581092157699-83c90752400a?q=80&w=1200&auto=format&fit=crop",
      category: "Tech Engineering",
      SearchKeywords: "engineering",
      span: "md:col-span-4",
      delay: 0.3,
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop",
      category: "Customer Support",
      SearchKeywords: "service",
      span: "md:col-span-4",
      delay: 0.4,
    },
    {
      imageLink:
        "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=1200&auto=format&fit=crop",
      category: "Health & Medical",
      SearchKeywords: "healthcare",
      span: "md:col-span-4",
      delay: 0.5,
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      category: "Education & Training",
      SearchKeywords: "education",
      span: "md:col-span-8",
      delay: 0.6,
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=1200&auto=format&fit=crop",
      category: "Human Resources",
      SearchKeywords: "hr",
      span: "md:col-span-4",
      delay: 0.7,
    },
  ];

  return (
    <section className="w-full bg-[#08080a] py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Minimalist Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            Browse <span className="text-blue-500">Career Fields</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Select a category to view high-growth job opportunities.
          </p>
        </motion.div>

        {/* GRID LOGIC:
                1. grid-cols-1: Cards take full width on mobile.
                2. md:grid-cols-12: Grid activates on desktop.
                3. auto-rows: Sets mobile height (240px), then desktop height (320px).
            */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[240px] md:auto-rows-[320px]">
          {categories.map((item) => (
            <CategoryCard key={uuidv4()} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
