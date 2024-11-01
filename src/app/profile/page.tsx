"use client";
import { HiPencilAlt } from "react-icons/hi";
import Image from "next/image";
import type { FormProps } from "antd";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { CiMail } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { TiSocialLinkedin } from "react-icons/ti";
import { MdLocalPhone } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
type FieldType = {
   username?: string;
   bio?: string;
   education?: string;
   experience?: string;
   company?: string;
   time?: number;
   yearsOrMonth?: string;
   phone?: number;
   linkedin?: string;
   gitHub?: string;
};


const ProfileData = {
   email: "shreerambca1@gmail.com",
   profile: "ggdg",
   resume: "ghsghs",
   username: "Michael Johnson",
   bio: "Passionate about backend systems and scalability.",
   education: "Bachelor's in Computer Engineering",
   experience: "yes",
   company: "Backend Solutions Corp.",
   time: 2,
   yearsOrMonth: "years",
   phone: 9998765432,
   linkedin: "https://linkedin.com/in/michaeljohnson",
   gitHub: "https://github.com/michaeljohnson",
};

export default function Page() {
   const { slug } = useParams();
   const [saved, setSaved] = useState<boolean>(false);

   const resumeRef = useRef<HTMLInputElement>(null);
   useEffect(() => {
      console.log(resumeRef.current?.value);
   }, []);

   const SubHeadingStyle = "font-bold";
   return (
      <div className=" w-screen h-screen  border-2 border-red-900 flex justify-center items-center ">
         <div className=" w-[90%] md:w-[50%] border- border-blue-900 flex flex-col justify-center items-center p-[10px] rounded-md shadow-blue-600 shadow-xl bg-gradient-to-br from-gray-400 via-gray-200 to-gray-300">
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
            </div>
            <div className="border- border-red-900 w-auto text-center">{ProfileData.username}</div>
            <div className=" border- border-red-900 w-full h-[70%] relative">
               <div className=" p-[10px] text-gray-700 text-[1rem] md:text-[0.8rem]">
                  <div className={SubHeadingStyle}>About</div>
                  <div>{ProfileData.bio}</div>
                  <div className={SubHeadingStyle}>Education</div>
                  <div>{ProfileData.education}</div>
                  <div className={SubHeadingStyle}>Experience</div>
                  <div>
                     {ProfileData.company}
                     <div>
                        {ProfileData.time} {ProfileData.yearsOrMonth}
                     </div>
                  </div>
                  <div className={SubHeadingStyle}>Contact Us</div>
                  <div>
                     <ContactCard
                        email={ProfileData.email}
                        phone={ProfileData.phone.toString()}
                        gitHub={ProfileData.gitHub}
                        social={ProfileData.linkedin}
                     />
                  </div>
               </div>
            </div>
            <div className=" flex justify-center items-center gap-[2%] w-full">
               <div className=" cursor-pointer  border-2 border-blue-600 px-[2%] py-[1%] rounded-md">
                  {saved ? (
                     <div className=" gap-[2px] flex justify-center items-center text-gray-700" onClick={()=>setSaved(false)} >
                        <FaCheck size={20} />
                        Saved
                     </div>
                  ) : (
                     <div className=" gap-[2px] flex justify-center items-center text-gray-700" onClick={()=>setSaved(true)}>
                        <FaPlus size={20} />
                        Save
                     </div>
                  )}
               </div>
               <div className=" cursor-pointer flex justify-center items-center text-white bg-blue-600 px-[2%] py-[1%] rounded-md">
                  <FaRegFileAlt size={20} /> Resume
               </div>
            </div>
         </div>
      </div>
   );
}

interface ConatctPropstype {
   email: string;
   phone: string;
   social: string;
   gitHub: string;
}
const ContactCard = ({ email, phone, social, gitHub }: ConatctPropstype) => {
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
            <FaGithub size={17} />
            <a href={gitHub} target="_blank" className="hover:underline">
               {gitHub}
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
