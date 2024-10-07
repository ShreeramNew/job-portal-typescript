"use client";
import Image from "next/image";
import { IoMdPerson } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
type applicantDataType = {
   profileId?: string;
   profile?: string;
   resume?: string;
   username?: string;
   bio?: string;
   education?: string;
   experience?: string;
   company?: string;
   time?: number;
   yearsOrMonth?: string;
   phone?: number;
   linkedin?: string;
   gitHub?: string;
};
export default function ShowApplicants({applicants}:{applicants:applicantDataType[]}) {
   return (
      <div className="h-screen w-screen overflow-scroll border- border-red-900 mt-[20%] md:mt-0 z-[90]">
         <div className=" w-full  border- border-green-900 grid md:grid-cols-4 p-[2%] gap-[10px] md:gap-[2%]  ">
            {applicants.map((applicant) => (
               <ApplicantCard
                  key={applicant.profileId}
                  name={applicant.username}
                  bio={applicant.bio}
                  profileId={applicant.profileId}
               />
            ))}
         </div>
      </div>
   );
}

const ApplicantCard = ({
   name,
   bio,
   profileId,
}: {
   name?: string;
   bio?: string;
   profileId?: string;
}) => {
   const router = useRouter();
   return (
      <div className=" w-full h-[16vh] md:h-[42vh] border-2 border-gray-300 rounded-lg flex md:flex-col relative pt-[2%] ">
         <div className="w-full flex justify-center items-center">
            <div className=" w-[70px] h-[70px] md:w-[100px] md:h-[100px] overflow-hidden rounded-[100%] ">
               <Image
                  src="https://cdn.pixabay.com/photo/2012/03/04/00/36/baby-21971_1280.jpg"
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
               onClick={() => router.push("/profile/" + profileId)}
            >
               <IoMdPerson color="gray" /> <span className=" text-gray-700">Profile</span>
            </div>
            <div className="border-2 border-blue-600 bg-blue-600 flex justify-center items-center cursor-pointer text-white  rounded-lg px-[4%] py-[2%]">
               <FaRegFileAlt />
               Resume
            </div>
         </div>
      </div>
   );
};
