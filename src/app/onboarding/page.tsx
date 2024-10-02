"use client";
import { HiPencilAlt } from "react-icons/hi";
import Image from "next/image";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

type FieldType = {
   username?: string;
   bio?: string;
   remember?: string;
};

export default function Page() {
   const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
      console.log("Success:", values);
   };

   const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };
   return (
      <div className=" w-screen h-screen border-2 border-red-900 flex justify-center items-center ">
         <div className=" w-[50%] h-[60%] border- border-blue-900 flex flex-col justify-center items-center p-[10px] rounded-md shadow-blue-600 shadow-xl bg-gradient-to-br from-gray-400 via-gray-200 to-gray-300">
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
                  className="flex flex-col justify-center items-center "
               >
                  <div className=" w-[60%] h-[10vh] ">
                     <label>Name:</label>
                     <Form.Item<FieldType>
                        name="username"
                        rules={[{ required: true, message: "Please input your username!" }]}
                     >
                        <Input placeholder="Enter your Name"/>
                     </Form.Item>
                  </div>

                  <div className=" w-[60%] h-[16vh]">
                     <label>Bio:</label>
                     <Form.Item<FieldType> name="bio" rules={[{ required: false }]}>
                        <TextArea placeholder="Write your bio" className="!resize-none" rows={3} />
                     </Form.Item>
                  </div>

                  <div className=" w-[60%]">
                     <label htmlFor="resume">Select Resume:</label>
                     <Input type="file" id="resume" />
                  </div>
                  <Form.Item className=" absolute bottom-[-10%] right-2">
                     <Button htmlType="submit">Save</Button>
                  </Form.Item>
               </Form>
            </div>
         </div>
      </div>
   );
}
