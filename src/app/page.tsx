"use client";
import ReactLoading from "react-loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import loadingWork from "../../public/loadingWork.svg";
import Image from "next/image";

export default function Home() {
   const router = useRouter();

   const CheckAuth = async () => {
      let API = process.env.NEXT_PUBLIC_API + "/api/getProfile/user/checkLogedIn";
      try {
         let response = await axios.get(API, { withCredentials: true });
         if (typeof window !== "undefined") {
            localStorage.setItem("profilePic", response.data.result.profilePic);
            localStorage.setItem("uid", response.data.result.uid);
         }
      } catch (error) {
         if (typeof window !== "undefined") {
            localStorage.getItem("profilePic") ? localStorage.removeItem("profilePic") : "";
            localStorage.getItem("uid") ? localStorage.removeItem("uid") : "";
         }
      }
      router.push("/main/home");
   };
   useEffect(() => {
      CheckAuth();
   }, []);
   return (
      <>
         <div className="w-full h-[100vh] bg-white flex justify-center items-center">
            <div className=" flex flex-col justify-center items-center gap-3 relative w-[200px] h-[200px]">
               <Image
                  src={loadingWork}
                  alt="loading"
                  width={200}
                  height={200}
                  className=" w-[200px] h-[200px] absolute z-[0] bottom-[-1rem] left-0"
               />

               <ReactLoading type="spin" height={20} width={20} color="blue" />
            </div>
         </div>
      </>
   );
}
