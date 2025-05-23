import { createSlice } from "@reduxjs/toolkit";
import type  {Electronics}  from "../../types/Types";
import type { PayloadAction } from '@reduxjs/toolkit'




export interface CreatedState { 
    value : Electronics[]
}

const initialState : CreatedState ={
    value: []
}

export const  createdSlice = createSlice({
    name: "create",
    initialState,
    reducers: {
        createdItems:   (state, action: PayloadAction<Electronics>)=>{
            state.value.push(action.payload)
        }
    }
})

export const {createdItems} = createdSlice.actions
export default createdSlice.reducer