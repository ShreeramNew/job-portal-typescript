"use client";

import React, { useState } from "react";
import { Drawer, Input, ConfigProvider } from "antd";
import { FiMenu, FiHome, FiBriefcase, FiX } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useSearchText from "@/helpers/SearchText";

const { Search } = Input;

export default function NavForMobile() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const executeSearch = useSearchText();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const onSearch = (value: string) => {
    setSearchOpen(false);
    executeSearch(value);
  };

  return (
    <div className="md:hidden sticky top-0 z-[100] w-full">
      {/* Header Container */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 h-[65px] px-4 flex items-center justify-between shadow-sm">
        <AnimatePresence mode="wait">
          {!searchOpen ? (
            <motion.div
              key="nav-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between w-full"
            >
              <button
                onClick={showDrawer}
                className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiMenu size={26} />
              </button>

              <div className="flex-1 flex justify-center">
                <Image
                  alt="logo"
                  src="/logo-no-background.svg"
                  width={110}
                  height={35}
                  onClick={() => router.push("/main/home")}
                  className="cursor-pointer"
                />
              </div>

              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 -mr-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaSearch size={20} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="search-bar"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="flex items-center gap-2 w-full"
            >
              <button
                onClick={() => setSearchOpen(false)}
                className="p-2 text-gray-500"
              >
                <FaArrowLeft size={18} />
              </button>

              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#3b82f6",
                    borderRadius: 12,
                  },
                }}
              >
                <Search
                  autoFocus
                  placeholder="Search jobs..."
                  onSearch={onSearch}
                  size="large"
                  className="w-full"
                />
              </ConfigProvider>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Drawer Menu */}
      <Drawer
        placement="left"
        onClose={onClose}
        open={open}
        width="85%"
        closable={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col h-full bg-white">
          {/* Drawer Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <Image
              src="/logo-no-background.svg"
              alt="logo"
              width={100}
              height={30}
            />
            <button onClick={onClose} className="text-gray-400 p-2">
              <FiX size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 p-4 space-y-2">
            <MenuLink
              icon={<FiHome />}
              label="Home"
              onClick={() => {
                router.push("/main/home");
                onClose();
              }}
            />
            <MenuLink
              icon={<FiBriefcase />}
              label="Find Jobs"
              onClick={() => {
                router.push("/main/jobs");
                onClose();
              }}
            />
          </div>

          {/* Bottom Actions */}
          <div className="p-6 space-y-3 bg-gray-50">
            <button
              onClick={() => router.push("/login")}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
            >
              Get Started <GoArrowUpRight />
            </button>
            <button
              onClick={() => router.push("/login/employer")}
              className="w-full py-3 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              Employer Portal <GoArrowUpRight />
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

// Sub-component for Menu Links
function MenuLink({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-4 text-gray-700 font-medium text-lg hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
    >
      <span className="text-xl text-gray-400 group-hover:text-blue-600">
        {icon}
      </span>
      {label}
    </button>
  );
}
