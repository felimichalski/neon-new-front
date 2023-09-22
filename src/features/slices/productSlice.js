import { createSlice } from "@reduxjs/toolkit";

import { postProduct } from '../actions/productActions';

const initialState = {
            image: "",
            category:"",
            description:"",
            is_featured: true,
            title:"",
            unit_price:0
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers: {},
    extraReducers: {
        [postProduct.pending]: (state) => {
            state.error = null;
            state.status = 'pending';
          },
          [postProduct.fulfilled]: (state, { payload }) => {
            state.success = true; // post successful
            state.status = 'success';
          },
          [postProduct.rejected]: (state, { payload }) => {
            state.error = payload;
            state.status = 'rejected';
          },
    }
})  

export default productSlice.reducer;