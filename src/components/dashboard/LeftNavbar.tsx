"use client";
import Image from "next/image";
import { HiPencilAlt } from "react-icons/hi";
import { PiSuitcaseSimple } from "react-icons/pi";
import { CiSquarePlus } from "react-icons/ci";
import { FaRegFileAlt } from "react-icons/fa";
import { FaWindowRestore } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LeftNavbar({ForDrawer}:{ForDrawer:boolean}) {
   let title = "Stark Industries";
   let headQuarters = "Banglore, India";
   let router = useRouter();
   const StyleOfEachTab =
      "pl-[14%] pb-[2%] w-full flex justify-start hover:bg-gray-200 items-center cursor-pointer border-t- pt-[10px] border-gray-400 gap-[2%]";

   const [active, setActive] = useState<number>(1);

   const handleTabClick = (tab: number) => {
      setActive(tab);
      switch (tab) {
         case 1:
            router.push("/dashboard/myjob");
            break;
         case 2:
            router.push("/dashboard/applicants");
            break;
         case 3:
            router.push("/dashboard/postJob");
            break;
         case 4:
            router.push("/dashboard/saved");
            break;
         case 5:
            router.push("/dashboard/edit");
            break;
         default:
            break;
      }
   };
   return (
      <div className={` ${ForDrawer?"block":"hidden"} md:block md:w-[32%] lg:w-[19%]  h-screen border-r-2 border-gray-400`}>
         <div className=" flex justify-center items-center p-[10px] gap-[6%]">
            <div className="border-2 border-gray-400 h-[80px] w-[80px] rounded-[100%] relative">
               <div className=" w-full h-full overflow-hidden rounded-[100%]">
                  <Image
                     src="https://cdn.pixabay.com/photo/2012/03/04/00/36/baby-21971_1280.jpg"
                     alt="profile"
                     width={200}
                     height={200}
                     objectFit="cover"
                  />
               </div>
            </div>
            <div>
               <div>{title}</div>
               <div className=" text-[0.9rem] text-gray-700">{headQuarters}</div>
            </div>
         </div>

         <div className=" flex flex-col justify-center items-center">
            <div className={StyleOfEachTab+`${active == 1 ? " bg-gray-200" : ""}`} onClick={() => handleTabClick(1)}>
               <PiSuitcaseSimple size={25} color={active == 1 ? "black" : "gray"} />
               <div className={`text-[0.8rem] text-gray-900 ${active == 1 ? "font-bold" : ""} `}>
                  My Jobs
               </div>
            </div>
            <div className={StyleOfEachTab+`${active == 2 ? " bg-gray-200" : ""}`} onClick={() => handleTabClick(2)}>
               <FaRegFileAlt size={23} color={active == 2 ? "black" : "gray"} />
               <div className={`text-[0.8rem] text-gray-900 ${active == 2 ? "font-bold" : ""} `}>
                  Applicants
               </div>
            </div>{" "}
            <div className={StyleOfEachTab+`${active == 3 ? " bg-gray-200" : ""}`} onClick={() => handleTabClick(3)}>
               <CiSquarePlus size={25} color={active == 3 ? "black" : "gray"} />
               <div className={`text-[0.8rem] text-gray-900 ${active == 3 ? "font-bold" : ""} `}>
                  Post Job
               </div>
            </div>
            <div className={StyleOfEachTab+`${active == 4 ? " bg-gray-200" : ""}`} onClick={() => handleTabClick(4)}>
               <FaWindowRestore size={22} color={active == 4 ? "black" : "gray"} />
               <div className={`text-[0.8rem] text-gray-900 ${active == 4 ? "font-bold" : ""} `}>
                  Saved
               </div>
            </div>
            <div className={StyleOfEachTab+`${active == 5 ? " bg-gray-200" : ""}`} onClick={() => handleTabClick(5)}>
               <CiEdit size={23} color={active == 5 ? "black" : "gray"} />
               <div className={`text-[0.8rem] text-gray-900 ${active == 5 ? "font-bold" : ""} `}>
                  Edit Profile
               </div>
            </div>
         </div>
      </div>
   );
}
