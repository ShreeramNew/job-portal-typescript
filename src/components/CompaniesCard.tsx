"use client";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";

type propsType = {
   imageURL: string;
   name: string;
   openings: number;
};
export default function CompaniesCard({ imageURL, name, openings }: propsType) {
   return (
      <div className=" w-[310px] h-[110px] rounded-md shadow-[3px_10px_29px_0px] grid grid-cols-[1fr_2fr_1fr] p-[20px] gap-[16px] justify-center items-center hover:scale-[1.02]  ">
         <div className=" h-[80px] w-[90px] bg-blue-700">
            <Image
               alt={name}
               src={imageURL}
               width={90}
               height={90}
               style={{ width: "auto", height: "100%", objectFit: "cover" }}
            />
         </div>
         <div className=" flex flex-col justify-center items-center gap-[10px]  w-[140px] ">
            <span className=" text-[18px] font-bold">{name}</span>
            <span>{openings} openings</span>
         </div>
         <GoArrowUpRight size={30} />
      </div>
   );
}
