"use client";
import JobPostCard from "@/components/cards/JobPostCard";
import NoResult from "@/components/caseHandlers/NoResult";
import { pushResult } from "@/features/SearchSlice";
import { RootState } from "@/store/Store";
import { useDispatch, useSelector } from "react-redux";

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
   return (
      <div className=" flex justify-center items-center overflow-hidden">
         <div className=" flex flex-col w-[400px] bg-blue-300 h-[100vh]">Filter</div>
         <div className=" flex flex-col w-[700px] h-[100vh] gap-[20px] overflow-y-scroll p-[10px]">
            <JobPostCard />
            <JobPostCard />
            <JobPostCard />
            <JobPostCard />
            <JobPostCard />
            <JobPostCard />

           

         </div>
         <div className=" flex flex-col w-[400px] bg-green-300 h-[100vh]">Some ADd</div>
      </div>
   );
};
