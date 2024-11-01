"use client";
import { Input, Space } from "antd";
const { Search } = Input;
import { GoArrowUpRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import type { GetProps } from "antd";
import { IoMdPerson } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { IoTriangle } from "react-icons/io5";

export default function NavBar() {
   type SearchProps = GetProps<typeof Input.Search>;
   const onSearch: SearchProps["onSearch"] = (value, _e, info) => alert(value);
   const [openMenu, setOpenMenu] = useState<boolean>(false);
   // const ProfilePicURL: string =
   //    "https://storage.googleapis.com/jobnow-95279.appspot.com/profilePics/1730364907711_F.jpg";
   const ProfilePicURL: string = "";
   const router = useRouter();
   let isUserLogined = true;
   return (
      <div className="hidden w-full md:flex justify-center items-center gap-[4%] sticky top-0 z-50 bg-gradient-to-br from-gray-400 via-gray-200 to-gray-400 p-[20px] text-gray-800 ">
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
               router.push("/main/jobs");
            }}
         >
            Jobs
         </div>
         <div
            className="cursor-pointer hover:underline underline-offset-4"
            onClick={() => {
               router.push("/main/jobs");
            }}
         >
            Applies
         </div>
         <Search
            className="w-[300px]"
            placeholder="Search Job"
            enterButton
            size="large"
            onSearch={onSearch}
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
            <div className=" border- border-red-900 w-[40%]  h-[7.5vh] absolute right-6 ">
               <div
                  className=" bg-gray-100 w-[50px] h-[50px] rounded-full absolute right-0 cursor-pointer overflow-hidden fle"
                  onClick={() => setOpenMenu((prev) => !prev)}
               >
                  {ProfilePicURL !== "" ? (
                     <Image
                        src={
                           "https://storage.googleapis.com/jobnow-95279.appspot.com/profilePics/1730364907711_F.jpg"
                        }
                        alt="profile"
                        width={100}
                        height={100}
                     />
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
                     <div className=" cursor-pointer mt-2 flex gap-1 justify-center items-center hover:bg-gray-200 px-[2%] py-[1%] " onClick={()=>router.push("/profile")}>
                        <IoMdPerson color="gray" />
                        My Profile
                     </div>
                     <div className="cursor-pointer mt-2 flex gap-1 justify-center items-center hover:bg-gray-200 px-[2%] py-[1%]">
                        <CiEdit color="gray" />
                        Edit Profile
                     </div>
                     <div className=" border-t-2 border-gray-300 mt-2 flex gap-1 justify-center items-center hover:bg-gray-200 px-[2%] py-[1%] pt-1 cursor-pointer ">
                        <IoLogOutOutline color="gray" size={18} />
                        Logout
                     </div>
                  </div>
               )}
            </div>
         )}
      </div>
   );
}
