/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchData = createAsyncThunk('user/fetchData', async () => {
  const response = await axios.get(routes.userProfilePath());
  return response.data;
});

const initialState = {
  userInfo: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: {
    [fetchData.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.currentUser;
    },
  },
});

export const { actions } = userSlice;

export default userSlice.reducer;
