"use client";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
   const router=useRouter();
   return (
      <div className="w-full bg-gradient-to-br from-gray-900 via-gray-700 md:via-gray-800 to-gray-900 md:to-gray-900  h-[60vh] gap-[20px] p-[50px] flex justify-center items-center  md:p-[4%] lg:p-[3%] md:h-[50%] ">
         <div className="md:flex md:flex-col md:h-[60vh] md:w-[50%] relative">
            <h1 className=" border- border-red-900  text-white text-[1.7rem] md:text-[3rem] absolute top-[-15vh] right-[0] md:top-[20%] md:right-[60%] md:w-[85%]">
               Where Ambitions Meet
               <span className=" text-blue-500">
                  <br />
                  Opportunities!
               </span>
            </h1>

            <div className="cursor-pointer w-[20vh] md:scale-[1.3] bg-blue-600 p-[1.6vh] rounded-md text-white flex items-center justify-center hover:scale-[1.32] absolute bottom-[-25vh] right-[-2vh] md:bottom-[15%] md:right-[80%]" onClick={()=>router.push("/login")}>
               Register Now <GoArrowUpRight color="white" />
            </div>
         </div>

         <Image
            alt="illustration"
            src="/header-poster.svg"
            width={400}
            height={400}
            className="absolute right-[1vh] md:right-[10%] md:h-[400px] md:w-[400px] h-[30vh] w-[30vh] "
         />
      </div>
   );
}
