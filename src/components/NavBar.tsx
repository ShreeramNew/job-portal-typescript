"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { Input, message, Dropdown, Space } from "antd";
import type { GetProps } from "antd";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { IoMdPerson } from "react-icons/io";
import { IoLogOutOutline, IoTriangle } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";
import useSearchText from "@/helpers/SearchText";

const { Search } = Input;

export default function NavBar() {
  type SearchProps = GetProps<typeof Input.Search>;
  const pathname = usePathname();
  const router = useRouter();
  const searchTextHook = useSearchText();
  const { scrollYProgress } = useScroll();

  // Authentication State
  const [user, setUser] = useState<{
    uid: string;
    profilePic: string | null;
  } | null>(null);
  const [searchText, setSearchText] = useState("");

  // Animation values
  const isHome = pathname.includes("/main/home");
  const navWidth = useTransform(
    scrollYProgress,
    [0, 0.1],
    isHome ? ["95%", "100%"] : ["100%", "100%"],
  );
  const navTop = useTransform(
    scrollYProgress,
    [0, 0.1],
    isHome ? ["1rem", "0rem"] : ["0rem", "0rem"],
  );
  const navRadius = useTransform(
    scrollYProgress,
    [0, 0.1],
    isHome ? ["1.5rem", "0rem"] : ["0rem", "0rem"],
  );
  const navShadow = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["0px 4px 20px rgba(0,0,0,0.05)", "0px 0px 0px rgba(0,0,0,0)"],
  );

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    const profilePic = localStorage.getItem("profilePic");
    if (uid) {
      setUser({ uid, profilePic });
    }
  }, []);

  const handleSearch: SearchProps["onSearch"] = (value) => {
    searchTextHook(value);
  };

  const handleLogout = async () => {
    const API = `${process.env.NEXT_PUBLIC_API}/api/logout`;
    try {
      await axios.post(API, {}, { withCredentials: true });
      localStorage.clear();
      setUser(null);
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.msg || "Logout failed");
      }
    }
  };

  const menuItems = [
    {
      key: "1",
      label: (
        <div
          className="flex items-center gap-2 px-2 py-1"
          onClick={() => router.push(`/profile/${user?.uid}`)}
        >
          <IoMdPerson className="text-gray-500" /> <span>My Profile</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="flex items-center gap-2 px-2 py-1"
          onClick={() => router.push("/editUserProfile")}
        >
          <CiEdit className="text-gray-500" /> <span>Edit Profile</span>
        </div>
      ),
    },
    {
      type: "divider" as const,
    },
    {
      key: "3",
      label: (
        <div
          className="flex items-center gap-2 px-2 py-1 text-red-500"
          onClick={handleLogout}
        >
          <IoLogOutOutline size={18} /> <span>Logout</span>
        </div>
      ),
    },
  ];

  return (
    <div className=" hidden lg:flex fixed w-full top-0 z-[100]  justify-center pointer-events-none">
      <motion.nav
        style={{
          width: navWidth,
          top: navTop,
          borderRadius: navRadius,
          boxShadow: navShadow,
        }}
        className="pointer-events-auto h-[70px] md:h-[80px] flex items-center justify-between px-6 md:px-12 bg-white/80 backdrop-blur-md border border-white/20 relative overflow-hidden transition-colors"
      >
        {/* Left: Logo & Links */}
        <div className="flex items-center gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer min-w-[120px]"
            onClick={() => router.push("/main/home")}
          >
            <Image
              alt="logo"
              src="/logo-no-background.svg"
              width={130}
              height={40}
              priority
            />
          </motion.div>

          <div className="hidden lg:flex items-center gap-6 font-medium text-gray-600">
            <button
              onClick={() => router.push("/main/home")}
              className="hover:text-blue-600 transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </button>
            <button
              onClick={() => {
                localStorage.setItem("isSearching", "no");
                router.push("/main/jobs");
              }}
              className="hover:text-blue-600 transition-colors relative group"
            >
              Jobs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </button>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <Search
            placeholder="Search for your dream job..."
            allowClear
            enterButton="Search"
            size="large"
            className="custom-search"
            onSearch={handleSearch}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Right: Auth Actions */}
        <div className="flex items-center gap-3">
          {!user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/login/employer")}
                className="hidden sm:flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              >
                Employer
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/login")}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
              >
                Get Started <GoArrowUpRight />
              </motion.button>
            </div>
          ) : (
            <Dropdown
              menu={{ items: menuItems }}
              trigger={["click"]}
              placement="bottomRight"
              overlayClassName="min-w-[180px] pt-2"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-11 h-11 rounded-full border-2 border-white shadow-sm cursor-pointer overflow-hidden bg-gray-200 flex items-center justify-center"
              >
                {user.profilePic ? (
                  <Image
                    src={user.profilePic}
                    alt="profile"
                    width={44}
                    height={44}
                    className="object-cover"
                  />
                ) : (
                  <IoMdPerson className="text-gray-400 text-2xl" />
                )}
              </motion.div>
            </Dropdown>
          )}
        </div>
      </motion.nav>

      {/* Tailwind Customization for Ant Design Search */}
      <style jsx global>{`
        .custom-search .ant-input-group-addon .ant-btn-primary {
          background-color: #2563eb !important;
          border-color: #2563eb !important;
        }
        .custom-search .ant-input:hover,
        .custom-search .ant-input:focus {
          border-color: #2563eb !important;
        }
      `}</style>
    </div>
  );
}
