"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import Loading from "react-loading";
import Image from "next/image";

// Icons
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { PiSuitcaseSimpleLight } from "react-icons/pi";

// State & Utilities
import FilterCard from "@/components/cards/FilterCard";
import JobPostCard from "@/components/cards/JobPostCard";
import { toggleLoading } from "@/features/SearchSlice";
import { RootState } from "@/store/Store";
import api from "@/config/api";
import TimeStampToAgo from "@/helpers/TimeStampToAgo";
import EachJobType from "@/types/EachJobType";

export default function Page() {
  return (
    /* Clean layout wrapper that sits nicely under the fixed NavBar layout */
    <div className="w-full min-h-screen bg-slate-50/50 flex justify-center items-start selection:bg-indigo-100 pt-[30px] md:pt-[96px]">
      <ListOfJobs />
    </div>
  );
}

const ListOfJobs = () => {
  const [jobData, setJobData] = useState<EachJobType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [showPleaseHandler, setShowPleaseHandler] = useState<boolean>(false);

  const searchResult = useSelector(
    (state: RootState) => state.SearchSlice.results,
  );
  const filterResult = useSelector(
    (state: RootState) => state.SearchSlice.filterResults,
  );
  const jobsLoading = useSelector(
    (state: RootState) => state.SearchSlice.loading,
  );
  const dispatch = useDispatch();

  const FetchAllJobs = async () => {
    const API = "/api/getJobs/allJobs";
    try {
      dispatch(toggleLoading());
      const response = await api.get(API);
      setJobData(response.data.jobs.reverse());
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(toggleLoading());
    }
  };

  useEffect(() => {
    setJobData(searchResult);
    setShowPleaseHandler(false);
  }, [searchResult]);

  useEffect(() => {
    setJobData(filterResult);
    setShowPleaseHandler(false);
  }, [filterResult]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isSearching = localStorage.getItem("isSearching");
      if (!isSearching || isSearching !== "yes") {
        setShowPleaseHandler(true);
      }
    }
  }, []);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-8 md:py-8 grid grid-cols-1 md:grid-cols-[320px_1fr] lg:grid-cols-[360px_1fr] gap-8 items-start relative">
      {/* Desktop Sidebar Filter Layout */}
      <aside className="hidden md:block sticky top-24 bg- border-0 border-slate-200/80 rounded-2xl p-1 shadow-">
        <div className="relative">
          {showPleaseHandler && (
            <div className="w-full h-full absolute inset-0 z-50 bg-white/40 rounded-xl backdrop-blur-[1px]" />
          )}
          <FilterCard />
        </div>
      </aside>

      {/* Mobile Filter Float Button Action */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-xl hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center"
      >
        <HiOutlineAdjustmentsVertical size={24} />
      </button>

      {/* Mobile Filter Drawer Element */}
      <Drawer
        placement="right"
        width="320px"
        onClose={() => setOpen(false)}
        open={open}
        styles={{ body: { padding: "0px", backgroundColor: "" } }}
      >
        <FilterCard />
      </Drawer>

      {/* Job Listing Main Stream Feed Container */}
      <main className="w-full flex flex-col gap-4">
        {showPleaseHandler && !jobsLoading && <PleaseSearchHandler />}

        {jobsLoading ? (
          <div className="w-full py-24 flex justify-center items-center">
            <Loading type="spin" color="#4f46e5" width={36} height={36} />
          </div>
        ) : jobData.length > 0 ? (
          jobData.map((job) => (
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
              time={TimeStampToAgo(job.postedOn ?? "")}
            />
          ))
        ) : (
          !showPleaseHandler && <NoJobsHandler />
        )}
      </main>
    </div>
  );
};

const NoJobsHandler = () => {
  return (
    <div className="w-full py-16 px-4 bg-white border border-dashed border-slate-300/80 rounded-2xl flex flex-col gap-3 justify-center items-center text-center">
      <Image
        src="/nojobs.svg"
        alt="No matching jobs found"
        width={120}
        height={120}
        className="opacity-80"
      />
      <h4 className="text-lg font-semibold text-slate-800 mt-2">
        Sorry! No jobs found
      </h4>
      <p className="text-sm text-slate-500 max-w-xs">
        We couldn't find any openings matching your filters. Try broadening your
        criteria!
      </p>
    </div>
  );
};

const PleaseSearchHandler = () => {
  return (
    <div className="w-full py-16 px-4 bg-white border border-slate-200 rounded-2xl flex flex-col gap-3 justify-center items-center text-center shadow-sm">
      <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full mb-2">
        <PiSuitcaseSimpleLight size={40} />
      </div>
      <h4 className="text-lg font-semibold text-slate-800">
        Find your next opportunity
      </h4>
      <p className="text-sm text-slate-500 max-w-sm">
        Please type a keyword or select filters above to start exploring
        available job listings!
      </p>
    </div>
  );
};
