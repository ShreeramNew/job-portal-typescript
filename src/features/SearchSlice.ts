"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EachJobType = {
   _id: string;
   employerId: string;
   company: string;
   jobTitle: string;
   jobType: string;
   location: string;
   minSalary: number;
   maxSalary: number;
   responsibilities: string;
   requirements: string;
   skills: string;
   minExp: number;
   maxExp: number;
   openings: number;
   __v: number;
   postedOn: string;
};

interface stateType {
   results: EachJobType[];
   loading: boolean;
}

const initialState: stateType = { results: [], loading: false };

const searchSlice = createSlice({
   name: "searchSlice",
   initialState,
   reducers: {
      pushResult: (state, action: PayloadAction<EachJobType[]>) => {
         state.results = action.payload;
      },
      toggleLoading: (state) => {
         state.loading = !state.loading;
      },
   },
});

export const { pushResult, toggleLoading } = searchSlice.actions;
export default searchSlice.reducer;
