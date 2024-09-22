"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type payLoadData=number[];

interface stateType{
    results:number[]
}

const initialState:stateType={results:[]}


const searchSlice=createSlice({
    name:"searchSlice",
    initialState,
    reducers:{
        pushResult:(state,action:PayloadAction<payLoadData>)=>{
            state.results=state.results.concat(action.payload)
        }
    }
})

export const {pushResult}=searchSlice.actions;
export default searchSlice.reducer;