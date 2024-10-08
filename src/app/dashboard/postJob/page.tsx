"use client";
import { BsCaretRightFill } from "react-icons/bs";
import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import PostOrEditJob from "@/components/dashboard/PostOrEditJob";

type FieldType = {
   jobTitle?: string;
   location?: string;
   jobType?: string;
   minSalary?: number;
   maxSalary?: number;
   responsibilities?: string;
   requiremnets?: string;
};


export default function Page() {
   return <PostOrEditJob isForEdit={false} />;
}
