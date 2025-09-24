/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type {
  UserSettingsThunkType,
  UserSliceStateType,
} from 'src/types/slices';
import routes from '../routes';

export const fetchUserData = createAsyncThunk<UserSettingsThunkType, void>(
  'user/fetchUserData',
  async () => {
    const response = await axios.get(routes.userProfilePath());
    return response.data;
  },
);

const initialState: UserSliceStateType = {
  status: 'empty',
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUserData.fulfilled, (state, { payload }) => {
        state.userInfo = payload.currentUser;
        state.status = 'fullfilled';
      });
  },
});

export const { actions } = userSlice;

export default userSlice.reducer;
