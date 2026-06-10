"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { message } from "antd";
import { BsCaretRightFill } from "react-icons/bs";

// Separate Decomposed Custom Components
import JobHighlight from "@/components/cards/JobHighlight";
import ContactCard from "@/components/cards/ContactCard";
import JobPostCard from "@/components/cards/JobPostCard";
import {
  JobDetailSkeleton,
  SidebarSkeleton,
} from "@/components/loading/DetailsSkeleton";

// Services & Global Helpers
import api from "@/config/api";
import TimeStampToAgo from "@/helpers/TimeStampToAgo";

interface JobDataType {
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
  Responsibilities?: string[];
  Requirements?: string[];
  openings?: number;
  jobType?: string;
  applicants?: number;
}

interface CompanyData {
  _id?: string;
  employerId?: string;
  companyName?: string;
  bio?: string;
  location?: string;
  phone?: number;
  website?: string;
  linkedin?: string;
  whyWorkWithUS?: string;
  aboutTeam?: string;
  aboutEnvoirnment?: string;
  __v?: number;
  email?: string;
}

export default function Page() {
  type loadingType = { jobsLoading: boolean; similarJobsLoading: boolean };

  const { slug } = useParams();
  const [isDescriptionOpen, SetIsDescriptionOpen] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [companyData, setCompanyData] = useState<CompanyData>({});
  const [JobData, setJobData] = useState<JobDataType>({});
  const [contentLoading, setcontentLoading] = useState<loadingType>({
    jobsLoading: false,
    similarJobsLoading: false,
  });

  type EachJobType = {
    _id: string;
    employerId: string;
    company: string;
    jobTitle: string;
    jobType: string;
    location: string;
    minSalary: number;
    maxSalary: number;
    responsibilities: string;
    requirements: string;
    skills: string;
    minExp: number;
    maxExp: number;
    openings: number;
    __v: number;
    postedOn: string;
  };
  const [SimilarJobs, setSimilarJobs] = useState<EachJobType[]>([]);

  const fetchCompanyDetails = async (empId: string) => {
    if (!empId) return;
    try {
      const response = await api.get("/api/getProfile/employer?empId=" + empId);
      setCompanyData(response.data.profile);
    } catch (error) {
      setIsError(true);
      if (axios.isAxiosError(error)) message.error(error.response?.data.msg);
    }
  };

  const FetchJobDetails = async () => {
    try {
      setcontentLoading((prev) => ({ ...prev, jobsLoading: true }));
      const response = await api.get("/api/getJobDetails?jobId=" + slug);
      const details = response.data.jobDetails;

      const formatTextToArray = (rawText: string | undefined): string[] => {
        if (!rawText) return [];
        
        // Splits lookahead sentences safely on trailing space contexts (Preserves terms like Node.js, Pvt Ltd.)
        const parsedArray = rawText
          .split(/(?<=[.!?])\s+/)
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 0);

        return parsedArray.length > 0 ? parsedArray : [rawText.trim()];
      };

      const requirements = formatTextToArray(details.requirements);
      const responsibilities = formatTextToArray(details.responsibilities);
      const skills = details.skills ? details.skills.split(",") : ["General"];

      setJobData({
        id: details._id,
        role: details.jobTitle,
        company: details.company,
        minYear: details.minExp,
        maxYear: details.maxExp,
        minSalary: details.minSalary,
        maxSalary: details.maxSalary,
        location: details.location,
        skills,
        time: "",
        Responsibilities: responsibilities,
        Requirements: requirements,
        openings: details.openings,
        jobType: details.jobType,
        applicants: details.applicants,
      });

      fetchCompanyDetails(details.employerId);
    } catch (error) {
      if (axios.isAxiosError(error)) console.error(error.response?.data.msg);
    } finally {
      setcontentLoading((prev) => ({ ...prev, jobsLoading: false }));
    }
  };

  const FetchSimilarJobs = async () => {
    try {
      setcontentLoading((prev) => ({ ...prev, similarJobsLoading: true }));
      const response = await api.get("/api/getJobs/similarJobs?jobId=" + slug);
      setSimilarJobs(response.data.jobs);
    } catch (error) {
      if (axios.isAxiosError(error)) message.error(error.response?.data.msg);
      setIsError(true);
    } finally {
      setcontentLoading((prev) => ({ ...prev, similarJobsLoading: false }));
    }
  };

  useEffect(() => {
    FetchJobDetails();
    FetchSimilarJobs();
  }, [slug]);

  if (isError) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center text-slate-500 gap-2">
        <span className="text-lg font-medium">Unable to load job details.</span>
        <p className="text-sm text-slate-400">
          Please try refreshing the stream layout.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pt-[80px] md:pt-[96px]">
      <div className="max-w-7xl w-full mx-auto px-4 py-6 md:py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN COMPONENT LAYER */}
        <div className="md:col-span-7 w-full md:sticky md:top-[116px] max-h-none md:max-h-[calc(100vh-140px)] md:overflow-y-auto pr-0 md:pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {contentLoading.jobsLoading ? (
            <JobDetailSkeleton />
          ) : (
            <div className="flex flex-col gap-6 pb-4">
              <JobHighlight {...JobData} />

              <div className="w-full bg-white border border-slate-200/70 rounded-xl shadow-sm overflow-hidden p-5 md:p-6">
                <div className="flex gap-6 border-b border-slate-100 pb-3">
                  <button
                    onClick={() => SetIsDescriptionOpen(true)}
                    className={`pb-2 text-sm font-semibold transition-all relative ${isDescriptionOpen ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    Job Description
                    {isDescriptionOpen && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => SetIsDescriptionOpen(false)}
                    className={`pb-2 text-sm font-semibold transition-all relative ${!isDescriptionOpen ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    About Company
                    {!isDescriptionOpen && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                      />
                    )}
                  </button>
                </div>

                <div className="mt-6 text-sm text-slate-600 leading-relaxed">
                  <AnimatePresence mode="wait">
                    {isDescriptionOpen ? (
                      <motion.div
                        key="description"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex flex-col gap-5"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium">
                          <div className="flex gap-2">
                            <span className="text-slate-400">Title:</span>{" "}
                            <span className="text-slate-800 font-semibold">
                              {JobData.role}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-slate-400">Company:</span>{" "}
                            <span className="text-slate-800">
                              {JobData.company}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-slate-400">Location:</span>{" "}
                            <span className="text-slate-800">
                              {JobData.location}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-slate-400">Job Type:</span>{" "}
                            <span className="text-slate-800">
                              {JobData.jobType || "Full-time"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-slate-900 text-base mb-3">
                            Key Responsibilities:
                          </h4>
                          <div className="flex flex-col gap-2.5">
                            {JobData.Responsibilities && JobData.Responsibilities.length > 0 ? (
                              JobData.Responsibilities.map((point, index) => (
                                <BulletPoints key={index} point={point} />
                              ))
                            ) : (
                              <p className="text-slate-400 italic">No specific responsibilities specified.</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-slate-900 text-base mb-3">
                            Required Qualifications:
                          </h4>
                          <div className="flex flex-col gap-2.5">
                            {JobData.Requirements && JobData.Requirements.length > 0 ? (
                              JobData.Requirements.map((point, index) => (
                                <BulletPoints key={index} point={point} />
                              ))
                            ) : (
                              <p className="text-slate-400 italic">No explicit requirements specified.</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="about"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex flex-col gap-5"
                      >
                        <div>
                          <h4 className="font-bold text-slate-900 text-base mb-2">
                            About Us
                          </h4>
                          <p>
                            {companyData.bio || "No bio details configured."}
                          </p>
                        </div>
                        {companyData.whyWorkWithUS && (
                          <div>
                            <h4 className="font-bold text-slate-900 text-base mb-2">
                              Why Work With Us?
                            </h4>
                            <p>{companyData.whyWorkWithUS}</p>
                          </div>
                        )}
                        <div className="h-px bg-slate-100 my-1" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-base mb-3">
                            Corporate Contacts
                          </h4>
                          <ContactCard
                            email={companyData.email}
                            phone={companyData.phone}
                            website={companyData.website}
                            social={companyData.linkedin}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR COLUMN */}
        <aside className="md:col-span-5 flex flex-col gap-4 w-full">
          <h3 className="text-slate-900 font-bold text-lg px-1">
            Similar Strategic Openings
          </h3>
          <div className="flex flex-col gap-4 w-full">
            {contentLoading.similarJobsLoading ? (
              <>
                <SidebarSkeleton />
                <SidebarSkeleton />
              </>
            ) : (
              SimilarJobs.map((job) => (
                <JobPostCard
                  key={job._id}
                  id={job._id}
                  role={job.jobTitle}
                  company={job.company}
                  minYear={job.minExp}
                  maxYear={job.maxExp}
                  minSalary={job.minSalary}
                  maxSalary={job.maxSalary}
                  location={job.location}
                  skills={job.skills?.split(",").slice(0, 4)}
                  time={TimeStampToAgo(job.postedOn)}
                />
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

const BulletPoints = ({ point }: { point: string }) => (
  <div className="flex items-start gap-2.5 text-slate-600">
    <span className="mt-1 text-indigo-500 shrink-0">
      <BsCaretRightFill size={12} />
    </span>
    <p className="text-sm leading-normal">{point}</p>
  </div>
);