"use client";
import React from "react";
import PostOrEditJob from "@/components/dashboard/PostOrEditJob";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
   const { slug } = useParams();
   return <PostOrEditJob isForEdit={true} jobId={Array.isArray(slug) ? slug[0] : slug} />;
}
