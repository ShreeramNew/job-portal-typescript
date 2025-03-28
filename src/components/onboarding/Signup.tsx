"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, message, Form, Input } from "antd";
import type { FormProps } from "antd";
import axios from "axios";
import Image from "next/image";
import loginPic from "../../../public/loginPic.jpg";
import logo from "../../../public/logo-no-background.svg";

export default function Signup({ isEmployer }: { isEmployer: boolean }) {
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

   const warning = (message: string) => {
      messageApi.open({
         type: "warning",
         content: message,
      });
   };

   const router = useRouter();
   type FieldType = {
      email?: string;
      password?: string;
      confirm?: string;
   };
   const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
      if (values.confirm === values.password) {
         let payload = { email: values.email, password: values.password, isEmployer };
         let API = process.env.NEXT_PUBLIC_API + "/api/signup";
         setLoading(true);
         try {
            let response = await axios.post(API, payload, { withCredentials: true });
            if (typeof window !== "undefined") {
               localStorage.setItem("uid", response.data.uid);
            }
            success("SignUp Success!");
            if (typeof window !== undefined) {
               let applying = JSON.parse(localStorage.getItem("applying") ?? "");
               if (applying && applying.isApplying) {
                  localStorage.setItem(
                     "applying",
                     JSON.stringify({
                        isApplying: false,
                        jobId: "",
                     })
                  );
                  router.push("/main/jobDetail/" + applying.jobId);
               }
            }
            router.push(isEmployer ? "/onboarding/employer" : "/onboarding");
         } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
               errorMessage(error.response?.data.msg || "SignUp Failed!");
            }
            console.log(error);
         }
         setLoading(false);
      } else {
         warning("Please confirm the password again");
      }
   };

   const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };
   return (
      <div className="w-full h-[100vh] border- border-red-800 flex justify-start items-start">
         {contextHolder}
         <div className=" w-full flex-shrink-0 md:w-[30rem] flex flex-col justify-start items-center h-screen ">
            <div className="border-blue-900 border- w-full h-full px-[1rem] md:px-[3rem]">
               <Form
                  name="basic"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="on"
                  className=" border- border-green-900 h-full !w-full flex justify-start items-center flex-col relative"
               >
                  <div
                     className=" py-[3rem] cursor-pointer"
                     onClick={() => router.push("/main/home")}
                  >
                     <Image alt="logo" src={logo} className=" w-[200px] h-full" />
                  </div>

                  <div className=" flex flex-col justify-start items-start w-full">
                     <div className=" text-[2rem] font-semibold text-blue-500">Welcome!</div>
                     <div className=" text-[1.1rem] text-gray-700">
                        Set your email and password to get started
                     </div>
                  </div>

                  <div className=" mb-1 text-gray-700 w-full text-[1.05rem] mt-[4rem] md:mt-[1rem] md:pt-[1rem]">Email:</div>
                  <Form.Item<FieldType>
                     name="email"
                     rules={[{ required: true, message: "Please enter a valid email!" }]}
                     className="w-full m-0 "
                  >
                     <Input
                        type="email"
                        className=" !border-b-2 border-blue-900 focus:!border-blue-900 focus:!shadow-none hover:!border-blue-900 rounded-md px-[10px] py-[2px] !outline-none h-[3rem] md:h-[2.4rem]"
                        placeholder="Email"
                     />
                  </Form.Item>

                  <div className=" mb-1 text-gray-700 text-[1.05rem] w-full mt-[2rem]">Password:</div>
                  <Form.Item<FieldType>
                     name="password"
                     rules={[{ required: true, message: "Please input your password!" }]}
                     className="w-full m-0"
                  >
                     <Input.Password
                        className=" !border-b-2 border-blue-900 focus:!border-blue-900 focus:!shadow-none hover:!border-blue-900 rounded-md px-[10px] py-[2px] !outline-none h-[3rem] md:h-[2.4rem]"
                        placeholder="Password"
                     />
                  </Form.Item>

                  <div className=" mb-1 text-gray-700 text-[1.05rem] mt-[2rem] w-full">Confirm Password:</div>

                  <Form.Item<FieldType>
                     name="confirm"
                     rules={[{ required: true, message: "Please confirm password!" }]}
                     className="w-full m-0"
                  >
                     <Input.Password
                        className=" !border-b-2 border-blue-900 focus:!border-blue-900 focus:!shadow-none hover:!border-blue-900 rounded-md px-[10px] py-[2px] !outline-none h-[3rem] md:h-[2.4rem]"
                        placeholder="Confirm Password"
                     />
                  </Form.Item>

                  <div className=" h-fit w-full absolute bottom-[3rem]">
                     <Form.Item className="w-full m-0">
                        <Button
                           htmlType="submit"
                           loading={loading}
                           className=" bg-blue-500 hover:!bg-blue-600 h-[3rem] rounded-[10rem] w-full flex justify-center items-center text-xl !text-white hover:!text-white"
                        >
                           SignUp
                        </Button>
                     </Form.Item>
                     <p className="text-[1rem] mt-3 ml-3">
                        Already have an account?
                        <span
                           className=" text-blue-900 hover:underline underline-offset-2 cursor-pointer"
                           onClick={() =>
                              isEmployer ? router.push("/login/employer") : router.push("/login")
                           }
                        >
                           login
                        </span>
                     </p>
                  </div>
               </Form>
            </div>
         </div>
         <div className=" w-full h-screen relative ">
            <Image src={loginPic} alt="Login Image" fill className=" w-full h-full object-cover" />
         </div>
      </div>
   );
}
