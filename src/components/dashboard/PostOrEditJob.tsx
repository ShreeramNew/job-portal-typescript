"use client";
import { BsCaretRightFill } from "react-icons/bs";
import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

type FieldType = {
   jobTitle?: string;
   location?: string;
   jobType?: string;
   minSalary?: number;
   maxSalary?: number;
   responsibilities?: string;
   requiremnets?: string;
   skills?:string;
   minExp?:number;
   maxExp?:number;
   openings?:number;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
   console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
   console.log("Failed:", errorInfo);
};

export default function PostOrEditJob({
   isForEdit,
   jobDetail,
}: {
   isForEdit: boolean;
   jobDetail?: FieldType;
}) {
   return (
      <div className="w-screen h-screen border- pt-[16%] md:pt-0 border-red-900 flex flex-col justify-center items-center overflow-x-scroll">
         <h3 className="  left-0 text-gray-700 font-bold text-[1.2rem]">Job Details</h3>
         <div className="w-[90%] md:w-[70%] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg  h-[90%] md:h-[95%] overflow-y-scroll overflow-x-hidden  p-[10px] text-gray-700 text-[1rem] md:text-[0.8rem] ">
            <Form
               name="basic"
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               className="h-full"
            >
               <div className="mt-[5%] md:mt-[1%] w-full h-auto flex gap-[10px] items-center border- border-green-900 ">
                  <div className="font-bold border- border-red-900 ">Job Title:</div>
                  <Form.Item<FieldType>
                     name="jobTitle"
                     rules={[{ required: true, message: "" }]}
                     className="border- border-blue-300 !h-full m-0"
                     initialValue={isForEdit ? jobDetail?.jobTitle : ""}
                  >
                     <Input />
                  </Form.Item>
               </div>

               <div className="mt-[5%] md:mt-[1%] w-full h-auto flex gap-[10px] items-center border- border-green-900 ">
                  <div className="font-bold border- border-red-900 ">Location:</div>
                  <Form.Item<FieldType>
                     initialValue={isForEdit ? jobDetail?.location : ""}
                     name="location"
                     rules={[{ required: true, message: "" }]}
                     className="border- border-blue-300 !h-full m-0"
                  >
                     <Input />
                  </Form.Item>
               </div>
               <div className="mt-[5%] md:mt-[1%] w-full h-auto flex gap-[10px] items-center border- border-green-900 ">
                  <div className="font-bold border- border-red-900 ">Job Type:</div>
                  <Form.Item<FieldType>
                     initialValue={isForEdit ? jobDetail?.jobType : ""}
                     name="jobType"
                     rules={[{ required: true, message: "" }]}
                     className="border- border-blue-300 !h-full m-0"
                  >
                     <Input />
                  </Form.Item>
               </div>
               <div className="mt-[5%] md:mt-[1%] w-full h-auto flex gap-[10px] items-center border- border-green-900 ">
                  <div className="font-bold border- border-red-900 ">Salary:</div>
                  <Form.Item<FieldType>
                     initialValue={isForEdit ? jobDetail?.minSalary : ""}
                     name="minSalary"
                     rules={[{ required: true, message: "" }]}
                     className="border- border-blue-300 !h-full m-0 !flex justify-center items-center w-[17%] md:w-[7%]"
                  >
                     <Input type="number" />
                  </Form.Item>
                  <div>to</div>
                  <Form.Item<FieldType>
                     initialValue={isForEdit ? jobDetail?.maxSalary : ""}
                     name="maxSalary"
                     rules={[{ required: true, message: "" }]}
                     className="border- border-blue-300 !h-full m-0 !flex justify-center items-center w-[17%] md:w-[7%]"
                  >
                     <Input type="number" />
                  </Form.Item>
                  <span>LPA</span>
               </div>

               <div className="mt-[5%] md:mt-[1%] w-full h-auto flex gap-[10px] items-center border- border-green-900 ">
                  <div className="font-bold border- border-red-900 ">Experience:</div>
                  <Form.Item<FieldType>
                     initialValue={isForEdit ? jobDetail?.minExp : ""}
                     name="minExp"
                     rules={[{ required: true, message: "" }]}
                     className="border- border-blue-300 !h-full m-0 !flex justify-center items-center w-[17%] md:w-[7%]"
                  >
                     <Input type="number" />
                  </Form.Item>
                  <div>to</div>
                  <Form.Item<FieldType>
                     initialValue={isForEdit ? jobDetail?.maxExp : ""}
                     name="maxExp"
                     rules={[{ required: true, message: "" }]}
                     className="border- border-blue-300 !h-full m-0 !flex justify-center items-center w-[17%] md:w-[7%]"
                  >
                     <Input type="number" />
                  </Form.Item>
                  <span>Year</span>
               </div>

               <div className="mt-[5%] md:mt-[1%] w-full h-auto flex gap-[10px] items-center border- border-green-900 ">
                  <div className="font-bold border- border-red-900 ">Openings:</div>
                  <Form.Item<FieldType>
                     initialValue={isForEdit ? jobDetail?.openings : ""}
                     name="openings"
                     rules={[{ required: true, message: "" }]}
                     className="border- border-blue-300 !h-full m-0"
                  >
                     <Input type="number" />
                  </Form.Item>
               </div>

               <div className="mt-[5%] md:mt-[1%] w-full h-auto border- border-green-900 ">
                  <div className="font-bold border- border-red-900 ">Key Responsibilities:</div>
                  <Form.Item<FieldType>
                     initialValue={isForEdit ? jobDetail?.responsibilities : ""}
                     name="responsibilities"
                     rules={[{ required: true, message: "" }]}
                     className="border- border-blue-300 w-[90%] md:w-[40%] !h-full m-0"
                  >
                     <TextArea rows={5} />
                  </Form.Item>
                  <div>Note: Each sentence will be shown as a bullet point</div>
               </div>
               <div className="mt-[5%] md:mt-[1%] w-full h-auto border- border-green-900 ">
                  <div className="font-bold border- border-red-900 ">Requiremnets:</div>
                  <Form.Item<FieldType>
                     initialValue={isForEdit ? jobDetail?.requiremnets : ""}
                     name="requiremnets"
                     rules={[{ required: true, message: "" }]}
                     className="border- border-blue-300 w-[90%] md:w-[40%] !h-full m-0"
                  >
                     <TextArea rows={5} />
                  </Form.Item>
                  <div>Note: Each sentence will be shown as a bullet point</div>
               </div>
               <div className="mt-[5%] md:mt-[1%] w-full h-auto border- border-green-900 ">
                  <div className="font-bold border- border-red-900 ">Skills:</div>
                  <Form.Item<FieldType>
                     initialValue={isForEdit ? jobDetail?.skills : ""}
                     name="skills"
                     rules={[{ required: true, message: "" }]}
                     className="border- border-blue-300 w-[90%] md:w-[40%] !h-full m-0"
                  >
                     <TextArea rows={5} />
                  </Form.Item>
                  <div>Add the required skills, seperated by commas</div>
               </div>

               <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                     Post
                  </Button>
               </Form.Item>
            </Form>
         </div>
      </div>
   );
}
