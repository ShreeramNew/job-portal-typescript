import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface PropsType {
   id?: string;
   role?: string;
   company?: string;
   minYear?: number;
   maxYear?: number;
   minSalary?: number;
   maxSalary?: number;
   location?: string;
   skills?: string[];
   time?: string;
}
export default function JobPostCard({
   id,
   role,
   company,
   minYear,
   maxYear,
   minSalary,
   maxSalary,
   location,
   skills,
   time,
}: PropsType) {
   const router=useRouter();
   return (
      <div className=" w-full min-h-[186px] md:min-h-[166px] rounded-lg border-2 border-gray-200 flex justify-center items-center relative bg-gray-100 shadow-lg cursor-pointer " onClick={()=>router.push("/main/jobDetail/"+id)}>
         <div className=" flex justify-center items-center gap-[10px] absolute left-[10px] top-[10%] ">
            <div className="border-2 w-[50px] h-[50px] border-gray-400 p-[10px] rounded-lg flex justify-center items-center">
               <PiSuitcaseSimpleLight size={70} color="gray" />
            </div>
            <div>
               <div className=" text-[14px] font-bold">{role}</div>
               <div className="text-[14px] text-gray">{company} </div>
            </div>
         </div>
         <div className="text-[14px] text-gray-800 absolute top-[10px] right-[10px] flex justify-center items-center gap-[4px]">
            <FaBusinessTime size={20} color="gray" />
            <div>
               {minYear}-{maxYear} Year
            </div>
         </div>
         <div className=" flex flex-col justify-start items-start  w-[300px] absolute left-[10px] top-[45%] md:top-[50%] lg:top-[50%]">
            <div className="flex gap-[5px] justify-center items-center text-[13.4px] text-gray-600">
               <GiMoneyStack />
               <div>
                  ₹{minSalary}LPA-₹{maxSalary}LPA
               </div>
            </div>
            <div className="flex gap-[5px] justify-center items-center text-[13.4px] text-gray-600">
               <MdOutlineLocationOn />
               <div>{location}</div>
            </div>
         </div>
         <div className=" w-[100%] h-[30px] absolute bottom-[20px] md:bottom-2 overflow-hidden flex gap-[14px] items-center pl-[10px] border- border-red-900 overf">
            {skills?.map((skill) => {
               return <SkillCard title={skill} />;
            })}
         </div>
         <div className=" flex justify-center items-center absolute bottom-0 md:bottom-2 right-[10px]">
            <div>
               <IoTimeOutline size={15} />
            </div>
            <div className="text-[13px] text-gray-800 ">{time} ago</div>
         </div>
      </div>
   );
}

const SkillCard = ({ title }: { title: string }) => {
   return (
      <div className="text-[13px] h-[20px] bg-gray-300 p-[10px] px-[13px] flex justify-center items-center rounded-xl text-gray-700 pb-[12px] flex-shrink-0">
         <div>{title}</div>
      </div>
   );
};
