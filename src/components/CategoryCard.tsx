"use client";
import Image from "next/image";

type propsType = {
   imageLink: string;
   category: string;
};
export default function CategoryCard({ imageLink, category }: propsType) {
   return (
      <div className=" bg-white w-[250px] h-[225px] rounded-md flex flex-col justify-center hover:scale-[1.02] overflow-hidden shadow-2xl	">
         <div className=" w-[250px] h-[200px] mb-[20px]">
            <Image
               alt={category}
               src={imageLink}
               width={250}
               height={20}
               style={{ width: "auto", height: "100%", objectFit: "cover" }}
            />
         </div>
         <div className=" w-[full] h-[15px] mb-[20px] bg-white p-[10px] flex items-center justify-center">
            {category}
         </div>
      </div>
   );
}
