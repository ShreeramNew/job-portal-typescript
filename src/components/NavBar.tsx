"use client";
import { Input, message, Space } from "antd";
const { Search } = Input;
import { GoArrowUpRight } from "react-icons/go";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import type { GetProps } from "antd";
import { IoMdPerson } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { IoTriangle } from "react-icons/io5";
import axios from "axios";
import { useDispatch } from "react-redux";
import { pushResult, toggleLoading } from "@/features/SearchSlice";
import useSearchText from "@/helpers/SearchText";
import { motion, useScroll, useTransform } from "framer-motion";
import { div } from "framer-motion/m";

export default function NavBar() {
   type SearchProps = GetProps<typeof Input.Search>;
   const dispatch = useDispatch();
   const PathName = usePathname();
   const router = useRouter();
   const [searchText, setSearchText] = useState<string>("");
   const SearchText = useSearchText();
   const { scrollYProgress } = useScroll();

   const width = useTransform(scrollYProgress, [0, 0.4], ["90%", "100%"]);
   const top = useTransform(scrollYProgress, [0, 0.4], ["1rem", "0rem"]);
   const borderRadius = useTransform(scrollYProgress, [0, 0.4], ["1rem", "0rem"]);

   const onSearch: SearchProps["onSearch"] = async (value, _e, info) => {
      SearchText(value);
   };
   const [openMenu, setOpenMenu] = useState<boolean>(false);
   let ProfilePicURL: string = "";
   let uid: string = "";
   let isUserLogined: boolean = false;
   if (typeof window !== "undefined") {
      isUserLogined = localStorage.getItem("uid") ? true : false;
      ProfilePicURL = localStorage.getItem("profilePic") ?? "";
      uid = localStorage.getItem("uid") ?? "";
   }

   const Logout = async () => {
      const API = process.env.NEXT_PUBLIC_API + "/api/logout";
      try {
         await axios.post(API, {}, { withCredentials: true });
         router.push("/");
      } catch (error) {
         if (axios.isAxiosError(error)) {
            message.error(error.response?.data.msg);
         }
         console.log(error);
      }
   };
   return (
      <div className=" flex justify-center items-center fixed w-full top-0 z-[100]">
         <motion.div
            style={{ width, top, borderRadius }}
            className="hidden md:flex justify-center items-center gap-[4%] relative z-[100] p-[20px] text-gray-800 overflow-hidden backdrop-blur-sm "
         >
            <div className=" bg-gradient-to-br from-gray-400 via-gray-200 to-gray-400 opacity-[0.8] absolute w-full h-full inset-0 z-[-1] backdrop-blur-sm  "></div>
            <div
               className=" absolutes lg:left-[10%] md:left-[0] scale-[0.8] lg:scale-[1]  z-[60] cursor-pointer"
               onClick={() => router.push("/main/home")}
            >
               <Image alt="logo" src={"/logo-no-background.svg"} width={150} height={150} />
            </div>
            <div
               className="cursor-pointer hover:underline underline-offset-4"
               onClick={() => router.push("/main/home")}
            >
               Home
            </div>
            <div
               className="cursor-pointer hover:underline underline-offset-4 "
               onClick={() => {
                  if (typeof window !== "undefined") {
                     localStorage.setItem("isSearching", "no");
                  }
                  router.push("/main/jobs");
               }}
            >
               Jobs
            </div>
            <Search
               className="w-[300px] z-[21]"
               placeholder="Search Job"
               enterButton
               size="large"
               onSearch={onSearch}
               value={searchText}
               onChange={(e) => setSearchText(e.target.value)}
               onBlur={() => setSearchText("")}
            />

            {!isUserLogined ? (
               <>
                  <div
                     className="cursor-pointer bg-blue-500 p-[10px] rounded-md text-white flex items-center justify-center hover:scale-[1.02]"
                     onClick={() => router.push("/login")}
                  >
                     Get Started <GoArrowUpRight color="white" />
                  </div>
                  <div
                     className="cursor-pointer bg-gray-700 p-[10px] rounded-md text-white flex items-center justify-center hover:scale-[1.02] "
                     onClick={() => router.push("/login/employer")}
                  >
                     Employer <GoArrowUpRight color="white" />
                  </div>
               </>
            ) : (
               <div className=" border- border-red-900 w-[40%]  h-[7.5vh] absolute right-6 z-[20]">
                  <div
                     className=" bg-gray-100 w-[50px] h-[50px] rounded-full absolute right-0 cursor-pointer overflow-hidden fle"
                     onClick={() => setOpenMenu((prev) => !prev)}
                  >
                     {ProfilePicURL !== "" ? (
                        <Image src={ProfilePicURL} alt="profile" width={100} height={100} />
                     ) : (
                        <div className="w-full h-full flex justify-center items-center ">
                           <IoMdPerson color="gray" size={36} />
                        </div>
                     )}
                  </div>
                  {openMenu && (
                     <div className="absolute right-0 bottom-[-250%] bg-white rounded-lg py-[2%] w-[20%] ">
                        <div className=" absolute right-2 top-[-8%]">
                           <IoTriangle color="white" />
                        </div>
                        <div
                           className=" cursor-pointer mt-2 flex gap-1 justify-center items-center hover:bg-gray-200 px-[2%] py-[1%] "
                           onClick={() => router.push("/profile/" + uid)}
                        >
                           <IoMdPerson color="gray" />
                           My Profile
                        </div>
                        <div
                           className="cursor-pointer mt-2 flex gap-1 justify-center items-center hover:bg-gray-200 px-[2%] py-[1%]"
                           onClick={() => router.push("/editUserProfile")}
                        >
                           <CiEdit color="gray" />
                           Edit Profile
                        </div>
                        <div
                           className=" border-t-2 border-gray-300 mt-2 flex gap-1 justify-center items-center hover:bg-gray-200 px-[2%] py-[1%] pt-1 cursor-pointer "
                           onClick={Logout}
                        >
                           <IoLogOutOutline color="gray" size={18} />
                           Logout
                        </div>
                     </div>
                  )}
               </div>
            )}
         </motion.div>
      </div>
   );
}
