"use client";
import FilterCard from "@/components/cards/FilterCard";
import JobPostCard from "@/components/cards/JobPostCard";
import NoResult from "@/components/caseHandlers/NoResult";
import { pushResult, toggleLoading } from "@/features/SearchSlice";
import { RootState } from "@/store/Store";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { Drawer } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import TimeStampToAgo from "@/helpers/TimeStampToAgo";
import Loading from "react-loading";
import Image from "next/image";
import EachJobType from "@/types/EachJobType";

export default function Page() {
   return (
      <div className="w-full h-[100vh] flex justify-center items-center">
         <ListOfJobs />
      </div>
   );
}

const ListOfJobs = () => {
   const [JobData, setJobData] = useState<EachJobType[]>([]);
   let searchResult = useSelector((state: RootState) => state.SearchSlice.results);
   let filterResult = useSelector((state: RootState) => state.SearchSlice.filterResults);
   let jobsLoading = useSelector((state: RootState) => state.SearchSlice.loading);
   const [showPleaseHandler, setShowPleaseHandler] = useState<boolean>(false);

   const dispatch = useDispatch();
   const FetchAllJobs = async () => {
      const API = process.env.NEXT_PUBLIC_API + "/api/getJobs/allJobs";
      try {
         dispatch(toggleLoading());
         let response = await axios.get(API);
         setJobData(response.data.jobs.reverse());
      } catch (error) {
         console.log(error);
      }
      dispatch(toggleLoading());
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
         let isSearching = localStorage.getItem("isSearching");
         if (!isSearching || isSearching !== "yes") {
            setShowPleaseHandler(true);
         }
      }
   }, []);

   const [open, setOpen] = useState<boolean>(false);
   const showDrawer = () => {
      setOpen(true);
   };
   const onClose = () => {
      setOpen(false);
   };

   return (
      <div className=" flex justify-center items-center overflow-x-hidden relative md:pt-[10rem] ">
         <div
            className={`hidden md:flex lg:flex flex-col w-[400px] h-[110vh] justify-start py-[5%] items-center relative `}
         >
            <div className=" relative ">
               {showPleaseHandler && (
                  <div className=" w-full h-full absolute inset-0 z-[100] bg-transparent rounded-xl backdrop-blur-[2px]"></div>
               )}
               <FilterCard />
            </div>
         </div>
         <div
            className=" md:hidden lg:hidden absolute top-[5%] right-2 rotate-90 z-[1]"
            onClick={() => showDrawer()}
         >
            <HiOutlineAdjustmentsVertical size={26} />
         </div>

         <Drawer
            style={{ background: "white", padding: "0px" }}
            placement="right"
            width={"300px"}
            onClose={onClose}
            open={open}
         >
            <FilterCard />
         </Drawer>
         <div className=" flex flex-col w-[700px] h-[110vh] gap-[20px] overflow-y-scroll p-[10px] pt-[20%] md:pt-[60px] lg:pt-[60px]">
            {showPleaseHandler && !jobsLoading && <PleaseSearchHandler />}
            {jobsLoading ? (
               <div className=" w-full h-[90%] flex justify-center items-center">
                  <Loading type="spin" color="gray" width={30} height={30} />
               </div>
            ) : JobData.length > 0 ? (
               JobData.map((job) => {
                  let showJob = true;
                  let postedOn = TimeStampToAgo(job.postedOn ?? "");
                  // if (postedOn.includes("d")) {
                  //    let days = postedOn.substring(0, postedOn.indexOf("d"));
                  //    // if (parseInt(days)>60) {
                  //    //    showJob = false;
                  //    // }
                  // }
                  return showJob ? (
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
                  ) : null;
               })
            ) : (
               !showPleaseHandler && <NoJobsHandler />
            )}
         </div>
         <div className=" hidden md:flex lg:flex flex-col w-[400px] h-[110vh]"></div>
      </div>
   );
};

const NoJobsHandler = () => {
   return (
      <div className=" w-full h-[90%] flex justify-center items-center gap-4">
         <div>
            <Image src="/nojobs.svg" alt="nojob" width={100} height={100} />
         </div>
         <div className="text-[1.2rem]">Sorry! No jobs found</div>
      </div>
   );
};

const PleaseSearchHandler = () => {
   return <div>Please Search any keyword to explore Jobs</div>;
};
