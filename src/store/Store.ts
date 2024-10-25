"use client";
import SearchSlice from "@/features/SearchSlice";
import GeneralSlice from "@/features/GeneralSlice"
import { configureStore } from "@reduxjs/toolkit";

export const store=configureStore({
    reducer:{
        SearchSlice,
        GeneralSlice
    }
})

export type RootState = ReturnType<typeof store.getState>