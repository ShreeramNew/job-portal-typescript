"use client";
import axios from "axios";
const { Search } = Input;
import Image from "next/image";
import type { GetProps } from "antd";
import { div } from "framer-motion/m";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { IoMdPerson } from "react-icons/io";
import { IoTriangle } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import useSearchText from "@/helpers/SearchText";
import { IoLogOutOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { Input, message, Space, Dropdown } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { pushResult, toggleLoading } from "@/features/SearchSlice";


export default function NavBar() {
   type SearchProps = GetProps<typeof Input.Search>;
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

   //Related to dropdown, that opens on clicking profile pic
   const items = [
      {
         key: "1",
         label: (
            <div
               className=" cursor-pointer flex gap-1 justify-center items-center h-[2rem] "
               onClick={() => router.push("/profile/" + uid)}
            >
               <IoMdPerson color="gray" />
               <span>My Profile</span>
            </div>
         ),
      },
      {
         key: "2",
         label: (
            <div
               className="cursor-pointer flex gap-1 justify-center items-center h-[2rem]"
               onClick={() => router.push("/editUserProfile")}
            >
               <CiEdit color="gray" />
               <span>Edit Profile</span>
            </div>
         ),
      },
      {
         key: "3",
         label: (
            <div
               className=" flex gap-1 justify-center items-center  pt-1 cursor-pointer h-[2rem] "
               onClick={Logout}
            >
               <IoLogOutOutline color="gray" size={18} />
               Logout
            </div>
         ),
      },
   ];
   return (
      <div className=" flex justify-center items-center fixed w-full top-0 z-[100]">
         <motion.div
            style={{
               width: PathName.includes("/main/home") ? width : "100%",
               top: PathName.includes("/main/home") ? top : "0rem",
               borderRadius: PathName.includes("/main/home") ? borderRadius : "0",
            }}
            className="hidden md:flex h-[5rem] justify-center items-center gap-[4%] relative z-[100] p-[20px] text-gray-800 backdrop-blur-sm "
         >
            <motion.div
               style={{
                  borderRadius: PathName.includes("/main/home") ? borderRadius : "0",
               }}
               className=" bg-gradient-to-br from-gray-400 via-gray-200 to-gray-400 opacity-[0.8] absolute w-full h-full inset-0 z-[-1] backdrop-blur-sm"
            ></motion.div>
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
                  <Dropdown
                     overlayStyle={{ width: "9rem", borderRadius: "1rem", overflow: "hidden" }}
                     overlayClassName=" !shadow-[0px_0px_1px_0px]"
                     menu={{ items }}
                     trigger={["click"]}
                  >
                     <div className=" bg-gray-100 w-[50px] h-[50px] rounded-full absolute right-0 cursor-pointer overflow-hidden fle">
                        {ProfilePicURL !== "" ? (
                           <Image src={ProfilePicURL} alt="profile" width={100} height={100} />
                        ) : (
                           <div className="w-full h-full flex justify-center items-center ">
                              <IoMdPerson color="gray" size={36} />
                           </div>
                        )}
                     </div>
                  </Dropdown>
               </div>
            )}
         </motion.div>
      </div>
   );
}
