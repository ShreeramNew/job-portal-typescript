"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EachJobType = {
   _id?: string;
   employerId?: string;
   company?: string;
   jobTitle?: string;
   jobType?: string;
   location?: string;
   minSalary?: number;
   maxSalary?: number;
   responsibilities?: string;
   requirements?: string;
   skills?: string;
   minExp?: number;
   maxExp?: number;
   openings?: number;
   __v?: number;
   postedOn?: string;
};


type filtersType = {
   experience: number[];
   location: string[];
   salary: number[];
};

interface stateType {
   results: EachJobType[];
   filterResults: EachJobType[];
   loading: boolean;
   filters: filtersType;
}

const initialState: stateType = {
   results: [],
   filterResults: [],
   loading: false,
   filters: {
      experience: [],
      location: [],
      salary: [],
   },
};

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
      changeFilters: (state, action: PayloadAction<filtersType>) => {
         state.filters = action.payload;
      },
      pushFilterResults: (state, action: PayloadAction<EachJobType[]>) => {         
         state.filterResults = action.payload;
      },
   },
});

export const { pushResult, toggleLoading, changeFilters, pushFilterResults } = searchSlice.actions;
export default searchSlice.reducer;
