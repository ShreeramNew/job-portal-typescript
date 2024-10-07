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

const JobData = [
   {
      id: "12",
      role: "Frontend Developer",
      company: "SerumTech Pvt Ltd",
      minYear: 0,
      maxYear: 4,
      minSalary: 5,
      maxSalary: 6,
      location: "Bangalore, Karnataka",
      skills: ["React.js", "Node.js", "Next.js", "Git"],
      time: 3,
   },
   {
      id: "13",
      role: "Backend Developer",
      company: "Maro Pvt Ltd",
      minYear: 2,
      maxYear: 7,
      minSalary: 10,
      maxSalary: 16,
      location: "Noida, Uttar Pradesh",
      skills: ["Express.js", "Node.js", "MongoDB", "Git", "Socket.io"],
      time: 1,
   },
   {
      id: "14",
      role: "Full Stack Developer",
      company: "TechWave Solutions",
      minYear: 1,
      maxYear: 5,
      minSalary: 8,
      maxSalary: 12,
      location: "Mumbai, Maharashtra",
      skills: ["React.js", "Node.js", "MongoDB", "Docker"],
      time: 2,
   },
   {
      id: "15",
      role: "DevOps Engineer",
      company: "InfraTech",
      minYear: 3,
      maxYear: 6,
      minSalary: 12,
      maxSalary: 18,
      location: "Hyderabad, Telangana",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Git"],
      time: 4,
   },
   {
      id: "16",
      role: "Mobile Developer",
      company: "AppMakers Pvt Ltd",
      minYear: 0,
      maxYear: 3,
      minSalary: 4,
      maxSalary: 7,
      location: "Pune, Maharashtra",
      skills: ["React Native", "Flutter", "Git", "Firebase"],
      time: 5,
   },
   {
      id: "17",
      role: "Data Scientist",
      company: "InsightAnalytics",
      minYear: 2,
      maxYear: 5,
      minSalary: 15,
      maxSalary: 20,
      location: "Chennai, Tamil Nadu",
      skills: ["Python", "TensorFlow", "Pandas", "Git"],
      time: 6,
   },
   {
      id: "18",
      role: "UI/UX Designer",
      company: "DesignPro",
      minYear: 1,
      maxYear: 4,
      minSalary: 6,
      maxSalary: 9,
      location: "Kochi, Kerala",
      skills: ["Figma", "Sketch", "Adobe XD", "CSS"],
      time: 7,
   },
   {
      id: "19",
      role: "Cloud Architect",
      company: "CloudMasters Pvt Ltd",
      minYear: 4,
      maxYear: 8,
      minSalary: 20,
      maxSalary: 30,
      location: "Delhi, NCR",
      skills: ["AWS", "Azure", "GCP", "Docker", "Git"],
      time: 8,
   },
];

export default function Page() {
   let searchResult = useSelector((state: RootState) => state.SearchSlice.results);
   console.log(searchResult);
   const dispatch = useDispatch();

   return (
      <div className="w-full h-[100vh] flex justify-center items-center">
         {/* {searchResult.length > 0 ? <h1>Yes</h1> : <NoResult />} */}
         <ListOfJobs />
         {/* <button onClick={() => dispatch(pushResult([10,20]))}>Click</button> */}
      </div>
   );
}

const ListOfJobs = () => {
   const [open, setOpen] = useState<boolean>(false);
   const showDrawer = () => {
      setOpen(true);
   };
   const onClose = () => {
      setOpen(false);
   };

   return (
      <div className=" flex justify-center items-center overflow-x-hidden relative ">
         <div className=" hidden md:flex lg:flex flex-col w-[400px] h-[110vh] relative pt-[60px]">
            <FilterCard />
         </div>
         <div className=" md:hidden lg:hidden absolute top-[5%] right-2 rotate-90 z-[1]" onClick={()=>showDrawer()}>
            <HiOutlineAdjustmentsVertical size={26} />
         </div>

         <Drawer
            style={{ background: "white",padding:"0px" }}
            placement="right"
            width={"300px"}
            onClose={onClose}
            open={open}
         >
            <FilterCard/>
         </Drawer>
         <div className=" flex flex-col w-[700px] h-[110vh] gap-[20px] overflow-y-scroll p-[10px] pt-[20%] md:pt-[60px] lg:pt-[60px]">
            {JobData.map((job) => {
               return (
                  <JobPostCard
                     key={job.id}
                     id={job.id}
                     role={job.role}
                     company={job.company}
                     minYear={job.minYear}
                     maxYear={job.maxYear}
                     minSalary={job.minSalary}
                     maxSalary={job.maxSalary}
                     location={job.location}
                     skills={job.skills}
                     time={job.time}
                  />
               );
            })}
         </div>
         <div className=" hidden md:flex lg:flex flex-col w-[400px] h-[110vh]"></div>
      </div>
   );
};
