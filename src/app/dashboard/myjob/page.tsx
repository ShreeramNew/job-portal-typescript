"use client";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { div } from "framer-motion/client";
export default function Page() {
   const MyJobs = [
      {
         jobId: "sbdn53yebdj",
         title: "Full Stack Developer",
         applicants: 22,
         postedOn: "24th Sep, 2024",
         expiresOn: "14th Nov, 2024",
      },
      {
         jobId: "abc123xyz456",
         title: "Frontend Developer",
         applicants: 30,
         postedOn: "25th Sep, 2024",
         expiresOn: "15th Nov, 2024",
      },
      {
         jobId: "def456ghi789",
         title: "Backend Developer",
         applicants: 18,
         postedOn: "26th Sep, 2024",
         expiresOn: "16th Nov, 2024",
      },
      {
         jobId: "jkl987mno321",
         title: "UI/UX Designer",
         applicants: 10,
         postedOn: "27th Sep, 2024",
         expiresOn: "17th Nov, 2024",
      },
      {
         jobId: "pqr543stu876",
         title: "Data Scientist",
         applicants: 40,
         postedOn: "28th Sep, 2024",
         expiresOn: "18th Nov, 2024",
      },
      {
         jobId: "vwx901yz234",
         title: "DevOps Engineer",
         applicants: 15,
         postedOn: "29th Sep, 2024",
         expiresOn: "19th Nov, 2024",
      },
   ];

   const items: CollapseProps["items"] = MyJobs.map(
      ({ title, applicants, postedOn, expiresOn, jobId }) => {
         return {
            key: jobId,
            label: title,
            children: (
               <EachRowForMobile
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
      <div className="mt-[20%] md:mt-0 h-auto w-[100%] md:h-screen border- border-red-900  md:w-screen md:flex justify-center items-center">
         <div className="hidden md:block border-2 border-gray-300 rounded-lg scale-[1.2] overflow-hidden shadow-2xl">
            <table className="">
               <thead>
                  <tr>
                     <th className=" border border-l-0 border-gray-400 border-t-0">Title</th>
                     <th className=" border border-gray-400 border-t-0  ">Applicants</th>
                     <th className=" border border-gray-400 border-t-0  ">Posted on</th>
                     <th className=" border border-gray-400 border-t-0  ">Expires on</th>
                     <th className=" border border-gray-400 border-t-0 border-r-0 ">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {MyJobs.map(({ jobId, title, applicants, postedOn, expiresOn }) => (
                     <EachRow
                        key={jobId}
                        id={jobId}
                        title={title}
                        applicants={applicants}
                        postedOn={postedOn}
                        expiresOn={expiresOn}
                     />
                  ))}
               </tbody>
            </table>
         </div>
         <div className=" md:hidden">
            <div className=" text-xl font-bold text-gray-700 p-[2%]">MyJobs</div>
            <div className="border- border-green-900 w-full h-auto p-[2%]">
               <Collapse
                  expandIconPosition="end"
                  items={items}
                  defaultActiveKey={MyJobs[0].jobId}
                  onChange={onChange}
               />
            </div>
         </div>
      </div>
   );
}

interface PropsType {
   id: string;
   title: string;
   applicants: number;
   postedOn: string;
   expiresOn: string;
}
const EachRow = ({ title, applicants, postedOn, expiresOn, id }: PropsType) => {
   return (
      <tr>
         <td className=" border border-gray-400 border-b-0 text-center border-l-0  py-[1%] px-[10px] text-[0.9rem]">
            {title}
         </td>
         <td className=" border border-gray-400 border-b-0 text-center  py-[1%] px-[10px] text-[0.9rem]">
            {applicants}
         </td>
         <td className=" border border-gray-400 border-b-0 text-center  py-[1%] px-[10px] text-[0.9rem]">
            {postedOn}
         </td>
         <td className=" border border-gray-400 border-b-0 text-center  py-[1%] px-[10px] text-[0.9rem]">
            {expiresOn}
         </td>
         <td className=" border border-gray-400 border-b-0 text-center  py-[1%] px-[10px] text-[0.9rem] border-r-0">
            <div className=" flex justify-center items-center gap-[10px]">
               <CiEdit size={15} title="Edit" className=" cursor-pointer hover:text-blue-600" />
               <FiEye size={15} title="View" className=" cursor-pointer hover:text-blue-600" />
               <MdDelete size={15} title="Delete" className=" cursor-pointer hover:text-blue-600" />
            </div>
         </td>
      </tr>
   );
};

const EachRowForMobile = ({ title, applicants, postedOn, expiresOn, id }: PropsType) => {
   const StyleOfButton =
      "flex gap-[2px] border-2 bg-blue-600 rounded-lg px-[3%] py-[1%] text-gray-300";

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
         <div className="flex justify-center items-center gap-[20px] mt-[2%]">
            <div className={StyleOfButton}>
               <CiEdit color="" size={23} title="Edit" />
               Edit
            </div>
            <div className={StyleOfButton}>
               <FiEye color="" size={23} title="View" />
               View
            </div>
            <div className={StyleOfButton}>
               <MdDelete color="" size={23} title="Delete" />
               Delete
            </div>
         </div>
      </div>
   );
};
