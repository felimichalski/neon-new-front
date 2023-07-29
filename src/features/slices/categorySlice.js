import { createSlice } from "@reduxjs/toolkit";

import { postCategory} from '../actions/categoryActions';

const initialState = {
            items:[]
}

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers: {},
    extraReducers: {
        [postCategory.pending]: (state) => {
            state.error = null;
            state.status = 'pending';
          },
          [postCategory.fulfilled]: (state, { payload }) => {
            state.success = true; // post successful
            state.status = 'success';
          },
          [postCategory.rejected]: (state, { payload }) => {
            state.error = payload;
            state.status = 'rejected';
          },
    }
})  

export default categorySlice.reducer;