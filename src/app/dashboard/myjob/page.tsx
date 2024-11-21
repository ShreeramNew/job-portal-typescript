"use client";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import type { CollapseProps } from "antd";
import { Collapse, Spin, Button, message, Popconfirm } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import type { PopconfirmProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { triggerRefresh } from "@/features/GeneralSlice";
import { RootState } from "@/store/Store";
import Image from "next/image";

export default function Page() {
   type JobType = {
      jobId?: string;
      title?: string;
      applicants?: number;
      postedOn?: string;
      expiresOn?: string;
      savedApplicants?:number;
   };
   const [myJobs, setMyJobs] = useState<JobType[]>([]);
   const refresh = useSelector((state: RootState) => state.GeneralSlice.refresh);

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
   }, [refresh]);

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
         ) : myJobs.length > 0 ? (
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
         ) : (
            <HandleNoJob />
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
   const dispatch = useDispatch();
   //----------------------------Related to delete Job----------------------------
   const confirm: PopconfirmProps["onConfirm"] = async (e) => {
      const DeleteAPI = process.env.NEXT_PUBLIC_API + "/api/deleteJob?jobId=" + id;
      try {
         let response = await axios.delete(DeleteAPI, { withCredentials: true });
         message.success(response.data.msg);
         dispatch(triggerRefresh());
      } catch (error) {
         if (axios.isAxiosError(error)) {
            message.error(error.response?.data.msg);
         }
      }
   };

   const cancel: PopconfirmProps["onCancel"] = (e) => {
      return;
   };

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
            <Popconfirm
               title="Delete the Job"
               description="Are you sure to delete this Job?"
               onConfirm={confirm}
               onCancel={cancel}
               okText="Yes"
               cancelText="No"
            >
               <div className={StyleOfButton}>
                  <MdDelete size={23} title="Delete" />
                  Delete
               </div>
            </Popconfirm>
         </div>
      </div>
   );
};

const HandleNoJob = () => {
   const router = useRouter();

   return (
      <div className=" w-full h-full flex justify-center items-center flex-col gap-4">
         <div className=" border- border-black flex gap-2 justify-center items-center ">
            <div>
               <Image src={"/nojobs.svg"} alt="No Jobs" width={100} height={100} />
            </div>
            <div className="text-[1.5rem]">You haven't posted any jobs!</div>
         </div>
        
      </div>
   );
};
