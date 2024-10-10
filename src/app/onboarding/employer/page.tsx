"use client";
import { HiPencilAlt } from "react-icons/hi";
import Image from "next/image";
import type { FormProps } from "antd";
import { Button, Checkbox, message, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type FieldType = {
   companyName?: string;
   bio?: string;
   location?: string;
   phone?: string;
   website?: string;
   linkedin?: string;
   whyWorkWithUS?: string;
   aboutTeam?: string;
   aboutEnvoirnment?: string;
};

export default function Page() {
   const [messageApi, contextHolder] = message.useMessage();
   const [loading, setLoading] = useState<boolean>(false);

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
   const router = useRouter();
   const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
   const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
      const API = "http://localhost:3000/api/onboarding/employer";
      try {
         setLoading(true);
         await axios.post(API, values, { withCredentials: true });
         router.push("/dashboard/myjob");
         setLoading(false);
      } catch (error: unknown) {
         if (axios.isAxiosError(error)) {
            console.log(error);
            errorMessage(error.response?.data.msg);
            setLoading(false);
         }
      }
      console.log("Success:", values);
   };

   const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };

   const resumeRef = useRef<HTMLInputElement>(null);
   useEffect(() => {
      console.log(resumeRef.current?.value);
   }, []);

   return (
      <div className=" w-screen h-screen border-2 border-red-900 flex justify-center items-center ">
         {contextHolder}
         <div className=" w-[90%] md:w-[50%] h-[90%] overflow-y-scroll border- border-blue-900 flex flex-col justify-center items-center p-[10px] rounded-md shadow-blue-600 shadow-xl bg-gradient-to-br from-gray-400 via-gray-200 to-gray-300">
            <div className=" border- border-red-900 w-full h-auto pt-[140%] md:pt-[60%] relative">
               <Form
                  name="basic"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  className="flex flex-col justify-center items-center "
               >
                  <h2 className=" text-gray-700 font-bold text-[1.2rem]">Company Details</h2>

                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>Company Name:</label>
                     <Form.Item<FieldType>
                        name="companyName"
                        rules={[{ required: true, message: "Please input your Company name!" }]}
                     >
                        <Input placeholder="Enter your Company Name" className=" h-[5vh]" />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[16vh]">
                     <label>About:</label>
                     <Form.Item<FieldType> name="bio" rules={[{ required: true, message: "" }]}>
                        <TextArea
                           placeholder="Write about your company"
                           className="!resize-none"
                           rows={3}
                        />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[16vh]">
                     <label>Why Candidates Should Join Your Company?:</label>
                     <Form.Item<FieldType>
                        name="whyWorkWithUS"
                        rules={[{ required: true, message: "" }]}
                     >
                        <TextArea
                           placeholder="Write about why Candidates Should Join Your Company"
                           className="!resize-none"
                           rows={3}
                        />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[16vh]">
                     <label>About your Team:</label>
                     <Form.Item<FieldType>
                        name="aboutTeam"
                        rules={[{ required: true, message: "" }]}
                     >
                        <TextArea
                           placeholder="Write about your Team"
                           className="!resize-none"
                           rows={3}
                        />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[16vh]">
                     <label>About your Work Envoirnment:</label>
                     <Form.Item<FieldType>
                        name="aboutEnvoirnment"
                        rules={[{ required: true, message: "" }]}
                     >
                        <TextArea
                           placeholder="Write about your Work envoirnment"
                           className="!resize-none"
                           rows={3}
                        />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>Location:</label>
                     <Form.Item<FieldType>
                        name="location"
                        rules={[{ required: true, message: "" }]}
                     >
                        <Input placeholder="Enter your Company Location" className=" h-[5vh]" />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>Phone Number(Optional):</label>
                     <Form.Item<FieldType> name="phone" rules={[{ required: true, message: "" }]}>
                        <Input type="number" placeholder="Phone number" className=" h-[5vh]" />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>Website:</label>
                     <Form.Item<FieldType> name="website" rules={[{ required: true, message: "" }]}>
                        <Input type="url" placeholder="Website URL" className=" h-[5vh]" />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>LinkedIn:</label>
                     <Form.Item<FieldType>
                        name="linkedin"
                        rules={[{ required: true, message: "" }]}
                     >
                        <Input type="url" placeholder="LinkedIn URL" className=" h-[5vh]" />
                     </Form.Item>
                  </div>

                  <Form.Item className=" md: bottom-[-5%] md:bottom-[-3%] right-6">
                     <Button
                        htmlType="submit"
                        loading={loading}
                        className=" bg-blue-500 hover:!bg-blue-600 py-[5px] text-xl rounded-md w-full !text-white hover:!text-white"
                     >
                        Save
                     </Button>
                  </Form.Item>
               </Form>
            </div>
         </div>
      </div>
   );
}
