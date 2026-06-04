"use client";
import { HiPencilAlt } from "react-icons/hi";
import Image from "next/image";
import type { FormProps } from "antd";
import {
  Button,
  Form,
  Input,
  message,
  Radio,
  Select,
  Spin,
  Upload,
  Card,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  BookOutlined,
  IdcardOutlined, // Stable Company/Profile icon
  PhoneOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const { TextArea } = Input;

// Helper for AntD Upload to handle the file event correctly
const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e?.fileList;
};

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

export default function EditUserProfile({ isForEdit }: { isForEdit: boolean }) {
  const router = useRouter();
  const [form] = Form.useForm();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(!isForEdit);
  const [haveExperience, setHaveExperience] = useState<boolean>(false);
  const [contentLoading, setContenLoading] = useState<boolean>(true);
  const [profilePicURL, setProfilePicURL] = useState<string>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  );
  const [loading, setLoading] = useState({
    submitLoading: false,
    uploadLoading: false,
  });

  const FetchProfile = async () => {
    let API = process.env.NEXT_PUBLIC_API + "/api/getProfile/user";
    try {
      let response = await axios.get(API, { withCredentials: true });
      const userData = response.data.user;

      setProfilePicURL(userData.profile || profilePicURL);
      setHaveExperience(userData.experience === "yes");
      form.setFieldsValue(userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.msg || "Failed to fetch profile");
        router.push("/main/home");
      }
    } finally {
      setContenLoading(false);
    }
  };

  useEffect(() => {
    if (isForEdit) {
      FetchProfile();
    } else {
      setContenLoading(false);
    }
  }, [isForEdit]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    let API = process.env.NEXT_PUBLIC_API + "/api/onboarding/user";
    setLoading((prev) => ({ ...prev, submitLoading: true }));
    try {
      await axios.post(API, values, { withCredentials: true });
      message.success(isForEdit ? "Profile updated!" : "Onboarding complete!");
      router.push("/main/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.msg || "Submission failed");
      }
    } finally {
      setLoading((prev) => ({ ...prev, submitLoading: false }));
    }
  };

  const handleProfilePicChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);
    setLoading((prev) => ({ ...prev, uploadLoading: true }));

    try {
      let API = process.env.NEXT_PUBLIC_API + "/api/upload/profilePic";
      let response = await axios.post(API, formData, { withCredentials: true });
      const newPic = response.data.profileDetails.profile;
      setProfilePicURL(newPic);
      if (typeof window !== "undefined") {
        localStorage.setItem("profilePic", newPic);
      }
      message.success("Photo updated!");
    } catch (error) {
      message.error("Photo upload failed");
    } finally {
      setLoading((prev) => ({ ...prev, uploadLoading: false }));
    }
  };

  const handleResumeUpload = async (file: File) => {
    setButtonDisabled(false);
    const formData = new FormData();
    formData.append("resume", file);
    try {
      let API = process.env.NEXT_PUBLIC_API + "/api/upload/resume";
      await axios.post(API, formData, { withCredentials: true });
      message.success("Resume uploaded successfully");
    } catch (error) {
      message.error("Resume upload failed");
    }
    return false;
  };

  if (contentLoading) {
    return <Spin fullscreen tip="Loading Profile..." />;
  }

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] py-10 px-4 flex justify-center">
      <Card className="w-full max-w-3xl shadow-sm rounded-2xl border-none">
        <div className="flex flex-col items-center mb-10 border-b border-gray-100 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isForEdit ? "Edit Profile Settings" : "Let's Get Started"}
          </h2>

          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-md bg-gray-100 flex justify-center items-center">
              {loading.uploadLoading ? (
                <Spin />
              ) : (
                <Image
                  src={profilePicURL || "/placeholder-user.png"}
                  alt="profile"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  priority
                />
              )}
            </div>
            <label
              htmlFor="profilePic"
              className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110"
            >
              <HiPencilAlt className="text-white" size={18} />
              <input
                type="file"
                id="profilePic"
                hidden
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleProfilePicChange}
              />
            </label>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <Form.Item<FieldType>
              name="username"
              label={
                <span className="font-semibold text-gray-700">Full Name</span>
              }
              rules={[{ required: true, message: "Please enter your name" }]}
              className="md:col-span-2"
            >
              <Input
                prefix={<UserOutlined className="text-gray-400 mr-1" />}
                placeholder="Enter your full name"
                className="h-11 rounded-lg"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="bio"
              label={
                <span className="font-semibold text-gray-700">Profile Bio</span>
              }
              className="md:col-span-2"
            >
              <TextArea
                rows={3}
                placeholder="Tell us about yourself..."
                className="rounded-lg pt-2"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="education"
              label={
                <span className="font-semibold text-gray-700">
                  Highest Education
                </span>
              }
              rules={[{ required: true, message: "Required" }]}
            >
              <Input
                prefix={<BookOutlined className="text-gray-400 mr-1" />}
                placeholder="Degree / University"
                className="h-11 rounded-lg"
              />
            </Form.Item>

            {/* FIXED UPLOAD ITEM */}
            <Form.Item
              name="resume"
              label={
                <span className="font-semibold text-gray-700">Resume / CV</span>
              }
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                beforeUpload={handleResumeUpload}
                maxCount={1}
                className="w-full"
              >
                <Button
                  icon={<UploadOutlined />}
                  className="w-full h-11 rounded-lg flex items-center justify-center"
                >
                  Upload PDF
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="experience"
              label={
                <span className="font-semibold text-gray-700">
                  Work History
                </span>
              }
              className="md:col-span-2"
            >
              <Radio.Group
                optionType="button"
                buttonStyle="solid"
                className="w-full flex"
                onChange={(e) => {
                  setHaveExperience(e.target.value === "yes");
                  setButtonDisabled(false);
                }}
              >
                <Radio.Button
                  value="yes"
                  className="flex-1 text-center h-10 flex items-center justify-center"
                >
                  I have experience
                </Radio.Button>
                <Radio.Button
                  value="no"
                  className="flex-1 text-center h-10 flex items-center justify-center"
                >
                  I am a fresher
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            {haveExperience && (
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 bg-gray-50 p-5 rounded-xl mb-6 border border-gray-200">
                <Form.Item<FieldType>
                  name="company"
                  label="Latest Company"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input
                    prefix={<IdcardOutlined />}
                    placeholder="Company Name"
                    className="h-10"
                  />
                </Form.Item>
                <div className="flex gap-2">
                  <Form.Item<FieldType>
                    name="time"
                    label="Duration"
                    className="flex-1"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input type="number" placeholder="Eg: 2" className="h-10" />
                  </Form.Item>
                  <Form.Item
                    name="yearsOrMonth"
                    label="Unit"
                    className="w-[110px]"
                  >
                    <Select defaultValue="years" className="h-10">
                      <Select.Option value="months">Months</Select.Option>
                      <Select.Option value="years">Years</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
            )}

            <Form.Item<FieldType>
              name="phone"
              label={
                <span className="font-semibold text-gray-700">
                  Phone Number
                </span>
              }
              rules={[{ required: true, message: "Required" }]}
            >
              <Input
                prefix={<PhoneOutlined className="text-gray-400 mr-1" />}
                type="number"
                placeholder="Contact number"
                className="h-11 rounded-lg"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="linkedin"
              label={
                <span className="font-semibold text-gray-700">
                  LinkedIn Profile
                </span>
              }
              rules={[{ required: true, message: "Required" }]}
            >
              <Input
                prefix={<LinkedinOutlined className="text-[#0077b5] mr-1" />}
                placeholder="Link to profile"
                className="h-11 rounded-lg"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="gitHub"
              label={
                <span className="font-semibold text-gray-700">
                  GitHub / Portfolio
                </span>
              }
              rules={[{ required: true, message: "Required" }]}
              className="md:col-span-2"
            >
              <Input
                prefix={<GithubOutlined className="mr-1" />}
                placeholder="Link to work"
                className="h-11 rounded-lg"
              />
            </Form.Item>
          </div>

          <div className="mt-10 flex flex-col-reverse md:flex-row justify-end gap-4 border-t border-gray-100 pt-8">
            <Button
              size="large"
              className="rounded-xl px-8 h-12"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading.submitLoading}
              disabled={buttonDisabled}
              size="large"
              className="rounded-xl px-12 bg-blue-600 hover:!bg-blue-700 h-12 text-lg font-medium border-none"
            >
              {isForEdit ? "Update Profile" : "Complete Registration"}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
