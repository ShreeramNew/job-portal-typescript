import Image from "next/image";
import { HiPencilAlt } from "react-icons/hi";
import { PiSuitcaseSimple } from "react-icons/pi";
export default function LeftNavbar() {
   let title = "Stark Industries";
   let headQuarters = "Banglore, India";

   return (
      <div className=" w-[21%] h-screen border-r-2 border-gray-400">
         <div className=" flex justify-center items-center p-[10px] gap-[6%]">
            <div className="border-2 border-gray-400 h-[100px] w-[100px] rounded-[100%] relative">
               <div className=" w-full h-full overflow-hidden rounded-[100%]">
                  <Image
                     src="https://cdn.pixabay.com/photo/2012/03/04/00/36/baby-21971_1280.jpg"
                     alt="profile"
                     width={200}
                     height={200}
                     objectFit="cover"
                  />
               </div>
               <div className=" absolute bottom-1 right-1 bg-white">
                  <HiPencilAlt color="gray" size={20} />
               </div>
            </div>
            <div>
               <div>{title}</div>
               <div className=" text-[0.9rem] text-gray-700">{headQuarters}</div>
            </div>
         </div>

         <div>
            <div className=" flex justify-center items-center border-t-2 pt-[10px] border-gray-400 gap-[2%]">
               <PiSuitcaseSimple size={25} color="gray" />
               <div className=" text-md text-gray-900">My Jobs</div>
            </div>
            <div></div>
            <div></div>
         </div>
      </div>
   );
}
