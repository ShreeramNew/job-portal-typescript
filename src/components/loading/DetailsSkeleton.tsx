"use client";

import React from "react";

export const JobDetailSkeleton = () => (
  <div className="w-full flex flex-col gap-6 animate-pulse">
    <div className="w-full p-6 bg-white border border-slate-200/60 rounded-xl flex flex-col gap-5">
      <div className="flex justify-between items-start gap-4 w-full">
        <div className="flex gap-4 w-2/3">
          <div className="w-14 h-14 bg-slate-200 rounded-xl shrink-0" />
          <div className="flex flex-col gap-2 w-full mt-1">
            <div className="h-5 bg-slate-200 rounded-md w-3/4" />
            <div className="h-4 bg-slate-200 rounded-md w-1/2" />
          </div>
        </div>
        <div className="w-24 h-6 bg-slate-200 rounded-full shrink-0" />
      </div>
      <div className="h-12 bg-slate-200/50 rounded-xl w-full" />
      <div className="flex gap-2">
        <div className="h-6 bg-slate-200 rounded-md w-16" />
        <div className="h-6 bg-slate-200 rounded-md w-20" />
      </div>
      <div className="h-px bg-slate-100 w-full" />
      <div className="flex justify-between items-center w-full">
        <div className="h-6 bg-slate-200 rounded-md w-40" />
        <div className="h-10 bg-slate-200 rounded-xl w-32" />
      </div>
    </div>
    <div className="w-full p-6 bg-white border border-slate-200/60 rounded-xl flex flex-col gap-4">
      <div className="h-5 bg-slate-200 rounded-md w-1/3 border-b pb-2" />
      <div className="h-4 bg-slate-200 rounded-md w-full mt-2" />
      <div className="h-4 bg-slate-200 rounded-md w-5/6" />
    </div>
  </div>
);

export const SidebarSkeleton = () => (
  <div className="w-full p-5 bg-white border border-slate-200/60 rounded-xl flex flex-col gap-4 animate-pulse">
    <div className="flex gap-4 items-start w-full">
      <div className="w-11 h-11 bg-slate-200 rounded-xl shrink-0" />
      <div className="flex flex-col gap-2 w-2/3">
        <div className="h-4 bg-slate-200 rounded-md w-full" />
        <div className="h-3 bg-slate-200 rounded-md w-1/2" />
      </div>
    </div>
    <div className="h-3 bg-slate-200 rounded-md w-3/4 mt-1" />
    <div className="h-px bg-slate-100 w-full" />
    <div className="flex justify-between w-full">
      <div className="h-5 bg-slate-200 rounded-md w-20" />
      <div className="h-3 bg-slate-200 rounded-md w-10" />
    </div>
  </div>
);