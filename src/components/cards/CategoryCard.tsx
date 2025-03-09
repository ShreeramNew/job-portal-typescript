"use client";
import useSearchText from "@/helpers/SearchText";
import Image from "next/image";
import { motion } from "framer-motion";

type propsType = {
   imageLink: string;
   category: string;
   SearchKeywords: string;
   span: number;
   xMove: string;
   yMove: string;
   delay: number;
};
export default function CategoryCard({
   imageLink,
   category,
   SearchKeywords,
   span,
   xMove,
   yMove,
   delay,
}: propsType) {
   const SearchText = useSearchText();
   return (
      <motion.div
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1, visibility: "visible" }}
         // transition={{ delay: delay }}
         style={{ gridColumn: `span ${span} / span ${span}` }}
         className={`flex-shrink-0 col-span-1 border- bg-white w-full h-[15rem] rounded-md flex flex-col transition-all duration-500 justify-start hover:!scale-[1.02] overflow-hidden shadow-md cursor-pointer hover:!delay-0  `}
         onClick={() => SearchText(SearchKeywords)}
      >
         <div className=" w-full h-full  relative">
            <Image alt={category} src={imageLink} fill className=" w-full h-full object-cover" />
            <div className="w-full h-full bg-gradient-to-r from-black to-transparent absolute inset-0 rotate-[0deg]"></div>
            <div className=" max-w-[15rem] h-[3rem] text-white text-[2rem] border- p-[10px] flex items-center justify-center absolute bottom-[3rem] left-[1rem]">
               {category}
            </div>
         </div>
      </motion.div>
   );
}
