"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Checkbox, message, Form, Input } from "antd";
import type { FormProps } from "antd";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import loginPic from "../../../public/loginPic.jpg";
import logo from "../../../public/logo-no-background.svg";

export default function Login({ isEmployer }: { isEmployer: boolean }) {
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
   type FieldType = {
      email?: string;
      password?: string;
   };

   const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
      let payload = { email: values.email, password: values.password, isEmployer };
      let API = process.env.NEXT_PUBLIC_API + "/api/login";
      setLoading(true);
      try {
         let response = await axios.post(API, payload, { withCredentials: true });
         if (typeof window !== "undefined") {
            localStorage.setItem("uid", response.data.uid);
            localStorage.setItem("profilePic", response.data.profilePic);
         }
         success("Login Success!");
         console.log("check");

         let isOnboardingRequired = response.data.isOnboardingRequired;
         if (typeof window !== undefined) {
            let applying = localStorage.getItem("applying");
            if (applying) {
               let applyingData = JSON.parse(applying ?? "");
               console.log(applying);
               if (applyingData && applyingData.isApplying) {
                  localStorage.setItem(
                     "applying",
                     JSON.stringify({
                        isApplying: false,
                        jobId: "",
                     })
                  );
                  return router.push("/main/jobDetail/" + applyingData.jobId);
               }
            }
         }
         if (isEmployer) {
            router.push(isOnboardingRequired ? "/onboarding/employer" : "/dashboard/myjob");
         } else {
            router.push(isOnboardingRequired ? "/onboarding" : "/main/home");
         }
      } catch (error: unknown) {
         if (axios.isAxiosError(error)) {
            errorMessage(error.response?.data.msg || "Login Failed!");
         }
         console.log(error);
      }
      setLoading(false);
   };

   const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };

   return (
      <div className="w-full h-[100vh] border- border-red-800 flex justify-start items-start">
         {contextHolder}
         <div className=" w-full flex-shrink-0 md:w-[30rem] flex flex-col justify-start items-center h-screen ">
            <div className=" border-blue-900 border- w-full h-full px-[1rem] md:px-[3rem]">
               <Form
                  name="basic"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="on"
                  className=" border- border-green-900 h-full !w-full flex justify-start items-center flex-col relative"
               >
                  <div className=" py-[3rem] cursor-pointer" onClick={()=>router.push("/main/home")}>
                     <Image alt="logo" src={logo} className=" w-[200px] h-full" />
                  </div>

                  <div className=" flex flex-col justify-start items-start w-full">
                     <div className=" text-[2rem] font-semibold text-blue-500">Login</div>
                     <div className=" text-[1.1rem] text-gray-700">
                        Enter your email and password
                     </div>
                  </div>

                  <div className=" mb-1 text-gray-700 text-[1.05rem] mt-[4rem] md:mt-[2rem] w-full">Email:</div>
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

                  <div className=" h-fit w-full absolute bottom-[3rem]">
                     <Form.Item className="w-full m-0">
                        <Button
                           htmlType="submit"
                           loading={loading}
                           className=" bg-blue-500 hover:!bg-blue-600 h-[3rem] rounded-[10rem] w-full flex justify-center items-center text-xl !text-white hover:!text-white"
                        >
                           <span>Login</span>
                        </Button>
                     </Form.Item>
                     <p className="text-[1rem] mt-3 ml-3">
                        Don't you have an account?
                        <span
                           className=" text-blue-900 hover:underline cursor-pointer underline-offset-2"
                           onClick={() =>
                              isEmployer ? router.push("/signup/employer") : router.push("/signup")
                           }
                        >
                           SignUp
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
