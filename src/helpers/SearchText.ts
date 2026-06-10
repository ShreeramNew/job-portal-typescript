"use client";
import { pushResult, toggleLoading } from "@/features/SearchSlice";
import { message } from "antd";
import api from "@/config/api";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const useSearchText = () => {
   const PathName = usePathname();
   const router = useRouter();
   const dispatch = useDispatch();
   const SearchText = async (text: string) => {
      console.log("Yes I am coming here!");
      
      let API: string = "";
      if (text == "") {
         API =  "/api/getJobs/allJobs";
      } else {
         API =  "/api/getJobs/search?q=" + text;
      }
      try {
         dispatch(toggleLoading());
         let response = await api.get(API);
         dispatch(pushResult(response.data.jobs.reverse()));
      } catch (error) {
         console.log(error)
         if (axios.isAxiosError(error)) {
            message.error(error.response?.data.msg);
         }
      }
      dispatch(toggleLoading());
      if (typeof window !== "undefined") {
         localStorage.setItem("isSearching", "yes");
      }
      if (PathName !== "/main/jobs") {
         router.push("/main/jobs");
      }
   };

   return SearchText;
};

export default useSearchText;
