"use client";
import Image from "next/image";
import { IoMdPerson } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { message } from "antd";

const ApplicantCard = ({
   uid,
   jobId,
   name,
   bio,
   profilePic,
   resume,
   isSaved,
}: {
   uid?: string;
   name?: string;
   jobId?: string;
   bio?: string;
   profilePic?: string;
   resume?: string;
   isSaved?: boolean;
}) => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [saved, setSaved] = useState<boolean>(isSaved ?? false);

   const handleSaveOrUnsave = async () => {
      let API: string = "";
      if (saved) {
         API = process.env.NEXT_PUBLIC_API + "/api/saveApplicants/unsave";
      } else {
         API = process.env.NEXT_PUBLIC_API + "/api/saveApplicants/save";
      }
      try {
         let payload = {
            jobId,
            applicantId: uid,
         };
         setLoading(true);
         let response = await axios.patch(API, payload, { withCredentials: true });
         setSaved(response.data.newResponse.savedApplicants.includes(uid));
      } catch (error) {
         if (axios.isAxiosError(error)) {
            message.error(error.response?.data.msg);
         }
      }
      setLoading(false);
   };

   return (
      <div className=" w-full h-[16vh] md:h-[42vh] border-2 border-gray-300 rounded-lg flex md:flex-col relative pt-[2%] ">
         <div className="w-full flex justify-center items-center">
            <div className=" w-[70px] h-[70px] md:w-[100px] md:h-[100px] overflow-hidden rounded-[100%] ">
               <Image
                  src={profilePic ?? ""}
                  alt="profile"
                  width={200}
                  height={200}
                  objectFit="cover"
               />
            </div>
         </div>
         <div className="border- border-red-900 h-[70%] md:h-[45%] w-[250%] md:w-[100%] ">
            <div className=" text-center text-gray-700 font-bold">{name}</div>
            <div className=" text-center text-gray-800 text-[0.9rem] border- border-green-900 h-[53%] md:h-[80%] overflow-hidden relative">
               <div className="hidden md:block">
                  {(bio?.length ?? 0) > 120 ? bio?.substring(0, 120) + "..." : bio}
               </div>
               <div className="md:hidden">
                  {(bio?.length ?? 0) > 68 ? bio?.substring(0, 68) + "..." : bio}
               </div>
            </div>
         </div>

         <div className=" absolute bottom-1 flex gap-[4%] md:gap-1 w-full justify-center items-center border- border-red-900 ml-[10%] md:ml-0">
            <div
               className=" border-2 flex justify-center items-center border-blue-600 cursor-pointer rounded-lg px-[4%] py-[2%]"
               onClick={() => router.push("/profile/" + uid)}
            >
               <IoMdPerson color="gray" /> <span className=" text-gray-700">Profile</span>
            </div>
            <a
               href={encodeURI(resume ?? "")}
               download={true}
               target="_blank"
               className="border-2 border-blue-600 bg-blue-600 flex justify-center items-center cursor-pointer text-white  rounded-lg px-[4%] py-[2%]"
            >
               <FaRegFileAlt />
               Resume
            </a>
            <div
               className=" border-2 flex justify-center items-center border-blue-600 cursor-pointer rounded-lg px-[4%] py-[2%]"
               onClick={handleSaveOrUnsave}
            >
               <span className=" text-gray-700">{saved ? "Unsave" : "Save"}</span>
            </div>
         </div>
      </div>
   );
};

export default ApplicantCard;
