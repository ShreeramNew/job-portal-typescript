"use client";
import ApplicantCard from "@/components/dashboard/ApplicantCard";
import applicantDataType from "@/types/ApplicantsDataType";
import { message } from "antd";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "react-loading";

export default function Page() {
   const { slug } = useParams();
   const [applicants, setAppicants] = useState<applicantDataType[]>([{}]);
   const [loading, setLoading] = useState<boolean>(false);

   const fetchApplicants = async () => {
      const API = process.env.NEXT_PUBLIC_API + "/api/getApplicants/savedApplicants?jobId=" + slug;
      try {
         setLoading(true);
         let response = await axios.get(API, { withCredentials: true });
         setAppicants(response.data.ApplicantsDetails);
      } catch (error) {
         if (axios.isAxiosError(error)) {
            message.error(error.response?.data.msg);
         }
         console.log(error);
      }
      setLoading(false);
   };

   useEffect(() => {
      fetchApplicants();
   }, []);

   return (
      <div className="h-screen w-screen overflow-scroll border- border-red-900 mt-[20%] md:mt-0 z-[90]">
         <div className=" w-full  border- border-green-900 grid md:grid-cols-4 p-[2%] gap-[10px] md:gap-[2%]  ">
            {loading ? (
               <Loading type="spin" width={24} height={24} />
            ) : (
               applicants.map((applicant) => (
                  <ApplicantCard
                     key={applicant.profileId}
                     uid={applicant.uid}
                     jobId={Array.isArray(slug)?slug[0]:slug}
                     name={applicant.username}
                     bio={applicant.bio}
                     profileId={applicant.profileId}
                     profilePic={applicant.profile}
                     resume={applicant.resume}
                     isSaved={true}
                  />
               ))
            )}
         </div>
      </div>
   );
}
