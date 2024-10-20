"use client";
import { BsCaretRightFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, message, Form, Input, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useRouter } from "next/navigation";

type FieldType = {
   jobTitle?: string;
   location?: string;
   jobType?: string;
   minSalary?: number;
   maxSalary?: number;
   responsibilities?: string;
   requirements?: string;
   skills?: string;
   minExp?: number;
   maxExp?: number;
   openings?: number;
};

type responseType = {
   _id?: string;
   employerId?: string;
   __v?: number;
} & FieldType;

export default function PostOrEditJob({
   isForEdit,
   jobId,
}: {
   isForEdit: boolean;
   jobId?: string;
}) {
   const [messageApi, contextHolder] = message.useMessage();
   const [loading, setLoading] = useState<{
      buttonLoading: boolean;
      contentLoading: boolean;
   }>({
      buttonLoading: false,
      contentLoading: true,
   });
   const [jobDetail, setJobDetail] = useState<responseType>({});
   const router = useRouter();

   const success = (message: string) => {
      messageApi.open({
         type: "success",
         content: message,
      });
   };

   const errorMessage = (message: string) => {
      messageApi.open({
         type: "error",
         content: message,
      });
   };

   //----------------------------------To fetch job details using jobId(if isForEdit)---------------
   const fetchJobDetails = async () => {
      try {
         setLoading({ buttonLoading: false, contentLoading: true });
         let API = process.env.NEXT_PUBLIC_API + "/api/getJobDetails?jobId=" + jobId;
         let response = await axios.get(API);
         setJobDetail(response.data.jobDetails);
      } catch (error: unknown) {
         if (axios.isAxiosError(error)) {
            errorMessage(error.response?.data.msg);
         }
      }
      setLoading({ buttonLoading: false, contentLoading: false });
   };

   useEffect(() => {
      if (isForEdit) {
         fetchJobDetails();
      } else {
         setLoading({ buttonLoading: false, contentLoading: false });
      }
   }, []);

   const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
      let endPoint: string = "";
      type PatchPayloadType = { jobId?: string };
      type PayLoadType = FieldType | (FieldType & PatchPayloadType);
      let payload: PayLoadType = {};
      if (isForEdit) {
         endPoint = "/api/EditJobDetails";
         payload = {
            ...values,
            jobId,
         };
      } else {
         endPoint = "/api/postJob";
         payload = values;
      }
      let API = process.env.NEXT_PUBLIC_API + endPoint;
      try {
         setLoading({
            buttonLoading: false,
            contentLoading: false,
         });
         let response;
         if (isForEdit) {
            response = await axios.patch(API, payload, { withCredentials: true });
         } else {
            response = await axios.post(API, payload, { withCredentials: true });
         }
         success(response?.data.msg);
         router.push("/dashboard/myjob");
      } catch (error: unknown) {
         if (axios.isAxiosError(error)) {
            errorMessage(error.response?.data.msg);
         }
         console.log(error);
      }
      setLoading({
         buttonLoading: false,
         contentLoading: true,
      });

      console.log("Success:", values);
   };

   const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };

   return (
      <div className="w-screen h-screen border- pt-[16%] md:pt-0 border-red-900 flex flex-col justify-center items-center overflow-x-scroll">
         {contextHolder}

         {isForEdit && !loading.contentLoading && (
            <FormComponent
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               isForEdit={isForEdit}
               jobDetail={jobDetail}
               buttonLoading={loading.buttonLoading}
            />
         )}
         {!isForEdit && (
            <FormComponent
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               isForEdit={isForEdit}
               buttonLoading={loading.buttonLoading}
            />
         )}
         {loading.contentLoading && <Spin />}
      </div>
   );
}

interface PropsType {
   onFinish: FormProps<FieldType>["onFinish"];
   onFinishFailed: FormProps<FieldType>["onFinishFailed"];
   isForEdit: boolean;
   jobDetail?: responseType;
   buttonLoading: boolean;
}
const FormComponent = ({
   onFinish,
   onFinishFailed,
   isForEdit,
   jobDetail,
   buttonLoading,
}: PropsType) => {
   return (
      <>
         <h3 className="left-0 text-gray-700 font-bold text-[1.2rem] m-6">Job Details</h3>
         <div className="w-[90%] md:w-[70%] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg  h-[90%] md:h-[95%] overflow-y-scroll overflow-x-hidden  p-[10px] text-gray-700 text-[1rem] md:text-[0.8rem] ">
            <Form
               name="basic"
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               className="h-full"
               clearOnDestroy={true}
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
                     rules={[{ required: true, message: ""}]}
                     className="border- border-blue-300 !h-full m-0 !flex justify-center items-center w-[17%] md:w-[7%]"
                  >
                     <Input type="number" min={0} />
                  </Form.Item>
                  <div>to</div>
                  <Form.Item<FieldType>
                     initialValue={isForEdit ? jobDetail?.maxSalary : ""}
                     name="maxSalary"
                     rules={[{ required: true, message: ""}]}
                     className="border- border-blue-300 !h-full m-0 !flex justify-center items-center w-[17%] md:w-[7%]"
                  >
                     <Input type="number" min={0} />
                  </Form.Item>
                  <span>LPA</span>
               </div>

               <div className="mt-[5%] md:mt-[1%] w-full h-auto flex gap-[10px] items-center border- border-green-900 ">
                  <div className="font-bold border- border-red-900 ">Experience:</div>
                  <Form.Item<FieldType>
                     initialValue={isForEdit ? jobDetail?.minExp : ""}
                     name="minExp"
                     rules={[{ required: true, message: ""}]}
                     className="border- border-blue-300 !h-full m-0 !flex justify-center items-center w-[17%] md:w-[7%]"
                  >
                     <Input type="number" min={0} />
                  </Form.Item>
                  <div>to</div>
                  <Form.Item<FieldType>
                     initialValue={isForEdit ? jobDetail?.maxExp : ""}
                     name="maxExp"
                     rules={[{ required: true, message: ""}]}
                     className="border- border-blue-300 !h-full m-0 !flex justify-center items-center w-[17%] md:w-[7%]"
                  >
                     <Input type="number" min={0} />
                  </Form.Item>
                  <span>Year</span>
               </div>

               <div className="mt-[5%] md:mt-[1%] w-full h-auto flex gap-[10px] items-center border- border-green-900 ">
                  <div className="font-bold border- border-red-900 ">Openings:</div>
                  <Form.Item<FieldType>
                     initialValue={isForEdit ? jobDetail?.openings : ""}
                     name="openings"
                     rules={[{ required: true, message: ""}]}
                     className="border- border-blue-300 !h-full m-0"
                  >
                     <Input type="number" min={0} />
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
                     initialValue={isForEdit ? jobDetail?.requirements : ""}
                     name="requirements"
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

               <Form.Item className=" w-[30%]">
                  <Button
                     htmlType="submit"
                     loading={buttonLoading}
                     className=" bg-blue-500 hover:!bg-blue-600 py-[5px] text-xl rounded-md w-full !text-white hover:!text-white"
                  >
                     Post
                  </Button>
               </Form.Item>
            </Form>
         </div>
      </>
   );
};
