"use client";
import React from "react";
import PostOrEditJob from "@/components/dashboard/PostOrEditJob";

type FieldType = {
   jobTitle?: string;
   location?: string;
   jobType?: string;
   minSalary?: number;
   maxSalary?: number;
   responsibilities?: string;
   requiremnets?:string;
   skills?: string;
   minExp?:number;
   maxExp?:number;
   openings?:number;
};

const JobData = {
   jobTitle: "Full Stack developer",
   location: "Banglore",
   jobType: "Full time",
   minSalary: 20000,
   maxSalary: 40000,
   responsibilities: "Responsibilities",
   requiremnets:"This is a best requiremnet",
   skills: "ReactJS, MongoDB,Git, ExpressJS,NodeJS",
   minExp:1,
   maxExp:2,
   openings:3,
};

export default function Page() {
   return <PostOrEditJob isForEdit={true} jobDetail={JobData} />;
}
