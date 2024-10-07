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
   skills?: string;
};

const JobData = {
   jobTitle: "Full Stack developer",
   location: "Banglore",
   jobType: "Full time",
   minSalary: 20000,
   maxSalary: 40000,
   responsibilities: "Responsibilities",
   skills: "This is skills",
};

export default function Page() {
   return <PostOrEditJob isForEdit={true} jobDetail={JobData} />;
}
