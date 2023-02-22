import { createSlice } from '@reduxjs/toolkit';

import { socialFetch } from '../actions/socialActions';

const initialState = {
    items: [],
    status: null
}

const socialSlice = createSlice({
    name: 'social',
    initialState,
    reducers: {},
    extraReducers: {
        [socialFetch.pending]: (state, action) => {
            state.status = 'pending'
        },
        [socialFetch.fulfilled]: (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        },
        [socialFetch.rejected]: (state, action) => {
            state.status = 'rejected'
        }
    }
})

export default socialSlice.reducer;