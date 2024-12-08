"use client";
import useSearchText from "@/helpers/SearchText";
import Image from "next/image";

type propsType = {
   imageLink: string;
   category: string;
   SearchKeywords: string;
};
export default function CategoryCard({ imageLink, category, SearchKeywords }: propsType) {
   const SearchText = useSearchText();
   return (
      <div
         className="flex-shrink-0 bg-white w-[230px] h-[250px] rounded-md flex flex-col justify-center hover:scale-[1.02] overflow-hidden shadow-2xl cursor-pointer"
         onClick={() => SearchText(SearchKeywords)}
      >
         <div className=" w-[40vh] h-[45vh] mb-[20px]">
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
