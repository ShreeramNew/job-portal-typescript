"use client";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";

export default function Header() {
   return (
      <div className="w-full bg-gray-900 h-[500px] gap-[20px] p-[50px] justify-center items-center flex md:gap-[330px] lg:gap-[330px] md:p-[50px] lg:p-[50px] md:h-[550px] ">
         <div className="md:flex md:flex-col md:gap-[40px] lg:flex lg:flex-col lg:gap-[40px] md:h-[400px] md:w-[800px] lg:h-[400px] lg:w-[600px] relative">
            <h1 className=" md:ml-[100px] lg:ml-[100px] text-white text-[25px] md:text-[40px] absolute top-[-100px] right-[-10px] md:top-[100px] lg:top-[100px] md:right-[400px] lg:right-[400px] md:w-[500px] lg:w-[500px] ">
               Where Ambitions Meet{" "}
               <span className=" text-blue-500">
                  <br />
                  Opportunities!
               </span>
            </h1>

            <div className="cursor-pointer w-[160px] md:scale-[1.3] lg:scale-[1.3] bg-blue-500 p-[10px] rounded-md text-white flex items-center justify-center hover:scale-[1.32] absolute bottom-[-130px] right-[-10px] md:bottom-[50px] md:right-[500px] lg:bottom-[50px] lg:right-[500px]  hover:animate-pulse">
               Register Now <GoArrowUpRight color="white" />
            </div>
         </div>

         <Image
            alt="illustration"
            src="/header-poster.svg"
            width={400}
            height={400}
            className="absolute right-[10px] md:right-[200px] md:h-[400px] lg:h-[400px] md:w-[400px] lg:w-[400px] h-[150px] w-[150px] "
         />
      </div>
   );
}
