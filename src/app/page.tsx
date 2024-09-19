"use client";
import ReactLoading from "react-loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
   const router = useRouter();
   useEffect(() => {
      setTimeout(() => {
         router.push("/main/home");
      }, 3000);
   }, []);
   return (
      <>
         <div className="w-full h-[100vh] bg-gray-400 flex justify-center items-center">
            <ReactLoading type="spin" height={50} width={50} color="blue" />
         </div>
      </>
   );
}
