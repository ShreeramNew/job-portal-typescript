"use client";
import { HiPencilAlt } from "react-icons/hi";
import Image from "next/image";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";

type FieldType = {
   companyName?: string;
   bio?: string;
   remember?: string;
   location?:string;
   phone?:string;
   website?:string;
   linkedin?:string

};

export default function Page() {
   const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
   const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
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
         <div className=" w-[90%] md:w-[50%] h-auto border- border-blue-900 flex flex-col justify-center items-center p-[10px] rounded-md shadow-blue-600 shadow-xl bg-gradient-to-br from-gray-400 via-gray-200 to-gray-300">
            <div className=" border- border-red-900 w-full h-[70%] relative">
               <Form
                  name="basic"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  className="flex flex-col justify-center items-center "
               >
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
                     <Form.Item<FieldType> name="bio" rules={[{ required: false }]}>
                        <TextArea placeholder="Write about your company" className="!resize-none" rows={3} />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>Location:</label>
                     <Form.Item<FieldType>
                        name="location"
                        rules={[{ required: true, message: "Please input your location!" }]}
                     >
                        <Input placeholder="Enter your Company Location" className=" h-[5vh]" />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>Phone Number(Optional):</label>
                     <Form.Item<FieldType>
                        name="phone"
                        rules={[{ required: false}]}
                     >
                        <Input type="number" placeholder="Phone number" className=" h-[5vh]" />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>Website:</label>
                     <Form.Item<FieldType>
                        name="website"
                        rules={[{ required: true,message:"Please give your website URL"}]}
                     >
                        <Input type="url" placeholder="Website URL" className=" h-[5vh]" />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>LinkedIn:</label>
                     <Form.Item<FieldType>
                        name="linkedin"
                        rules={[{ required: true,message:"Please give your LinkedIn URL"}]}
                     >
                        <Input type="url" placeholder="LinkedIn URL" className=" h-[5vh]" />
                     </Form.Item>
                  </div>


                  
                  <Form.Item className=" md: bottom-[-5%] md:bottom-[-3%] right-6">
                     <button
                        className={`${
                           buttonDisabled
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-600  cursor-pointer"
                        } px-[40%] py-[3px] rounded-lg text-white scale-[1.2] md:scale-[1]`}
                        type="submit"
                     >
                        Submit
                     </button>
                  </Form.Item>
               </Form>
            </div>
         </div>
      </div>
   );
}
