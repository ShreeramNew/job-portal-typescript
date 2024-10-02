"use client";
import { FaLinkedin, FaGithubSquare, FaRegCopyright } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Footer() {
   return (
      <div className=" bg-gray-900 h-[400px] w-full relative flex flex-col items-center justify-center gap-[10%]">
         <Image
            alt="logo"
            src={"/logo-no-background.svg"}
            width={150}
            height={150}
         />

         <div className=" flex flex-col justify-center items-center border- border-red-900 gap-[5px]">
            <h4 className=" text-gray-100 text-[19px]">Contact Us</h4>
            <hr className=" border-b-2 border-white " />
            <div className=" flex justify-center items-center gap-[20px] ">
               <a title="LinkedIn" href="https://www.linkedin.com/in/shreeram-630102262">
                  <FaLinkedin color="white" size={25} />
               </a>
               <a title="GitHub" href="https://github.com/ShreeramNew">
                  <FaGithubSquare color="white" size={25} />
               </a>
               <a title="Email" href="mailto:shreerambca1@gmail.com?subject=apply for me">
                  <MdEmail color="white" size={29} />
               </a>
            </div>
         </div>
         <div className=" text-gray-100 flex justify-center items-end border- border-red-900 h-[10%] w-[34vh] md:w-[19%] relative ">
            <div className="flex justify-center items-center absolute bottom-[-10vh]">
               Copyright
               <FaRegCopyright color="white" />
               2024 All rights reserved
            </div>
         </div>
      </div>
   );
}
