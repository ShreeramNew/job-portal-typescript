"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, message } from "antd";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi2";

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
  openings?: number;
  applicants?: number;
}

export default function JobHighlight({
  id,
  role,
  company,
  minYear,
  maxYear,
  minSalary,
  maxSalary,
  location,
  skills,
  openings,
  applicants,
}: PropsType) {
  const [applied, setApplied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleApply = async () => {
    const API = "/api/applyForJob";
    try {
      const uid = typeof window !== "undefined" ? localStorage.getItem("uid") ?? "" : "";
      if (uid !== "") {
        setLoading(true);
        await axios.patch(API, { jobId: id }, { withCredentials: true });
        setApplied(true);
        message.success("Application submitted successfully!");
      } else {
        if (typeof window !== "undefined") {
          localStorage.setItem("applying", JSON.stringify({ isApplying: true, jobId: id }));
        }
        router.push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.msg || "Failed to submit application!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-5 sm:p-6 bg-white border border-slate-200/70 rounded-xl shadow-sm flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <div className="flex gap-4 items-start">
          <div className="w-14 h-14 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center justify-center text-slate-400 shadow-inner">
            <PiSuitcaseSimpleLight size={28} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">{role || "Job Role"}</h2>
            <p className="text-sm font-semibold text-slate-500 mt-0.5">{company || "Corporate Entity"}</p>
          </div>
        </div>
        <div className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600 border border-slate-200/20">
          <FaBusinessTime size={14} className="text-slate-400" />
          <span>{minYear}-{maxYear} Yrs Exp</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 font-medium bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
        <div className="flex items-center gap-2">
          <GiMoneyStack size={18} className="text-slate-400" />
          <span>₹{minSalary}LPA - ₹{maxSalary}LPA</span>
        </div>
        <div className="flex items-center gap-2">
          <MdOutlineLocationOn size={18} className="text-slate-400" />
          <span>{location || "Location Variant"}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center w-full">
        {skills?.map((skill, idx) => (
          <span key={idx} className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 border border-indigo-100/50 rounded-md text-indigo-600">
            {skill.trim()}
          </span>
        ))}
      </div>

      <div className="h-px bg-slate-100 w-full" />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 bg-slate-100/40 px-4 py-2 rounded-lg border border-slate-200/20">
          <div className="flex items-center gap-1.5">
            <FaUserTie className="text-slate-400" />
            <span>Openings: <strong className="text-slate-800 font-bold">{openings || 1}</strong></span>
          </div>
          <div className="w-px h-3 bg-slate-300" />
          <div className="flex items-center gap-1.5">
            <HiOutlineDocumentText size={14} className="text-slate-400" />
            <span>Applicants: <strong className="text-slate-800 font-bold">{applicants || 140}</strong></span>
          </div>
        </div>

        <Button
          onClick={handleApply}
          loading={loading}
          disabled={applied}
          type="primary"
          className={`h-10 px-6 font-semibold rounded-xl text-sm transition-all shadow-sm ${
            !applied
              ? "bg-indigo-600 hover:!bg-indigo-700 border-none text-white"
              : "bg-slate-100 !text-slate-400 !border-slate-200 cursor-not-allowed shadow-none"
          }`}
        >
          {applied ? "Applied" : "Apply to Position"}
        </Button>
      </div>
    </div>
  );
}