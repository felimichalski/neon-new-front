import { createSlice } from "@reduxjs/toolkit";

import { getPublics } from '../actions/publicActions';

const initialState = {
    items: [],
    status: null
}

const publicSlice = createSlice({
    name: 'public',
    initialState,
    reducers: {},
    extraReducers: {
        [getPublics.pending]: (state, action) => {
            state.status = 'pending'
        },
        [getPublics.fulfilled]: (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        },
        [getPublics.rejected]: (state, action) => {
            state.status = 'rejected'
        }
    }
})

export default publicSlice.reducer;