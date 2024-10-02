"use client";
import { HiPencilAlt } from "react-icons/hi";
import Image from "next/image";

export default function Page() {
   return (
      <div className=" w-screen h-screen border-2 border-red-900 flex justify-center items-center ">
         <div className=" w-[50%] h-[40%] border-2 border-blue-900 flex justify-center items-center">
            <div className="border-2 border-gray-400 h-[100px] w-[100px] rounded-[100%] relative">
               <div className=" absolute bottom-1 right-1 bg-white">
                  <HiPencilAlt color="gray" size={20} />
               </div>
            </div>
            
         </div>
      </div>
   );
}
