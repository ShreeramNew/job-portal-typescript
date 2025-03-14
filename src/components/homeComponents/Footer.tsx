"use client";
import { FaLinkedin, FaGithubSquare, FaRegCopyright } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Categories from "./Categories";
import useSearchText from "@/helpers/SearchText";
export default function Footer() {
   const router = useRouter();

   const Serachtext = useSearchText();

   type category = {
      imageLink: string;
      category: string;
      SearchKeywords: string;
      span: number;
      xMove: string;
      yMove: string;
      delay: number;
   };

   let categories = [
      {
         imageLink:
            "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Sales and Marketing",
         SearchKeywords: "digital marketing sales strategies market analysis branding",
         span: 6,
         xMove: "-1rem",
         yMove: "0",
         delay: 0,
      },
      {
         imageLink:
            "https://plus.unsplash.com/premium_photo-1679923813998-6603ee2466c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Finance and Accounting",
         SearchKeywords: "accounting finance budgeting auditing tax analysis",
         span: 6,
         xMove: "1rem",
         yMove: "0",
         delay: 0.7,
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Customer Service",
         SearchKeywords: "customer support client relations service management crm tools",
         span: 4,
         xMove: "-1rem",
         yMove: "0",
         delay: 0.1,
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1581092157699-83c90752400a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Engineering",
         SearchKeywords: "react node software development mechanical civil electrical",
         span: 4,
         xMove: "0rem",
         yMove: "-1rem",
         delay: 0.6,
      },
      {
         imageLink:
            "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Healthcare",
         SearchKeywords: "nursing doctor patient care medical research health services",
         span: 4,
         xMove: "1rem",
         yMove: "0",
         delay: 0.3,
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Education and Training",
         SearchKeywords: "teaching curriculum training elearning education tools",
         span: 3,
         xMove: "-1rem",
         yMove: "0",
         delay: 0.5,
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Human Resources",
         SearchKeywords: "recruitment hr policies employee engagement talent management",
         span: 6,
         xMove: "0rem",
         yMove: "-1rem",
         delay: 0.2,
      },
      {
         imageLink:
            "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         category: "Creative and Design",
         SearchKeywords: "graphic design creativity branding photography video editing",
         span: 3,
         xMove: "1rem",
         yMove: "0",
         delay: 0.4,
      },
   ];

   return (
      <div className=" bg-gray-900 h-fit w-full relative">
         <div className="max-w-[23rem] md:max-w-[78rem] mx-auto flex flex-col items-start px-[1rem] md:px-0 md:items-center justify-between py-[2rem] md:pt-[5rem] md:pb-[2rem] w-full border-">
            <div className="flex flex-col md:flex-row items-start justify-center gap-[4rem] md:gap-[7rem] border-">
               <div className=" mt-[1rem]">
                  <Image alt="logo" src={"/logo-no-background.svg"} width={150} height={150} />
               </div>
               <div className=" flex flex-col justify-start items-start text-gray-200 gap-1">
                  <div className=" text-gray-400 text-[1.1rem] mb-3">Browse Categories</div>
                  {categories.map((item: category) => {
                     return (
                        <div
                           className="cursor-pointer hover:underline underline-offset-2"
                           onClick={() => Serachtext(item.SearchKeywords)}
                        >
                           {item.category}
                        </div>
                     );
                  })}
               </div>
               <div className=" flex flex-col justify-start items-start">
                  <div className=" text-gray-400 text-[1.1rem] mb-3">Join Our Platform</div>
                  <div
                     className="cursor-pointer hover:underline underline-offset-2 text-gray-200"
                     onClick={() => router.push("/login")}
                  >
                     Join Us as an Employee
                  </div>
                  <div
                     className="cursor-pointer hover:underline underline-offset-2 text-gray-200 mt-2"
                     onClick={() => router.push("/login/employer")}
                  >
                     Partner with Us as an Employer
                  </div>
               </div>

               <div className=" flex flex-col justify-center items-center border-  border-red-900 gap-[5px]">
                  <h4 className=" text-gray-200 text-[19px]">Contact Us</h4>
                  <hr className=" border-b-2 border-white " />
                  <div className=" flex justify-center items-center gap-[2rem] ">
                     <a title="LinkedIn" href="https://www.linkedin.com/in/shreeram-630102262">
                        <FaLinkedin color="white" size={25} />
                     </a>
                     <a title="GitHub" href="https://github.com/ShreeramNew">
                        <FaGithubSquare color="white" size={25} />
                     </a>
                     <a title="Email" href="mailto:shreerambca1@gmail.com?subject=apply for me">
                        <MdEmail color="white" size={29} />
                     </a>
                  </div>
               </div>
            </div>
            <div className=" text-gray-500 flex justify-center items-end border- border-red-900 w-full relative mt-[4rem] ">
               <div className="flex justify-center items-center">
                  <span>Copyright</span>
                  <FaRegCopyright/>
                  2025. All rights reserved
               </div>
            </div>
         </div>
      </div>
   );
}
