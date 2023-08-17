import { createSlice } from "@reduxjs/toolkit";

import { getCategories, postCategory } from '../actions/categoryActions';

const initialState = {
  types: []
}

const categorySlice = createSlice({
  name: "category",
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
    [getCategories.pending]: (state) => {
      state.error = null;
      state.status = 'pending';
    },
    [getCategories.fulfilled]: (state, { payload }) => {
      state.types = payload;
      state.status = 'success';
    },
    [getCategories.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = 'rejected';
    },
  }
})

export default categorySlice.reducer;