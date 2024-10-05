"use client";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
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

   return (
      <div className="h-screen  w-screen flex justify-center items-center">
         <div className="border-2 border-gray-400 rounded-lg scale-[0.4] md:scale-[1.2] w-[90%] overflow-hidden">
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
   const [active, setActive] = useState<number>(0);
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
               <CiEdit
                  onMouseOver={() => setActive(1)}
                  onMouseLeave={() => setActive(0)}
                  color={active === 1 ? "blue" : "#424242"}
                  size={15}
                  title="Edit"
                  className=" cursor-pointer"
               />
               <FiEye
                  onMouseOver={() => setActive(2)}
                  onMouseLeave={() => setActive(0)}
                  color={active === 2 ? "blue" : "#424242"}
                  size={15}
                  title="View"
                  className=" cursor-pointer"
               />
               <MdDelete
                  onMouseOver={() => setActive(3)}
                  onMouseLeave={() => setActive(0)}
                  color={active === 3 ? "blue" : "#424242"}
                  size={15}
                  title="Delete"
                  className=" cursor-pointer"
               />
            </div>
         </td>
      </tr>
   );
};
