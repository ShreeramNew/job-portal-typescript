"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { FiCheckCircle, FiUsers, FiBriefcase } from "react-icons/fi";

export default function Header() {
  const router = useRouter();

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.7, ease: [0.2, 0.65, 0.3, 1] },
    }),
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col lg:justify-center  items-center bg-[#08080a] overflow-hidden px-6">
      {/* 1. THE SPACER: Accounts for the fixed Navbar height (~80px) */}
      <div className="h-[80px] w-full shrink-0" />

      {/* 2. THE CONTENT WRAPPER: Constrained to 6xl for that "scaled down" feel */}
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* LEFT CONTENT: Scaled typography */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div initial="hidden" animate="visible">
              <motion.div
                custom={0}
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 text-[11px] font-medium mb-6"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                </span>
                2,400+ new roles listed today
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
              >
                Where Ambitions <br />
                <span className="text-blue-500 italic font-medium">
                  Meet Opportunities
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeInUp}
                className="text-gray-400 text-sm md:text-base max-w-md mb-8 leading-relaxed font-light mx-auto lg:mx-0"
              >
                Connecting elite talent with innovative companies. Experience a
                hiring process designed for the modern professional.
              </motion.p>

              {/* ACTION BUTTONS */}
              <motion.div
                custom={3}
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/login")}
                  className="group px-7 py-3 bg-white text-black rounded-lg font-bold text-sm uppercase tracking-wide flex items-center gap-2 transition-all hover:bg-gray-100 shadow-lg shadow-white/5"
                >
                  Register Now
                  <GoArrowUpRight className="text-lg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>

                <button
                  onClick={() => router.push("/main/jobs")}
                  className="group text-gray-500 font-semibold text-sm uppercase tracking-wide hover:text-white transition-all flex items-center gap-2"
                >
                  Explore Jobs
                  <span className="block w-0 h-[1.5px] bg-blue-500 transition-all group-hover:w-4" />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT CONTENT: Scaled down illustration & cards */}
          <div className="flex-1 relative flex justify-center items-center">
            <div className="relative w-[240px] h-[240px] md:w-[380px] md:h-[380px]">
              {/* THE AWESOME FLOATING CARDS (Glassmorphism) */}
              <FloatingCard
                delay={0}
                className="-top-4 -left-6 md:-left-10"
                icon={<FiCheckCircle className="text-green-400" />}
                label="Match: 98%"
              />
              <FloatingCard
                delay={1.2}
                className="bottom-6 -right-4 md:-right-8"
                icon={<FiUsers className="text-blue-400" />}
                label="12 Profile Views"
              />
              <FloatingCard
                delay={2.4}
                className="top-1/2 -translate-y-1/2 -left-8 hidden md:flex"
                icon={<FiBriefcase className="text-purple-400" />}
                label="Remote Role"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="w-full h-full relative"
              >
                <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
                <Image
                  alt="Hero Illustration"
                  src="/header-poster.svg"
                  fill
                  priority
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. OPTIONAL: Scroll Indicator (Adds to the 100vh vibe) */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gray-600 to-transparent" />
      </motion.div> */}
    </section>
  );
}

// THE FLOATING CARD COMPONENT
function FloatingCard({
  className,
  icon,
  label,
  delay,
}: {
  className: string;
  icon: React.ReactNode;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { delay: 1, duration: 0.5 },
        y: { delay: delay, duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`absolute z-20 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2.5 rounded-xl flex items-center gap-2.5 shadow-xl pointer-events-none ${className}`}
    >
      <div className="p-1.5 bg-white/5 rounded-lg text-sm">{icon}</div>
      <span className="text-white text-[11px] font-semibold tracking-tight whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}
