"use client";
import CategoryCard from "../cards/CategoryCard";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

export default function Categories() {
  const categories = [
    {
      imageLink:
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop",
      category: "Sales and Marketing",
      SearchKeywords:
        "digital marketing sales strategies market analysis branding",
      span: "md:col-span-6",
      delay: 0,
    },
    {
      imageLink:
        "https://plus.unsplash.com/premium_photo-1679923813998-6603ee2466c5?q=80&w=1200&auto=format&fit=crop",
      category: "Finance and Accounting",
      SearchKeywords: "accounting finance budgeting auditing tax analysis",
      span: "md:col-span-6",
      delay: 0.1,
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop",
      category: "Customer Service",
      SearchKeywords:
        "customer support client relations service management crm tools",
      span: "md:col-span-4",
      delay: 0.2,
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1581092157699-83c90752400a?q=80&w=1200&auto=format&fit=crop",
      category: "Engineering",
      SearchKeywords:
        "react node software development mechanical civil electrical",
      span: "md:col-span-4",
      delay: 0.3,
    },
    {
      imageLink:
        "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=1200&auto=format&fit=crop",
      category: "Healthcare",
      SearchKeywords:
        "nursing doctor patient care medical research health services",
      span: "md:col-span-4",
      delay: 0.4,
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      category: "Education and Training",
      SearchKeywords: "teaching curriculum training elearning education tools",
      span: "md:col-span-5",
      delay: 0.5,
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=1200&auto=format&fit=crop",
      category: "Human Resources",
      SearchKeywords:
        "recruitment hr policies employee engagement talent management",
      span: "md:col-span-7",
      delay: 0.6,
    },
  ];

  return (
    <section className="w-full bg-[#08080a] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            Browse <span className="text-blue-500">Career Fields</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4">
            Select a category to explore specialized job opportunities.
          </p>
        </motion.div>

        {/* Mosaic Grid: col-1 on mobile, col-12 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[280px] md:auto-rows-[340px]">
          {categories.map((item) => (
            <CategoryCard key={uuidv4()} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
