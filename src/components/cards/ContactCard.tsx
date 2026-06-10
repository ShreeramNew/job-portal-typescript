"use client";

import React from "react";
import { CiMail } from "react-icons/ci"; // Fixed: Imported from 'ci' instead of 'pi'
import { MdLocalPhone } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { TiSocialLinkedin } from "react-icons/ti";

interface ContactPropsType {
  email?: string;
  phone?: number;
  social?: string;
  website?: string;
}

export default function ContactCard({ email, phone, social, website }: ContactPropsType) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600 font-medium">
      {email && (
        <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100/60 transition-colors">
          <CiMail size={18} className="text-slate-400" />
          <a href={`mailto:${email}`} className="text-xs sm:text-sm text-indigo-600 hover:underline truncate">
            {email}
          </a>
        </div>
      )}
      {phone && (
        <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
          <MdLocalPhone size={18} className="text-slate-400" />
          <span className="text-xs sm:text-sm text-slate-700">{phone}</span>
        </div>
      )}
      {website && (
        <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100/60 transition-colors">
          <TbWorld size={18} className="text-slate-400" />
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-indigo-600 hover:underline truncate">
            {website}
          </a>
        </div>
      )}
      {social && (
        <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100/60 transition-colors">
          <TiSocialLinkedin size={18} className="text-slate-400" />
          <a href={social} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-indigo-600 hover:underline truncate">
            LinkedIn Profile
          </a>
        </div>
      )}
    </div>
  );
}