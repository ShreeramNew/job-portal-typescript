import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
export default function JobPostCard() {
   return (
      <div className=" w-full min-h-[156px] rounded-lg border-2 border-gray-200 flex justify-center items-center relative bg-gray-100 shadow-lg ">
         <div className=" flex justify-center items-center gap-[10px] absolute left-[10px] top-[10%] ">
            <div className="border-2 w-[50px] h-[50px] border-gray-400 p-[10px] rounded-lg flex justify-center items-center">
               <PiSuitcaseSimpleLight size={70} color="gray" />
            </div>
            <div>
               <div className=" text-[14px] font-bold">Frontend developer</div>
               <div className="text-[14px] text-gray">SerumTech pvt ltd </div>
            </div>
         </div>
         <div className="text-[14px] text-gray-800 absolute top-[10px] right-[10px] flex justify-center items-center gap-[4px]">
            <FaBusinessTime size={20} color="gray" />
            <div>0-1 year</div>
         </div>
         <div className=" flex flex-col justify-start items-start  w-[300px] absolute left-[10px] top-[50%]">
            <div className="flex gap-[5px] justify-center items-center text-[13.4px] text-gray-600">
               <GiMoneyStack />
               <div>₹5LPA-₹6LPA</div>
            </div>
            <div className="flex gap-[5px] justify-center items-center text-[13.4px] text-gray-600">
               <MdOutlineLocationOn />
               <div>Banglore,Karnataka</div>
            </div>
         </div>
         <div className=" w-full h-[30px] absolute bottom-0 overflow-hidden flex gap-[14px] items-center pl-[10px]">
            <SkillCard title="React.JS" />
            <SkillCard title="Next.JS" />
            <SkillCard title="Node.JS" />
            <SkillCard title="Git" />
         </div>
         <div className=" flex justify-center items-center absolute bottom-0 right-[10px]">
            <div><IoTimeOutline size={15} /></div>
            <div className="text-[13px] text-gray-800 ">3d ago</div>
         </div>
      </div>
   );
}

const SkillCard = ({ title }: { title: string }) => {
   return (
      <div className="text-[13px] h-[20px] bg-gray-300 p-[10px] px-[13px] flex justify-center items-center rounded-xl text-gray-700 pb-[12px]">
         <div>{title}</div>
      </div>
   );
};
