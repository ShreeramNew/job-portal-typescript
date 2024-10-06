"use client";
import Image from "next/image";
import type { DrawerProps, RadioChangeEvent } from "antd";
import { Button, Drawer, Radio, Space } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import LeftNavbar from "./LeftNavbar";
export default function DashNavForMobile() {
   const [open, setOpen] = useState(false);
   const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");
   const router = useRouter();

   const showDrawer = () => {
      setOpen(true);
   };

   const onClose = () => {
      setOpen(false);
   };

   return (
      <div className="md:hidden w-full h-[9vh] fixed top-0 left-0 z-[100] border-b-2 border-gray-400 bg-white">
         <Drawer
            title="Dashboard"
            placement={placement}
            onClose={onClose}
            open={open}
            key={placement}
            width={"73%"}
         >
            <LeftNavbar ForDrawer={true}/>
         </Drawer>
         <div className=" flex border- border-red-900 w-[70%] justify-between h-full items-center text-lg pl-[3%]">
            <MdDashboard size={35} color="gray" onClick={showDrawer} />
            <div className="cursor-pointer" onClick={() => router.push("/main/home")}>
               <Image alt="logo" src={"/logo-no-background.svg"} width={150} height={150} />
            </div>
         </div>
      </div>
   );
}
