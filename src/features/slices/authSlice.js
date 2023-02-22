import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin, getUserDetails } from "../actions/authActions";

const initialState = {
  userInfo: {},
  userToken: localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null,
  error: null,
  status: 'pending',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
    logOut: (state) => {
      localStorage.removeItem('userToken')
      state.userInfo = {};
      state.userToken = null;
    }
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.error = null;
      state.status = 'pending';
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.success = true; // registration successful
      state.status = 'success';
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = 'rejected';
    },
    [userLogin.pending]: (state) => {
      state.error = null;
      state.status = 'pending';
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.userToken = payload.userToken;
      state.status = 'success';
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = 'rejected';
    },
    [getUserDetails.pending]: (state) => {
      state.error = null;
      state.status = 'pending';
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.status = 'success';
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = 'rejected';
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer;
