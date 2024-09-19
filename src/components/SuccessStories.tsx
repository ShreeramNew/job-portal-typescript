"use client";
import Image from "next/image";
import { v4 as uuid } from "uuid";
export default function SuccessStories() {
   let stories = [
      {
         name: "Amy Johnson",
         position: "Marketing Manager",
         company: "BrightMedia",
         imageURL:
            "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         story: "After months of searching, I found my dream job through JobNow! The platform's intuitive interface made job hunting easy, and I secured a position that perfectly matched my skills and aspirations. The job recommendations were spot on, and I appreciated how JobNow continuously updated me with new opportunities. I couldn't be happier with my new role at BrightMedia!",
      },

      {
         name: "Mark Peterson",
         position: "Software Engineer",
         company: "TechWave",
         imageURL:
            "https://images.unsplash.com/photo-1573497491765-dccce02b29df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         story: "Thanks to JobNow, I landed multiple interviews within days of signing up. The site’s comprehensive job listings and tailored recommendations helped me find a role in a prestigious company that aligned perfectly with my career goals. The whole process was smooth, and the platform made it easy to track my applications. Now, I’m excited to be part of the amazing team at TechWave!",
      },

      {
         name: "Sarah Lee",
         position: "Product Manager",
         company: "InnovateX",
         imageURL:
            "https://images.unsplash.com/flagged/photo-1553642618-de0381320ff3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         story: "Transitioning to a new industry seemed daunting, but JobNow’s personalized job suggestions and industry insights made the process seamless. I successfully switched careers and am now thriving in a role I never thought possible! The platform provided excellent resources for career changers, and I felt supported throughout the journey.",
      },
   ];

   return (
      <div className=" w-full flex flex-col justify-center items-center ">
         <h2 className=" m-[20px] mt-[70px] text-[23px]">Success Stories</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 md:gap-[50px]">
            {stories.map((story) => {
               return (
                  <SuccessCard
                     key={uuid()}
                     fullName={story.name}
                     position={story.position}
                     company={story.company}
                     story={story.story}
                     imageURL={story.imageURL}
                  />
               );
            })}
         </div>
      </div>
   );
}

type SuccesCardPropsType = Record<string, string>;
const SuccessCard = ({ fullName, position, company, story, imageURL }: SuccesCardPropsType) => {
   return (
      <div className="mb-[100px] w-[300px] h-[350px] rounded-xl text-wrap flex flex-col justify-center items-center p-[20px] relative border-2 border-green-800 overflow-hidden shadow-2xl">
         <div className=" flex gap-[10px] w-full p-[10px] absolute top-0 h-[110px]">
            <div className=" h-[90px] w-[90px] border-2 border-red-800 rounded-[100%] overflow-hidden absolute left-[10px] bottom-[10px]">
               <Image
                  alt={fullName}
                  src={imageURL}
                  width={860}
                  height={860}
                  className=" scale-[1.5] mt-[20px]"
               />
            </div>
            <div className=" flex flex-col absolute left-[117px]">
               <h3 className=" text-[20px] font-bold ">{fullName}</h3>
               <h2 className=" text-[17px]">
                  {position} <br /> @{company}
               </h2>
            </div>
         </div>
         <p className=" text-[14px] absolute top-[110px] p-[10px] ">"{story}"</p>
      </div>
   );
};
