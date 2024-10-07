"use client";
import { Input, Space } from "antd";
const { Search } = Input;
import { GoArrowUpRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import type { GetProps } from "antd";

export default function NavBar() {
   type SearchProps = GetProps<typeof Input.Search>;
   const onSearch: SearchProps["onSearch"] = (value, _e, info) => alert(value);
   const router = useRouter();
   return (
      <div className="hidden w-full md:flex justify-center items-center gap-[30px] sticky top-0 z-50 bg-gradient-to-br from-gray-400 via-gray-200 to-gray-400 p-[20px] text-gray-800 ">
         <div
            className=" absolute lg:left-[10%] md:left-[0] scale-[0.8] lg:scale-[1]  z-[60] cursor-pointer"
            onClick={() => router.push("/main/home")}
         >
            <Image alt="logo" src={"/logo-no-background.svg"} width={150} height={150} />
         </div>
         <div className="cursor-pointer hover:underline" onClick={() => router.push("/main/home")}>
            Home
         </div>
         <div
            className="cursor-pointer hover:underline"
            onClick={() => {
               router.push("/main/jobs");
            }}
         >
            Jobs
         </div>
         <Search
            className="w-[300px]"
            placeholder="Search Job"
            enterButton
            size="large"
            onSearch={onSearch}
         />
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
      </div>
   );
}
