"use client";

import Image from "next/image";
import { IoMdPerson } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function Page() {
   type applicantDataType = {
      profileId?: string;
      profile?: string;
      resume?: string;
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

   const applicants: applicantDataType[] = [
      {
         profileId: "12345",
         profile: "ggdg",
         resume: "ghsghs",
         username: "Shreeram",
         bio: "This is my bio hjghdgdsb gdggdsgds ghgdggd  hjghdgdsb gdggdsgds ghgdggd hjghdgdsb gdggdsgds ghgdggd hjghdgdsb gdggdsgds ghgdggd hjghdgdsb gdggdsgds ghgdggd hjghdgdsb gdggdsgds ghgdggd hjghdgdsb gdggdsgds ghgdggd",
         education: "BCA",
         experience: "yes",
         company: "Tikanga pvt ltd",
         time: 1,
         yearsOrMonth: "months",
         phone: 1234567890,
         linkedin: "https://linkedin.com/in/shreeram",
         gitHub: "https://github.com/shreeram",
      },
      {
         profileId: "12346",
         profile: "ggdg",
         resume: "ghsghs",
         username: "John Doe",
         bio: "Experienced software engineer with a passion for frontend development.",
         education: "Bachelor's in Computer Science",
         experience: "5 years",
         company: "Tech Solutions Inc.",
         time: 40,
         yearsOrMonth: "months",
         phone: 9876543210,
         linkedin: "https://linkedin.com/in/johndoe",
         gitHub: "https://github.com/johndoe",
      },
      {
         profileId: "12347",
         profile: "ggdg",
         resume: "ghsghs",
         username: "Jane Smith",
         bio: "Aspiring web developer with a focus on UX/UI design.",
         education: "Master's in Information Technology",
         experience: "2 years",
         company: "Digital Innovations Ltd.",
         time: 30,
         yearsOrMonth: "years",
         phone: 5551234567,
         linkedin: "https://linkedin.com/in/janesmith",
         gitHub: "https://github.com/janesmith",
      },
      {
         profileId: "12348",
         profile: "ggdg",
         resume: "ghsghs",
         username: "Michael Johnson",
         bio: "Passionate about backend systems and scalability.",
         education: "Bachelor's in Computer Engineering",
         experience: "8 years",
         company: "Backend Solutions Corp.",
         time: 50,
         yearsOrMonth: "years",
         phone: 9998765432,
         linkedin: "https://linkedin.com/in/michaeljohnson",
         gitHub: "https://github.com/michaeljohnson",
      },
      {
         profileId: "12348",
         profile: "ggdg",
         resume: "ghsghs",
         username: "Michael Johnson",
         bio: "Passionate about backend systems and scalability.",
         education: "Bachelor's in Computer Engineering",
         experience: "8 years",
         company: "Backend Solutions Corp.",
         time: 50,
         yearsOrMonth: "years",
         phone: 9998765432,
         linkedin: "https://linkedin.com/in/michaeljohnson",
         gitHub: "https://github.com/michaeljohnson",
      },
      {
         profileId: "12348",
         profile: "ggdg",
         resume: "ghsghs",
         username: "Michael Johnson",
         bio: "Passionate about backend systems and scalability.",
         education: "Bachelor's in Computer Engineering",
         experience: "8 years",
         company: "Backend Solutions Corp.",
         time: 50,
         yearsOrMonth: "years",
         phone: 9998765432,
         linkedin: "https://linkedin.com/in/michaeljohnson",
         gitHub: "https://github.com/michaeljohnson",
      },
      {
         profileId: "12348",
         profile: "ggdg",
         resume: "ghsghs",
         username: "Michael Johnson",
         bio: "Passionate about backend systems and scalability.",
         education: "Bachelor's in Computer Engineering",
         experience: "8 years",
         company: "Backend Solutions Corp.",
         time: 50,
         yearsOrMonth: "years",
         phone: 9998765432,
         linkedin: "https://linkedin.com/in/michaeljohnson",
         gitHub: "https://github.com/michaeljohnson",
      },
      {
         profileId: "12348",
         profile: "ggdg",
         resume: "ghsghs",
         username: "Michael Johnson",
         bio: "Passionate about backend systems and scalability.",
         education: "Bachelor's in Computer Engineering",
         experience: "8 years",
         company: "Backend Solutions Corp.",
         time: 50,
         yearsOrMonth: "years",
         phone: 9998765432,
         linkedin: "https://linkedin.com/in/michaeljohnson",
         gitHub: "https://github.com/michaeljohnson",
      },
      {
         profileId: "12348",
         profile: "ggdg",
         resume: "ghsghs",
         username: "Michael Johnson",
         bio: "Passionate about backend systems and scalability.",
         education: "Bachelor's in Computer Engineering",
         experience: "8 years",
         company: "Backend Solutions Corp.",
         time: 50,
         yearsOrMonth: "years",
         phone: 9998765432,
         linkedin: "https://linkedin.com/in/michaeljohnson",
         gitHub: "https://github.com/michaeljohnson",
      },
      {
         profileId: "12348",
         profile: "ggdg",
         resume: "ghsghs",
         username: "Michael Johnson",
         bio: "Passionate about backend systems and scalability.",
         education: "Bachelor's in Computer Engineering",
         experience: "8 years",
         company: "Backend Solutions Corp.",
         time: 50,
         yearsOrMonth: "years",
         phone: 9998765432,
         linkedin: "https://linkedin.com/in/michaeljohnson",
         gitHub: "https://github.com/michaeljohnson",
      },
      {
         profileId: "12348",
         profile: "ggdg",
         resume: "ghsghs",
         username: "Michael Johnson",
         bio: "Passionate about backend systems and scalability.",
         education: "Bachelor's in Computer Engineering",
         experience: "8 years",
         company: "Backend Solutions Corp.",
         time: 50,
         yearsOrMonth: "years",
         phone: 9998765432,
         linkedin: "https://linkedin.com/in/michaeljohnson",
         gitHub: "https://github.com/michaeljohnson",
      },
      {
         profileId: "12348",
         profile: "ggdg",
         resume: "ghsghs",
         username: "Michael Johnson",
         bio: "Passionate about backend systems and scalability.",
         education: "Bachelor's in Computer Engineering",
         experience: "8 years",
         company: "Backend Solutions Corp.",
         time: 50,
         yearsOrMonth: "years",
         phone: 9998765432,
         linkedin: "https://linkedin.com/in/michaeljohnson",
         gitHub: "https://github.com/michaeljohnson",
      },
   ];

   return (
      <div className="h-screen w-screen overflow-scroll border- border-red-900 mt-[20%] md:mt-0 z-[90]">
         <div className=" w-full  border- border-green-900 grid md:grid-cols-4 p-[2%] gap-[10px] md:gap-[2%]  ">
            {applicants.map((applicant) => (
               <ApplicantCard
                  key={applicant.profileId}
                  name={applicant.username}
                  bio={applicant.bio}
                  profileId={applicant.profileId}
               />
            ))}
         </div>
      </div>
   );
}

const ApplicantCard = ({
   name,
   bio,
   profileId,
}: {
   name?: string;
   bio?: string;
   profileId?: string;
}) => {
   const router = useRouter();
   return (
      <div className=" w-full h-[16vh] md:h-[42vh] border-2 border-gray-300 rounded-lg flex md:flex-col relative pt-[2%] ">
         <div className="w-full flex justify-center items-center">
            <div className=" w-[70px] h-[70px] md:w-[100px] md:h-[100px] overflow-hidden rounded-[100%] ">
               <Image
                  src="https://cdn.pixabay.com/photo/2012/03/04/00/36/baby-21971_1280.jpg"
                  alt="profile"
                  width={200}
                  height={200}
                  objectFit="cover"
               />
            </div>
         </div>
         <div className="border- border-red-900 h-[70%] md:h-[45%] w-[250%] md:w-[100%] ">
            <div className=" text-center text-gray-700 font-bold">{name}</div>
            <div className=" text-center text-gray-800 text-[0.9rem] border- border-green-900 h-[53%] md:h-[80%] overflow-hidden relative">
               <div className="hidden md:block">
                  {(bio?.length ?? 0) > 120 ? bio?.substring(0, 120) + "..." : bio}
               </div>
               <div className="md:hidden">
                  {(bio?.length ?? 0) > 68 ? bio?.substring(0, 68) + "..." : bio}
               </div>
            </div>
         </div>

         <div className=" absolute bottom-1 flex gap-[4%] md:gap-1 w-full justify-center items-center border- border-red-900 ml-[10%] md:ml-0">
            <div
               className=" border-2 flex justify-center items-center border-blue-600 cursor-pointer rounded-lg px-[4%] py-[2%]"
               onClick={() => router.push("/profile/" + profileId)}
            >
               <IoMdPerson color="gray" /> <span className=" text-gray-700">Profile</span>
            </div>
            <div className=" bg-blue-600 flex justify-center items-center cursor-pointer text-white  rounded-lg px-[4%] py-[2%]">
               <FaRegFileAlt />
               Resume
            </div>
         </div>
      </div>
   );
};
