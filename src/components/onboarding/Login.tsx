"use client";
import { useRouter } from "next/navigation";
import { Button, message, Form, Input } from "antd";
import type { FormProps } from "antd";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  MailOutlined,
  LockOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import loginPic from "../../../public/loginPic.jpg";
import logo from "../../../public/logo-no-background.svg";

export default function Login({ isEmployer }: { isEmployer: boolean }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const success = (msg: string) => messageApi.success(msg);
  const errorMessage = (msg: string) => messageApi.error(msg);

  type FieldType = {
    email?: string;
    password?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    let payload = {
      email: values.email,
      password: values.password,
      isEmployer,
    };
    let API = process.env.NEXT_PUBLIC_API + "/api/login";
    setLoading(true);
    try {
      let response = await axios.post(API, payload, { withCredentials: true });
      if (typeof window !== "undefined") {
        localStorage.setItem("uid", response.data.uid);
        localStorage.setItem("profilePic", response.data.profilePic);
      }
      success("Login Success!");

      let isOnboardingRequired = response.data.isOnboardingRequired;

      if (typeof window !== "undefined") {
        let applying = localStorage.getItem("applying");
        if (applying) {
          let applyingData = JSON.parse(applying);
          if (applyingData && applyingData.isApplying) {
            localStorage.setItem(
              "applying",
              JSON.stringify({ isApplying: false, jobId: "" }),
            );
            return router.push("/main/jobDetail/" + applyingData.jobId);
          }
        }
      }

      if (isEmployer) {
        router.push(
          isOnboardingRequired ? "/onboarding/employer" : "/dashboard/myjob",
        );
      } else {
        router.push(isOnboardingRequired ? "/onboarding" : "/main/home");
      }
    } catch (error: any) {
      errorMessage(error.response?.data.msg || "Login Failed!");
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
          className="object-cover transition-transform duration-1000 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[450px] px-6">
        <div className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => router.push("/main/home")}
            >
              <Image
                alt="logo"
                src={logo}
                width={160}
                height={50}
                className="h-auto"
              />
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              {isEmployer ? "Employer Login" : "Welcome Back"}
            </h1>
            <p className="text-gray-500 mt-2">
              Please enter your credentials to access your account.
            </p>
          </div>

          <Form
            name="login_form"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="space-y-4"
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
                placeholder="name@company.com"
                className="h-12 rounded-xl border-gray-200 hover:border-blue-500 focus:border-blue-500"
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
                placeholder="••••••••"
                className="h-12 rounded-xl border-gray-200 hover:border-blue-500 focus:border-blue-500"
              />
            </Form.Item>

            <div className="pt-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="h-12 bg-blue-600 hover:!bg-blue-700 rounded-xl text-lg font-semibold shadow-lg shadow-blue-200 border-none flex items-center justify-center gap-2"
              >
                Login <ArrowRightOutlined />
              </Button>
            </div>
          </Form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <span
                className="text-blue-600 font-bold hover:text-blue-700 cursor-pointer transition-colors"
                onClick={() =>
                  isEmployer
                    ? router.push("/signup/employer")
                    : router.push("/signup")
                }
              >
                Create Account
              </span>
            </p>
          </div>
        </div>

        {/* Footer Attribution/Links */}
        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
