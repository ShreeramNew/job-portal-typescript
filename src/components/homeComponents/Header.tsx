"use client";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
   const router = useRouter();
   return (
      <div className="w-full bg-gradient-to-br from-gray-900 via-gray-700 md:via-gray-800 to-gray-900 md:to-gray-900  h-[60vh] gap-[20px] p-[50px] flex justify-center items-center   md:py-[4rem] md:h-auto ">
         <div className=" lg:max-w-[78rem] md:mx-auto flex  border- border-red-900 gap-[6rem]">
            <div className="md:flex md:flex-col justify-center   relative mt-[1rem]  md:mt-0 border- border-red-900 lg:max-w-[76rem] lg:mx-auto  ">
               <h1 className=" border- border-red-900 z-[3] text-white text-[1.7rem] md:text-[3rem] absolute top-[-15vh] right-[0] lg:relative md:top-[0%] ">
                  Where Ambitions Meet
                  <span className=" text-blue-500">
                     <br />
                     Opportunities!
                  </span>
               </h1>

               <div
                  className="cursor-pointer w-[23vh] md:w-[10rem] md:scale-[1] bg-blue-600 p-[1rem] rounded-md text-white flex items-center justify-center  absolute md:relative bottom-[-25vh] right-[-2vh] md:bottom-[0] md:right-[0] md:h-[3.2rem] md:mt-[4rem] hover:scale-[1.01]"
                  onClick={() => router.push("/login")}
               >
                  Register Now <GoArrowUpRight color="white" />
               </div>
            </div>

            <Image
               alt="illustration"
               src="/header-poster.svg"
               width={400}
               height={400}
               className="lg:relative right-[1vh] md:right-[0] md:h-[400px] md:w-[400px] h-[13rem] w-[13rem] z-[2] "
            />
         </div>
      </div>
   );
}
