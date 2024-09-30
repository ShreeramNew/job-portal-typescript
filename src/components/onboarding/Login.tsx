"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Checkbox, Form, Input } from "antd";
import type { FormProps } from "antd";

export default function Login({ isEmployer }: { isEmployer: boolean }) {
   const router = useRouter();
   type FieldType = {
      email?: string;
      password?: string;
   };
   const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
      console.log("Success:", values);
   };

   const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };

   return (
      <div className="w-full h-[100vh] border- border-red-800 flex justify-center items-center bg-gray-100">
         <div className=" border-blue-900 border-2 w-[26%] h-[60%] rounded-lg shadow-blue-600 shadow-xl bg-gray-200">
            <Form
               name="basic"
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               autoComplete="on"
               className=" border- border-green-900 h-full !w-full flex justify-center items-center flex-col gap-[25px] rounded-lg"
            >
               <h2 className=" text-blue-600 font-bold text-2xl">Login</h2>

               <Form.Item<FieldType>
                  name="email"
                  rules={[{ required: true, message: "Please enter a valid email!" }]}
                  className="w-[70%] m-0 h-[10%]"
               >
                  <Input
                     className=" border-2 border-gray-400 rounded-md px-[10px] py-[2px]  outline-none  h-[35px]"
                     placeholder="Enter your email"
                  />
               </Form.Item>

               <Form.Item<FieldType>
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                  className="w-[70%] m-0 h-[10%]"
               >
                  <Input.Password
                     className=" border-2 border-gray-400 rounded-md px-[10px] py-[2px] outline-none  h-[35px]"
                     placeholder="Enter password"
                  />
               </Form.Item>

               <Form.Item className="w-[70%] m-0">
                  <button
                     type="submit"
                     className=" bg-blue-500 py-[5px] rounded-md w-full text-white "
                  >
                     Login
                  </button>
               </Form.Item>
               <p>
                  Don't you have an account?
                  <span
                     className=" text-blue-900 hover:underline cursor-pointer"
                     onClick={() =>
                        isEmployer ? router.push("/signup/employer") : router.push("/signup")
                     }
                  >
                     SignUp
                  </span>
               </p>
            </Form>
         </div>
      </div>
   );
}
