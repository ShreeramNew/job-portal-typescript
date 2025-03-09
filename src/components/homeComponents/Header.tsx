"use client";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Header() {
   const router = useRouter();
   const [buttonHover, setButtonHover] = useState(false);
   return (
      <div className="w-full bg-gradient-to-br from-gray-900 via-gray-700 md:via-gray-800 to-gray-900 md:to-gray-900 gap-[20px] p-[50px] flex justify-center items-center h-[100vh] md:pt-[10rem] ">
         <div className=" lg:max-w-[78rem] md:mx-auto flex flex-col-reverse md:flex-row  border- justify-center items-center border-red-900 gap-3 md:gap-[6rem]">
            <div className="flex flex-col justify-center items-center md:items-start  relative mt-[1rem] gap-[2rem] md:mt-0 border- border-red-900 lg:max-w-[76rem] lg:mx-auto  ">
               <motion.h1
                  initial={{ opacity: 0, x: "-1rem" }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className=" border- border-red-900 z-[3] text-white text-[1.7rem] md:text-[3rem]  lg:relative md:top-[0%] "
               >
                  Where Ambitions Meet
                  <span className=" text-blue-500">
                     <br />
                     Opportunities!
                  </span>
               </motion.h1>

               <div
                  className="cursor-pointer w-[23vh] md:w-[10rem] md:scale-[1] bg-blue-600 p-[1rem] rounded-md text-white flex items-center justify-center gap-1  md:relative bottom- md:bottom-[0] md:right-[0] md:h-[3.2rem] md:mt-[4rem] hover:scale-[1.01] overflow-hidden"
                  onClick={() => router.push("/login")}
                  onMouseOver={() => setButtonHover(true)}
                  onMouseLeave={() => setButtonHover(false)}
               >
                  <div
                     className={` w-full h-full bg-gray-700 absolute  z-[-1] transition-all left-[-10rem] bottom-[-3rem] duration-[500ms] ${
                        buttonHover ? "scale-[4.5]" : "scale-[0]   "
                     } rounded-tr-[5rem]`}
                  ></div>
                  <span>Register Now</span>
                  <GoArrowUpRight color="white" size={20} />
               </div>
            </div>

            <motion.div
               initial={{ rotateY: 180 }}
               whileInView={{ rotateY: 0 }}
               transition={{ duration: 0.5 }}
               className="lg:relative right-[1vh] md:right-[0] md:h-[400px] md:w-[400px] h-[13rem] w-[13rem] z-[2]"
            >
               <Image
                  alt="illustration"
                  src="/header-poster.svg"
                  width={400}
                  height={400}
                  className=" w-full h-full object-contain"
               />
            </motion.div>
         </div>
      </div>
   );
}
