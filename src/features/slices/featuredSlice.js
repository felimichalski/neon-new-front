import { createSlice } from '@reduxjs/toolkit';

import { featuredFetch } from '../actions/featuredActions';

const initialState = {
    items: [],
    status: null
}

const featuredSlice = createSlice({
    name: 'featured',
    initialState,
    reducers: {},
    extraReducers: {
        [featuredFetch.pending]: (state, action) => {
            state.status = 'pending'
        },
        [featuredFetch.fulfilled]: (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        },
        [featuredFetch.rejected]: (state, action) => {
            state.status = 'rejected'
        }
    }
})

export default featuredSlice.reducer;