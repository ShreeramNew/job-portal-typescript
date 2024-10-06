"use client";
import { HiPencilAlt } from "react-icons/hi";
import Image from "next/image";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";

type FieldType = {
   username?: string;
   bio?: string;
   education?: string;
   experience?: string;
   company?: string;
   time?: number;
   yearsOrMonth?: string;
   phone?: number;
   linkedin?: string;
   gitHub?: string;
};

export default function Page() {
   const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
   const [haveExperience, setHaveExperience] = useState<boolean>(false);

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

   const handleFileChange = (file?: File) => {
      if (file) {
         setButtonDisabled(false);
      } else {
         setButtonDisabled(true);
      }
      console.log(file);
   };
   return (
      <div className=" w-screen h-screen border-2 border-red-900 flex justify-center items-center ">
         <div className=" w-[90%] md:w-[50%] h-[90%] overflow-y-scroll border- border-blue-900 flex flex-col justify-center items-center p-[10px] rounded-md shadow-blue-600 shadow-xl bg-gradient-to-br from-gray-400 via-gray-200 to-gray-300">
            <div className="border-2 border-gray-400 h-[100px] w-[100px] rounded-[100%] relative">
               <div className=" w-full h-full overflow-hidden rounded-[100%]">
                  <Image
                     src="https://cdn.pixabay.com/photo/2012/03/04/00/36/baby-21971_1280.jpg"
                     alt="profile"
                     width={200}
                     height={200}
                     objectFit="cover"
                  />
               </div>
               <div className=" absolute bottom-1 right-1 bg-white">
                  <HiPencilAlt color="gray" size={20} />
               </div>
            </div>
            <div className=" border- border-red-900 w-full h-[70%] relative">
               <Form
                  name="basic"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  className="flex flex-col justify-center items-center gap-[10px] "
               >
                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>Name:</label>
                     <Form.Item<FieldType>
                        name="username"
                        rules={[{ required: true, message: "Please input your username!" }]}
                     >
                        <Input placeholder="Enter your Name" className=" h-[5vh]" />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[16vh]">
                     <label>Bio:</label>
                     <Form.Item<FieldType> name="bio" rules={[{ required: false }]}>
                        <TextArea placeholder="Write your bio" className="!resize-none" rows={3} />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%]">
                     <label htmlFor="resume">Select Resume:</label>
                     <input
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e.target.files?.[0])}
                        type="file"
                        id="resume"
                        ref={resumeRef}
                     />
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>Education:</label>
                     <Form.Item<FieldType>
                        name="education"
                        rules={[{ required: true, message: "Please input your education!" }]}
                     >
                        <Input placeholder="Enter your Qualification" className=" h-[5vh]" />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>Do you have work experience?</label>
                     <Form.Item
                        name="experience"
                        rules={[{ required: true, message: "Please select a option" }]}
                     >
                        <Radio.Group>
                           <Radio.Button value="yes" onClick={() => setHaveExperience(true)}>
                              Yes
                           </Radio.Button>
                           <Radio.Button value="no" onClick={() => setHaveExperience(false)}>
                              No
                           </Radio.Button>
                        </Radio.Group>
                     </Form.Item>
                  </div>

                  {haveExperience && (
                     <>
                        <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                           <label>Company:</label>
                           <Form.Item<FieldType>
                              name="company"
                              rules={[{ required: true, message: "Please give company name!" }]}
                           >
                              <Input placeholder="Enter the Company name" className=" h-[5vh]" />
                           </Form.Item>
                        </div>

                        <div className=" w-[85%] md:w-[60%] h-[12vh] border- border-red-900">
                           <label>Experience:</label>
                           <div className=" flex ">
                              <Form.Item<FieldType>
                                 name="time"
                                 rules={[{ required: true, message: "Please give company name!" }]}
                              >
                                 <Input
                                    placeholder="Enter the experience"
                                    type="number"
                                    className=" h-[4vh] md:h-[5vh]"
                                 />
                              </Form.Item>
                              <Form.Item
                                 name="yearsOrMonth"
                                 className=" border- border-green-900 w-[30%]"
                              >
                             
                                 {/* <div className="hidden md:block"> */}
                                    <Select defaultValue="years" placeholder="years">
                                       <Select.Option value="months">months</Select.Option>
                                       <Select.Option value="years">years</Select.Option>
                                    </Select>
                                 {/* </div> */}
                              </Form.Item>
                           </div>
                        </div>
                     </>
                  )}

                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>Phone Number:</label>
                     <Form.Item<FieldType>
                        name="phone"
                        rules={[{ required: true, message: "Please give phone number!" }]}
                     >
                        <Input placeholder="Phone number" type="number" className=" h-[5vh]" />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>LinkedIn:</label>
                     <Form.Item<FieldType>
                        name="linkedin"
                        rules={[{ required: true, message: "Please give your Linkedin URL!" }]}
                     >
                        <Input placeholder="LinkedIn" className=" h-[5vh]" />
                     </Form.Item>
                  </div>

                  <div className=" w-[85%] md:w-[60%] h-[12vh] ">
                     <label>GitHub:</label>
                     <Form.Item<FieldType>
                        name="gitHub"
                        rules={[{ required: true, message: "Please give your GitHub URL!" }]}
                     >
                        <Input placeholder="GitHub" className=" h-[5vh]" />
                     </Form.Item>
                  </div>

                  <Form.Item className=" border- border-red-900 w-[40%]">
                     <button
                        className={`${
                           buttonDisabled
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-600  cursor-pointer"
                        } w-full py-[6px] rounded-lg text-white scale-[1.2] md:scale-[1]`}
                        disabled={buttonDisabled}
                        type="submit"
                     >
                        Save
                     </button>
                  </Form.Item>
               </Form>
            </div>
         </div>
      </div>
   );
}
