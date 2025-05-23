import { createSlice } from "@reduxjs/toolkit";
import type  {Electronics}  from "../../types/Types";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DeletedState { 
    value : Electronics[]
}

const initialState  = {
    value: []
}

export const  deletedSlice = createSlice({
    name: "remove",
    initialState,
    reducers: {
        deletedItems: (state, action: PayloadAction<Electronics>) => {
        state.value = state.value.filter((item) => item.id !== action.payload.id);
        }

    }
})

export const {deletedItems} = deletedSlice.actions
export default deletedSlice.reducer