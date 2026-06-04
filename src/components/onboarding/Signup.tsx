"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, message, Form, Input } from "antd";
import type { FormProps } from "antd";
import api from "@/config/api";
import axios from "axios";
import Image from "next/image";
import { MailOutlined, LockOutlined, UserAddOutlined } from "@ant-design/icons";
import loginPic from "../../../public/loginPic.jpg";
import logo from "../../../public/logo-no-background.svg";

export default function Signup({ isEmployer }: { isEmployer: boolean }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const success = (msg: string) => messageApi.success(msg);
  const errorMessage = (msg: string) => messageApi.error(msg);
  const warning = (msg: string) => messageApi.warning(msg);

  type FieldType = {
    email?: string;
    password?: string;
    confirm?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.confirm !== values.password) {
      return warning("Passwords do not match!");
    }

    let payload = {
      email: values.email,
      password: values.password,
      isEmployer,
    };
    let API = "/api/signup";
    setLoading(true);

    try {
      let response = await api.post(API, payload, { withCredentials: true });
      if (typeof window !== "undefined") {
        localStorage.setItem("uid", response.data.uid);

        // Handle redirect if user was in the middle of applying
        const applyingStr = localStorage.getItem("applying");
        if (applyingStr) {
          try {
            let applying = JSON.parse(applyingStr);
            if (applying && applying.isApplying) {
              localStorage.setItem(
                "applying",
                JSON.stringify({ isApplying: false, jobId: "" }),
              );
              success("SignUp Success!");
              return router.push("/main/jobDetail/" + applying.jobId);
            }
          } catch (e) {
            console.error("Error parsing applying data", e);
          }
        }
      }

      success("SignUp Success!");
      router.push(isEmployer ? "/onboarding/employer" : "/onboarding");
    } catch (error: any) {
      errorMessage(error.response?.data.msg || "SignUp Failed!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-50">
      {contextHolder}

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={loginPic}
          alt="Background"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-[480px] px-6 my-10">
        <div className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => router.push("/main/home")}
            >
              <Image
                alt="logo"
                src={logo}
                width={150}
                height={40}
                className="h-auto"
              />
            </div>
          </div>

          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              {isEmployer ? "Employer Account" : "Create Account"}
            </h1>
            <p className="text-gray-500 mt-2">
              Join us today and kickstart your journey.
            </p>
          </div>

          <Form
            name="signup_form"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="space-y-1"
          >
            <Form.Item<FieldType>
              name="email"
              label={
                <span className="text-gray-600 font-medium">Email Address</span>
              }
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400 mr-2" />}
                placeholder="example@mail.com"
                className="h-11 rounded-xl border-gray-200 hover:border-blue-500"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              label={
                <span className="text-gray-600 font-medium">Password</span>
              }
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400 mr-2" />}
                placeholder="Create a password"
                className="h-11 rounded-xl border-gray-200"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="confirm"
              label={
                <span className="text-gray-600 font-medium">
                  Confirm Password
                </span>
              }
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400 mr-2" />}
                placeholder="Repeat your password"
                className="h-11 rounded-xl border-gray-200"
              />
            </Form.Item>

            <div className="pt-6">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="h-12 bg-blue-600 hover:!bg-blue-700 rounded-xl text-lg font-semibold shadow-lg shadow-blue-200 border-none flex items-center justify-center gap-2"
              >
                Sign Up <UserAddOutlined />
              </Button>
            </div>
          </Form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm md:text-base">
              Already have an account?{" "}
              <span
                className="text-blue-600 font-bold hover:underline cursor-pointer transition-all"
                onClick={() =>
                  isEmployer
                    ? router.push("/login/employer")
                    : router.push("/login")
                }
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
