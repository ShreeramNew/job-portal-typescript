"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, message, Form, Input } from "antd";
import type { FormProps } from "antd";
import axios from "axios";

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
            router.push(isEmployer ? "/onboarding/employer" : "/main/home");
         } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
               console.log(error);
               errorMessage(error.response?.data.msg);
            }
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
      <div className="w-full h-[100vh] border- border-red-800 flex justify-center items-center">
         {contextHolder}
         <div className=" border-blue-900 border- w-[93%] md:w-[26%] h-[60%] rounded-lg shadow-blue-600 shadow-xl bg-gradient-to-br from-gray-400 via-gray-200 to-gray-300">
            <Form
               name="basic"
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               autoComplete="on"
               className=" border- border-green-900 h-full !w-full flex justify-center items-center flex-col gap-[30px] rounded-lg"
            >
               <h2 className=" text-blue-600 font-bold text-[2rem] md:text-2xl">SignUp</h2>

               <Form.Item<FieldType>
                  name="email"
                  rules={[{ required: true, message: "Please enter a valid email!" }]}
                  className="w-[83%] md:w-[70%] m-0 h-[10%]"
               >
                  <Input
                     type="email"
                     className=" border-b-2 border-blue-900 rounded-md px-[10px] py-[2px]  outline-none  h-[40px] md:h-[35px]"
                     placeholder="Enter your email"
                  />
               </Form.Item>

               <Form.Item<FieldType>
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                  className="w-[83%] md:w-[70%] m-0 h-[10%]"
               >
                  <Input.Password
                     className=" border-b-2 border-blue-900 rounded-md px-[10px] py-[2px] outline-none  h-[40px] md:h-[35px]"
                     placeholder="Enter password"
                  />
               </Form.Item>

               <Form.Item<FieldType>
                  name="confirm"
                  rules={[{ required: true, message: "Please confirm password!" }]}
                  className="w-[83%] md:w-[70%] m-0 h-[10%]"
               >
                  <Input.Password
                     className=" border-b-2 border-blue-900 rounded-md px-[10px] py-[2px] outline-none h-[40px] md:h-[35px]"
                     placeholder="Confirm password"
                  />
               </Form.Item>

               <Form.Item className="w-[70%] m-0">
                  <Button
                     htmlType="submit"
                     loading={loading}
                     className=" bg-blue-500 hover:!bg-blue-600 py-[5px] text-xl rounded-md w-full !text-white hover:!text-white"
                  >
                     SignUp
                  </Button>
               </Form.Item>
               <p className="text-[1rem]">
                  Already have an account?
                  <span
                     className=" text-blue-900 hover:underline cursor-pointer"
                     onClick={() =>
                        isEmployer ? router.push("/login/employer") : router.push("/login")
                     }
                  >
                     login
                  </span>
               </p>
            </Form>
         </div>
      </div>
   );
}
