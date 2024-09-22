"use client";
import SearchSlice from "@/features/SearchSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store=configureStore({
    reducer:{
        SearchSlice
    }
})

export type RootState = ReturnType<typeof store.getState>