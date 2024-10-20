"use client";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import type { CollapseProps } from "antd";
import { Collapse, Spin } from "antd";
import { div } from "framer-motion/client";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function Page() {
   console.log("I am my Job");

   type JobType = {
      jobId?: string;
      title?: string;
      applicants?: number;
      postedOn?: string;
      expiresOn?: string;
   };
   const [myJobs, setMyJobs] = useState<JobType[]>([]);

   const [loading, setLoading] = useState<boolean>(false);
   let API = process.env.NEXT_PUBLIC_API + "/api/getJobs/employer";

   const fetchJobs = async () => {
      try {
         setLoading(true);
         let response = await axios.get(API, { withCredentials: true });
         setMyJobs(response.data.jobs.reverse());
      } catch (error) {
         console.log(error);
      }
      setLoading(false);
   };

   useEffect(() => {
      fetchJobs();
   }, []);

   const items: CollapseProps["items"] = myJobs.map(
      ({ title, applicants, postedOn, expiresOn, jobId }: JobType) => {
         return {
            key: jobId,
            label: title,
            children: (
               <EachRow
                  key={jobId}
                  id={jobId}
                  title={title}
                  applicants={applicants}
                  postedOn={postedOn}
                  expiresOn={expiresOn}
               />
            ),
         };
      }
   );

   const onChange = (key: string | string[]) => {
      console.log(key);
   };
   return (
      <div className="mt-[20%] md:mt-0 h-auto w-[100%] md:h-screen border- border-red-900  md:w-screen md:flex">
         {loading ? (
            <Spin />
         ) : (
            <div className="md:w-[90%]">
               <div className=" md:hidden md:h-screen text-xl font-bold text-gray-700 p-[2%]">
                  MyJobs
               </div>
               <div className="border- border-green-900 w-full h-auto md:h-[100%] md:overflow-y-scroll p-[2%]">
                  <Collapse
                     expandIconPosition="end"
                     items={items}
                     defaultActiveKey={[myJobs[0]?.jobId ?? ""]}
                     onChange={onChange}
                  />
               </div>
            </div>
         )}
      </div>
   );
}

interface PropsType {
   id?: string;
   title?: string;
   applicants?: number;
   postedOn?: string;
   expiresOn?: string;
}

const EachRow = ({ title, applicants, postedOn, expiresOn, id }: PropsType) => {
   const router = useRouter();
   const StyleOfButton =
      "flex gap-[2px] border-2 bg-blue-600 rounded-lg px-[3%] py-[1%] md:px-[1%] md:py-[0.2%] text-gray-300 cursor-pointer";

   return (
      <div className="">
         <div className="">
            <div>
               <span className="text-gray-700 font-bold">Applicants:</span>
               {applicants}
            </div>
            <div>
               <span className="text-gray-700 font-bold">Posted On:</span>
               {postedOn}
            </div>
            <div>
               <span className="text-gray-700 font-bold">Expires on:</span>
               {expiresOn}
            </div>
         </div>
         <div className="flex justify-center md:justify-start items-center gap-[20px] mt-[2%]">
            <div className={StyleOfButton} onClick={() => router.push("/editJobDetail/" + id)}>
               <CiEdit size={23} title="Edit" />
               Edit
            </div>
            <div className={StyleOfButton} onClick={() => router.push("/main/jobDetail/" + id)}>
               <FiEye size={23} title="View" />
               View
            </div>
            <div className={StyleOfButton}>
               <MdDelete size={23} title="Delete" />
               Delete
            </div>
         </div>
      </div>
   );
};
