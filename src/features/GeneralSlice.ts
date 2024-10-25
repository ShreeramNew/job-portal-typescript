"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState: { refresh: boolean } = { refresh: true };

const generalSlice = createSlice({
   name: "generalSlice",
   initialState,
   reducers: {
      triggerRefresh: (state) => {
         state.refresh = !state.refresh;
      },
   },
});

export const { triggerRefresh } = generalSlice.actions;
export default generalSlice.reducer;
