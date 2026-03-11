"use client";
import { FaLinkedinIn, FaGithub, FaRegCopyright } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useSearchText from "@/helpers/SearchText";

export default function Footer() {
  const router = useRouter();
  const Serachtext = useSearchText();

  const categories = [
    { name: "Sales & Marketing", keywords: "digital marketing sales" },
    { name: "Finance & Accounting", keywords: "accounting finance budgeting" },
    { name: "Customer Service", keywords: "customer support client relations" },
    { name: "Engineering", keywords: "software development engineering" },
    { name: "Healthcare", keywords: "nursing doctor patient care" },
    { name: "Human Resources", keywords: "recruitment hr policies" },
  ];

  return (
    <footer className="bg-[#08080a] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Branding & Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Column 1: Brand & Socials */}
          <div className="space-y-6">
            <Image
              alt="logo"
              src="/logo-no-background.svg"
              width={140}
              height={40}
              className="brightness-125"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The next generation job platform connecting world-class talent
              with industry-leading companies.
            </p>
            <div className="flex items-center gap-3">
              <SocialIcon
                href="https://linkedin.com/in/shreeram-630102262"
                icon={<FaLinkedinIn />}
              />
              <SocialIcon
                href="https://github.com/ShreeramNew"
                icon={<FaGithub />}
              />
              <SocialIcon
                href="mailto:shreerambca1@gmail.com"
                icon={<HiOutlineMail size={20} />}
              />
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.25em] mb-8">
              Browse Roles
            </h4>
            <ul className="space-y-4">
              {categories.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => Serachtext(item.keywords)}
                    className="text-gray-400 hover:text-blue-500 transition-all duration-300 text-[14px] hover:translate-x-1 block"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Platform (Revised) */}
          <div>
            <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.25em] mb-8">
              Platform
            </h4>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => router.push("/main/jobs")}
                  className="text-gray-400 hover:text-white transition-all duration-300 text-[14px] hover:translate-x-1 block text-left w-full"
                >
                  Search Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/login/employer")}
                  className="text-gray-400 hover:text-white transition-all duration-300 text-[14px] hover:translate-x-1 block text-left w-full"
                >
                  Employer Dashboard
                </button>
              </li>
              {/* <li>
                <button className="text-gray-400 hover:text-white transition-all duration-300 text-[14px] hover:translate-x-1 block text-left w-full">
                  Career Advice
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-all duration-300 text-[14px] hover:translate-x-1 block text-left w-full">
                  Market Insights
                </button>
              </li> */}
            </ul>
          </div>

          {/* Column 4: CTA Card */}
          <div className="flex flex-col">
            <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.25em] mb-8">
              Join Community
            </h4>
            <div className="bg-gradient-to-br from-white/[0.05] to-transparent rounded-2xl p-6 border border-white/10">
              <p className="text-gray-300 text-xs mb-5 leading-relaxed">
                Ready to accelerate your career? Join thousands of professionals
                today.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-blue-600/20"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-gray-500 text-[12px]">
            <FaRegCopyright size={14} />
            <span>2026 JobNow. All rights reserved.</span>
          </div>
          <div className="flex gap-8 text-gray-500 text-[12px]">
            <button className="hover:text-white transition-colors">
              Privacy
            </button>
            <button className="hover:text-white transition-colors">
              Terms
            </button>
            <button className="hover:text-white transition-colors">
              Security
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-500"
    >
      {icon}
    </a>
  );
}
