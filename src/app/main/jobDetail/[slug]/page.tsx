"use client";
import FilterCard from "@/components/cards/FilterCard";
import JobPostCard from "@/components/cards/JobPostCard";
import NoResult from "@/components/caseHandlers/NoResult";
import { pushResult } from "@/features/SearchSlice";
import { RootState } from "@/store/Store";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { Drawer } from "antd";
import { useState } from "react";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { GiOfficeChair } from "react-icons/gi";
import { TbTie } from "react-icons/tb";
import { FaUserTie } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { BsCaretRightFill } from "react-icons/bs";
export default function Page() {
   //This data will come from backend
   const JobData = {
      id: "12",
      role: "Frontend Developer",
      company: "SerumTech Pvt Ltd",
      minYear: 0,
      maxYear: 4,
      minSalary: 5,
      maxSalary: 6,
      location: "Bangalore, Karnataka",
      skills: ["React.js", "Node.js", "Next.js", "Git", "Express.js", "MongoDB"],
      time: 3,
   };

   const [isDescriptionOpen, SetIsDescriptionOpen] = useState<boolean>(true);

   const Responsibilities: string[] = [
      "Develop front-end and back-end solutions using the latest web technologies.",
      "Collaborate with product management and design teams to define and implement new features.",
      "Build reusable code and libraries for future use. Optimize applications for maximum speed and scalability.",
      "Implement security and data protection measures.",
      "Conduct unit testing and troubleshooting. Stay updated on emerging technologies and industry trends.",
   ];
   const Requiremnets: string[] = [
      "Proven experience as a Full Stack Developer or similar role",
      "Proficiency in front-end development languages such as HTML, CSS, JavaScript, and frameworks like React.js.",
      "Solid understanding of back-end development languages such as Node.js, Python, Ruby, or PHP.",
      "Experience with database technologies (e.g., MySQL, MongoDB).",
      "Knowledge of RESTful API design and development.",
      "Familiarity with version control systems (e.g., Git).",
      "Excellent communication and collaboration skills.",
      "Bachelor's degree in Computer Science, Engineering, or a related field (preferred).",
   ];

   return (
      <div className="w-screen h-[89vh] grid grid-cols-12  bg-blue-900 overflow-x-hidden">
         <div className=" col-span-12 md:col-span-8 bg-yellow-900 overflow-y-scroll p-[10px] md:p-[20px] overflow-x-hidden">
            <div className="border- w-full border-yellow-600 h-[40%] md:h-[35%] lg:h-[35%]">
               <JobHighlight
                  key={JobData.id}
                  id={JobData.id}
                  role={JobData.role}
                  company={JobData.company}
                  minYear={JobData.minYear}
                  maxYear={JobData.maxYear}
                  minSalary={JobData.minSalary}
                  maxSalary={JobData.maxSalary}
                  location={JobData.location}
                  skills={JobData.skills}
                  time={JobData.time}
               />
            </div>
            <div className="bg-gray-100 shadow-lg w-full h-auto rounded-lg border-2 border-gray-200 mt-[10px] relative">
               <div className="w-full h-[8%] absolute top-[-2%] text-[1.2rem] md:text-[1rem] md:top-0 border-b- border-gray-900 flex justify-start items-center gap-[10px] pl-[10px]">
                  <div
                     onClick={() => SetIsDescriptionOpen(true)}
                     className={`${
                        isDescriptionOpen ? "border-b-2" : ""
                     } border-gray-700 pt-[20px] text-gray-700 cursor-pointer`}
                  >
                     Description
                  </div>
                  <div
                     onClick={() => SetIsDescriptionOpen(false)}
                     className={`${
                        isDescriptionOpen ? "" : "border-b-2"
                     } border-gray-700 pt-[20px] text-gray-700 cursor-pointer`}
                  >
                     About
                  </div>
               </div>
               <div className=" mt-[14%] md:mt-[6%] p-[10px] text-gray-700 text-[1rem] md:text-[0.8rem]">
                  <div className=" w-full flex gap-[10px] items-center">
                     <div className="font-bold">Job Title:</div>
                     <div>Full Stack Developer</div>
                  </div>
                  <div className=" w-full flex gap-[10px] items-center">
                     <div className="font-bold">Company:</div>
                     <div>[Your Company Name]</div>
                  </div>
                  <div className=" w-full flex gap-[10px] items-center">
                     <div className="font-bold"> Location:</div>
                     <div> [City, State/Province] </div>
                  </div>
                  <div className=" w-full flex gap-[10px] items-center">
                     <div className="font-bold">Job Type:</div>
                     <div>Full-time</div>
                  </div>
                  <div className=" w-full flex gap-[10px] items-center">
                     <div className="font-bold">Salary:</div>
                     <div>Competitive</div>
                  </div>
                  <div className=" w-full gap-[10px] items-center">
                     <div className="font-bold">Key Responsibilities:</div>
                     <div>
                        {Responsibilities.map((point: string) => (
                           <BulletPoints point={point} />
                        ))}
                     </div>
                  </div>
                  <div className=" w-full gap-[10px] items-center">
                     <div className="font-bold">Required Skills and Qualifications:</div>
                     <div>
                        {Requiremnets.map((point: string) => (
                           <BulletPoints point={point} />
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="hidden md:block col-span-4 bg-green-600"></div>
      </div>
   );
}

const BulletPoints = ({ point }: { point: string }) => {
   return (
      <div className=" flex w-full border- border-red-900">
         <div className="mt-[1%] md:mt-[0.2%]">
            <BsCaretRightFill color="gray" size={15} />
         </div>
         {point}
      </div>
   );
};

interface PropsType {
   id: string;
   role: string;
   company: string;
   minYear: number;
   maxYear: number;
   minSalary: number;
   maxSalary: number;
   location: string;
   skills: string[];
   time: number;
}

const JobHighlight = ({
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
}: PropsType) => {
   return (
      <div className=" w-full h-full rounded-lg border-2 border-gray-200 flex justify-center items-center relative bg-gray-100 shadow-lg cursor-pointer ">
         <div className=" flex justify-center items-center gap-[10px] absolute left-[10px] top-[10%] ">
            <div className="border-2 w-[50px] h-[50px] border-gray-400 p-[10px] rounded-lg flex justify-center items-center">
               <PiSuitcaseSimpleLight size={70} color="gray" />
            </div>
            <div>
               <div className=" text-[14px] font-bold">{role}</div>
               <div className="text-[14px] text-gray">{company} </div>
            </div>
         </div>
         <div className="text-[14px] text-gray-800 absolute top-[10%] right-[10px] flex justify-center items-center gap-[4px]">
            <FaBusinessTime size={20} color="gray" />
            <div>
               {minYear}-{maxYear}Year
            </div>
         </div>
         <div className=" flex flex-col justify-start items-start  w-[300px] absolute left-[10px] top-[35%] md:top-[45%] lg:top-[45%]">
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
         <div className=" w-full h-[30%] md:h-[30px] absolute bottom-[20%] md:bottom-[20%] lg:bottom-[20%] overflow-hidden grid grid-cols-[1fr_1fr_1fr_1fr] md:flex gap-[10px] gap-y-[0px] md:gap-[14px] items-center pl-[10px] border- border-red-900">
            {skills.map((skill) => {
               return <SkillCard title={skill} />;
            })}
         </div>
         <div className=" border- border-gray-900 w-full h-[20%] absolute bottom-0 left-[20%] md:left-0 flex justify-between items-center px-[30px] pr-[86px] md:pr-[60px] ">
            <div className="flex justify-center items-center gap-[10px] md:gap-[20px] w-[30%] border- border-green-900 text-gray-700">
               <div className=" flex justify-center items-center gap-[2px]">
                  <FaUserTie />
                  <div>Openings:{200}</div>
               </div>
               <div className="flex justify-center items-center gap-[2px]">
                  <HiOutlineDocumentText />
                  <div>Applicants:{190}</div>
               </div>
            </div>

            <div>
               <button
                  type="button"
                  className=" bg-blue-500 text-white p-[5px] px-[20px] rounded-lg cursor-pointer hover:scale-[1.02]"
               >
                  Apply
               </button>
            </div>
         </div>
      </div>
   );
};

const SkillCard = ({ title }: { title: string }) => {
   return (
      <div className="text-[13px] h-[20px] bg-gray-300 p-[10px] px-[13px] flex justify-center items-center rounded-xl text-gray-700 pb-[12px]">
         <div>{title}</div>
      </div>
   );
};
