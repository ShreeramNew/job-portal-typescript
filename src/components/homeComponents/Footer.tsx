"use client";
import { FaLinkedin, FaGithubSquare, FaRegCopyright } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
export default function Footer() {
   return (
      <div className=" bg-gray-900 h-[400px] w-full relative">
         <Image
            alt="logo"
            className="absolute bottom-[200px] left-[33%]  md:bottom-[200px] md:left-[47%] lg:bottom-[200px] lg:left-[47%]"
            src={"/logo-no-background.svg"}
            width={150}
            height={150}
         />

         <div className=" flex flex-col justify-center items-center absolute bottom-[80px] left-[36%]  md:bottom-[100px] md:left-[48%] lg:bottom-[100px] lg:left-[48%] gap-[5px]">
            <h4 className=" text-white text-[19px]">Contact Us</h4>
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
         <div className=" text-white absolute bottom-[20px] left-[60px] md:bottom-[20px] md:left-[42.5%] lg:bottom-[20px] lg:left-[42.5%] flex justify-center items-center">
            Copyright
            <FaRegCopyright color="white" />
            2024 All rights reserved
         </div>
      </div>
   );
}
