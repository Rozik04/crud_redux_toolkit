import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Electronics } from '../../types/Types';

const initialState: Electronics[] = [];

const deleteSlice = createSlice({
  name: 'delete',
  initialState,
  reducers: {
    deletedItems: (state, action: PayloadAction<Electronics>) => {
      return state.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { deletedItems } = deleteSlice.actions;
export default deleteSlice.reducer;
