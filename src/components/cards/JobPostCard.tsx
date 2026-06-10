"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";

interface PropsType {
   id?: string;
   role?: string;
   company?: string;
   minYear?: number;
   maxYear?: number;
   minSalary?: number;
   maxSalary?: number;
   location?: string;
   skills?: string[];
   time?: string;
}

export default function JobPostCard({
   id,
   role,
   company,
   minYear,
   maxYear,
   minSalary,
   maxSalary,
   location,
   skills,
   time,
}: PropsType) {
   const router = useRouter();

   return (
      <div
         onClick={() => router.push("/main/jobDetail/" + id)}
         className="w-full p-5 sm:p-6 bg-white border border-slate-200/70 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col gap-4 group"
      >
         {/* Top Heading Block */}
         <div className="flex items-start justify-between gap-4 w-full">
            <div className="flex gap-4 items-start">
               {/* Icon Display */}
               <div className="w-12 h-12 shrink-0 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50/50 transition-colors">
                  <PiSuitcaseSimpleLight size={24} />
               </div>
               
               {/* Identity Text */}
               <div>
                  <h3 className="font-semibold text-slate-900 text-base sm:text-lg group-hover:text-indigo-600 transition-colors line-clamp-1">
                     {role || "Job Role"}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">{company || "Company Name"}</p>
               </div>
            </div>

            {/* Experience pill badge */}
            <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
               <FaBusinessTime size={14} className="text-slate-400" />
               <span>{minYear}-{maxYear} Yrs</span>
            </div>
         </div>

         {/* Core Context Block (Salary & Location) */}
         <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
               <GiMoneyStack size={16} className="text-slate-400 shrink-0" />
               <span>₹{minSalary}LPA - ₹{maxSalary}LPA</span>
            </div>
            <div className="flex items-center gap-1.5">
               <MdOutlineLocationOn size={16} className="text-slate-400 shrink-0" />
               <span>{location || "Location unlisted"}</span>
            </div>
         </div>

         {/* Visual Section Divider */}
         <div className="h-px w-full bg-slate-100" />

         {/* Footer Row (Skills & Timestamp) */}
         <div className="flex items-center justify-between gap-4 flex-wrap w-full mt-1">
            {/* Tech Tags */}
            <div className="flex items-center gap-2 flex-wrap max-w-[75%]">
               {skills?.map((skill, idx) => (
                  <SkillCard key={idx} title={skill.trim()} />
               ))}
            </div>

            {/* Post Timing */}
            <div className="flex items-center gap-1 text-xs font-medium text-slate-400 ml-auto shrink-0">
               <IoTimeOutline size={14} />
               <span>{time || "Recent"} ago</span>
            </div>
         </div>
      </div>
   );
}

const SkillCard = ({ title }: { title: string }) => {
   return (
      <span className="text-xs font-medium px-2.5 py-1 bg-slate-50 border border-slate-200/60 rounded-md text-slate-600 hover:bg-slate-100 transition-colors">
         {title}
      </span>
   );
};