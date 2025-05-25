import { createSlice } from "@reduxjs/toolkit";
import type { Electronics } from "../../types/Types";
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SavedState { 
  value: Electronics[];
}

const initialState: SavedState = {
  value: []
};

export const savedSlice = createSlice({
  name: "save",
  initialState,
  reducers: {
    savedItems: (state, action: PayloadAction<Electronics>) => {
      const index = state.value.findIndex(i => i.id === action.payload.id);
      if (index === -1) {
        state.value.push(action.payload);
      } else {
        state.value.splice(index, 1);
      }
    },
    removeSavedItem: (state, action: PayloadAction<number | string>) => {
      state.value = state.value.filter(i => i.id !== action.payload);
    }
  }
});

export const { savedItems, removeSavedItem } = savedSlice.actions;
export default savedSlice.reducer;
