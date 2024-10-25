"use client";
import { useEffect, useState } from "react";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineLocationOn, MdLocalPhone } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { BsCaretRightFill } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { TiSocialLinkedin } from "react-icons/ti";
import JobPostCard from "@/components/cards/JobPostCard";
import { useParams } from "next/navigation";
import axios from "axios";


interface JobDataType {
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
   Responsibilities?: string[];
   Requiremnets?: string[];
   openings?: number;
   jobType?: string;
   applicants?: number;
}

interface CompanyData {
   _id?: string;
   employerId?: string;
   companyName?: string;
   bio?: string;
   location?: string;
   phone?: number;
   website?: string;
   linkedin?: string;
   whyWorkWithUS?: string;
   aboutTeam?: string;
   aboutEnvoirnment?: string;
   __v?: number;
   email?: string;
}

export default function Page() {
   const { slug } = useParams();
   const [isDescriptionOpen, SetIsDescriptionOpen] = useState<boolean>(true);
   const [loading, setLoading] = useState<boolean>(false);
   const [companyData, setCompanyData] = useState<CompanyData>({});


   //----------------Fetch Company Details---------------
   const fetchCompanyDetails = async (empId: string) => {
      if (empId) {
         let API = process.env.NEXT_PUBLIC_API + "/api/getProfile/employer?empId=" + empId;
         try {
            setLoading(true);
            let response = await axios.get(API);
            setCompanyData(response.data.profile);
         } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
               // errorMessage(error.response?.data.msg);
            }
         }
         setLoading(false);
      } else {
         alert("Unauthorized access!");
      }
   };

   //----------------------Perticular Job-------------------------
   const [JobData, setJobData] = useState<JobDataType>({});
   //----------------------------Fetch Job Details------------------------------
   const FetchJobDetails = async () => {
      let API = process.env.NEXT_PUBLIC_API + "/api/getJobDetails?jobId=" + slug;
      try {
         let response = await axios(API);
         let responseDetails = response.data.jobDetails;
         console.log(response);
         console.log();

         //Format some data
         let requirements = responseDetails.requirements
            .replace(/\n/g, "")
            .split(".")
            .map((req: String) => req.trim()); // Remove \n and split by periods
         let responsibilities = responseDetails.responsibilities
            .replace(/\n/g, "")
            .split(".")
            .map((req: String) => req.trim()); // Remove \n and split by periods
         let Skills = responseDetails.skills.split(",");

         let DataToSet = {
            id: responseDetails._id,
            role: responseDetails.jobTitle,
            company: responseDetails.company,
            minYear: responseDetails.minExp,
            maxYear: responseDetails.maxExp,
            minSalary: responseDetails.minSalary,
            maxSalary: responseDetails.maxSalary,
            location: responseDetails.location,
            skills: Skills,
            time: "",
            Responsibilities: responsibilities,
            Requiremnets: requirements,
            openings: responseDetails.openings,
            jobType: responseDetails.jobType,
            applicants: responseDetails.applicants,
         };
         setJobData(DataToSet);
         fetchCompanyDetails(responseDetails.employerId);

         let cDate = new Date("2024-10-10T02:25:52.000Z");
         let currentDate = new Date();

         let timeDifference = currentDate.getTime() - cDate.getTime(); // Difference in milliseconds

         // Converting time difference into days, hours, minutes, and seconds
         let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
         let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
         let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

         console.log(
            `Time passed: ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`
         );
      } catch (error: unknown) {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data.msg);
         }
      }
   };

   useEffect(() => {
      FetchJobDetails();
   });

   //-----------------------Similar Jobs---------------------------
   const SimilarJobs = [
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

   const SubHeadingStyle = "font-bold";

   return (
      <div className="w-screen h-[89vh] grid grid-cols-1  md:grid-cols-12  overflow-x-hidden">
         <div className="md:col-span-7  md:overflow-y-scroll p-[10px] md:p-[20px] overflow-x-hidden h-[100vh] md:h-auto">
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
                  openings={JobData.openings}
                  applicants={JobData.applicants}
               />
            </div>
            <div className="bg-gray-100 shadow-lg w-full h-auto min-h-[70vh] rounded-lg border-2 border-gray-200 mt-[10px] relative">
               <div className="w-full h-[11vh] md:h-[6vh] absolute top-[-3vh] text-[1.2rem] md:text-[1rem] md:top-0 border-b- border-gray-900 flex justify-start items-center gap-[10px] pl-[10px]">
                  <div
                     onClick={() => SetIsDescriptionOpen(true)}
                     className={`${
                        isDescriptionOpen ? "border-b-2" : ""
                     } border-gray-700  pt-[20px] text-gray-700 cursor-pointer`}
                  >
                     Description
                  </div>
                  <div
                     onClick={() => SetIsDescriptionOpen(false)}
                     className={`${
                        isDescriptionOpen ? "" : "border-b-2"
                     } border-gray-700 pt-[20px]  text-gray-700 cursor-pointer`}
                  >
                     About
                  </div>
               </div>
               <AnimatePresence mode="wait">
                  {isDescriptionOpen ? (
                     <motion.div
                        key="description"
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.15 }}
                        className=" mt-[14%] md:mt-[5%] p-[10px] text-gray-700 text-[1rem] md:text-[0.8rem] overflow-hidden"
                     >
                        <div className=" w-full flex gap-[10px] items-center">
                           <div className="font-bold">Job Title:</div>
                           <div>{JobData.role}</div>
                        </div>
                        <div className=" w-full flex gap-[10px] items-center">
                           <div className="font-bold">Company:</div>
                           <div>{JobData.company}</div>
                        </div>
                        <div className=" w-full flex gap-[10px] items-center">
                           <div className="font-bold"> Location:</div>
                           <div> {JobData.location}</div>
                        </div>
                        <div className=" w-full flex gap-[10px] items-center">
                           <div className="font-bold">Job Type:</div>
                           <div>{JobData.jobType}</div>
                        </div>
                        <div className=" w-full flex gap-[10px] items-center">
                           <div className="font-bold">Salary:</div>
                           <div>
                              {JobData.minSalary}LPA to {JobData.maxSalary}LPA
                           </div>
                        </div>
                        <div className=" w-full gap-[10px] items-center">
                           <div className="font-bold">Key Responsibilities:</div>
                           <div>
                              {JobData.Responsibilities?.map((point: string) => {
                                 if (point !== "") {
                                    return <BulletPoints point={point} />;
                                 }
                              })}
                           </div>
                        </div>
                        <div className=" w-full gap-[10px] items-center">
                           <div className="font-bold">Required Skills and Qualifications:</div>
                           <div>
                              {JobData.Requiremnets?.map((point: string) => {
                                 if (point !== "") {
                                    return <BulletPoints point={point} />;
                                 }
                              })}
                           </div>
                        </div>
                     </motion.div>
                  ) : (
                     <motion.div
                        key="about"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.2 }}
                        className="mt-[14%] md:mt-[5%] p-[10px] text-gray-700 text-[1rem] md:text-[0.8rem]"
                     >
                        <div className={SubHeadingStyle}>About Us</div>
                        <div>{companyData.bio}</div>
                        <div className={SubHeadingStyle}>Why Work With Us?</div>
                        <div>{companyData.whyWorkWithUS}</div>
                        <div className={SubHeadingStyle}>Our Team</div>
                        <div>{companyData.aboutTeam}</div>
                        <div className={SubHeadingStyle}>Work Environment</div>
                        <div>{companyData.aboutEnvoirnment}</div>
                        <div className={SubHeadingStyle}>Location</div>
                        <div>{companyData.location}</div>
                        <div className={SubHeadingStyle}>Contact Us</div>
                        <div>
                           <ContactCard
                              email={companyData.email}
                              phone={companyData.phone}
                              website={companyData.website}
                              social={companyData.linkedin}
                           />
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </div>
         <div className="md:col-span-5 md:overflow-y-scroll flex flex-col gap-[10px] p-[10px] bg-gray-200">
            <div className=" text-gray-800 font-bold">Similar Jobs</div>
            {SimilarJobs.map((job) => {
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

interface ConatctPropstype {
   email?: string;
   phone?: number;
   social?: string;
   website?: string;
}
const ContactCard = ({ email, phone, social, website }: ConatctPropstype) => {
   return (
      <div className=" cursor-pointer">
         <div className="flex items-center gap-[5px]">
            <CiMail size={17} />
            <a href={`mailto:${email}`} className="hover:underline">
               {email}
            </a>
         </div>
         <div className="flex items-center gap-[5px]">
            <MdLocalPhone size={17} />
            <div>{phone}</div>
         </div>
         <div className="flex items-center gap-[5px]">
            <TbWorld size={17} />
            <a href={website} target="_blank" className="hover:underline">
               {website}
            </a>
         </div>
         <div className="flex items-center gap-[5px]">
            <TiSocialLinkedin size={17} />
            <a href={social} target="_blank" className="hover:underline">
               {social}
            </a>
         </div>
      </div>
   );
};

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
   openings?: number;
   applicants?: number;
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
   openings,
   applicants,
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
               {minYear}-{maxYear} Year
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
            {skills?.map((skill) => {
               return <SkillCard title={skill} />;
            })}
         </div>
         <div className=" border- border-gray-900 w-full h-[20%] absolute bottom-0 left-[20%] md:left-6 flex justify-between items-center px-[30px] pr-[86px] md:pr-[60px] ">
            <div className="flex justify-center items-center gap-[10px] md:gap-[20px] w-[30%] border- border-green-900 text-gray-700">
               <div className=" flex justify-center items-center gap-[2px]">
                  <FaUserTie />
                  <div>Openings:{openings}</div>
               </div>
               <div className="flex justify-center items-center gap-[2px]">
                  <HiOutlineDocumentText />
                  <div>Applicants:{160}</div>
               </div>
            </div>

            <div className=" md:pb-[10px]">
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
