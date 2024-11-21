"use client";
import { message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "react-loading";
export default function Page() {
   type hightlightsType = {
      jobId?: string;
      title?: string;
      applicants?: number;
      postedOn?: string;
      expiresOn?: string;
      savedApplicants?:number;
   };

   const [jobs, setJobs] = useState<hightlightsType[]>([{}]);
   const [loading, setLoading] = useState<boolean>(true);

   const fetchJobHightlights = async () => {
      const API = process.env.NEXT_PUBLIC_API + "/api/getJobs/employer";
      try {
         setLoading(true);
         let response = await axios.get(API, { withCredentials: true });
         setJobs(response.data.jobs);
      } catch (error) {
         if (axios.isAxiosError(error)) {
            message.error(error.response?.data.msg);
         }
      }
      setLoading(false);
   };

   useEffect(() => {
      fetchJobHightlights();
   }, []);

   return (
      <div className=" w-screen px-[2rem]">
         <div className=" grid grid-cols-5 gap-2 borders py-[2rem]">
            {loading ? (
               <Loading type="spin" width={20} height={20} />
            ) : (
               jobs.map((job: hightlightsType) => (
                  <HighlightCards
                     key={job.jobId}
                     id={job.jobId ?? ""}
                     JobTitle={job.title ?? ""}
                     applicants={job.applicants ?? 0}
                  />
               ))
            )}
         </div>
      </div>
   );
}

const HighlightCards = ({
   id,
   JobTitle,
   applicants,
}: {
   id: string;
   JobTitle: string;
   applicants: number;

}) => {
   const router = useRouter();
   return (
      <div
         className=" flex flex-col justify-center items-center  h-[10rem] border-gray-400 border-2 cursor-pointer  rounded-xl"
         onClick={() => router.push("/dashboard/applicants/" + id)}
      >
         <div>{JobTitle}</div>
         <div>{applicants} applicants</div>
      </div>
   );
};
