"use client";
import ReactLoading from "react-loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
         <div className="w-full h-[100vh] bg-gray-400 flex justify-center items-center">
            <ReactLoading type="spin" height={50} width={50} color="blue" />
         </div>
      </>
   );
}
